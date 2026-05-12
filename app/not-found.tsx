import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500">Could not find the requested resource.</p>
      <Link href="/" className="btn inline-block">
        Return Home
      </Link>
    </div>
  );
}
