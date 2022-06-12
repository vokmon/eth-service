import dotenv from 'dotenv';
import express from 'express';
import status from 'http-status';
import transactionRoutes from './src/routes/TransactionRoutes.js';
import blockRoutes from './src/routes/BlockRoutes.js';
import priceRoutes from './src/routes/PriceRoutes.js';

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

app.use('/transaction', transactionRoutes);
app.use('/block', blockRoutes);
app.use('/price', priceRoutes);

// start express server on port 5000
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
