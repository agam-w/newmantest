import { Quest, QuestType, UserStat } from "../types";

export const quests: Quest[] = [
  {
    type: "connect",
    title: "Connect Wallet",
    description: "Connect your wallet and start earning points",
    points: 500,
  },
  {
    type: "profileName",
    title: "Edit Profile Name",
    description: "Edit your profile",
    points: 100,
  },
  {
    type: "share",
    title: "Share on Social Media",
    description: "",
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

export function getBadgeByQuestType(questType: QuestType) {
  switch (questType) {
    case "connect":
      return "Early Bird";
    case "profileName":
      return "It's Me";
    case "share":
      return "Social Butterfly";
  }
}
