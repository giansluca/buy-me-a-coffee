const { ethers } = require("hardhat");
const config = require("./config");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

// npx hardhat run scripts/contractInfo.js
async function main() {
    const contractAddress = config.contract.address;
    const contractABI = abi.abi;

    const provider = new ethers.providers.InfuraProvider("goerli", config.secret.goerliApiKey);
    const signer = new ethers.Wallet(config.secret.privateKey, provider);
    const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

    const contractBalanceBigInt = await provider.getBalance(buyMeACoffee.address);
    const contractBalance = ethers.utils.formatEther(contractBalanceBigInt);
    console.log(`contract address: ${contractAddress}, balance: ${contractBalance}`);

    const signerBalanceBigInt = await provider.getBalance(signer.address);
    const signerBalance = ethers.utils.formatEther(signerBalanceBigInt);
    console.log(`signer address: ${signer.address}, balance: ${signerBalance}`);

    const memos = await buyMeACoffee.getMemos();
    console.log(`memos: ${memos.length}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
