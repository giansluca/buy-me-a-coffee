const Hex = require("crypto-js/enc-hex");

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
            previousHash = "genesis";
        }

        block.previousHash = previousHash != null ? Hex.stringify(previousHash) : null;
        this.chain.push(block);
    }
}

module.exports = Blockchain;
