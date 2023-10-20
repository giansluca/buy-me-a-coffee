require("@nomicfoundation/hardhat-toolbox");

const config = require("./scripts/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        goerli: {
            url: config.secret.goerliUrl,
            accounts: [config.secret.privateKey],
        },
    },
};
