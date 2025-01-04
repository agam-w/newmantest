import express from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants";
import { jwtMiddleware } from "./jwtMiddleware";
import { db } from "../db";
import { usersTable, userStatTable } from "../db/schema";
import { eq } from "drizzle-orm";

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
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.walletAddress, address),
  });

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

    // create jwt token from address
    const token = jwt.sign({ id: existingUser.id, address }, SECRET_KEY);
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
  const token = jwt.sign({ id: user.id, address }, SECRET_KEY);

  res.json({ token });
});

api.get("/profile", jwtMiddleware, async (req, res) => {
  // console.log("req.user", req.user);
  // check if user exists in db
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.walletAddress, req.user?.address || ""),
    with: {
      userStats: true,
    },
  });

  if (user) {
    res.json({ user });
    return;
  }

  res.status(404).json({ error: "User not found" });
});

export const apiRouter = api;
