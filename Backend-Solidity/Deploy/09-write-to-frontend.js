const { network, ethers } = require("hardhat")
const {
    contractAbiFile,
    contractAddressFile,
} = require("../helper-hardhat-config")
const fs = require("fs")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateContractAbi()
        console.log("Front end written!")
    }
}

async function updateContractAbi() {
    const Youtube = ethers.getContract("Youtube")
    fs.writeFileSync(
        contractAbiFile,
        (await Youtube).interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const Youtube = await ethers.getContract("Youtube")
    console.log(Youtube)
    const contractAddresses = JSON.parse(
        fs.readFileSync(contractAddressFile, "utf8")
    )
    const chainId = await network.config.chainId.toString()
    console.log("ChainId", chainId)
    if (chainId in contractAddresses) {
        console.log(`contract Address ${Youtube.address}`)

        if (!contractAddresses[chainId].includes(Youtube.address)) {
            contractAddresses[chainId].push(Youtube.address)
        }
    } else {
        console.log(`contract Address ${(await Youtube).address}`)
        contractAddresses[chainId] = [Youtube.address]
    }
    fs.writeFileSync(contractAddressFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
