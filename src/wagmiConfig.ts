import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, arbitrum, sepolia, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Newman Test",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, arbitrum, sepolia, base],
  ssr: true,
});
