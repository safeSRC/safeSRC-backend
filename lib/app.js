import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import request from 'request';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import citiesController from './controller/cities.js';
import resourcesController from './controller/resources.js';
import categoriesController from './controller/categories.js';
import locationsController from './controller/locations.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1/cities', citiesController);
app.use('/api/v1/resources', resourcesController);
app.use('/api/v1/categories', categoriesController);
app.use('/api/v1/locations', locationsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
