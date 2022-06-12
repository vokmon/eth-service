import status from 'http-status';
import { provider } from './EthProvider.js';

export const TransactionController = {
  getTransaction: async (req, res) => {
    const { transactionHash } = req.body;
    try {
      if (!transactionHash) {
        return res.status(status.BAD_REQUEST).send('transactionHash is missing in the payload');
      }

      const transaction = await provider.getTransaction(transactionHash);
      res.status(status.OK).send(transaction);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading transacton ${transactionHash}`);
    }
  },

  getTransactions: async (req, res) => {
    const { transactionHashes } = req.body;
    try {
      if (!transactionHashes || transactionHashes.length === 0) {
        return res.status(status.BAD_REQUEST).send('transactionHashes is missing in the payload');
      }

      const uniqueTransactionHashes = [...new Set(transactionHashes)];
      const transactionPromise = uniqueTransactionHashes.map((transactionHash) => (provider.getTransaction(transactionHash)));
      const transactions = await Promise.allSettled(transactionPromise);
      res.status(status.OK).send(transactions);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading transactons ${transactionHashes}, ${e.message}`);
    }
  },

  getTransactionReceipt: async (req, res) => {
    const { transactionHash } = req.body;
    try {
      if (!transactionHash) {
        return res.status(status.BAD_REQUEST).send('transactionHash is missing in the payload');
      }

      const transaction = await provider.getTransactionReceipt(transactionHash);
      res.status(status.OK).send(transaction);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading transacton ${transactionHash}, ${e.message}`);
    }
  },

  getTransactionReceipts: async (req, res) => {
    const { transactionHashes } = req.body;
    try {
      if (!transactionHashes || transactionHashes.length === 0) {
        return res.status(status.BAD_REQUEST).send('transactionHashes is missing in the payload');
      }

      const uniqueTransactionHashes = [...new Set(transactionHashes)];
      const transactionPromise = uniqueTransactionHashes.map((transactionHash) => (provider.getTransactionReceipt(transactionHash)));
      const transactions = await Promise.allSettled(transactionPromise);

      //status: QUANTITY either 1 (success) or 0 (failure)
      res.status(status.OK).send(transactions);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading transactons ${transactionHashes}, ${e.message}`);
    }
  },

  getTransactionHashByQrCode: async (req, res, next) => {
    console.log('Receive qr code', req);
    req.body = {
      transactionHash: req.qrCode,
    };
    next();
  }
};