
import hre from 'hardhat'
import fs from 'fs'
const run = hre.run
const chainName = hre.network.name

let data = JSON.parse(fs.readFileSync(`deployed.uniswap.${chainName}.json`).toString())

const main = async () => {
    const chainId = hre.network.config.chainId;
    const accounts = await hre.ethers.getSigners();
    const providers = hre.ethers.provider;
    let deployer = accounts[0];
    console.log(chainId);

    await hre.network.provider.send("hardhat_impersonateAccount", [
      "0x2d45Af0a92a0AC16eD063956d965295a6457461f",
    ]);
    console.log(deployer.address);
    deployer = await hre.ethers.getSigner(
      "0x2d45Af0a92a0AC16eD063956d965295a6457461f"
    );
    console.log(deployer.address);
    console.log('ETH_balance:', await providers.getBalance(deployer.address));
    await hre.network.provider.send("hardhat_setBalance", [
      "0x2d45Af0a92a0AC16eD063956d965295a6457461f",
      "0x10000000000000000000000000",
    ]);
    console.log('ETH_balance:', await providers.getBalance(deployer.address));

}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
