import { Request, Response, NextFunction } from 'express';
import responder from '../utils/responder';
import { User } from '../types/user';

// Middleware for allowing All Devs
export function allowJuniorMediorSenior(req: Request & { user?: User }, res: Response, next: NextFunction) {
  const user = req.user;

  if (user && (user.user_type === 'Junior' || user.user_type === 'Medior' || user.user_type === 'Senior')) {
    next();
  } else {
    responder(res, 403, 'error', 'User not authorized');
  }
}

// Middleware for allowing Medior Developers and Senior Developers
export function allowMediorSenior(req: Request & { user?: User }, res: Response, next: NextFunction) {
  const user = req.user;

  if (user && (user.user_type === 'Medior' || user.user_type === 'Senior')) {
    next();
  } else {
    responder(res, 403, 'error', 'User not authorized');
  }
}

// Middleware for allowing only Senior Developers
export function allowSenior(req: Request & { user?: User }, res: Response, next: NextFunction) {
  const user = req.user;

  if (user && user.user_type === 'Senior') {
    next();
  } else {
    responder(res, 403, 'error', 'User not authorized');
  }
}