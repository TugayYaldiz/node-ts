import { validationResultChecker } from '@helpers';
import { NextFunction, Request, Response } from 'express';

export const isValidated = (req: Request, _res: Response, next: NextFunction) => {
  validationResultChecker({
    req,
  });

  next();
};
