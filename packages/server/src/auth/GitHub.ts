import { Strategy as GitHubStrategy } from 'passport-github';
import { Router } from 'express';
import { photon } from '../lib';
import passport from 'passport';
import { authGitHubPath, updateAuthCookie } from './utils';
import { User } from '@generated/photon';

const serverPort = process.env.SERVER_PORT || 4000;
const clientID = process.env.AUTH_GITHUB_CLIENT_ID || '';
const clientSecret = process.env.AUTH_GITHUB_CLIENT_SECRET || '';
const callbackURL = `http://localhost:${serverPort}${authGitHubPath}/callback`;

async function githubFindOrCreateUser(profile: passport.Profile): Promise<User | null> {
  let user = null;

  // Find existing user from profile.id
  user = await photon.users.findOne({ where: { githubProfileId: profile.id } }).catch(() => { });
  if (user) {
    delete user.password;
    return user;
  }

  // Determine user email
  const email = (profile.emails && profile.emails[0].value) || null;
  if (!email) {
    return null;
  }

  // Find or create user
  return await photon.users.upsert({
    where: { email },
    create: { email, githubProfileId: profile.id },
    update: { githubProfileId: profile.id },
  })
    .then((user) => {
      delete user.password;
      return user;
    })
    .catch(() => { return null; });
}

export const strategy = new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL,
  scope: 'user:email',
  passReqToCallback: true,
}, async (req, _accessToken, _refreshToken, profile, done): Promise<void> => {
  try {
    // Link authenticated user
    let user = req.user || null;
    if (user) {
      user = await photon.users.update({
        where: { id: user.id },
        data: { githubProfileId: profile.id },
      });
    } else {
      // Find or create user from GitHub profile
      user = await githubFindOrCreateUser(profile);
    }
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    return done(null, undefined, { message: error.message });
  }
});

export function applyMiddleware(router: Router): void {
  router.get(authGitHubPath, (req, res, next) => {
    const { redirect } = req.query;
    const state = redirect ? Buffer.from(JSON.stringify({ redirect })).toString('base64') : undefined;
    const authenticator = passport.authenticate('github', { session: false, state });
    authenticator(req, res, next);
  });
  router.get(`${authGitHubPath}/callback`,
    (req, res, next) => passport.authenticate('github', { failureRedirect: '/', session: false }, async (error, user) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.login(user, { session: false }, () => { });
      } else {
        req.logout();
      }

      // Determine redirect URL
      let url = '/';
      const { state } = req.query;
      try {
        const { redirect } = JSON.parse(Buffer.from(state, 'base64').toString());
        if (typeof redirect === 'string' && redirect.startsWith('/')) {
          url = redirect;
        }
      } catch { }

      // Update authentication cookie and redirect
      updateAuthCookie(req, res, () => {
        res.redirect(url);
      });
    })(req, res, next)
  );
};
