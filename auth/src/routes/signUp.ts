import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@tofl-ticketing/common';
import { body } from 'express-validator';

import { User } from './../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
      body('email')
          .isEmail()
          .withMessage('Email must be valid'),
      body('password')
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage('Password must be between 4 and 20 characters'),
      validateRequest,
    ],
    async (req: Request, res: Response, ) => {
        const { email, password } = req.body;

        // Check that the email is not already used
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        // Persist user
        const user = User.build({ email, password });
        await user.save();

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_KEY!,
        );

        // Store JWT on a cookie session
        req.session = { jwt: userJwt };

        res.status(201).send(user);
    });

export { router as signUpRouter };
