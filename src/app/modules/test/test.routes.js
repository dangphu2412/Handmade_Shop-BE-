import express from 'express';
import TestHandler from './test.handler';

const router = express.Router();

router.get('/test', TestHandler['test']());

export default router;
