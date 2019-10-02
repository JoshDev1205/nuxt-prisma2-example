import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { authCookieName, authCookieMaxAge, encodeJwt, getUserFromCookie } from './utils';

// Authentication Router
export const router = Router();

// Passport.js
router.use(passport.initialize());

// Update authentication cookie from req.user
function updateAuthCookie(req: Request, res: Response, next: NextFunction): void {
  if (req.user) {
    const token = encodeJwt(req.user);
    res.cookie(authCookieName, token, {
      httpOnly: true,
      maxAge: parseInt(authCookieMaxAge),
    });
  } else {
    res.clearCookie(authCookieName);
  }
  next();
}

// JWT Authentication
const jwtAuthPath = /^\/(?!_|favicon.ico).*/;
router.use(jwtAuthPath, (req, res, next) => {
  const user = getUserFromCookie(req.headers.cookie || '');
  if (user) {
    req.login(user, { session: false }, () => { });
  } else {
    req.logout();
    res.clearCookie(authCookieName);
  }
  return next();
});

// Logout
router.use('/auth/logout', (req, res) => {
  req.logout();
  updateAuthCookie(req, res, () => res.redirect('/'));
});

// TODO: Login Route
router.use('/auth/login', (req, res) => {
  req.login({ id: 'test', email: 'pascal@lewebsimple.ca' }, { session: false }, () => { });
  updateAuthCookie(req, res, () => res.redirect('/'));
});
