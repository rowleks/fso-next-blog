import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};
