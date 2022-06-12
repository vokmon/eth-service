import status from 'http-status';
import fs from 'fs';
import Jimp from 'jimp';
import QrCode from 'qrcode-reader';

const readQrCode = (image) => {
  return new Promise((resolve, reject) => {
    const qr = new QrCode();
    qr.callback = (err, value) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(value);
    };
    qr.decode(image.bitmap);
  });
};

const qrCodeReaderMiddleware = async (req, res, next) => {
  try {
    console.log('receive file', req.file);
    const buffer = fs.readFileSync(req.file.path);
    const image = await Jimp.read(buffer);
    // console.log(image);
    const qrCode = await readQrCode(image);
    // console.log(qrCode);
    req.qrCode = qrCode.result;
    next();
  } catch (e) {
    console.error(e);
    res.status(status.INTERNAL_SERVER_ERROR).send(`The provided image does not contain qr code, ${e.message}`);
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

export default qrCodeReaderMiddleware;