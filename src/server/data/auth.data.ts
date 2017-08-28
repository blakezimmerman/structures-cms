import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../app';

export const checkAuth =
  (req: Request, res: Response, next: NextFunction) =>
    jwt.verify(req.signedCookies.token, secret, (e: any, decoded: string) =>
      (e || !decoded) ? res.status(500).json("Not Authorized") : next()
    );
