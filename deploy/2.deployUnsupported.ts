import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import verify from '../utils/verify'

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
  console.log('deployL2 hre.network.name', hre.network.name)

  const { deployments, getNamedAccounts, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const UnsupportedProtocol = await deploy('UnsupportedProtocol', {
    from: deployer,
    args: [],
    log: true,
  })
  log('UnsupportedProtocol', UnsupportedProtocol.address)

  // Verify the deployment
  if (network.name != 'hardhat') {
    log('Verifying...')
    await verify(UnsupportedProtocol.address, [])
  }
}
export default deployContract
deployContract.tags = ['UnsupportedProtocol']
