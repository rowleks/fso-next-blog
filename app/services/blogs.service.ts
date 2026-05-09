import { blogs } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addLikes = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    blog.likes++;
    await db.update(blogs).set({ likes: blog.likes }).where(eq(blogs.id, id));
  }
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const newBlog = {
    title,
    author,
    url,
    likes,
  };
  await db.insert(blogs).values(newBlog);
  return newBlog;
};
