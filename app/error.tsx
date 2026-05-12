'use client'

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>
      <p className="text-gray-500">An unexpected error occurred.</p>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
