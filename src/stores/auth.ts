import { atom } from "nanostores";
import { UserWithStats } from "../types";

export const $jwtToken = atom<string | undefined>();

export const $profile = atom<UserWithStats | undefined>();

export enum Page {
  Home = "/home",
  Claim = "/claim",
  Profile = "/profile",
}

export const $page = atom<Page>(Page.Home);
