import { usersCollection } from './mongo.collection';
import { Collection } from 'mongodb';
import { UserAccount } from 'models/user.model';

export const getUser = (userName: string) => {
  return usersCollection()
    .then((x: Collection) => x.find({userName: userName}).toArray())
    .catch((e: any) => Promise.reject(e))
};

export const getAllUsers = () => {
  return usersCollection()
    .then((x: Collection) => x.find().toArray())
    .catch((e: any) => Promise.reject(e))
};

export const createUser = (user: UserAccount) => {
  return usersCollection()
    .then((x: Collection) => x.insertOne(user))
    .catch((e: any) => Promise.reject(e))
};

export const makeAdmin = (userName: string) => {
  return usersCollection()
    .then((x: Collection) => x.updateOne({userName: userName},  {$set: {isAdmin: true}}))
    .catch((e: any) => Promise.reject(e))
};
