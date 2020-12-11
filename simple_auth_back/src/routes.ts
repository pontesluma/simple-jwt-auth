import { Router, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import {uuid} from 'uuidv4';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

const routes = Router();

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '10m',
  },
};

const pesrsistedUsers: IUser[] = [];
let pesrsistedList: {text: string, id: string}[] = [];

routes.post('/sign-in', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = pesrsistedUsers.find(user => user.email === email);

  if (!user) return res.status(404).json({message: 'User not found'});

  if (user.password !== password) {
    return res.status(404).json({message: 'Password not match'});
  }

  const token = sign({}, authConfig.jwt.secret, {
    subject: user.id,
    expiresIn: authConfig.jwt.expiresIn,
  });

  return res.status(200).json({ user: {name: user.name, email}, token });
});

routes.post('/sign-up', (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  pesrsistedUsers.push({name, email, password, id: uuid()});

  return res.status(200).json({name, email});

});

routes.post('/todo', ensureAuthenticated, (req: Request, res: Response) => {
  const { todo } = req.body;

  pesrsistedList.push({ text: todo, id: uuid() });

  return res.status(200).json({text: todo, id: uuid() });

});

routes.get('/todo', ensureAuthenticated, (req: Request, res: Response) => {
  return res.status(200).json({todo: pesrsistedList});
});


routes.delete('/todo/:id', ensureAuthenticated, (req: Request, res: Response) => {
  const { id } = req.params;

  pesrsistedList = pesrsistedList.filter(todo => todo.id !== id);

  return res.status(200).json({todo: pesrsistedList});
});

export default routes;