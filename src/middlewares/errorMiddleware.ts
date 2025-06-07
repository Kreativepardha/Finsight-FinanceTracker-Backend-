
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import logger from '../utils/logger';

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = (err as ApiError).statusCode || 500;

  logger.error('Error caught', {
    meta: {
      message: err.message,
      stack: err.stack,
    },
  });

  res.status(statusCode).json({
    success: false,
    message: err.message,
    statusCode,
  });
}
