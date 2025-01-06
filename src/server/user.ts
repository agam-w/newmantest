import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./constants";

export function findUserByAddress(address: string) {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.walletAddress, address),
    with: { userStats: true },
  });
}

export function createJwtToken(user: { id: number; address: string }) {
  return jwt.sign({ id: user.id, address: user.address }, SECRET_KEY);
}
