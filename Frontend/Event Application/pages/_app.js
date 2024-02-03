import Layout from "../components/Layout";
import "../styles/globals.css";
// import rainbowkit
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { celo, celoAlfajores, celoCannoli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, sepolia],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_RPC_URL }), publicProvider()]
// );

// const { connectors } = getDefaultWallets({
//   appName: "EVENT APPLICATION",
//   projectId: "3c0117be390fa0e7fefa97a8363f7b5f",
//   chains,
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
