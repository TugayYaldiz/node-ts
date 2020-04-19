import { IConfig } from '@types';

const config: IConfig = {
  appBaseUrl: 'prodBase',
  allowedLocalAddresses: ['::ffff:127.0.0.1', '::1'],
  originWhitelist: ['whiteList'],
  mongoDB: {
    url: 'mongodb://127.0.0.1:27017/prod?replicaSet=set1',
    connectionOptions: {
      connectTimeoutMS: 300000,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 5,
      ha: true,
      haInterval: 10000,
    },
    strict: true,
  },
  sentry: {
    level: 'warn',
    config: {
      dsn: 'dsn',
      environment: 'production',
    },
    silent: false,
  },
};

export default config;
