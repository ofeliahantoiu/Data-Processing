import { Request, Response } from 'express';
import responder from '../utils/responder';

export const getIndexPage = async (req: Request, res: Response): Promise<void> => {

  responder(res, 200, req.headers['content-type']!, "2", "2")
};