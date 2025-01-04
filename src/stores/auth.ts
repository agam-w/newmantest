import { atom } from "nanostores";
import { UserWithStats } from "../types";

export const $jwtToken = atom<string | undefined>();

export const $profile = atom<UserWithStats | undefined>();

export const $page = atom<string>("/home");
