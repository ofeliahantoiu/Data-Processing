import multer from 'multer';
import path from 'path';
import responder from '../utils/responder';


const acceptedMimeTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];

const fileFilter = (req : any, file: any, cb: any) => {
  if (acceptedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const errorMessage = 'Wrong file type';
    responder(req.res, 400, 'error', errorMessage);
    return;
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../images/');
    cb(null, destinationPath); 
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().replace(' ', '');
    cb(null, `${Date.now()}${filename}`);
  },
});

const upload = multer({ storage, fileFilter });

export default upload;