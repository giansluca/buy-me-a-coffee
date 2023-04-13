const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(data) {
        this.data = data;
    }

    toHash() {
        if (this.previousHash) return SHA256(this.previousHash + JSON.stringify(this.data));
        else return SHA256(JSON.stringify(this.data));
    }
}

module.exports = Block;
