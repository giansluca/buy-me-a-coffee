const { ethers } = require("hardhat");

// npx hardhat run scripts/deploy.js  --network goerli
async function main() {
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    const contractAddress = await buyMeACoffee.getAddress();

    console.log(`BuyMeACoffee deployed to: ${contractAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
