import { atom } from "nanostores";
import { User } from "../types";

export const $jwtToken = atom<string | undefined>();

export const $profile = atom<User | undefined>();

export const $page = atom<string>("/home");
