const { ethers } = require("hardhat");
const config = require("./config");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

// npx hardhat run scripts/withdraw.js
async function main() {
    const contractAddress = config.contract.address;
    const contractABI = abi.abi;

    const provider = new ethers.InfuraProvider("goerli", config.secret.providerApiKey);
    const signer = new ethers.Wallet(config.secret.accountPrivateKey, provider);
    const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

    const contractBalanceBigInt = await provider.getBalance(contractAddress);
    const contractBalance = ethers.formatEther(contractBalanceBigInt);

    if (contractBalance !== "0.0") {
        console.log("withdrawing funds...");
        const withdrawTxn = await buyMeACoffee.withdrawTips();
        await withdrawTxn.wait();
    } else {
        console.log("no funds to withdraw!");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
