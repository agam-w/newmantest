import { $getNftDataIsLoading, $nftDataCount } from "@/stores/auth";
import { openNewTab } from "@/utils/browserHelper";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageOff, Loader, Loader2 } from "lucide-react";
import { useMemo } from "react";

const mockNFTs = [
  {
    id: 1,
    name: "BAYC",
    image: "/images/NFT/bayc.svg?height=150&width=150",
  },
  {
    id: 2,
    name: "Azuki",
    image: "/images/NFT/azuki.svg?height=150&width=150",
  },
  {
    id: 3,
    name: "PPG",
    image: "/images/NFT/ppg.svg?height=150&width=150",
  },
  {
    id: 4,
    name: "CryptoPunks",
    image: "/images/NFT/punks.svg?height=150&width=150",
  },
];

export default function NFTDisplay() {
  const nftDataCount = useStore($nftDataCount);
  const isLoading = useStore($getNftDataIsLoading);

  const userHasNoNft = useMemo(() => {
    return nftDataCount.every((value: number) => value === 0);
  }, [nftDataCount]);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Your NFTs
      </h2>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-48"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader className="w-12 h-12 text-purple-500" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-gray-300"
            >
              Loading your NFTs...
            </motion.p>
          </motion.div>
        ) : userHasNoNft ? (
          <motion.div
            key="no-nfts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-48 bg-gray-800 bg-opacity-50 rounded-lg p-6 text-center"
          >
            <ImageOff className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-200">
              No NFTs Found
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Connect your wallet or mint your first NFT to get started!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full text-sm"
              onClick={() => openNewTab("https://opensea.io/")}
            >
              Explore NFTs
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="nft-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {nftDataCount.map((count, i) => {
              if (count > 0) {
                return (
                  <motion.div
                    key={mockNFTs[i].id}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-br from-purple-400 to-pink-500 p-1 rounded-lg shadow-lg"
                  >
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <img
                        src={mockNFTs[i].image}
                        alt={mockNFTs[i].name}
                        width={150}
                        height={150}
                        className="w-full h-auto rounded mb-2"
                      />
                      <p className="text-center font-semibold text-sm">
                        {mockNFTs[i].name}
                      </p>
                    </div>
                  </motion.div>
                );
              } else {
                return null;
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
