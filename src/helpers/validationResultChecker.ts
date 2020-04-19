import { throwGenericError } from '@helpers';
import { Request } from 'express';
import { validationResult } from 'express-validator';

export const validationResultChecker = ({
  req,
  statusCode = 400,
  message = 'Validation failed.',
}: {
  req: Request;
  statusCode?: number;
  message?: string;
}): never | void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throwGenericError({ message, statusCode, data: errors.array() });
  }
};
