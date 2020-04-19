import { isValidated } from '@middleware';
import { Router } from 'express';
import { query } from 'express-validator';
import { getMock } from './mock.controller';

const router = Router();

router.get(
  '/mock',
  [query('id').trim().not().isEmpty().withMessage('required')],
  isValidated,
  getMock,
);

export default router;
