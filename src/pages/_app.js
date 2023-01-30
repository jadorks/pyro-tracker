import Layout from "@/components/Layout";
import { PyroDappProvider } from "@/providers/PyroProvider/PyroDappProvider";
import "@/styles/globals.css";
import {
  DAppProvider,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Mainnet,
} from "@usedapp/core";
import { WalletConnectConnector } from "@usedapp/wallet-connect-connector";
import { ProSidebarProvider } from "react-pro-sidebar";

const config = {
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
    walletConnect: new WalletConnectConnector({
      chainId: Mainnet.chainId,
      rpc: {
        [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
      },
      pollingInterval: 86400000
    }),
  },
  pollingInterval: 86400000,
  autoConnect: true,
  noMetamaskDeactivate: true,
};

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ProSidebarProvider>
        <PyroDappProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PyroDappProvider>
      </ProSidebarProvider>
    </DAppProvider>
  );
}
