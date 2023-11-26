const { ethers } = require("hardhat");
const config = require("./config");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

// npx hardhat run scripts/contractInfo.js
async function main() {
    const contractAddress = config.contract.address;
    const contractABI = abi.abi;

    const provider = new ethers.InfuraProvider("goerli", config.secret.providerApiKey);
    const signer = new ethers.Wallet(config.secret.accountPrivateKey, provider);
    const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

    const contractBalanceBigInt = await provider.getBalance(contractAddress);
    const contractBalance = ethers.formatEther(contractBalanceBigInt);
    console.log(`contract address: ${contractAddress}, balance: ${contractBalance}`);

    const signerBalanceBigInt = await provider.getBalance(signer.address);
    const signerBalance = ethers.formatEther(signerBalanceBigInt);
    console.log(`signer address: ${signer.address}, balance: ${signerBalance}`);

    const memos = await buyMeACoffee.getMemos();
    console.log(`memos: ${memos.length}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
