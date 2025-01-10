import express, { Router, Request, Response } from 'express';
const router: Router = express.Router();

// Import controllers
import { postRegisterUser, getVerifyUser, getInvitedUser } from '../controller/register';

// API routes
router.post('/', (req: Request, res: Response) => postRegisterUser(req, res));

router.get('/verification/:token', (req: Request, res: Response) => getVerifyUser(req, res))

router.get('/invitation/:token', (req: Request, res: Response) => getInvitedUser(req, res))

export default router;