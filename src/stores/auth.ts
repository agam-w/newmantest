import { atom } from "nanostores";
import { User } from "../types";

export const $jwtToken = atom<string | undefined>();

export const $profile = atom<User | undefined>();

export enum Page {
  Home = "/home",
  Claim = "/claim",
  Profile = "/profile",
}

export const $page = atom<Page>(Page.Home);
