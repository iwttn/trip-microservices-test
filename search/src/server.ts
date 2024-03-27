import express, { json } from 'express'
import logger from 'morgan';
import Routes from './routes'

const app = express();

/**Middlewares */
app.use(logger('dev'));
app.use(json());

/**Register routes */
app.get('/', (_, res) => res.status(200).send("Welcome to search service"));
app.use('/api', Routes);

export default app;