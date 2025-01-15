import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());


// ROUTES
import healthcheckRoute from './routes/healthcheck.route';

app.use('/healthcheck', healthcheckRoute);

export default app;
