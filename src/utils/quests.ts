import { Quest, UserStat } from "../types";

export const quests: Quest[] = [
  {
    type: "connect",
    title: "Connect Wallet",
    description: "Connect your wallet and get free 500 points",
    points: 500,
  },
  {
    type: "profileName",
    title: "Edit Profile Name",
    description: "Edit your profile name",
    points: 100,
  },
  {
    type: "share",
    title: "Share this App",
    description: "Share this app with your friends",
    points: 300,
  },
];

export function getQuestCompleted(quest: Quest, userStat: UserStat) {
  switch (quest.type) {
    case "connect":
      return {
        isCompleted: userStat.questConnectDone,
        completedAt: userStat.questConnectDoneAt?.toString(),
      };
    case "profileName":
      return {
        isCompleted: userStat.questProfileNameDone,
        completedAt: userStat.questProfileNameDoneAt?.toString(),
      };
    case "share":
      return {
        isCompleted: userStat.questShareDone,
        completedAt: userStat.questShareDoneAt?.toString(),
      };
  }
}

export function getQuestClaimed(quest: Quest, userStat: UserStat) {
  switch (quest.type) {
    case "connect":
      return {
        isClaimed: userStat.questConnectClaimed,
        claimedAt: userStat.questConnectClaimedAt?.toString(),
      };
    case "profileName":
      return {
        isClaimed: userStat.questProfileNameClaimed,
        claimedAt: userStat.questProfileNameClaimedAt?.toString(),
      };
    case "share":
      return {
        isClaimed: userStat.questShareClaimed,
        claimedAt: userStat.questShareClaimedAt?.toString(),
      };
  }
}
