import {
  azukiCollectionContract,
  baycCollectionContract,
  ppgCollectionContract,
  punksCollectionContract,
} from "@/utils/collectionContracts";
import { useReadContracts } from "wagmi";
import { zeroAddress } from "viem";
import { useEffect } from "react";

const NftUpdater = () => {
  const profileAddr = "0xd890d93be26351a064fdc64f0e253603e43270a8";

  const { data: nftCollectionsData, error: multiReadError } = useReadContracts({
    contracts: [
      {
        ...baycCollectionContract,
        functionName: "balanceOf",
        args: [profileAddr],
        chainId: 1,
      },
      {
        ...azukiCollectionContract,
        functionName: "balanceOf",
        args: [profileAddr],
        chainId: 1,
      },
      {
        ...ppgCollectionContract,
        functionName: "balanceOf",
        args: [profileAddr],
        chainId: 1,
      },
      {
        ...punksCollectionContract,
        functionName: "balanceOf",
        args: [profileAddr],
        chainId: 1,
      },
    ],
    // query: {
    //   enabled: profileAddr != zeroAddress,
    // },
    query: {
      enabled: true,
    },
  });

  useEffect(() => {
    console.log({ multiReadError });
  }, [multiReadError]);

  useEffect(() => {
    console.log({ nftCollectionsData });

    // if (nftCollectionsData) {
    //   const tmpCount: number[] = [];
    //   nftCollectionsData?.map((item, index) =>
    //     tmpCount.push(Number(item.result))
    //   );
    //   $userNftCount.set(tmpCount);
    // }
  }, [nftCollectionsData]);
};

export default NftUpdater;
