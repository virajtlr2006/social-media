import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const PostTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar().notNull(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  image: varchar().notNull(),
});

export type Posts = typeof PostTable.$inferSelect;
export type NewPost = typeof PostTable.$inferInsert;