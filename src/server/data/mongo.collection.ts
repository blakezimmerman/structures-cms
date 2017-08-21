import dbConnection from './mongo.connection';
import { Collection } from 'mongodb';

type MongoCollection = undefined | Collection;

let getCollection = (collection: string) => {
  let _col: any = undefined;

  return () => {
    if (!_col) {
      _col = dbConnection().then(db => {
        return db.collection(collection);
      });
    }
    return _col;
  }
}

export const structuresCollection = getCollection('structures');
export const entriesCollection = getCollection('entries');
export const usersCollection = getCollection('users');
