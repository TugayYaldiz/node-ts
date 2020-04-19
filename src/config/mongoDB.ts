import { config } from '@conf';
import { logger, stringify } from '@helpers';
import { Server } from 'http';
import mongoose from 'mongoose';

/* istanbul ignore next: because tests will always have port 9000 */
const port = parseInt(process.env.PORT ?? '4600', 10);

export const MongoDB = (server: Server): void => {
  mongoose.connect(config.mongoDB.url, config.mongoDB.connectionOptions, (error) => {
    /* istanbul ignore next */
    if (error) {
      return logger.error(stringify(error));
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      server.listen(port).on(
        'error',
        /* istanbul ignore next */ (
          err: Error & {
            code: string;
          },
        ) => {
          if (err.code === 'EADDRINUSE') {
            logger.error(`port: ${port} is in use.`);
          }
        },
      );
    } else {
      server.listen(port);
    }

    logger.info(`Server start on port: ${port}`);
  });

  mongoose.connection.on(
    'error',
    /* istanbul ignore next */ (error) => {
      logger.error(`Mongoose error: ${stringify(error)}`);
      mongoose.disconnect();
    },
  );

  mongoose.connection.on(
    'disconnected',
    /* istanbul ignore next */ () => {
      logger.error('Mongoose disconnected:');
      mongoose.connect(config.mongoDB.url, config.mongoDB.connectionOptions, (error) => {
        if (error) {
          logger.error(`Mongoose reconnect error: ${stringify(error)}`);
        }
      });
    },
  );

  [
    'connecting',
    'connected',
    'open',
    'disconnecting',
    'disconnected',
    'close',
    'reconnected',
    'error',
    'fullsetup',
  ].forEach((name) => {
    mongoose.connection.on(name, (data) => {
      logger.info(`[Mongoose event]: ${name}`);
      /* istanbul ignore if */
      if (data) {
        /* istanbul ignore next */
        if (name === 'error') {
          logger.error(`${stringify(data)}`);
        } else {
          logger.info(`${stringify(data)}`);
        }
      }
      logger.debug('************************************');
    });
  });
};
export default mongoose;
