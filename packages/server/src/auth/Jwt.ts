import { Router } from "express";
import { authCookieName, authJwtPath, getUserFromCookie } from "./utils";

export function applyMiddleware(router: Router): void {
  router.use(authJwtPath, (req, res, next) => {
    const user = getUserFromCookie(req.headers.cookie || '');
    if (user) {
      req.login(user, { session: false }, () => { });
    } else {
      req.logout();
      res.clearCookie(authCookieName);
    }
    return next();
  });
}
