import { IConfig } from '@types';

const config: IConfig = {
  appBaseUrl: 'http://localhost:4600',
  allowedLocalAddresses: ['::ffff:127.0.0.1', '::1'],
  originWhitelist: ['http://localhost:4000'],
  mongoDB: {
    url: 'mongodb://localhost:27017/development',
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
  twilio: {
    maxAllowedSessionDuration: 14400,
    accountSID: process.env.TWILIO_ACCOUNT_SID ?? '',
    apiSID: process.env.TWILIO_API_KEY_SID ?? '',
    apiKeySecret: process.env.TWILIO_API_KEY_SECRET ?? '',
    authToken: process.env.TWILIO_AUTH_TOKEN ?? '',
  },
  sentry: {
    level: 'warn',
    config: {
      dsn: 'dsn',
      environment: 'development',
    },
    silent: true,
  },
};

export default config;
