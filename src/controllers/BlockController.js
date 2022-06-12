import status from 'http-status';
import { provider } from './EthProvider.js';

const getBlcockHash = (block) => {
  if (typeof block === 'number') {
    return Number(block);
  }
  return block;
};

export const BlockController = {
  getBlock: async (req, res) => {
    const { block } = req.body;
    try {
      if (!block) {
        return res.status(status.BAD_REQUEST).send('block is missing in the payload.');
      }

      const blockInfo = await provider.getBlock(getBlcockHash(block));
      res.status(status.OK).send(blockInfo);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading block ${block}, ${e.message}`);
    }
  },

  getBlocks: async (req, res) => {
    const { blocks } = req.body;
    try {
      if (!blocks || blocks.length === 0) {
        return res.status(status.BAD_REQUEST).send('blocks is missing in the payload');
      }
      const uniqueBlockHashes = [...new Set(blocks)];
      const transactionPromise = uniqueBlockHashes.map((block) => (provider.getBlock(getBlcockHash(block))));
      const transactions = await Promise.allSettled(transactionPromise);
      res.status(status.OK).send(transactions);
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while reading blocks ${blocks}, ${e.message}`);
    }
  },

  getBlockByQrCode: async (req, res, next) => {
    console.log('Receive qr code', req);
    req.body = {
      block: req.qrCode,
    };
    next();
  }
};