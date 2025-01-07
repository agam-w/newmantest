import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, arbitrum, sepolia, base } from "wagmi/chains";

const projectId = import.meta.env.VITE_PUBLIC_WALLET_CONNECT_ID ?? "";

export const config = getDefaultConfig({
  appName: "NewmanTest",
  projectId: projectId,
  chains: [mainnet, arbitrum, sepolia, base],
  ssr: true,
});
