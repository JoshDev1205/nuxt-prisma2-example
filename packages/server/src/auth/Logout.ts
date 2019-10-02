import { Router } from "express";
import { authLogoutPath, updateAuthCookie } from "./utils";


// Logout
export function applyMiddleware(router: Router): void {
  router.use(authLogoutPath, (req, res) => {
    req.logout();
    updateAuthCookie(req, res, () => res.redirect('/'));
  });
}
