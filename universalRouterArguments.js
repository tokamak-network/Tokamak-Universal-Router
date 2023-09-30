const Permit2Json = required('./deployments/titangoerli/Permit2.json')
const UnsupportedProtocolJson = required('./deployments/titangoerli/UnsupportedProtocol.json')
const permit2Address = Permit2Json.address
const unsupportedProtocolAddress = UnsupportedProtocolJson.address
const v3FactoryAddress = '0x8C2351935011CfEccA4Ea08403F127FB782754AC'

module.exports = [
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
