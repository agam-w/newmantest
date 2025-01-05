import { $profile } from "@/stores/auth";
import { getProfile } from "./api.client";

// fetch profile and set to store
export const getProfileData = async () => {
  getProfile().then((data) => {
    // console.log("data", data);
    $profile.set(data.user);
  });
};
