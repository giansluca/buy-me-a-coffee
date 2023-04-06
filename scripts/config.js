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
        privateKey: process.env.PRIVATE_KEY,
        goerliUrl: process.env.GOERLI_URL,
        goerliApiKey: process.env.GOERLI_API_KEY,
    },
    contract: {
        address: process.env.CONTRACT_ADDRESS,
    },
};

module.exports = config;
