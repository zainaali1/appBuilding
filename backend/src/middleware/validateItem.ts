import type { Request, Response, NextFunction } from 'express';

export function validateItem(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }

  next();
}