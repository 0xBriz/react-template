import '@rainbow-me/rainbowkit/styles.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/nprogress.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useApollo } from '@/apollo/client';
import { ApolloProvider } from '@apollo/client';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { networkChainDefinitions, wagmiClient } from '@/lib/global/network';
import { WagmiConfig } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chakraTheme } from '@/styles/chakraTheme';
import { UserDataProvider } from '@/lib/user/useUserData';
import { TokensProvider } from '@/lib/global/useToken';
import { AppContent } from './_app-content';
import Compose from '@/components/providers/Compose';
import { WalletUserAvatar } from '@/components/avatar/WalletUserAvatar';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const client = useApollo(props.pageProps);
  const dataProviders = [TokensProvider, UserDataProvider];

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={networkChainDefinitions}
          showRecentTransactions={true}
          appInfo={{
            appName: 'Vertek',
            learnMoreUrl: 'https://medium.com/blockchain/crypto-wallets-explained-f9199e621366',
          }}
          theme={darkTheme()}
          avatar={() => <WalletUserAvatar />}
        >
          <ApolloProvider client={client}>
            <ChakraProvider theme={chakraTheme}>
              <Compose providers={dataProviders}>
                <AppContent {...props} />
              </Compose>
            </ChakraProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
