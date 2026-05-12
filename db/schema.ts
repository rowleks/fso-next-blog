import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const blogsRelations = relations(blogs, ({ one }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
}));
