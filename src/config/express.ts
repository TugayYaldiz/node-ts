import bodyParser from 'body-parser';
import { Express } from 'express';
import { Cors } from './cors';
import { Routes } from './routes';

export const ExpressConf = (app: Express): void => {
  // disable header "x-powered-by: express"
  app.disable('x-powered-by');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  Cors(app);
  Routes(app);
};
