import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

// Extends the Request interface, so to make it possible to add a currentUser option to it.
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session?.jwt) { // equivalent of `!req.session || !req.session.jwt`
		return next();
	}

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
		req.currentUser = payload;
	} catch (err) {}

	next();
}