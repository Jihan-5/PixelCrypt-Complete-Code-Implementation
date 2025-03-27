const express = require('express');
const { encrypt, decrypt } = require('./crypto/aes');
const { createHmac } = require('./crypto/hmac');
const { hideMessage } = require('./steganography/ImageLSB');
const { storeKeyHash } = require('./Blockchain/KeyManager');

const app = express();
app.use(express.json());

app.post('/encrypt', async (req, res) => {
  const { message, imagePath } = req.body;
  const key = 'your-secret-key-here';
  
  // 1. Encrypt the message
  const { iv, ciphertext } = encrypt(message, key);
  
  // 2. Create HMAC
  const hmac = createHmac(ciphertext, key);
  
  // 3. Store proof on blockchain
  await storeKeyHash('user123', hmac);
  
  // 4. Hide in image
  const outputPath = await hideMessage(imagePath, ciphertext, 'output.png');
  
  res.json({ 
    encrypted: ciphertext,
    hmac,
    stegoImage: outputPath,
    iv 
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));