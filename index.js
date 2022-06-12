import dotenv from 'dotenv';
import express from 'express';
import status from 'http-status';
import transactionRoutes from './src/routes/TransactionRoutes.js';
import blockRoutes from './src/routes/BlockRoutes.js';
import priceRoutes from './src/routes/PriceRoutes.js';
import apiAuthroizationMiddleware from './src/middlewares/ApiAuthroizationMiddleware.js';

dotenv.config();
const app = express(); // create express app

// app.get('/', (req, res) => {
//   res.send('This is from express.js');
// });

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.status(status.OK).send('ok');
});

app.use('/transaction', apiAuthroizationMiddleware, transactionRoutes);
app.use('/block', apiAuthroizationMiddleware, blockRoutes);
app.use('/price', apiAuthroizationMiddleware, priceRoutes);

// start express server on port 5000
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
