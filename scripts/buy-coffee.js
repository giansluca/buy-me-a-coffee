const { ethers } = require("hardhat");

// Return the Ether balance for a given address
async function getBalance(address) {
    const balanceBigInt = await ethers.provider.getBalance(address);
    return ethers.formatEther(balanceBigInt);
}

// Logs the Ether balance for a list of addresses
async function printBalance(addresses) {
    let idx = 0;

    for (const address of addresses) {
        const balance = await getBalance(address);
        console.log(`Address: ${idx} - balance: ${balance}`);
        idx++;
    }
}

// Logs the memos stored on-chain from coffee purchases
function printMemos(memos) {
    for (const memo of memos) {
        const date = new Date(Number(memo.timestamp));
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;

        console.log(`At ${date}, ${tipper} (${tipperAddress}) said: "${message}"`);
    }
}

// npx hardhat run scripts/buy-coffee.js
async function main() {
    // Get example accounts
    const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();

    // Get the contract to deploy and deploy
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();

    const contractAddress = await buyMeACoffee.getAddress();
    console.log(`BuyMeACoffee deployed to: ${contractAddress}`);

    // Check balance before coffee purchase
    const addresses = [owner.address, tipper1.address, contractAddress];
    console.log("== start ==");
    await printBalance(addresses);

    // Buy to owner few coffee
    const tip = { value: ethers.parseEther("1") };
    await buyMeACoffee.connect(tipper1).buyCoffee("Carolina", "You are the best!", tip);
    await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing teacher :)", tip);
    await buyMeACoffee.connect(tipper3).buyCoffee("Maccio", "I love my proof of knowledge NFT", tip);

    // Check balance after coffee purchase
    console.log("== bought coffee  ==");
    await printBalance(addresses);

    // Withdraw founds
    await buyMeACoffee.connect(owner).withdrawTips();

    // Check balance after withdraw
    console.log("== withdraw tips  ==");
    await printBalance(addresses);

    // Read all the memos left form the owner
    console.log("== memos ==");
    const memos = await buyMeACoffee.getMemos();
    printMemos(memos);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
