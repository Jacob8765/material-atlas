import Link from "next/link";

export default function Navbar() {
  return (
    <div className="grid grid-cols-12 items-center gap-3 bg-gray-100 p-3">
      <div className="col-span-3 flex items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Material Atlas</h1>
          <p>For coastal construction</p>
        </div>
      </div>
      <div className="col-span-7 flex items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <p className="text-lg font-normal">About</p>
          </Link>
          <Link href="/database">
            <p className="text-lg font-normal">Database</p>
          </Link>
          <Link href="/upload">
            <p className="text-lg font-normal">Upload</p>
          </Link>
          <Link href="/upload">
            <p className="text-lg font-normal">Tools</p>
          </Link>
        </div>
      </div>
      <div className="justify-right col-span-2 flex items-center">
        <button className="items-end rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">Sign In</button>
        <Link href="/register" className="ml-2">
          <button className="items-end rounded border border-blue-500 px-4 py-2 font-bold hover:bg-blue-500">Register</button>
        </Link>
      </div>
    </div>
  );
}
