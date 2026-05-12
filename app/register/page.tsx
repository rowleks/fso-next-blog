"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { registerUser } from "../actions/auth.action";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, dispatchAction, isPending] = useActionState(registerUser, {
    error: "",
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <h1 className="text-3xl font-bold">Register</h1>
      <form
        action={dispatchAction}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="border px-3 py-2"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <button type="submit" className="btn" disabled={isPending}>
          {isPending ? "Registering..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </div>
  );
}
