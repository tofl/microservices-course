import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@tofl-ticketing/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
	signed: false,
	secure: false,
}));
app.use(currentUser); // Adds the currentUser object to req

// Routes
app.use(createChargeRouter);


app.all('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
