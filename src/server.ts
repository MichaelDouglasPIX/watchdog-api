import 'dotenv/config';
import express from 'express';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import collectMetricsPrometheus from './middlewares/collectMetricsPrometheus';
import { startScheduler } from './jobs/jobsScheduler';

const app = express();
app.use(express.json());

app.use(collectMetricsPrometheus);

app.use(routes);

const port = process.env.PORT;

app.use(errorHandler);

startScheduler();

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
