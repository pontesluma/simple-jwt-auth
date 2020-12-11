import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '10m',
  },
};

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // get token from req haeder
  // verify token
  // if token verifyed -> return next()
  // if token not verifyed -> error

  const authHeader = req.headers.authorization;

  if (!authHeader){
    return res.status(401).json('Token missing');
  }

  const [, token] = authHeader.split(' ');

  const secret = authConfig.jwt.secret;

  try {
    const decoded = verify(token, secret);
    
    // sub is the info used to generate the JWT
    // const { sub } = decoded as { sub: string };
    
    return next();
  } catch (err) {
    console.log('Invalid token');
    return res.status(401).json('Invalid token');
  }
};

export default ensureAuthenticated;