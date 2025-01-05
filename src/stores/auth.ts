import { atom } from "nanostores";
import { UserWithStats } from "../types";
import { getProfileData } from "@/utils/action";

export const $jwtToken = atom<string | undefined>();

export const $profile = atom<UserWithStats | undefined>();

$jwtToken.subscribe((token) => {
  if (token) {
    getProfileData();
  }
});

export const $isProfileEditing = atom(false);
