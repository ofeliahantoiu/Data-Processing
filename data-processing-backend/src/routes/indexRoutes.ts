import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

// Import controllers
import { getIndexPage } from '../controller/index';

// API routes
router.get('/', (req: Request, res: Response) => getIndexPage(req, res));

export default router;