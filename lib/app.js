import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import citiesController from './controller/cities.js';
import resourcesController from './controller/resources.js';
import categoriesController from './controller/categories.js';


const app = express();

app.use(express.json());

app.use('/api/v1/cities', citiesController);
app.use('/api/v1/resources', resourcesController);
app.use('/api/v1/categories', categoriesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
