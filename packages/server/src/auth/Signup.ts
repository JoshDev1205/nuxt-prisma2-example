import { Strategy } from 'passport-local';
import { Router } from 'express';
import { photon } from '..';
import { hashSync } from 'bcryptjs';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import { authSignupPath, updateAuthCookie } from './utils';

export const strategy = new Strategy({ usernameField: 'email' }, async (email, password, done): Promise<void> => {
  try {
    // Create user with email / password
    const user = await photon.users.create({
      data: {
        email,
        password: hashSync(password),
      },
    });
    // Return user without password
    delete user.password;
    return done(null, user);
  } catch (error) {
    return done(null, false, { message: error.message });
  }
});

export function applyMiddleware(router: Router): void {
  router.post(authSignupPath,
    json(),
    urlencoded({ extended: true }),
    (req, res, next) => passport.authenticate('signup', { session: false }, async (error, user, info) => {
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
          res.json({ message: 'Signup successful', user });
        } else {
          res.status(401).json({ message: info.message });
        }
      });
    })(req, res, next)
  );
};
