const SHA256 = require("crypto-js/sha256");
const Hex = require("crypto-js/enc-hex");

const TARGET_DIFFICULTY = BigInt("0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    const block = { id: null, transactions: [] };

    for (let i = 0; i < MAX_TRANSACTIONS; i++) {
        if (mempool.length == 0) break;

        const transaction = mempool.shift();
        block.transactions.push(transaction);
    }

    block.id = blocks.length;
    const hash = findHash(block);
    block.hash = hash;

    blocks.push(block);
}

function findHash(block) {
    let nonce = 0;
    let hash = null;
    let isLess = false;

    while (!isLess) {
        block.nonce = nonce;
        hash = SHA256(JSON.stringify(block));
        const hexHash = Hex.stringify(hash);

        isLess = BigInt(`0x${hexHash}`) < TARGET_DIFFICULTY;
        nonce++;
    }

    console.log(`Found with nonce: ${nonce}`, Hex.stringify(hash));
    return hash;
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool,
};
