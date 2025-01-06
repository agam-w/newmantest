import {
  azukiCollectionContract,
  baycCollectionContract,
  ppgCollectionContract,
  punksCollectionContract,
} from "@/utils/collectionContracts";
import { useReadContracts } from "wagmi";
import { zeroAddress } from "viem";
import { useEffect } from "react";
import { $getNftDataIsLoading, $nftDataCount } from "@/stores/auth";

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

  console.log({ nftCollectionsData });

  useEffect(() => {
    console.log({ multiReadError });
  }, [multiReadError]);

  useEffect(() => {
    if (nftCollectionsData) {
      const tmpCount: number[] = [];
      nftCollectionsData?.map((item, index) =>
        tmpCount.push(Number(item.result))
      );

      $nftDataCount.set(tmpCount);
      $getNftDataIsLoading.set(false);
    } else {
      $getNftDataIsLoading.set(true);
    }
  }, [nftCollectionsData]);

  return null;
};

export default NftUpdater;
