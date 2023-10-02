import hre from 'hardhat'
import fs from 'fs'
const run = hre.run
const chainName = hre.network.name

let data = JSON.parse(fs.readFileSync(`deployed.uniswap.${chainName}.json`).toString())

const main = async () => {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: data['Permit2'],
      constructorArguments: [],
    })
    await run('verify:verify', {
      address: data['UnsupportedProtocol'],
      constructorArguments: [],
    })
    await run('verify:verify', {
      address: data['UniversalRouter'],
      constructorArguments: [
        {
          permit2: data['Permit2'],
          weth9: '0x4200000000000000000000000000000000000006',
          steth: data['UnsupportedProtocol'],
          wsteth: data['UnsupportedProtocol'],
          seaportV1_5: data['UnsupportedProtocol'],
          seaportV1_4: data['UnsupportedProtocol'],
          openseaConduit: data['UnsupportedProtocol'],
          nftxZap: data['UnsupportedProtocol'],
          x2y2: data['UnsupportedProtocol'],
          foundation: data['UnsupportedProtocol'],
          sudoswap: data['UnsupportedProtocol'],
          elementMarket: data['UnsupportedProtocol'],
          nft20Zap: data['UnsupportedProtocol'],
          cryptopunks: data['UnsupportedProtocol'],
          looksRareV2: data['UnsupportedProtocol'],
          routerRewardsDistributor: data['UnsupportedProtocol'],
          looksRareRewardsDistributor: data['UnsupportedProtocol'],
          looksRareToken: data['UnsupportedProtocol'],
          v2Factory: data['UnsupportedProtocol'],
          v3Factory: data['UniswapV3Factory'],
          pairInitCodeHash: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
          poolInitCodeHash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
        },
      ],
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!')
    } else {
      console.log(e)
    }
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
