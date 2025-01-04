export type User = {
  id: number;
  walletAddress: string;
  name: string;
};

export type UserStat = {
  id: number;
  userId: number;
  totalPoints: number;
  questConnectDone: boolean;
  questConnectDoneAt?: Date;
  questConnectClaimed: boolean;
  questConnectClaimedAt?: Date;
  questProfileNameDone: boolean;
  questProfileNameDoneAt?: Date;
  questProfileNameClaimed: boolean;
  questProfileNameClaimedAt?: Date;
  questShareDone: boolean;
  questShareDoneAt?: Date;
  questShareClaimed: boolean;
  questShareClaimedAt?: Date;
};

export type UserWithStats = User & {
  userStats: UserStat;
};

// quests

export type QuestType = "connect" | "profileName" | "share";

export type Quest = {
  type: QuestType;
  title: string;
  description: string;
  points: number;
};
