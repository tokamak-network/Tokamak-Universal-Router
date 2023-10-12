import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import '@tokamak-network/tokamak-uniswap-v3-deploy'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'
import dotenv from 'dotenv'
import { task, types } from 'hardhat/config'
dotenv.config()

task('flat', 'Flattens and prints contracts and their dependencies (Resolves licenses)')
  .addOptionalVariadicPositionalParam('files', 'The files to flatten', undefined, types.inputFile)
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run('flatten:get-flattened-sources', { files })

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(/SPDX-License-Identifier:/gm, 'License-Identifier:')
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(
      /pragma experimental ABIEncoderV2;\n/gm,
      (
        (i) => (m: any) =>
          !i++ ? m : ''
      )(0)
    )
    console.log(flattened)
  })

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.8.17',
  settings: {
    viaIR: true,
    evmVersion: 'istanbul',
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
  },
}

export default {
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      31337: `0xB68AA9E398c054da7EBAaA446292f611CA0CD52B`, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
  paths: {
    sources: './contracts',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      //chainId: 1,
      // forking: {
      //   url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      //   blockNumber: 15360000,
      // },
      forking: {
        url: `https://rpc.titan-goerli.tokamak.network`,
      },
    },
    localhost: {
      forking: {
        url: `https://rpc.titan-goerli.tokamak.network`,
      },
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    titangoerli: {
      url: 'https://rpc.titan-goerli.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5050,
      // gasPrice: 250000,
      deploy: ['deploy'],
    },
    titan: {
      url: 'https://rpc.titan.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 55004,
      // gasPrice: 250000,
      // deploy: ['deploy_titan'],
    },
    titangoerlinightly: {
      url: 'https://rpc.titan-goerli-nightly.tokamak.network',
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 5051,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    arbitrumRinkeby: {
      url: `https://rinkeby.arbitrum.io/rpc`,
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
    },
    optimismKovan: {
      url: `https://kovan.optimism.io`,
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    base: {
      url: `https://developer-access-mainnet.base.org`,
    },
    baseGoerli: {
      url: `https://goerli.base.org`,
    },
  },
  deterministicDeployment: (network: string) => {
    // Skip on hardhat's local network.
    if (network === '31337') {
      return undefined
    } else {
      return {
        factory: '0x4e59b44847b379578588920ca78fbf26c0b4956c',
        //deployer: '0x3fab184622dc19b6109349b94811493bf2a45362',
        //funding: '10000000000000000',
        //signedTx: '0x00',
      }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // apiKey: `${process.env.ETHERSCAN_API_KEY}`
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      sepolia: `${process.env.ETHERSCAN_API_KEY}`,
      titangoerli: `${process.env.ETHERSCAN_API_KEY}`,
      titangoerlinightly: `${process.env.ETHERSCAN_API_KEY}`,
      titan: `${process.env.ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: 'titangoerli',
        chainId: 5050,
        urls: {
          apiURL: 'https://explorer.titan-goerli.tokamak.network/api',
          browserURL: 'https://explorer.titan-goerli.tokamak.network',
        },
      },
      {
        network: 'titan',
        chainId: 55004,
        urls: {
          apiURL: 'https://explorer.titan.tokamak.network/api',
          browserURL: 'https://explorer.titan.tokamak.network',
        },
      },
      {
        network: 'titangoerlinightly',
        chainId: 5051,
        urls: {
          apiURL: 'https://explorer.titan-goerli-nightly.tokamak.network/api',
          browserURL: 'https://explorer.titan-goerli-nightly.tokamak.network',
        },
      }
    ],
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 60000,
  },
}
