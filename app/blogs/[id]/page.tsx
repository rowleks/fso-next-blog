import { likeBlog } from "@/app/actions/blogs.action";
import { getBlogById } from "@/app/services/blogs.service";
import Link from "next/link";
import { notFound } from "next/navigation";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    return notFound();
  }

  return (
    <div className="text-foreground">
      <div className="my-4">
        <h1>{blog.title}</h1>
        <small className="text-sm">Written by: {blog?.author}</small>
      </div>
      <p>
        Read more here:{" "}
        <Link
          href={blog.url}
          className="text-blue-600 underline hover:text-blue-400 transition duration-300"
        >
          {blog.url}
        </Link>
      </p>
      <div className="flex items-center gap-3">
        <h3 className="my-4">
          {blog.likes} <span className="text-base">likes</span>
        </h3>

        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button className="px-3 py-2s bg-blue-600 hover:bg-blue-400 transition duration-300 cursor-pointer rounded-full">
            Like
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetails;
