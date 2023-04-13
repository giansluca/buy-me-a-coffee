const { expect } = require("chai");
const { faker } = require("@faker-js/faker");
const SHA256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const Block = require("../../utils/Block");

describe("Block", function () {
    it("should hash some random data", function () {
        // Given
        const data = { email: faker.internet.email() };
        const previousHash = SHA256("previousBlockData");
        const expectedBlockHash = SHA256(Hex.stringify(previousHash) + JSON.stringify(data));

        // When
        const block = new Block(data);
        block.previousHash = previousHash;

        // Then
        expect(/^[0-9A-F]{64}$/i.test(block.toHash())).to.be.true;
        expect(Hex.stringify(expectedBlockHash)).to.be.equal(Hex.stringify(block.toHash()));
    });
});
