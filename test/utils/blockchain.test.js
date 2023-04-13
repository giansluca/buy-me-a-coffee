const { expect } = require("chai");
const Hex = require("crypto-js/enc-hex");
const Blockchain = require("../../utils/Blockchain");
const Block = require("../../utils/Block");

describe("Blockchain", function () {
    it("should have a genesis block", function () {
        // Given
        const blockchain = new Blockchain();
        const genesisBlock = new Block("Some data");

        // When
        const { chain } = blockchain;
        blockchain.addBlock(genesisBlock);

        // Then
        expect(chain).has.length(1);
        expect(genesisBlock).to.be.not.null;
        expect(genesisBlock).to.be.instanceof(Block);
    });

    it("should add new blocks", function () {
        // Given
        const blockchain = new Blockchain();
        const genesisBlock = new Block("Some data");
        const block1 = new Block("Some other data");

        // When
        const { chain } = blockchain;
        blockchain.addBlock(genesisBlock);
        blockchain.addBlock(block1);

        // Then
        expect(chain).has.length(2);
    });

    it("should a new block to our blockchain", function () {
        // Given
        const blockchain = new Blockchain();
        const genesisBlock = new Block(4);
        const block1 = new Block(5);

        // When
        blockchain.addBlock(genesisBlock);
        blockchain.addBlock(block1);

        // Then
        expect(block1.previousHash).to.be.equal(Hex.stringify(genesisBlock.toHash()));
    });

    it("should alter the genesis hash", () => {
        // Given
        const blockchain = new Blockchain();
        const genesisBlock = new Block(5);
        const block1 = new Block(5);
        blockchain.addBlock(genesisBlock);
        blockchain.addBlock(block1);

        expect(block1.previousHash).to.be.equal(Hex.stringify(genesisBlock.toHash()));

        // When
        genesisBlock.data = 10;

        // Then
        expect(block1.previousHash).to.be.not.equal(Hex.stringify(genesisBlock.toHash()));
    });
});
