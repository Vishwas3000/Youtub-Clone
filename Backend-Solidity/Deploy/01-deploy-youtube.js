const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const hre = require("hardhat")

const BLOCK_CONFIRMATION = VERIFICATION_BLOCK_CONFIRMATIONS

module.exports = async (hre) => {
    const { getNamedAccounts, deployments } = hre
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    const chainId = network.config.chainId

    const contract = await deploy("Youtube", {
        from: deployer,
        log: true,
        arg: [],
        waitConfirmations: BLOCK_CONFIRMATION,
    })

    log(`youtube address ${contract.address}`)

    if (!developmentChains.includes(network.name)) {
        log("Verifying...")

        await verify(contract.address, [])
    }
}

module.exports.tags = ["all", "deploy"]
