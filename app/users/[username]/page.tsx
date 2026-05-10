import { getUserByUsername } from "@/app/services/users.service";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) return notFound();

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-500 mt-1">@{user.username}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Blogs</h2>

        {user.blogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet.</p>
        ) : (
          <ul className="space-y-3">
            {user.blogs
              .slice()
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li
                  key={blog.id}
                  className="border border-foreground rounded-2xl p-4"
                >
                  <Link href={`/blogs/${blog.id}`}>
                    <h3 className="text-lg font-medium">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {blog.likes} {blog.likes === 1 ? "like" : "likes"}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
