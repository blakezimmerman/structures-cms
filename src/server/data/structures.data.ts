import { structuresCollection } from './mongo.collection';
import { Collection } from 'mongodb';
import { Structure } from 'models/structure.model';

export const getStructures = () => {
  return structuresCollection()
    .then((x: Collection) => x.find().toArray())
    .catch((e: any) => Promise.reject(e))
};

export const createStructure = (struct: Structure) => {
  return structuresCollection()
    .then((x: Collection) => x.insertOne(struct))
    .catch((e: any) => Promise.reject(e))
};

export const updateStructure = (struct: Structure) => {
  return structuresCollection()
    .then((x: Collection) => x.updateOne({_id: struct._id}, struct))
    .catch((e: any) => Promise.reject(e))
};

export const deleteStructure = (id: string) => {
  return structuresCollection()
    .then((x: Collection) => x.deleteOne({_id: id}))
    .catch((e: any) => Promise.reject(e))
};
