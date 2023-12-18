const { ethers } = require('ethers');
const contractabi = require('./contractabi.json')

function initialize() {
  // Replace these values with your own private key 
  const privateKey = process.env.YOUR_PRIVATE_KEY;

  // Replace this with the contract ABI and address
  const contractABI = contractabi; // Your ERC-20 contract ABI
  const contractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
 
  // Connect to the Ethereum network
  const provider = new ethers.providers.JsonRpcProvider(`https://bnbsmartchain-testnet.infura.io/v3/${process.env.YOUR_INFURA_URL}`);
  console.log(provider);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Connect to the ERC-20 contract
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  return { wallet, contract };
}

// Function to transfer tokens
async function transferTokens(address, amount) {
  const { wallet, contract } = initialize();

  try {
    // Replace gasPrice and gasLimit with appropriate values
    const tx = await contract.transfer(address, amount, {
      gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      gasLimit: 200000, // Replace with an appropriate gas limit
    });

    // Wait for the transaction to be mined
    await tx.wait();

    console.log('Transaction hash:', tx.hash);
    console.log('Tokens transferred successfully!');
  } catch (error) {
    console.error('Error transferring tokens:', error.message);
    // Add more detailed error handling here
    throw error; // Rethrow the error to propagate it to the caller
  }
}

module.exports = { transferTokens };
