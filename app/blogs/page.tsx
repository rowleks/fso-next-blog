import Link from "next/link";

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "The Joys of Baking Sourdough",
      author: "Alice Peterson",
      url: "https://example.com/sourdough",
      likes: 12,
    },
    {
      id: 2,
      title: "Exploring the National Parks",
      author: "Bob Williams",
      url: "https://example.com/national-parks",
      likes: 25,
    },
    {
      id: 3,
      title: "Beginner's Guide to Python",
      author: "Charlie Davis",
      url: "https://example.com/python-guide",
      likes: 5,
    },
  ];
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      <ul className="list-none p-0 space-y-4">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="border-foreground border rounded-2xl p-4"
          >
            <Link href={blog.url}>
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
