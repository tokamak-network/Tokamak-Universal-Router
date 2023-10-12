import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import verify from '../utils/verify'

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('deployL2 hre.network.config.chainId', hre.network.config.chainId)
  console.log('deployL2 hre.network.name', hre.network.name)
  const Permit2Json = await import(`../deployments/${hre.network.name}/Permit2.json`)
  const UnsupportedProtocolJson = await import(`../deployments/${hre.network.name}/UnsupportedProtocol.json`)
  const permit2Address = Permit2Json.address
  const unsupportedProtocolAddress = UnsupportedProtocolJson.address
  ////////////FactoryAddress
  const v3FactoryAddress = '0x8C2351935011CfEccA4Ea08403F127FB782754AC'
  ///////////////////////////
  console.log('permit2Address', permit2Address)
  console.log('unsupportedProtocolAddress', unsupportedProtocolAddress)

  const { deployments, getNamedAccounts, network } = hre
  const { deploy, log } = deployments
  console.log('what')
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const args = [
    {
      permit2: permit2Address,
      weth9: '0x4200000000000000000000000000000000000006',
      steth: unsupportedProtocolAddress,
      wsteth: unsupportedProtocolAddress,
      seaportV1_5: unsupportedProtocolAddress,
      seaportV1_4: unsupportedProtocolAddress,
      openseaConduit: unsupportedProtocolAddress,
      nftxZap: unsupportedProtocolAddress,
      x2y2: unsupportedProtocolAddress,
      foundation: unsupportedProtocolAddress,
      sudoswap: unsupportedProtocolAddress,
      elementMarket: unsupportedProtocolAddress,
      nft20Zap: unsupportedProtocolAddress,
      cryptopunks: unsupportedProtocolAddress,
      looksRareV2: unsupportedProtocolAddress,
      routerRewardsDistributor: unsupportedProtocolAddress,
      looksRareRewardsDistributor: unsupportedProtocolAddress,
      looksRareToken: unsupportedProtocolAddress,
      v2Factory: unsupportedProtocolAddress,
      v3Factory: v3FactoryAddress,
      pairInitCodeHash: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
      poolInitCodeHash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
    },
  ]
  console.log('what')
  const abiEncodedParameterArgument = ethers.utils.defaultAbiCoder.encode(
    [
      'tuple(address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, address, bytes32, bytes32)',
    ],
    [
      [
        '0x768569Ba5994B73c51a5F9F7240a509157D8d00B',
        '0x4200000000000000000000000000000000000006',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x0e8020BF0cd65959E04880c858f5b0A5ed2A0Ed8',
        '0x8C2351935011CfEccA4Ea08403F127FB782754AC',
        '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
        '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
      ],
    ]
  )
  console.log(abiEncodedParameterArgument)

  const UniversalRouter = await deploy('UniversalRouter', {
    from: deployer,
    args: args,
    log: true,
  })

  log('UniversalRouter', UniversalRouter.address)

  // Verify the deployment
  if (network.name != 'hardhat') {
    log('Verifying...')
    await verify(UniversalRouter.address, args)
  }
}
export default deployContract
deployContract.tags = ['UniversalRouter']
