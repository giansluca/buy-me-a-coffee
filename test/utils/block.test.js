const { expect } = require("chai");
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
});
