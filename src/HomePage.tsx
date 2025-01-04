import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { authGetToken, getProfile } from "./utils/api.client";
import { $jwtToken, $page, $profile } from "./stores/auth";
import { useStore } from "@nanostores/react";
import Popup from "./components/Popup";
import { Button } from "@headlessui/react";
import { getQuestClaimed, getQuestCompleted, quests } from "./utils/quests";

export default function HomePage() {
  const account = useAccount();
  const jwtToken = useStore($jwtToken);
  const profile = useStore($profile);
  const page = useStore($page);
  const [visible, setVisible] = useState(false);

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

  return (
    <div className="container">
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
                            <Button
                              className="rounded bg-sky-600 py-2 px-4 text-sm text-white"
                              onClick={() => {
                                console.log("go");
                              }}
                            >
                              Go
                            </Button>
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
                            <Button
                              className="rounded bg-green-600 py-2 px-4 text-sm text-white"
                              onClick={() => {
                                console.log("claim");
                              }}
                            >
                              Claim Reward
                            </Button>
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
      {page === "/claim" && (
        <div>
          claim page
          <Button
            className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
            onClick={() => setVisible(true)}
          >
            claim
          </Button>
          <div className="hidden md:block">
            <Popup
              visible={visible}
              onClickClose={() => setVisible(false)}
              showCloseButton={true}
            >
              <div className="bg-white">check claim</div>
            </Popup>
          </div>
        </div>
      )}
    </div>
  );
}
