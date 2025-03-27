const CryptoJS = require('crypto-js');

const encrypt = (plaintext, key) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const ciphertext = CryptoJS.AES.encrypt(plaintext, key, { 
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return {
    iv: iv.toString(CryptoJS.enc.Hex),
    ciphertext: ciphertext.toString()
  };
};

const decrypt = (ciphertext, key, iv) => {
  const decrypted = CryptoJS.AES.decrypt(
    ciphertext,
    key,
    { iv: CryptoJS.enc.Hex.parse(iv) }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };