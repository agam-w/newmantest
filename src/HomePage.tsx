import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { authGetToken, getProfile } from "./utils/api.client";
import { $jwtToken, $page, $profile, Page } from "./stores/auth";
import { useStore } from "@nanostores/react";
import classNames from "classnames";

export default function HomePage() {
  const account = useAccount();
  const jwtToken = useStore($jwtToken);
  const profile = useStore($profile);
  const page = useStore($page);

  useEffect(() => {
    if (account.address) {
      authGetToken(account.address).then((token) => {
        // console.log("token", token);
        $jwtToken.set(token);
      });
    }
  }, [account]);

  useEffect(() => {
    if (jwtToken) {
      getProfile().then((data) => {
        // console.log("data", data);
        $profile.set(data.user);
      });
    }
  }, [jwtToken]);

  const transformPathToName = (page: Page): string => {
    if (!page.startsWith("/")) return page; // Ensure the page starts with "/"
    const name = page.slice(1); // Remove the leading "/"
    return name.charAt(0).toUpperCase() + name.slice(1); // Capitalize the first letter
  };

  return (
    <div className="container px-4">
      <div className="flex justify-between items-center md:justify-start gap-4">
        {Object.values(Page).map((path) => (
          <button
            key={path}
            className={classNames(
              "px-4 py-2 font-semibold rounded-md shadow focus:outline-none focus:ring-2 transition-transform duration-300 ease-in-out hover:scale-105",
              page === path
                ? "bg-blue-600 text-white focus:ring-blue-300"
                : "bg-gray-300 text-gray-800 focus:ring-gray-300"
            )}
            onClick={() => $page.set(path)}
          >
            {transformPathToName(path)}
          </button>
        ))}
      </div>
      {page === "/home" && (
        <div>
          {!account.isConnected && (
            <div className="py-4">
              <p className="">
                Please connect wallet to complete task and earn points
              </p>
            </div>
          )}
          {account.isConnected && (
            <div className="py-4">
              <p className="font-medium">Connected Wallet:</p>
              <p className="text">wallet address: {account.address}</p>
              <br />
              <p className="font-medium">Profile:</p>
              <p className="text">name: {profile?.name}</p>
              <p className="text">address: {profile?.walletAddress}</p>
            </div>
          )}
        </div>
      )}
      {page === "/claim" && <div>claim page</div>}
    </div>
  );
}
