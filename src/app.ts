import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
import healthcheckRoute from './routes/healthcheck.route';
import planRoutes from './routes/plan.route';

app.use('/healthcheck', healthcheckRoute);
app.use('/plan', planRoutes);

export default app;
