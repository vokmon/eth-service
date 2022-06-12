import express from 'express';
import { PriceController } from '../controllers/PriceController.js';

const priceRoutes = express.Router();

priceRoutes.get('/get-eth-price', express.json(), PriceController.getEtherPrice);

priceRoutes.get('/convert-eth-to-currency', express.json(), PriceController.convertEtherToFiat);

priceRoutes.get('/convert-currency-to-eth', express.json(), PriceController.convertFiatToEther);

export default priceRoutes;