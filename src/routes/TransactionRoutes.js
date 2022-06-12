import express from 'express';
import { TransactionController } from '../controllers/TransactionController.js';
import imageUploadMiddleware from '../middlewares/ImageUploadMiddleware.js';
import qrCodeReaderMiddleware from '../middlewares/QrCodeReaderMiddleware.js';

const transactionRoutes = express.Router();

transactionRoutes.get('/', (req, res) => {
  return res.status(status.OK).send('ok');
});

transactionRoutes.post('/get-transaction', express.json(), TransactionController.getTransaction);

transactionRoutes.post('/get-transactions', express.json(), TransactionController.getTransactions);

transactionRoutes.post('/get-transaction-receipt', express.json(), TransactionController.getTransactionReceipt);

transactionRoutes.post('/get-transaction-receipts', express.json(), TransactionController.getTransactionReceipts);

transactionRoutes.post('/get-transaction-by-qr-code', imageUploadMiddleware.single('file'), qrCodeReaderMiddleware, TransactionController.getTransactionHashByQrCode, TransactionController.getTransaction);

transactionRoutes.post('/get-transaction-receipt-by-qr-code', imageUploadMiddleware.single('file'), qrCodeReaderMiddleware, TransactionController.getTransactionHashByQrCode, TransactionController.getTransactionReceipt);


export default transactionRoutes;