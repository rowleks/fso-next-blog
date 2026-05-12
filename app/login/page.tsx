"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const registered = searchParams.get("registered");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <div>
        {registered === "success" && (
          <p className="text-green-600">
            Registration successful! Please log in.
          </p>
        )}
      </div>
      <h1 className="text-3xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>

      <p className="text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}
