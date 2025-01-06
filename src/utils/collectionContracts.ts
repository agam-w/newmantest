import { azukiAbi } from "@/const/abi/nftCollections/azuki";
import { baycAbi } from "@/const/abi/nftCollections/bayc";
import { captainzAbi } from "@/const/abi/nftCollections/captainz";
import { goldmilioAbi } from "@/const/abi/nftCollections/goldmilio";
import { miladyAbi } from "@/const/abi/nftCollections/milady";
import { pudgyAbi } from "@/const/abi/nftCollections/pudgy";
import { punksAbi } from "@/const/abi/nftCollections/punks";
import { wpunksAbi } from "@/const/abi/nftCollections/wpunks";

const baycCollectionAddr =
  import.meta.env.VITE_PUBLIC_BAYC_COLLECTION_ADDRESS ?? "";
const ppgCollectionAddr =
  import.meta.env.VITE_PUBLIC_PUDGYPENGUINS_COLLECTION_ADDRESS ?? "";
const azukiCollectionAddr =
  import.meta.env.VITE_PUBLIC_AZUKI_COLLECTION_ADDRESS ?? "";
const miladyCollectionAddr =
  import.meta.env.VITE_PUBLIC_MILADY_COLLECTION_ADDRESS ?? "";
const punksCollectionAddr =
  import.meta.env.VITE_PUBLIC_CRYPTOPUNKS_COLLECTION_ADDRESS ?? "";
const wpunksCollectionAddr =
  import.meta.env.VITE_PUBLIC_WRAPCRYPTOPUNKS_COLLECTION_ADDRESS ?? "";
const captaizCollectionAddr =
  import.meta.env.VITE_PUBLIC_CAPTAINZ_COLLECTION_ADDRESS ?? "";
const goldmilioCollectionAddr =
  import.meta.env.VITE_PUBLIC_GOLDMILIO_COLLECTION_ADDRESS ?? "";

export const baycCollectionContract = {
  abi: baycAbi,
  address: baycCollectionAddr as `0x${string}`,
};
export const azukiCollectionContract = {
  abi: azukiAbi,
  address: azukiCollectionAddr as `0x${string}`,
};
export const ppgCollectionContract = {
  abi: pudgyAbi,
  address: ppgCollectionAddr as `0x${string}`,
};
export const miladyCollectionContract = {
  abi: miladyAbi,
  address: miladyCollectionAddr as `0x${string}`,
};
export const punksCollectionContract = {
  abi: punksAbi,
  address: punksCollectionAddr as `0x${string}`,
};
export const wpunksCollectionContract = {
  abi: wpunksAbi,
  address: wpunksCollectionAddr as `0x${string}`,
};
export const captainzCollectionContract = {
  abi: captainzAbi,
  address: captaizCollectionAddr as `0x${string}`,
};
export const goldmilioCollectionContract = {
  abi: goldmilioAbi,
  address: goldmilioCollectionAddr as `0x${string}`,
};
