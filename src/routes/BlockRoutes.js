import express from 'express';
import { BlockController } from '../controllers/BlockController.js';
import imageUploadMiddleware from '../middlewares/ImageUploadMiddleware.js';
import qrCodeReaderMiddleware from '../middlewares/QrCodeReaderMiddleware.js';

const blockRoutes = express.Router();

blockRoutes.get('/', (req, res) => {
  return res.status(status.OK).send('ok');
});

blockRoutes.post('/get-block', express.json(), BlockController.getBlock);

blockRoutes.post('/get-blocks', express.json(), BlockController.getBlocks);

blockRoutes.post('/get-block-by-qr-code', imageUploadMiddleware.single('file'), qrCodeReaderMiddleware, BlockController.getBlockByQrCode, BlockController.getBlock);

export default blockRoutes;