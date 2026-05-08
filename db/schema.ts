import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";

export const blog = pgTable("blogs", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0),
});
