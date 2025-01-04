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
  userId: integer().references(() => usersTable.id),
  totalPoints: integer().notNull(),
  // connect wallet
  questConnectDone: boolean().notNull(),
  questConnectDoneAt: timestamp().notNull(),
  questConnectClaimed: boolean().notNull(),
  questConnectClaimedAt: timestamp().notNull(),
  // edit profile name
  questProfileNameDone: boolean().notNull(),
  questProfileNameDoneAt: timestamp().notNull(),
  questProfileNameClaimed: boolean().notNull(),
  questProfileNameClaimedAt: timestamp().notNull(),
  // share
  questShareDone: boolean().notNull(),
  questShareDoneAt: timestamp().notNull(),
  questShareClaimed: boolean().notNull(),
  questShareClaimedAt: timestamp().notNull(),
});

export const userStatsRelations = relations(userStatTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userStatTable.userId],
    references: [usersTable.id],
  }),
}));
