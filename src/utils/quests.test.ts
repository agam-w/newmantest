import { test, expect } from "vitest";
import {
  quests,
  getQuestCompleted,
  getQuestClaimed,
  getBadgeByQuestType,
} from "./quests";
import { UserStat } from "@/types";

test("getQuestCompleted", () => {
  const quest = quests[0];

  const userStat: UserStat = {
    id: 1,
    userId: 1,
    totalPoints: 0,
    questConnectDone: true,
    questConnectDoneAt: new Date(),
    questProfileNameDone: false,
    questShareDone: false,
    questConnectClaimed: false,
    questProfileNameClaimed: false,
    questShareClaimed: false,
  };

  expect(getQuestCompleted(quest, userStat)).toEqual({
    isCompleted: true,
    completedAt: userStat.questConnectDoneAt?.toString(),
  });
});

test("getQuestClaimed", () => {
  const quest = quests[0];

  const userStat: UserStat = {
    id: 1,
    userId: 1,
    totalPoints: 0,
    questConnectDone: false,
    questConnectDoneAt: new Date(),
    questProfileNameDone: false,
    questShareDone: false,
    questConnectClaimed: true,
    questProfileNameClaimed: false,
    questShareClaimed: false,
  };

  expect(getQuestClaimed(quest, userStat)).toEqual({
    isClaimed: true,
    claimedAt: userStat.questConnectClaimedAt?.toString(),
  });
});

test("getBadgeByQuestType", () => {
  expect(getBadgeByQuestType("connect")).toBe("Early Bird");
  expect(getBadgeByQuestType("profileName")).toBe("It's Me");
  expect(getBadgeByQuestType("share")).toBe("Social Butterfly");
});
