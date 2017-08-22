import { entriesCollection } from './mongo.collection';
import { Collection } from 'mongodb';
import { Entry } from 'models/entry.model';
import { Comment } from 'models/comment.model';

export const getEntries = (type: string) => {
  return entriesCollection()
    .then((x: Collection) => x.find({type: type}).toArray())
    .catch((e: any) => Promise.reject(e))
};

export const createEntry = (entry: Entry) => {
  return entriesCollection()
    .then((x: Collection) => x.insertOne(entry))
    .catch((e: any) => Promise.reject(e))
};

export const updateEntry = (entry: Entry) => {
  return entriesCollection()
    .then((x: Collection) => x.updateOne({_id: entry._id}, entry))
    .catch((e: any) => Promise.reject(e))
};

export const deleteEntry = (id: string) => {
  return entriesCollection()
    .then((x: Collection) => x.deleteOne({_id: id}))
    .catch((e: any) => Promise.reject(e))
};

export const deleteAllEntries = (type: string) => {
  return entriesCollection()
    .then((x: Collection) => x.deleteMany({type: type}))
    .catch((e: any) => Promise.reject(e))
};

export const addComment = (id: string, comment: Comment) => {
  return entriesCollection()
    .then((x: Collection) => x.update({_id: id}, {$push: {comments: comment}}))
    .catch((e: any) => Promise.reject(e))
};
