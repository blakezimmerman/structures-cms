import * as express from 'express';
import {
  InsertOneWriteOpResult, UpdateWriteOpResult,
  DeleteWriteOpResultObject
} from 'mongodb';
import { Entry } from 'models/entry.model';
import { Comment } from 'models/comment.model';
import {
  getEntries, createEntry, updateEntry,
  deleteEntry, addComment
} from '../data/entries.data';
import { checkMatchFound } from './index';

const router = express.Router();

const validateEntry = (x: any) =>
  x._id && x.type && x.title && x.description &&
  x.author && x.dateCreated && x.fields && x.comments;

router.get('/:type', (req, res) => {
  getEntries(req.params.type)
    .then((x: Entry[]) => res.json(x))
    .catch((e: any) => res.status(500).json({e}))
});

router.post('/new', (req, res) => {
  validateEntry(req.body)
    ? createEntry(req.body)
        .then((x: InsertOneWriteOpResult) => res.json(x))
        .catch((e: any) => res.status(500).json({e}))
    : res.status(500).json('Invalid Structure');
});

router.put('/update', (req, res) => {
  validateEntry(req.body)
    ? updateEntry(req.body)
        .then((x: UpdateWriteOpResult) => checkMatchFound(x, res))
        .catch((e: any) => res.status(500).json({e}))
    : res.status(500).json('Invalid Structure');
});

router.get('/delete/:id', (req, res) => {
  deleteEntry(req.params.id)
    .then((x: DeleteWriteOpResultObject) => checkMatchFound(x, res))
    .catch((e: any) => res.status(500).json({e}))
});

router.put('/comment/:id', (req, res) => {
  addComment(req.params.id, req.body)
    .then((x: UpdateWriteOpResult) => checkMatchFound(x, res))
    .catch((e: any) => res.status(500).json({e}))
});

export default router;
