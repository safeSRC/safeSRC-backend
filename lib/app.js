import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controller/authentication.js';
import citiesController from './controller/cities.js';
import resourcesController from './controller/resources.js';
import categoriesController from './controller/categories.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authController);
app.use('/api/v1/cities', citiesController);
app.use('/api/v1/resources', resourcesController);
app.use('/api/v1/categories', categoriesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
