import { config } from '@conf';
import cors, { CorsOptions } from 'cors';
import { Express } from 'express';

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // we don't need specify it for the same origin
    if (origin === config.appBaseUrl) return callback(null, false);

    if (config.originWhitelist.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the ${origin} Origin.`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: 'GET,POST,OPTIONS,PUT,DELETE',
  allowedHeaders:
    'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken',
};

export const Cors = (app: Express): void => {
  app.use(cors(corsOptions));
};
