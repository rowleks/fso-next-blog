"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs.service";

export async function createBlog(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const url = (formData.get("url") as string)?.trim();
  const likes = Number(formData.get("likes")) || 0;

  if (!title || !author || !url) return;

  await addBlog(title, author, url, likes);
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"));
  await addLikes(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
