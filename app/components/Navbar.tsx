"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="text-foreground p-4 flex items-center justify-between">
        <div className="my-2 space-x-5 underline underline-offset-5">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/users">Users</Link>
        </div>
        <div className="ml-auto">
          {session ? (
            <>
              <div className="space-x-2">
                <span>Welcome {session.user?.name}</span>
                <button className="btn">
                  <Link href="/blogs/new">Add Blog</Link>
                </button>
              </div>
              <button
                onClick={() => signOut()}
                className="btn outline-red-500 bg-transparent"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn bg-green-500">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
