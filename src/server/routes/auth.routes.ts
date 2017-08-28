import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import * as uuid from 'uuid/v4';
import * as jwt from 'jsonwebtoken';
import { User, UserAccount } from 'models/user.model';
import { getUser } from '../data/users.data';
import { checkMatchFound } from './index';
import { secret } from '../app';

const router = express.Router();

const findUser = (userName: string) =>
  getUser(userName)
    .then((users: UserAccount[]) => users.length ? users[0] : false)
    .catch((e: any) => false);

const checkPassword = (hash: string, password: string) =>
  bcrypt.compareSync(password, hash);

const generateToken = (resUser: User) =>
  jwt.sign({ userName: resUser.userName, password: resUser.isAdmin }, secret);

router.post('/login', (req, res) => {
  findUser(req.body.userName)
    .then((user: UserAccount) => {
      if (user) {
        if (checkPassword(user.hashedPassword, req.body.password)) {
          const resUser: User = { userName: user.userName, isAdmin: user.isAdmin };
          res.cookie('token', generateToken(resUser), { httpOnly: true, signed: true });
          res.json(resUser);
        } else {
          res.status(500).json('Incorrect password');
        }
      } else {
        res.status(500).json('Username not found');
      }
    })
    .catch((e: any) => res.status(500).json({e}));
});

router.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, signed: true, maxAge: 0 });
  res.json('success');
});

export default router;
