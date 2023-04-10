const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("BuyMeACoffee", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBuyMeACoffee() {
        // Contracts are deployed using the first signer/account by default
        const [owner, tipper1] = await ethers.getSigners();

        const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
        const buyMeACoffee = await BuyMeACoffee.deploy();
        await buyMeACoffee.deployed();

        return { buyMeACoffee, owner, tipper1 };
    }

    describe("Deployment", function () {
        it("Should deploy", async function () {
            // Given
            const { buyMeACoffee } = await loadFixture(deployBuyMeACoffee);
            const contractAddress = buyMeACoffee.address;

            // When
            const balanceBigInt = await ethers.provider.getBalance(contractAddress);
            const balance = ethers.utils.formatEther(balanceBigInt);
            const memos = await buyMeACoffee.getMemos();

            // Then
            expect(Number(balance)).to.equal(0.0);
            expect(memos).to.be.an("array").that.is.empty;
            expect(memos).to.have.lengthOf(0);
        });
    });

    describe("BuyCoffee", function () {
        it("Should send ether and memo to contract", async function () {
            // Given
            const { buyMeACoffee, tipper1 } = await loadFixture(deployBuyMeACoffee);
            const contractAddress = buyMeACoffee.address;

            // When
            const tip = { value: ethers.utils.parseEther("1.5") };
            await buyMeACoffee.connect(tipper1).buyCoffee("Carolina", "You are the best!", tip);

            const balanceBigInt = await ethers.provider.getBalance(contractAddress);
            const balance = ethers.utils.formatEther(balanceBigInt);
            const memos = await buyMeACoffee.getMemos();

            // Then
            expect(balance).to.equal("1.5");
            expect(memos).to.have.lengthOf(1);
        });

        it("Should withdraw founds", async function () {
            // Given
            const { buyMeACoffee, owner, tipper1 } = await loadFixture(deployBuyMeACoffee);
            const contractAddress = buyMeACoffee.address;

            const ownerBalanceBigIntBefore = await ethers.provider.getBalance(owner.address);
            const ownerBalanceBefore = ethers.utils.formatEther(ownerBalanceBigIntBefore);
            console.log("Owner balance before", ownerBalanceBefore);

            const tip = { value: ethers.utils.parseEther("0.7") };
            await buyMeACoffee.connect(tipper1).buyCoffee("Vitto", "Amazing teacher :)", tip);
            const balanceBigIntBefore = await ethers.provider.getBalance(contractAddress);
            const balanceBefore = ethers.utils.formatEther(balanceBigIntBefore);
            console.log("Contract balance before", balanceBefore);

            // When
            await buyMeACoffee.connect(owner).withdrawTips();

            const ownerBalanceBigIntAfter = await ethers.provider.getBalance(owner.address);
            const ownerBalanceAfter = ethers.utils.formatEther(ownerBalanceBigIntAfter);
            console.log("Owner balance after", ownerBalanceAfter);

            const balanceBigIntAfter = await ethers.provider.getBalance(contractAddress);
            const balanceAfter = ethers.utils.formatEther(balanceBigIntAfter);
            console.log("Contract balance after", balanceAfter);

            expect(balanceBefore).to.equal("0.7");
            expect(balanceAfter).to.equal("0.0");
        });
    });
});
