const { network, ethers } = require("hardhat")
const {
    contractAbiFile,
    contractAddressesFile,
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
    const Youtube = await ethers.getContract("Youtube")

    fs.writeFileSync(
        contractAbiFile,
        (await Youtube).interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const chainId = await network.config.chainId.toString()
    const Youtube = await ethers.getContract("Youtube")
    const contractAddresses = await JSON.parse(
        fs.readFileSync(contractAddressesFile, "utf8")
    )
    if (chainId in contractAddresses) {
        console.log(`contract Address ${Youtube.address}`)

        if (!contractAddresses[chainId].includes(Youtube.address)) {
            contractAddresses[chainId].push(Youtube.address)
        }
    } else {
        console.log(`contract Address ${(await Youtube).address}`)
        contractAddresses[chainId] = [Youtube.address]
    }
    fs.writeFileSync(contractAddressesFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
