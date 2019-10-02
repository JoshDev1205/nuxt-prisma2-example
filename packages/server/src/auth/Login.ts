import { Strategy } from 'passport-local';
import { photon } from '..';
import { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import { authLoginPath, updateAuthCookie } from './utils';

export const strategy = new Strategy({ usernameField: 'email' }, async (email, password, done): Promise<void> => {
  try {
    // Find user by email
    const user = await photon.users.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'User email not found' });
    }
    // Validate password
    const valid = (password === user.password);
    if (!valid) {
      return done(null, false, { message: 'Invalid password' });
    }
    // Return user without password
    delete user.password;
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
});

export function applyMiddleware(router: Router): void {
  router.post(authLoginPath,
    json(),
    urlencoded({ extended: true }),
    (req, res, next) => passport.authenticate('login', { session: false }, async (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (user) {
        req.login(user, { session: false }, () => { });
      } else {
        req.logout();
      }
      updateAuthCookie(req, res, () => {
        if (user) {
          res.json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: info.message });
        }
      });
    })(req, res, next)
  );
};
