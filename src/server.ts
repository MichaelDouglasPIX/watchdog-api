import 'dotenv/config';
import express from 'express';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import collectMetricsPrometheus from './middlewares/collectMetricsPrometheus';
import { startScheduler } from './jobs/jobsScheduler';
import error404Handler from './middlewares/error404Handler';
import requestIdMiddleware from './middlewares/requestId';
import './services/tracing';

const port = 8080;

const app = express();
app.use(requestIdMiddleware);

app.use(express.json());

app.use(collectMetricsPrometheus);

app.use(routes);

app.use(error404Handler);

app.use(errorHandler);

startScheduler();

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
