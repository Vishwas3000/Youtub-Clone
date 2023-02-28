const networkConfig = {
    5: {
        name: "goerli",
    },
    31337: {
        name: "hardhat",
    },
}

const developmentChains = ["hardhat", "Localhost"]
const contractAbiFile = "../Frontend/pages/Constants/ContractAbi.js"
const contractAddressesFile = "../Frontend/pages/Constants/ContractAddresses.js"

module.exports = {
    networkConfig,
    developmentChains,
    contractAddressesFile,
    contractAbiFile,
}
