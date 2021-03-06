import * as express from 'express';
import * as bcrypt from 'bcrypt-nodejs';
import * as uuid from 'uuid/v4';
import { InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';
import { User, NewUser, UserAccount } from 'models/user.model';
import { getUser, getAllUsers, createUser, makeAdmin } from '../data/users.data';
import { checkMatchFound } from './index';
import { checkAdmin } from '../data/auth.data';

const router = express.Router();

const processUser = ({userName, password}: any) =>
  getUser(userName)
    .then((users: UserAccount[]) =>
      !users.length
        ? ({
            _id: uuid(),
            userName: userName,
            hashedPassword: bcrypt.hashSync(password),
            isAdmin: false
          })
       : Promise.reject("Username is already taken."))
    .catch((e: any) => Promise.reject(e));

router.post('/new', (req, res) => {
  processUser(req.body)
    .then((user: UserAccount) => createUser(user)
      .then((x: InsertOneWriteOpResult) => res.json(x))
      .catch((e: any) => res.status(500).json({e})))
    .catch((e: any) => res.status(500).json({e}))
});

router.get('/all', checkAdmin, (req, res) => {
  getAllUsers()
    .then((x: UserAccount[]) => {
      const users = x.map(u => ({userName: u.userName, isAdmin: u.isAdmin}));
      return res.json(users);
    })
    .catch((e: any) => res.status(500).json({e}))
});

router.get('/makeadmin/:username', checkAdmin, (req, res) => {
  makeAdmin(req.params.username)
    .then((x: UpdateWriteOpResult) => checkMatchFound(x, res))
    .catch((e: any) => res.status(500).json({e}))
});

export default router;
