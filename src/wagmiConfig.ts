import { getDefaultConfig } from "@rainbow-me/rainbowkit";
// import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, sepolia, base } from "wagmi/chains";
// import { injected, metaMask } from "wagmi/connectors";

// export const config = createConfig({
//   chains: [mainnet, sepolia, base],
//   connectors: [
//     injected(),
//     metaMask({
//       dappMetadata: {
//         name: "Newman Test",
//         url: "https://wagmi.io",
//         iconUrl: "https://wagmi.io/favicon.ico",
//       },
//     }),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//     [base.id]: http(),
//   },
// });

export const config = getDefaultConfig({
  appName: "Newman Test",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, arbitrum, sepolia, base],
  ssr: true,
});
