// import { HardhatRuntimeEnvironment } from 'hardhat/types'
// import { ethers } from 'hardhat'
// import { DeployFunction } from 'hardhat-deploy/types'
// import verify from '../utils/verify'

// const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
//   console.log('deployL2 hre.network.name', hre.network.name)
//   const { deployer } = await hre.getNamedAccounts()
//   const { deploy } = hre.deployments
//   console.log('deployer', deployer)
//   //==== UniswapV3Factory =================================
//   const Permit2 = await deploy('Permit2', {
//     from: deployer,
//     args: [],
//     log: true,
//     deterministicDeployment: '0x00000000000000000000000000000000000000005eb67581652632000a6cbedf',
//   })
//   console.log('Permit2', Permit2.address)

//   //==== verify =================================

//   // if (hre.network.name != "hardhat") {
//   //     await hre.run("etherscan-verify", {
//   //         network: hre.network.name
//   //     });
//   // }
//   if (hre.network.name != 'hardhat') {
//     console.log('Verifying...')
//     await verify(Permit2.address, [])
//   }
// }

// export default deployContract
// deployContract.tags = ['Permit2']
