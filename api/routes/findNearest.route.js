import express from 'express'
import { search } from '../controllers/findNearest.controller.js';

const router = express.Router();

router.post('/:userId', search);

export default router;