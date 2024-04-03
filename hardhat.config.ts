import '@nomicfoundation/hardhat-chai-matchers'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import dotenv from 'dotenv'
import 'hardhat-typechain'
dotenv.config()

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
  paths: {
    sources: './contracts',
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      chainId: 1,
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        blockNumber: 15360000,
      },
    },
    thanossepolia: {
      url: `https://rpc.thanos-sepolia-test.tokamak.network`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 111551118080,
    },
    titansepolia:{
      url: `https://rpc.titan-sepolia.tokamak.network`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 55007
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
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
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'thanossepolia',
        chainId: 111551118080,
        urls: {
          apiURL: 'https://explorer.thanos-sepolia-test.tokamak.network/api',
          browserURL: 'https://explorer.thanos-sepolia-test.tokamak.network/',
        },
      },
      {
        network: 'titansepolia',
        chainId: 55007,
        urls: {
          apiURL: 'https://explorer.titan-sepolia.tokamak.network/api',
          browserURL: 'https://explorer.titan-sepolia.tokamak.network/',
        }
      }
    ],
  },
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  mocha: {
    timeout: 60000,
  },
}
