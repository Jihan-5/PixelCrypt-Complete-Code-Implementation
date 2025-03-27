const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/YOUR_INFURA_KEY');

const contractABI = [/* Your KeyVault ABI */];
const contractAddress = '0x...';

const keyVault = new web3.eth.Contract(contractABI, contractAddress);

async function storeKeyHash(userId, keyHash) {
  const accounts = await web3.eth.getAccounts();
  await keyVault.methods.storeHash(userId, keyHash)
    .send({ from: accounts[0], gas: 300000 });
}

async function retrieveKeyHash(userId) {
  return await keyVault.methods.getHash(userId).call();
}

module.exports = { storeKeyHash, retrieveKeyHash };