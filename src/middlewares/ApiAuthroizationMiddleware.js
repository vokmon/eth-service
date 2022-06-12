import status from 'http-status';
import dotenv from 'dotenv';
dotenv.config();

// eslint-disable-next-line no-undef
const RAPID_API_SECRET = process.env.RAPID_API_SECRET;
// eslint-disable-next-line no-undef
const APP_SECRET = process.env.APP_SECRET;

const apiAuthroizationMiddleware = async (req, res, next) => {
  const { headers } = req;
  const rapidApiSecret = headers['x-rapidapi-proxy-secret'];
  if (RAPID_API_SECRET === rapidApiSecret) {
    next();
    return;
  }

  const authAppsecret = headers['authorization'];
  if (authAppsecret) {
    const authAppSecretString = authAppsecret.replace('Bearer ', '');
    if (APP_SECRET === authAppSecretString) {
      next();
    return;
    }
  }

  return res.status(status.UNAUTHORIZED).send('Unauthorized request.');
};

export default apiAuthroizationMiddleware;