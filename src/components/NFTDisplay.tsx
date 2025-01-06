import { motion } from "framer-motion";

// import {
//   azukiCollectionContract,
//   baycCollectionContract,
//   ppgCollectionContract,
//   punksCollectionContract,
// } from "@/utils/collectionContracts";
// import { useReadContracts } from "wagmi";
// import { zeroAddress } from "viem";
// import { useEffect } from "react";

const mockNFTs = [
  {
    id: 1,
    name: "Cool Cat #1",
    image: "../../public/images/NFT/azuki.svg",
  },
  {
    id: 2,
    name: "Bored Ape #42",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    name: "Crypto Punk #007",
    image: "/placeholder.svg?height=150&width=150",
  },
];

// const profileAddr = (userProfileAddress as `0x${string}`) ?? zeroAddress

// const profileAddr = "0xd890d93be26351a064fdc64f0e253603e43270a8";

// const { data: nftCollectionsData, error: multiReadError } = useReadContracts({
//   contracts: [
//     {
//       ...baycCollectionContract,
//       functionName: "balanceOf",
//       args: [profileAddr],
//       chainId: 1,
//     },
//     {
//       ...azukiCollectionContract,
//       functionName: "balanceOf",
//       args: [profileAddr],
//       chainId: 1,
//     },
//     {
//       ...ppgCollectionContract,
//       functionName: "balanceOf",
//       args: [profileAddr],
//       chainId: 1,
//     },
//     {
//       ...punksCollectionContract,
//       functionName: "balanceOf",
//       args: [profileAddr],
//       chainId: 1,
//     },
//   ],
//   // query: {
//   //   enabled: profileAddr != zeroAddress,
//   // },
//   query: {
//     enabled: true,
//   },
// });

// useEffect(() => {
//   console.log({ multiReadError });
// }, [multiReadError]);

// useEffect(() => {
//   console.log({ nftCollectionsData });

//   // if (nftCollectionsData) {
//   //   const tmpCount: number[] = [];
//   //   nftCollectionsData?.map((item, index) =>
//   //     tmpCount.push(Number(item.result))
//   //   );
//   //   $userNftCount.set(tmpCount);
//   // }
// }, [nftCollectionsData]);

export default function NFTDisplay() {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Your NFTs
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {mockNFTs.map((nft) => (
          <motion.div
            key={nft.id}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-purple-400 to-pink-500 p-1 rounded-lg shadow-lg"
          >
            <div className="bg-gray-900 p-2 sm:p-3 rounded-lg">
              <img
                src={nft.image}
                alt={nft.name}
                width={150}
                height={150}
                className="w-full h-auto rounded mb-2"
              />
              <p className="text-center font-semibold text-xs sm:text-sm">
                {nft.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
