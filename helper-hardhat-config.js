// VRF V2 https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/

const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", //https://docs.chain.link/docs/vrf/v2/subscription/supported-networks/
        subscriptionId: "0",
        callbackGasLimit: "500000",
        interval: 30,
    },
    31337: {
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // using mocks, so don't really care
        callbackGasLimit: "500000",
        interval: 30,
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
}
