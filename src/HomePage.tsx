import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  authGetToken,
  claimQuest,
  getProfile,
  questDone,
} from "./utils/api.client";
import { $jwtToken, $page, $profile, Page } from "./stores/auth";
import { useStore } from "@nanostores/react";
import classNames from "classnames";
import { getQuestClaimed, getQuestCompleted, quests } from "./utils/quests";

export default function HomePage() {
  const account = useAccount();
  const jwtToken = useStore($jwtToken);
  const profile = useStore($profile);
  const page = useStore($page);

  const getAuthToken = async () => {
    if (account.address) {
      authGetToken(account.address).then((token) => {
        // console.log("token", token);
        $jwtToken.set(token);
      });
    }
  };

  useEffect(() => {
    getAuthToken();
  }, [account]);

  // fetch profile and set to store
  const getProfileData = async () => {
    getProfile().then((data) => {
      // console.log("data", data);
      $profile.set(data.user);
    });
  };

  useEffect(() => {
    if (jwtToken) {
      getProfileData();
    }
  }, [jwtToken]);

  const refresh = () => {
    getProfileData();
  };

  const shareQuest = async () => {
    const url = window.location.href;
    // copy to clipboard
    await navigator.clipboard.writeText(url);
    console.log("url copied", url);
  };

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
                : "bg-gray-300 text-gray-800 focus:ring-gray-300",
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
            <div className="py-4 space-y-8">
              <div>
                <p className="font-medium">Connected Wallet:</p>
                <p className="text">Wallet Address: {account.address}</p>
              </div>
              <div>
                <p className="text-xl font-medium mb-4">Profile</p>
                <p className="text">Name: {profile?.name}</p>
                <p className="text">Address: {profile?.walletAddress}</p>
                <p className="text">
                  Total Points: {profile?.userStats.totalPoints}
                </p>
              </div>
            </div>
          )}

          <div>
            <p className="text-xl font-medium mb-4">Quests</p>

            <div className="space-y-2">
              {quests.map((quest) => {
                const completed = profile?.userStats
                  ? getQuestCompleted(quest, profile.userStats)
                  : undefined;
                const claimed = profile?.userStats
                  ? getQuestClaimed(quest, profile.userStats)
                  : undefined;
                return (
                  <div
                    key={quest.type}
                    className="grid grid-cols-3 p-4 border rounded shadow"
                  >
                    <div>
                      <p className="font-medium">{quest.title}</p>
                      <p className="text">{quest.description}</p>
                      <p className="text-sm text-yellow-500">
                        Reward: {quest.points} points
                      </p>
                    </div>
                    <div>
                      {profile?.userStats && (
                        <div>
                          {completed?.isCompleted && (
                            <p className="text-green-500">Completed</p>
                          )}
                          {completed?.completedAt}

                          {/* not completed */}
                          {!completed?.isCompleted && (
                            <button
                              className="rounded bg-sky-600 py-2 px-4 text-sm text-white"
                              onClick={() => {
                                if (quest.type === "share") {
                                  shareQuest().then(() => {
                                    questDone(quest.type).then(() => {});
                                  });
                                }
                              }}
                            >
                              {quest.type === "share" ? "Share" : "Go"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      {profile?.userStats && (
                        <div>
                          {claimed?.isClaimed && (
                            <p className="text-green-500">Claimed</p>
                          )}
                          {claimed?.claimedAt}

                          {/* not claimed */}
                          {completed?.isCompleted && !claimed?.isClaimed && (
                            <button
                              className="rounded bg-green-600 py-2 px-4 text-sm text-white"
                              onClick={() => {
                                claimQuest(quest.type).then(() => {
                                  refresh();
                                });
                              }}
                            >
                              Claim Reward
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {page === "/claim" && <div>claim page</div>}
    </div>
  );
}
