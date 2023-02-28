const networkconfig = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
}

const developmentChains = ["hardhat", "localhost"]
const contractAbiFile = "../Frontend/pages/Constants/ContractAbi.json"
const contractAddressesFile =
    "../Frontend/pages/Constants/ContractAddresses.json"
const VERIFICATION_BLOCK_CONFIRMATIONS = 1

module.exports = {
    networkconfig,
    developmentChains,
    contractAddressesFile,
    contractAbiFile,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}
