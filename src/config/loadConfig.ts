import path from 'path';
require('dotenv').config();

import { IConfig } from '@types';

/* istanbul ignore next: because tests will always run on test env */
const env = process.env.NODE_ENV || 'development';

const configPath = path.join(__dirname, 'env', env);

export const config = require(configPath).default as IConfig;
