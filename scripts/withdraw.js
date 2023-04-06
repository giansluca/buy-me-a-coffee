const { ethers } = require("hardhat");
const config = require("./config");
const abi = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");

// npx hardhat run scripts/withdraw.js
async function main() {
    const contractAddress = config.contract.address;
    const contractABI = abi.abi;

    const provider = new ethers.providers.InfuraProvider("goerli", config.secret.goerliApiKey);
    const signer = new ethers.Wallet(config.secret.privateKey, provider);
    const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

    const contractBalanceBigInt = await provider.getBalance(buyMeACoffee.address);
    const contractBalance = ethers.utils.formatEther(contractBalanceBigInt);

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
