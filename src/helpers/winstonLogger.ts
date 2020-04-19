import { config } from '@conf';
import { createLogger, format, LoggerOptions, transports } from 'winston';
import Sentry from 'winston-sentry-log';

const { combine, timestamp, colorize, errors, printf } = format;

const customFormatter = printf(
  /* istanbul ignore next */
  (msg) => `${msg.timestamp} ${msg.level}: ${msg.stack ? msg.stack : msg.message}`,
);

const loggerOptions: LoggerOptions =
  process.env.NODE_ENV !== 'production'
    ? {
        format: combine(errors({ stack: true })),
        transports: [
          new transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: combine(timestamp(), colorize({ all: true }), customFormatter),
          }),
        ],
        exitOnError: false,
        silent: process.env.CI ? true : /* istanbul ignore next */ false,
      }
    : /* istanbul ignore next */ {
        format: combine(errors({ stack: true })),
        transports: [
          new transports.Console({
            level: 'info',
            handleExceptions: true,
            format: combine(timestamp(), colorize({ all: true }), customFormatter),
          }),
          new Sentry(config.sentry),
        ],
        exceptionHandlers: [new Sentry(config.sentry)],
        exitOnError: false,
      };

export const logger = createLogger({
  ...loggerOptions,
});
