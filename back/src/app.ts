import express, { Application } from 'express';
import apiRoutes from './routes';

const app: Application = express();

app.use(express.json());

app.use('/api', apiRoutes);

export default app;