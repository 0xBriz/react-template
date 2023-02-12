import { useGetPoolsLazyQuery } from '@/apollo/generated/graphql-codegen-generated';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { HomeHero } from './components/HomeHero';

export function Home() {
  // const {
  //   stakedValueUSD,
  //   portfolioValueUSD,
  //   loading: userDataLoading,
  //   userPoolIds,
  //   usdBalanceForPool,
  // } = useUserData();

  // const [getPools, getPoolsQuery] = useGetPoolsLazyQuery();
  // const userPoolIdsStr = userPoolIds.join();

  // useEffect(() => {
  //   getPools({
  //     variables: {
  //       where: {
  //         idIn: userPoolIds,
  //         poolTypeNotIn: ['LINEAR', 'LIQUIDITY_BOOTSTRAPPING', 'UNKNOWN'],
  //       },
  //     },
  //   });
  // }, [userPoolIdsStr]);

  return (
    <Box>
      <HomeHero />

      {/* <Text mb="0" mt="12" fontSize={{ base: '2rem', md: '3rem'}}  
      lineHeight={{ base: '1.1', md: 'auto' }} 
      textAlign={{ base: 'left', md:'justify' }} className="vertektitle">
        The pinnacle of DeFi technological evolution. <br /> 
      </Text>
      <Text mt="1" fontSize={{ base: '1.3rem', md:"2rem"}}  mb="8" textAlign={{ base: 'left', md:'justify' }}>
        Advanced, yet simple. Sophisticated, yet intuitive. 
      </Text>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(3, 1fr)' }}
        columnGap={{ base: '0', lg: '16' }}
        rowGap="4"
        mt="4"
        borderBottomWidth={2}
        borderBottomColor="gray.100"
        pb="18">
          
            <GridItem 
            colSpan={3}
            borderBottomWidth={2} borderBottomColor="gray.100">
                  <HomeWhyUs />
            </GridItem>

            <GridItem colSpan={3} mt="12">
              <HomeBeetsInfo />
            </GridItem>
      </Grid>
      <Box mt="12" borderBottomWidth={0} borderBottomColor="gray.100">
        <HomeLearn />
      </Box> */}
    </Box>
  );
}
