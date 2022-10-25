const { getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
          })
      })
