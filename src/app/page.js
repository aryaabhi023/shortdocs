import Link from "next/link";

function Home() {
  return (
    <div className="bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] min-h-screen">

      <div className="flex flex-col items-center pt-40">
        <h1 className="font-bold md:text-2xl text-xl border-b border-b-amber-200 m-2 my-4 p-2 px-6 bg-white rounded-xl shadow shadow-amber-200 italic">Welcome to the Short Docs App</h1>
        <p className="text-orange-500 italic">Your favorite short documentations in one place!</p>
        <div className="flex space-x-4 mt-4">
          <Link href="/write" className="bg-blue-300 px-4 py-2 rounded-xl italic">Write Docs</Link>
          <Link href="/read" className="bg-emerald-400 px-4 py-2 rounded-xl italic">Read Docs</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;