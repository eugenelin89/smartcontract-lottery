const { ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK per request.
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain. link per gas.
// Chainlink nodes pays gas to give us randomness. They are the ones calling the functions in our smart contract.
// So they price requests based on price of gas.

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected. Deploying mocks...")
        // deploy mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocs deployed")
        log("----------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
