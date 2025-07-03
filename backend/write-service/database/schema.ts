import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const writeTable = pgTable("write", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  tags: varchar("tags").array(),
});
