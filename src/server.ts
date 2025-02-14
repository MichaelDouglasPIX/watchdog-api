import 'dotenv/config';
import express from 'express';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import collectMetricsPrometheus from './middlewares/collectMetricsPrometheus';
import { startScheduler } from './jobs/jobsScheduler';
import error404Handler from './middlewares/error404Handler';
import Logger from './utils/logger';
import requestIdMiddleware from './middlewares/requestId';

const port = 3333;

const app = express();
app.use(express.json());

app.use(requestIdMiddleware);

app.use(collectMetricsPrometheus);

app.use(routes);

app.use(error404Handler);

app.use(errorHandler);

startScheduler();

app.listen(port, () => {
  Logger.log(undefined, `Server started on port ${port}!`);
});
