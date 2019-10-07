import { Strategy as GitHubStrategy } from 'passport-github';
import { Router } from 'express';
import { photon } from '..';
import passport from 'passport';
import { authGitHubPath, updateAuthCookie } from './utils';

const serverPort = process.env.SERVER_PORT || 4000;
const clientID = process.env.AUTH_GITHUB_CLIENT_ID || '';
const clientSecret = process.env.AUTH_GITHUB_CLIENT_SECRET || '';
const callbackURL = `http://localhost:${serverPort}${authGitHubPath}/callback`;

export const strategy = new GitHubStrategy({
  clientID,
  clientSecret,
  callbackURL,
  scope: 'user:email',
}, async (_accessToken, _refreshToken, profile, done): Promise<void> => {
  try {
    // Find user by email
    // TODO: Find by { githubId: profile.id }
    const email = (profile.emails && profile.emails[0].value) || '';
    const user = await photon.users.findOne({ where: { email } });
    // Return user without password
    delete user.password;
    return done(null, user);
  } catch (error) {
    return done(null, undefined, { message: error.message });
  }
});

export function applyMiddleware(router: Router): void {
  router.get(authGitHubPath,
    passport.authenticate('github', { session: false })
  );
  router.get(`${authGitHubPath}/callback`,
    (req, res, next) => passport.authenticate('github', { failureRedirect: '/', session: false }, async (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.login(user, { session: false }, () => { });
      } else {
        req.logout();
      }
      updateAuthCookie(req, res, () => res.redirect('/'));
    })(req, res, next)
  );
};
