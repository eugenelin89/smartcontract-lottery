const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { contractSizer } = require("../../hardhat.config")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              //
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  // enter the raffle
                  const startingTimeStamp = await raffle.getLastTimeStamp()
                  const accounts = await ethers.getSigners()

                  await new Promise(async (resolve, reject) => {
                      //
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event detected")
                          // 0.305602378608004596 Ether <- starting
                          // 0.315602378608004596 Ether <- Ending

                          try {
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = raffle.getLastTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(raffleEntranceFee).toString()
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })
                      console.log("Enter Raffle and set up winnerStartingBalance")
                      const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                      await tx.wait(1)
                      const winnerStartingBalance = await accounts[0].getBalance()
                      console.log("Starting Balance: " + winnerStartingBalance.toString())
                      // this code won't complete until listener finished listening!
                  })
              })
          })
      })
