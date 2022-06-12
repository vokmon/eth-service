import ethers, { BigNumber } from 'ethers';
import status from 'http-status';

const provider = new ethers.providers.EtherscanProvider();

let lastGetPrice = null;
let cachedPrice = 0;

const getEtherPrice = async () => {
  try {
    const currentDate = new Date();
    if (lastGetPrice === null || (currentDate - lastGetPrice) > 1000 * 60 * 1) {
      const price = await provider.getEtherPrice();
      console.log(`Ether price in USD: ${price}`);
      cachedPrice = price;
      lastGetPrice = currentDate;
    } else {
      console.log('Get price from cache');
    }
  } catch (e) {
    console.log('An error occur, get price from cache', e);
  }
  return cachedPrice;
};

const oneWei = ethers.utils.parseUnits('1', 'ether');

const etherUnits = [
  'wei',
  'kwei',
  'mwei',
  'gwei',
  'szabo',
  'finney',
  'ether',
];

export const PriceController = {
  getEtherPrice: async (_req, res) => {
    try {
      const price = await getEtherPrice();
      return res.status(status.OK).send({
        priceInUsd: price,
      });
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while getting eth price, ${e.message}`);
    }
  },

  convertEtherToFiat: async (req, res) => {
    const { amount, ethUnit } = req.body;
    const etherUnit = ethUnit || 'ether';

    if (!etherUnits.includes(etherUnit)) {
      return res.status(status.BAD_REQUEST).send(`Invalid unit. The unit must be one of [${etherUnits.join(', ')}]`);
    }

    if (amount === null || amount === undefined) {
      return res.status(status.BAD_REQUEST).send('amount of ether is missing in the payload.');
    }

    try {
      const etherValue = ethers.utils.parseUnits(String(amount), etherUnit);
      const price = await getEtherPrice();
      const priceInCentBigInt = BigNumber.from(Number(price) * 100);
      console.log(`Ether to convert: ${etherValue}, Price in cent: ${priceInCentBigInt}`);

      const convertedPrice = priceInCentBigInt.mul(etherValue).div(oneWei);
      console.log(`Convert price in cents ${convertedPrice}`);
      const priceInUsd = Number(convertedPrice.toString()) / 100;
      return res.status(status.OK).send({
        priceInUsd,
        etherPrice: String(price),
      });
    } catch (e) {
      console.error(e);
      return res.status(status.INTERNAL_SERVER_ERROR).send(`An error occur while getting eth price, ${e.message}`);
    }

  },

  convertFiatToEther: async (req, res) => {
    const { amountInUsd } = req.body;
    const price = await getEtherPrice();
    const priceInCentBigInt = Number(price) * 100;
    const amountInCent = Math.round((Number(amountInUsd) + Number.EPSILON) * 100) / 100 * 100;
    const convertedEther = amountInCent / priceInCentBigInt;
    return res.status(status.OK).send({
      etherValue: convertedEther,
      etherPrice: String(price),
    });
  }
};
