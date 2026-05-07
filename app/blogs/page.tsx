import Link from "next/link";
import { getBlogs } from "../services/blogs.service";

const BlogList = () => {
  const blogs = getBlogs();
  return (
    <div className="p-4">
      <button className="border px-4 py-2 cursor-pointer bg-blue-600">
        <Link href="/blogs/new">Add Blog</Link>
      </button>
      <h2 className="text-2xl font-bold my-5">Recent Posts</h2>
      <ul className="list-none p-0 space-y-4">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li
              key={blog.id}
              className="border-foreground border rounded-2xl p-4"
            >
              <Link href={`/blogs/${blog.id}`}>
                <h3 className="text-xl font-semibold mb-1">{blog.title}</h3>
                <small>By {blog.author}</small>
                <p>Likes: {blog.likes}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
