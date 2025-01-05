import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { authGetToken } from "./utils/api.client";
import { $jwtToken } from "./stores/auth";

import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Medal, Trophy, ChevronRight, Loader2 } from "lucide-react";
import Profile from "./components/Profile";
import NFTDisplay from "./components/NFTDisplay";
import Quests from "./components/Quests";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  const { isConnecting, isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();

  // on connected wallet, get jwt token and set to store
  useEffect(() => {
    const getAuthToken = async () => {
      if (address) {
        authGetToken(address).then((token) => {
          // console.log("token", token);
          $jwtToken.set(token);
        });
      }
    };
    getAuthToken();
  }, [address]);

  return (
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="not-connected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8 sm:space-y-12"
            >
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Unlock the World of Digital Collectibles
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                  Connect your wallet to dive into a universe of exclusive NFTs,
                  thrilling quests, and amazing rewards.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center space-x-3 mx-auto"
                onClick={openConnectModal}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                <span>{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
                {!isConnecting && (
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-16">
                <FeatureCard
                  icon={
                    <Medal className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
                  }
                  title="Earn Badges"
                  description="Complete quests and showcase your unique achievements in the NFT world"
                />
                <FeatureCard
                  icon={
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-green-400" />
                  }
                  title="Collect Rewards"
                  description="Accumulate points and redeem them for exclusive NFTs and perks"
                />
                <FeatureCard
                  icon={
                    <Wallet className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
                  }
                  title="Manage NFTs"
                  description="View, organize, and showcase your digital assets in one place"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
                >
                  <Profile />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
                >
                  <NFTDisplay />
                </motion.div>
              </div>

              <motion.div
                // whileHover={{ scale: 1.02 }}
                className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20"
              >
                <Quests />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white bg-opacity-10 p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20 text-center"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 sm:mb-6"
      >
        {icon}
      </motion.div>
      <motion.h3
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-sm sm:text-base text-gray-300"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
