import { Request } from 'express';
import { Multer } from 'multer'; // import Multer types

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;  // Use Multer.File instead of Express.Multer.File
    }
  }
}
