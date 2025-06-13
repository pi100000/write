import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const writeTable = pgTable("write", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text(),
  tags: varchar().array(),
});
