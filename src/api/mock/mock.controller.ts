import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getMockDA } from './mock.da';

export const getMock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.query as { id: string };

    const ID = await getMockDA({ id });

    res.status(200).json({
      success: true,
      message: 'ID found.',
      id: `${ID}+${uuidv4()}`,
    });
  } catch (error) /* istanbul ignore next */ {
    next(error);
  }
};
