export interface IMongoDBConnectionOptions {
  connectTimeoutMS: number;
  keepAlive: boolean;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  useFindAndModify: boolean;
  poolSize: number;
  ha: boolean;
  haInterval: number;
}

export interface IMongoDB {
  url: string;
  connectionOptions: IMongoDBConnectionOptions;
  strict: boolean;
}

export interface ISentryConfig {
  dsn: string;
  environment: string;
}

export interface ISentry {
  level: string;
  config: ISentryConfig;
  silent: boolean;
}

export interface ITwilio {
  maxAllowedSessionDuration: number;
  accountSID: string;
  apiSID: string;
  apiKeySecret: string;
  authToken: string;
}

export interface IConfig {
  appBaseUrl: string;
  allowedLocalAddresses: string[];
  originWhitelist: string[];
  mongoDB: IMongoDB;
  twilio: ITwilio;
  sentry: ISentry;
}
