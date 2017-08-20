import * as express from 'express';
const router = express.Router();

// GET DATA

router.get('/', (req, res) => {

});

router.get('/:slug', (req, res) => {

});

// MANAGE STRUCTURES

router.post('/new', (req, res) => {

});

router.put('/:slug/update', (req, res) => {

});

router.get('/:slug/delete', (req, res) => {

});

// MANAGE ENTRIES

router.post('/:slug/new', (req, res) => {

});

router.put('/:slug/:entryslug/update', (req, res) => {

});

router.get('/:slug/:entryslug/delete', (req, res) => {

});

router.post('/:slug/:entryslug/comment', (req, res) => {

});

export default router;
