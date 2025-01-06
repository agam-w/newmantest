import { $profile } from "@/stores/auth";
import { getProfile } from "./api.client";

// fetch profile and set to store
export const getProfileData = async () => {
  getProfile().then((data) => {
    $profile.set(data.user);
  });
};
