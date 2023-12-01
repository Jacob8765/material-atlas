import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import UserCard from "./UserCard";

export default async function Navbar() {
  const session = await getServerAuthSession();
  console.log("SESSION", session?.user);

  return (
    <div className="grid grid-cols-12 items-center gap-3 bg-gray-900 p-3">
      <div className="col-span-3 flex items-center">
        <Link href="/">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">Material Atlas</h1>
            <p className="text-white">For coastal construction</p>
          </div>
        </Link>
      </div>
      <div className="col-span-7 flex items-center">
        <div className="flex items-center gap-4">
          <Link href="/about">
            <p className="text-lg font-normal text-white">About</p>
          </Link>
          <Link href="/database">
            <p className="text-lg font-normal text-white">Database</p>
          </Link>
          <Link href="/upload">
            <p className="text-lg font-normal text-white">Upload</p>
          </Link>
          <Link href="/upload">
            <p className="text-lg font-normal text-white">Tools</p>
          </Link>
        </div>
      </div>
      {!session?.user ? (
        <div className="justify-right col-span-2 flex items-center">
          <Link href="/api/auth/signin">
            <button className="items-end rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">Sign In</button>
          </Link>
          <Link href="/register" className="ml-2">
            <button className="items-end rounded border border-blue-500 px-4 py-2 font-bold hover:bg-blue-500">Register</button>
          </Link>
        </div>
      ) : (
        <UserCard user={session.user} />
      )}
    </div>
  );
}
