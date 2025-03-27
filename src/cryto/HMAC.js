const CryptoJS = require('crypto-js');

const createHmac = (data, key) => {
  return CryptoJS.HmacSHA256(data, key).toString();
};

const verifyHmac = (data, key, hmac) => {
  return createHmac(data, key) === hmac;
};

module.exports = { createHmac, verifyHmac };