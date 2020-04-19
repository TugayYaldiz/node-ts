import { ICustomError } from '@types';
import { ValidationError } from 'express-validator';

export interface IGenericErrorThrow {
  message: string;
  statusCode?: number;
  data?: ValidationError[];
}

export const throwGenericError = ({
  message,
  statusCode = 400,
  data,
}: IGenericErrorThrow): never => {
  const error = new Error(message) as ICustomError;
  error.statusCode = statusCode;

  if (data) {
    error.data = data;
  }

  throw error;
};
