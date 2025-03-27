const Jimp = require('jimp');

async function hideMessage(imagePath, message, outputPath) {
  const image = await Jimp.read(imagePath);
  const binaryMessage = message.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');

  let messageIndex = 0;
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    if (messageIndex < binaryMessage.length) {
      const bit = binaryMessage[messageIndex];
      image.bitmap.data[idx] = (image.bitmap.data[idx] & 0xFE) | parseInt(bit);
      messageIndex++;
    }
  });

  await image.writeAsync(outputPath);
  return outputPath;
}

async function extractMessage(imagePath, messageLength) {
  const image = await Jimp.read(imagePath);
  let binaryMessage = '';

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    if (binaryMessage.length < messageLength * 8) {
      const lsb = image.bitmap.data[idx] & 1;
      binaryMessage += lsb.toString();
    }
  });

  let message = '';
  for (let i = 0; i < binaryMessage.length; i += 8) {
    const byte = binaryMessage.substr(i, 8);
    message += String.fromCharCode(parseInt(byte, 2));
  }

  return message;
}

module.exports = { hideMessage, extractMessage };