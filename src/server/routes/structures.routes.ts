import * as express from 'express';
import {
  InsertOneWriteOpResult, UpdateWriteOpResult,
  DeleteWriteOpResultObject
} from 'mongodb';
import { Structure } from 'models/structure.model';
import {
  getStructures, createStructure,
  updateStructure, deleteStructure
} from '../data/structures.data';
import { checkMatchFound } from './index';
import { Entry } from 'models/entry.model';
import { getEntries } from '../data/entries.data';
import { checkAuth } from '../data/auth.data';

const router = express.Router();

const validateStruct = (x: any) =>
  x._id && x.name && x.description && x.fields;

router.get('/', (req, res) => {
  getStructures()
    .then((data: Structure[]) => Promise.all(data
      .map(struct => getEntries(struct._id)
        .then((entries: Entry[]) => ({...struct, count: entries.length}),
              (e: any) => ({...struct, count: undefined})))))
      .then((structs: Structure[]) => res.json(structs))
    .catch((e: any) => res.status(500).json({e}))
});

router.post('/new', (req, res) => {
  validateStruct(req.body)
    ? createStructure(req.body)
        .then((x: InsertOneWriteOpResult) => res.json(x))
        .catch((e: any) => res.status(500).json({e}))
    : res.status(500).json('Invalid Structure');
});

router.put('/update', (req, res) => {
  validateStruct(req.body)
    ? updateStructure(req.body)
        .then((x: UpdateWriteOpResult) => checkMatchFound(x, res))
        .catch((e: any) => res.status(500).json({e}))
    : res.status(500).json('Invalid Structure');
});

router.get('/:id/delete', (req, res) => {
  deleteStructure(req.params.id)
    .then((x: DeleteWriteOpResultObject) => checkMatchFound(x, res))
    .catch((e: any) => res.status(500).json({e}))
});

export default router;
