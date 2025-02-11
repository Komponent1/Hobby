import multer, { memoryStorage } from 'multer';

const fileStream = multer({ storage: memoryStorage() });

export default fileStream;
