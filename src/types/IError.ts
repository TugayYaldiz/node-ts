import { ValidationError } from 'express-validator';

export interface ICustomError extends Error {
  statusCode: number;
  data: ValidationError[];
}
