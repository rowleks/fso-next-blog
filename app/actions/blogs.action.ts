"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs.service";
import { getCurrentUser } from "../services/auth.service";

export async function createBlog(
  _prevData: { error: string },
  formData: FormData,
) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const userId = user.id;

  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();
  const likes = Number(formData.get("likes")) || 0;

  if (title.length < 5) return { error: "Title must be at least 5 characters" };
  if (author.length < 5)
    return { error: "Author must be at least 5 characters" };
  if (url.length < 5) return { error: "URL must be at least 5 characters" };

  await addBlog(title, author, url, likes, userId);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"));
  await addLikes(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
