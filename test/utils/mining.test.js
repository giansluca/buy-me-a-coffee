const SHA256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");

const { expect } = require("chai");
const { addTransaction, mine, mempool, blocks, TARGET_DIFFICULTY } = require("../../utils/mining");

describe("Mining", function () {
    beforeEach(function () {
        mempool.length = 0;
        blocks.length = 0;
    });
    describe("Add Transaction", function () {
        it("should add the transaction to the mempool", function () {
            // Given
            const transaction = { to: "bob", sender: "alice" };

            // When
            addTransaction(transaction);

            // Then
            expect(mempool).to.have.lengthOf(1);
            expect(mempool[0]).to.be.equal(transaction);
        });
    });
    describe("Add Block", function () {
        it("should store one block", function () {
            // Given
            const transaction = { to: "bob", sender: "alice" };
            addTransaction(transaction);

            // When
            mine();
            const lastBlock = blocks[blocks.length - 1];
            const blockHash = Hex.stringify(lastBlock.hash);
            const isLess = BigInt(`0x${blockHash}`) < TARGET_DIFFICULTY;

            // Then
            expect(blocks).to.have.lengthOf(1);
            expect(lastBlock.id).to.be.equal(0);
            expect(isLess).to.be.true;
        });
        it("should store 5 transactions in a block", function () {
            // Given
            for (let i = 0; i < 5; i++) {
                addTransaction({ to: `mark-${i}`, sender: `jesus-${i}` });
            }

            // When
            mine();
            const lastBlock = blocks[blocks.length - 1];
            const blockHash = Hex.stringify(lastBlock.hash);
            const isLess = BigInt(`0x${blockHash}`) < TARGET_DIFFICULTY;

            // Then
            expect(isLess).to.be.true;
            expect(blocks).to.have.lengthOf(1);
            expect(lastBlock.transactions).to.have.lengthOf(5);
            expect(mempool).to.have.lengthOf(0);
        });
        it("should store 15 transactions in two blocks", function () {
            // Given
            let lastBlock;
            let blockHash;
            let isLess;

            for (let i = 0; i < 15; i++) {
                addTransaction({ to: `tom-${i}`, sender: `jacob-${i}` });
            }

            // When - mining first time
            mine();
            lastBlock = blocks[blocks.length - 1];
            blockHash = Hex.stringify(lastBlock.hash);
            isLess = BigInt(`0x${blockHash}`) < TARGET_DIFFICULTY;

            // Then - mining second time
            expect(isLess).to.be.true;
            expect(blocks).to.have.lengthOf(1);
            expect(lastBlock.transactions).to.have.lengthOf(10);
            expect(mempool).to.have.lengthOf(5);

            // When - mining second time
            mine();
            lastBlock = blocks[blocks.length - 1];
            blockHash = Hex.stringify(lastBlock.hash);
            isLess = BigInt(`0x${blockHash}`) < TARGET_DIFFICULTY;

            expect(isLess).to.be.true;
            expect(blocks).to.have.lengthOf(2);
            expect(lastBlock.transactions).to.have.lengthOf(5);
            expect(mempool).to.have.lengthOf(0);
        });
    });
});
