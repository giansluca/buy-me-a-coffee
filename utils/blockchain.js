const Hex = require("crypto-js/enc-hex");
const SHA256 = require("crypto-js/sha256");

class Blockchain {
    constructor() {
        this.chain = [];
    }

    addBlock(block) {
        let previousHash;
        if (this.chain.length > 0) {
            const previousBlock = this.chain[this.chain.length - 1];
            previousHash = previousBlock.toHash();
        } else {
            previousHash = SHA256("genesis");
        }

        block.previousHash = Hex.stringify(previousHash);
        this.chain.push(block);
    }

    isValid() {
        for (let [index, block] of this.chain.entries()) {
            if (index === this.chain.length - 1) break;

            const blockHash = Hex.stringify(block.toHash());
            const nextBlock = this.chain[index + 1];

            if (blockHash !== nextBlock.previousHash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
