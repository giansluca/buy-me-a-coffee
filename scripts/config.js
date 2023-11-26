const ENV = process.env.ENV || "dev";
if (ENV !== "prod") {
    require("dotenv").config();
}

const pkg = require("../package");

const config = {
    env: process.env.ENV || "local",
    app: {
        name: process.env.APP_NAME || "buy-me-a-coffee",
        version: pkg.version,
        commit: process.env.APP_COMMIT,
    },
    secret: {
        accountPrivateKey: process.env.ACCOUNT_PRIVATE_KEY,
        providerUrl: process.env.PROVIDER_URL,
        providerApiKey: process.env.PROVIDER_API_KEY,
    },
    contract: {
        address: process.env.CONTRACT_ADDRESS,
    },
};

module.exports = config;
