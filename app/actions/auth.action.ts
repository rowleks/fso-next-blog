"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";

export const registerUser = async (
  _prevData: { error: string },
  formData: FormData,
) => {
  const name = (formData.get("name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!name) return { error: "Name is required" };
  if (username.length < 4)
    return { error: "Username must be at least 4 characters" };
  if (password.length < 4)
    return { error: "Password must be at least 4 characters" };
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [inserted] = await db
    .insert(users)
    .values({
      name,
      username,
      passwordHash,
    })
    .onConflictDoNothing()
    .returning();

  if (!inserted) {
    return { error: "Username already exists" };
  }

  redirect("/login?registered=success");
};
