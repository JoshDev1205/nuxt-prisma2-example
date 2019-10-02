import { Router } from 'express';
import passport from 'passport';

// Authentication Router
export const router = Router();

// Passport.js
router.use(passport.initialize());
