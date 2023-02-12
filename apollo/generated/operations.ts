import gql from 'graphql-tag';
export const GqlPoolCardData = gql`
  fragment GqlPoolCardData on GqlPoolMinimal {
    id
    address
    name
    dynamicData {
      totalLiquidity
      totalShares
      apr {
        hasRewardApr
        thirdPartyApr
        nativeRewardApr
        swapApr
        total
        items {
          id
          title
          apr
          subItems {
            id
            title
            apr
          }
        }
      }
    }
    allTokens {
      id
      address
      isNested
      isPhantomBpt
      weight
    }
  }
`;
export const GqlPoolFeaturedPoolGroup = gql`
  fragment GqlPoolFeaturedPoolGroup on GqlPoolFeaturedPoolGroup {
    id
    icon
    title
    items {
      ... on GqlPoolMinimal {
        ...GqlPoolCardData
      }
    }
  }
  ${GqlPoolCardData}
`;
export const GetAppGlobalData = gql`
  query GetAppGlobalData {
    tokenGetTokens {
      address
      name
      symbol
      decimals
      chainId
      logoURI
      priority
      tradable
    }
    tokenGetCurrentPrices {
      price
      address
    }
  }
`;
export const GetAppGlobalPollingData = gql`
  query GetAppGlobalPollingData {
    tokenGetCurrentPrices {
      price
      address
    }
    protocolMetrics {
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      poolCount
      swapFee24h
      swapVolume24h
    }
    blocksGetBlocksPerDay
    blocksGetAverageBlockTime
    beetsGetBeetsPrice
  }
`;
export const GetTokens = gql`
  query GetTokens {
    tokens: tokenGetTokens {
      address
      name
      symbol
      decimals
      chainId
      logoURI
      priority
      tradable
    }
  }
`;
export const GetTokenPrices = gql`
  query GetTokenPrices {
    tokenPrices: tokenGetCurrentPrices {
      price
      address
    }
  }
`;
export const GetTokensDynamicData = gql`
  query GetTokensDynamicData($addresses: [String!]!) {
    dynamicData: tokenGetTokensDynamicData(addresses: $addresses) {
      ath
      atl
      fdv
      high24h
      id
      low24h
      marketCap
      price
      priceChange24h
      priceChangePercent7d
      priceChangePercent14d
      priceChangePercent24h
      priceChangePercent30d
      tokenAddress
      updatedAt
    }
  }
`;
export const GetProtocolData = gql`
  query GetProtocolData {
    protocolData: protocolMetrics {
      totalLiquidity
      totalSwapVolume
      totalSwapFee
      poolCount
      swapFee24h
      swapVolume24h
    }
    beetsPrice: beetsGetBeetsPrice
  }
`;
export const GetBlocksPerDay = gql`
  query GetBlocksPerDay {
    blocksPerDay: blocksGetBlocksPerDay
    avgBlockTime: blocksGetAverageBlockTime
  }
`;
export const GetBeetsPrice = gql`
  query GetBeetsPrice {
    beetsPrice: beetsGetBeetsPrice
  }
`;
export const GetUserData = gql`
  query GetUserData {
    balances: userGetPoolBalances {
      poolId
      tokenAddress
      tokenPrice
      totalBalance
      stakedBalance
      walletBalance
    }
    staking: userGetStaking {
      id
      type
      address
      gauge {
        id
        gaugeAddress
        rewards {
          id
          rewardPerSecond
          tokenAddress
        }
      }
    }
  }
`;
export const GetUserVeLockInfo = gql`
  query GetUserVeLockInfo {
    userGetVeLockInfo {
      lockedAmount
      lockEndDate
      totalSupply
      currentBalance
      epoch
      hasExistingLock
      isExpired
      percentOwned
    }
  }
`;
export const UserSyncBalance = gql`
  mutation UserSyncBalance($poolId: String!) {
    userSyncBalance(poolId: $poolId)
  }
`;
export const GetHomeData = gql`
  query GetHomeData {
    poolGetFeaturedPoolGroups {
      ...GqlPoolFeaturedPoolGroup
    }
    contentGetNewsItems {
      id
      text
      image
      url
      source
      timestamp
      discussionUrl
    }
  }
  ${GqlPoolFeaturedPoolGroup}
`;
export const GetHomeFeaturedPools = gql`
  query GetHomeFeaturedPools {
    featuredPoolGroups: poolGetFeaturedPoolGroups {
      ...GqlPoolFeaturedPoolGroup
    }
  }
  ${GqlPoolFeaturedPoolGroup}
`;
export const GetHomeNewsItems = gql`
  query GetHomeNewsItems {
    newsItems: contentGetNewsItems {
      id
      text
      image
      url
      source
      timestamp
      discussionUrl
    }
  }
`;
