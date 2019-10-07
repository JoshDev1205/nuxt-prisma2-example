import { Router } from 'express';
import passport from 'passport';
import * as jwt from './Jwt';
import * as login from './Login';
import * as logout from './Logout';
import * as signup from './Signup';
import * as github from './GitHub';

// Authentication Router
export const router = Router();

// Initalize Passport
router.use(passport.initialize());

// Passport Strategies
passport.use('login', login.strategy);
passport.use('signup', signup.strategy);
passport.use('github', github.strategy);

// Authentication Routes
jwt.applyMiddleware(router);
login.applyMiddleware(router);
logout.applyMiddleware(router);
signup.applyMiddleware(router);
github.applyMiddleware(router);
