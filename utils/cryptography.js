const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashSha256(message) {
    const bytes = utf8ToBytes(message);
    const hash = sha256(bytes);
    return hash;
}

function hashKeccak256(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
    return hash;
}

/**
 * ECDSA -> secp256k1 curve
 * Private keys are 32 bytes long --> 64 bytes in hex
 *
 * Public keys are 66 bytes (uncompressed form) or 33 bytes (compressed form) long
 * first byte is a prefix --> 130 or 65 bytes in hex
 */
async function signSecp256k1(hash, PRIVATE_KEY) {
    const [signature, recoveryBit] = await secp.sign(hash, PRIVATE_KEY, { recovered: true });
    return [signature, recoveryBit];
}

function recoverPublicKey(hash, signature, recoveryBit) {
    const recovered = secp.recoverPublicKey(hash, signature, recoveryBit);
    return recovered;
}

/**
 * To extract the address from public key
 * remove the first byte that indicates the format of the key, whether it is in the compressed format or not
 * next take the keccak hash of the rest of the public key
 * finally take the last 20 bytes of the keccak hash
 *
 * The ethereum address is 20 bytes --> 40 bytes in hex
 */
function getAddressFromPublicKey(publicKey) {
    if (publicKey.length != 65 && publicKey != 33) throw new Error("Invalid public key");

    const key = publicKey.slice(1);
    const hashKey = keccak256(key);
    const address = hashKey.slice(hashKey.length - 20, key.length);

    return toHex(address);
}

module.exports = {
    hashSha256: hashSha256,
    hashKeccak256: hashKeccak256,
    signSecp256k1: signSecp256k1,
    recoverPublicKey: recoverPublicKey,
    getAddressFromPublicKey: getAddressFromPublicKey,
};
