import { logger, stringify } from '@helpers';
import { ICustomError } from '@types';
import { Express, NextFunction, Request, Response } from 'express';

// Routes
import Mock from '@api/mock';

export const Routes = (app: Express): void => {
  app.use('/api', Mock);

  // Status 404 (Error) middleware
  app.use('*', (_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });

  // on error
  app.use((error: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
    const { message, data, statusCode } = error;

    if (!statusCode) {
      logger.error(stringify(error));
    }

    res.status(statusCode || 500).json({ success: false, message, data });
  });
};
