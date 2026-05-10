import Link from "next/link";
import { getUsers } from "../services/users.service";

const UsersPage = async () => {
  const allUsers = await getUsers();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
      </div>

      {allUsers.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <ul className="list-none p-0 space-y-4">
          {allUsers.map((user) => (
            <li
              key={user.id}
              className="border border-foreground rounded-2xl p-4 flex items-center justify-between"
            >
              <Link href={`/users/${user.username}`} className="flex-1">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <small className="text-gray-500">@{user.username}</small>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
