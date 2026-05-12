"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";

export const registerUser = async (
  _prevData: { error: string },
  FormData: FormData,
) => {
  const name = (FormData.get("name") as string)?.trim();
  const username = (FormData.get("username") as string)?.trim();
  const password = FormData.get("password") as string;

  console.log(name, username, password);

  if (!name) return { error: "Name is required" };
  if (!username) return { error: "Username is required" };
  if (password.length < 5)
    return { error: "Password must be at least 5 characters" };

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    username,
    passwordHash,
  });

  redirect("/login?registered=success");
};
