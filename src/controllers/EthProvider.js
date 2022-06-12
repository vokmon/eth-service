/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

const ETHER_SCAN_KEY = process.env.ETHER_SCAN_KEY;
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;

// Use the mainnet
const network = 'homestead';
export const provider = ethers.getDefaultProvider(network, {
  etherscan: ETHER_SCAN_KEY,
  infura: INFURA_PROJECT_ID
});
