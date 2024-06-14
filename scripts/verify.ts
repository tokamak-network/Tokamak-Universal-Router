// Copyright 2024 justin
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import fs from 'fs'
import hre from 'hardhat'
const run = hre.run
const chainName = hre.network.name

let data = JSON.parse(fs.readFileSync(`../state.${chainName}.json`).toString())

const main = async () => {
  console.log('Verifying contract...')
  try {
      await run('verify:verify', {
      address: data['unsupportedAddress'],
      constructorArguments: [],
    })
    await run('verify:verify', {
      address: data['universalRouterAddress'],
      constructorArguments: [
        {
          permit2: data['permit2Address'],
          weth9: '0x4200000000000000000000000000000000000006',
          seaportV1_5: data['unsupportedAddress'],
          seaportV1_4: data['unsupportedAddress'],
          openseaConduit: data['unsupportedAddress'],
          nftxZap: data['unsupportedAddress'],
          x2y2: data['unsupportedAddress'],
          foundation: data['unsupportedAddress'],
          sudoswap: data['unsupportedAddress'],
          elementMarket: data['unsupportedAddress'],
          nft20Zap: data['unsupportedAddress'],
          cryptopunks: data['unsupportedAddress'],
          looksRareV2: data['unsupportedAddress'],
          routerRewardsDistributor: data['unsupportedAddress'],
          looksRareRewardsDistributor: data['unsupportedAddress'],
          looksRareToken: data['unsupportedAddress'],
          v2Factory: '0x0000000000000000000000000000000000000000',
          v3Factory: data['v3CoreFactoryAddress'],
          pairInitCodeHash: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
          poolInitCodeHash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54',
        },
      ],
    })
  } catch (e) {
    if ((e as any).message.toLowerCase().includes('already verified')) {
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
