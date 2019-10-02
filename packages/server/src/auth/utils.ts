import { sign, verify } from 'jsonwebtoken';
import { parse } from 'cookie';

export const authCookieName = process.env.AUTH_COOKIE_NAME || 'nuxt-prisma2-auth';
export const authCookieMaxAge = process.env.AUTH_COOKIE_MAX_AGE || '86400000';
export const authJwtExpires = process.env.AUTH_JWT_EXPIRES || '1d';
export const authJwtSecret = process.env.AUTH_JWT_SECRET || 'nuxt-prisma2-secret';

// Decode JWT
export function decodeJwt(token: string): Express.User | null {
  try {
    return verify(token, authJwtSecret) as Express.User;
  } catch (error) { }
  return null;
}

// Encode JWT
export function encodeJwt(payload: Express.User): string {
  return sign(payload, authJwtSecret, { expiresIn: authJwtExpires });
}

// Get user from req.headers.cookie
export function getUserFromCookie(cookie: string): Express.User | null {
  const cookies = parse(cookie || '');
  const token = cookies && cookies[authCookieName];
  if (!token) {
    return null;
  }
  return decodeJwt(token);
}
