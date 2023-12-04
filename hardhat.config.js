require("@nomicfoundation/hardhat-toolbox");
require("solidity-coverage");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
  solidity: "0.8.19",
  networks: {},
};

// Check network to use
if (process.env.FUJI_URL_PROVIDER && process.env.FUJI_URL_PROVIDER != "")
  config.networks.mainnet = {
    url: process.env.FUJI_URL_PROVIDER,
  };
if (process.env.MUMBAI_URL_PROVIDER && process.env.MUMBAI_URL_PROVIDER != "")
  config.networks.mainnet = {
    url: process.env.MUMBAI_URL_PROVIDER,
  };

module.exports = config;
