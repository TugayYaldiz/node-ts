/* istanbul ignore if */
if (['production', 'staging'].some((env) => env === process.env.NODE_ENV)) {
  require('module-alias/register');
}

import express from 'express';

import { ExpressConf, MongoDB } from '@config';
import { createServer, Server } from 'http';

const app = express();
const server: Server = createServer(app);

ExpressConf(app);

MongoDB(server);

export default app;
