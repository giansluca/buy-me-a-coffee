const { expect } = require("chai");
const { faker } = require("@faker-js/faker");
const SHA256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");
const Block = require("../../utils/block");

describe("Block", function () {
    it("should have a hash property", function () {
        // Given
        const newBlock = new Block();

        // When
        const hash = newBlock.toHash();

        // Then
        expect(/^[0-9A-F]{64}$/i.test(hash)).to.be.true;
    });

    it("should hash some random data", function () {
        // Given
        const randomEmail = faker.internet.email();

        // When
        const myHash = SHA256(randomEmail);
        const yourHash = new Block(randomEmail).toHash();

        // Then
        expect(Hex.stringify(myHash)).to.be.equal(Hex.stringify(yourHash));
    });
});
