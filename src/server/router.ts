import express from "express";
import { jwtMiddleware } from "./jwtMiddleware";
import { db } from "../db";
import { usersTable, userStatTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { QuestType } from "../types";
import { quests } from "../utils/quests";
import { createJwtToken, findUserByAddress } from "./user";

const api = express.Router();

// api routes here
// all routes are prefixed with /api

api.get("/", (req, res) => {
  res.json({ message: "Hello from server" });
});

// auth or connect wallet
// receive address from request body
// create jwt token from address
// send jwt token as response
api.post("/auth", async (req, res) => {
  // get address from request body
  const address = req.body.address;
  if (!address) {
    res.status(400).json({ error: "address is required" });
    return;
  }

  // check if user exists in db
  const existingUser = await findUserByAddress(address);
  if (existingUser) {
    // also upsert userStats, set questConnectDone as true
    await db
      .insert(userStatTable)
      .values({
        userId: existingUser.id,
        questConnectDone: true,
        questConnectDoneAt: new Date(),
      })
      .onConflictDoUpdate({
        target: userStatTable.userId,
        set: {
          userId: existingUser.id,
          questConnectDone: true,
        },
      });

    const token = createJwtToken({ id: existingUser.id, address });
    res.json({ token });
    return;
  }

  // otherwise, insert user into db
  const insertUsers = await db
    .insert(usersTable)
    .values({ walletAddress: address, name: "" })
    .onConflictDoNothing()
    .returning();

  const user = insertUsers[0];

  // also insert userStats, set questConnectDone as true
  await db
    .insert(userStatTable)
    .values({
      userId: user.id,
      questConnectDone: true,
      questConnectDoneAt: new Date(),
    })
    .onConflictDoUpdate({
      target: userStatTable.userId,
      set: {
        userId: user.id,
        questConnectDone: true,
      },
    });

  // create jwt token from address
  const token = createJwtToken({ id: user.id, address });

  res.json({ token });
});

api.get("/profile", jwtMiddleware, async (req, res) => {
  // check if user exists in db
  const user = await findUserByAddress(req.user?.address || "");
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

api.post("/profile/edit", jwtMiddleware, async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }

  // check current user
  const user = await findUserByAddress(req.user?.address || "");
  if (user) {
    await db
      .update(usersTable)
      .set({
        name,
      })
      .where(eq(usersTable.id, user.id));

    // mark done
    await db
      .update(userStatTable)
      .set({
        questProfileNameDone: true,
        questProfileNameDoneAt: new Date(),
      })
      .where(eq(userStatTable.userId, user.id));

    res.json({ message: "Profile updated successfully" });
    return;
  }

  res.status(404).json({ error: "User not found" });
});

api.post("/quest-done", jwtMiddleware, async (req, res) => {
  const quest = req.body.quest as QuestType;
  if (!quest) {
    res.status(400).json({ error: "questType is required" });
    return;
  }

  // check current user
  const user = await findUserByAddress(req.user?.address || "");
  if (user && user.userStats) {
    // check if quest done but not claimed
    switch (quest) {
      case "share":
        // update userStats
        await db
          .update(userStatTable)
          .set({
            questShareDone: true,
            questShareDoneAt: new Date(),
          })
          .where(eq(userStatTable.userId, user.id));
        res.json({ message: "Quest completed successfully" });
        break;
    }

    res.status(400).json({ message: "Quest cannot be completed" });
    return;
  }

  res.status(404).json({ error: "User not found" });
});

api.post("/claim", jwtMiddleware, async (req, res) => {
  const quest = req.body.quest as QuestType;
  if (!quest) {
    res.status(400).json({ error: "questType is required" });
    return;
  }

  // check current user
  const user = await findUserByAddress(req.user?.address || "");

  if (user && user.userStats) {
    let claimable = false;
    // check if quest done but not claimed
    switch (quest) {
      case "connect":
        claimable =
          (user.userStats?.questConnectDone &&
            !user.userStats?.questConnectClaimed) ||
          false;
        if (claimable) {
          // claim and update userStats
          await db
            .update(userStatTable)
            .set({
              questConnectClaimed: true,
              questConnectClaimedAt: new Date(),
              totalPoints:
                (user.userStats.totalPoints ?? 0) +
                (quests.find((i) => i.type == quest)?.points ?? 0),
            })
            .where(eq(userStatTable.userId, user.id));
          res.json({ message: "Quest claimed successfully" });
        }
        break;
      case "profileName":
        claimable =
          (user.userStats?.questProfileNameDone &&
            !user.userStats?.questProfileNameClaimed) ||
          false;
        if (claimable) {
          // claim and update userStats
          await db
            .update(userStatTable)
            .set({
              questProfileNameClaimed: true,
              questProfileNameClaimedAt: new Date(),
              totalPoints:
                (user.userStats.totalPoints ?? 0) +
                (quests.find((i) => i.type == quest)?.points ?? 0),
            })
            .where(eq(userStatTable.userId, user.id));
          res.json({ message: "Quest claimed successfully" });
        }
        break;
      case "share":
        claimable =
          (user.userStats?.questShareDone &&
            !user.userStats?.questShareClaimed) ||
          false;
        if (claimable) {
          // claim and update userStats
          await db
            .update(userStatTable)
            .set({
              questShareClaimed: true,
              questShareClaimedAt: new Date(),
              totalPoints:
                (user.userStats.totalPoints ?? 0) +
                (quests.find((i) => i.type == quest)?.points ?? 0),
            })
            .where(eq(userStatTable.userId, user.id));
          res.json({ message: "Quest claimed successfully" });
        }
        break;
    }

    res.status(400).json({ message: "Quest cannot be claimed" });
    return;
  }

  res.status(404).json({ error: "User not found" });
});

export const apiRouter = api;
