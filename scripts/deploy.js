const { ethers } = require("hardhat");

// npx hardhat run scripts/deploy.js  --network goerli
async function main() {
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();

    console.log(`BuyMeACoffee deployed to: ${buyMeACoffee.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
