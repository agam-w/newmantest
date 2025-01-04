import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  walletAddress: varchar({ length: 255 }).unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  userStats: one(userStatTable),
}));

export const userStatTable = pgTable("userStats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .unique()
    .references(() => usersTable.id),
  totalPoints: integer().default(0),
  // connect wallet
  questConnectDone: boolean().default(false),
  questConnectDoneAt: timestamp(),
  questConnectClaimed: boolean().default(false),
  questConnectClaimedAt: timestamp(),
  // edit profile name
  questProfileNameDone: boolean().default(false),
  questProfileNameDoneAt: timestamp(),
  questProfileNameClaimed: boolean().default(false),
  questProfileNameClaimedAt: timestamp(),
  // share
  questShareDone: boolean().default(false),
  questShareDoneAt: timestamp(),
  questShareClaimed: boolean().default(false),
  questShareClaimedAt: timestamp(),
});

export const userStatsRelations = relations(userStatTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userStatTable.userId],
    references: [usersTable.id],
  }),
}));
