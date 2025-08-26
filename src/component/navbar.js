"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/shub-logo.svg";
import avatar from "../../public/avatar.svg";
import { useUserStore } from "@/context/useUserStore";
import { useEffect, useState } from "react";
import { listenToAuthChanges } from "@/config/firbaseAuth";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsub = listenToAuthChanges();
    return () => unsub();
  }, []);

  const linkClasses = (path) =>
    pathname === path
      ? "px-4 text-orange-400 font-bold"
      : "px-4 text-gray-700 hover:text-blue-500";

  return (
    <nav className="bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] w-full py-3 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">

        {/* LEFT - Logo */}
        <div className="absolute left-2 top-4.5 md:left-8">
          <Image src={Logo} alt="Short Docs Logo" width={80} height={40} />
        </div>

        {/* CENTER - Nav Links */}
        <div className="flex justify-center items-center space-x-4 border border-gray-300 rounded-full px-4 py-2 shadow-lg bg-white backdrop-blur-md"> 
          <Link href="/" className={linkClasses("/")}> Home </Link> 
          <Link href="/write" className={linkClasses("/write")}> Write </Link> 
          <Link href="/read" className={linkClasses("/read")}> Read </Link> 
        </div>

        {/* RIGHT */}
        <div className="absolute right-4 top-4">
          {/* Desktop - Auth / Avatar */}
          <div className="hidden md:flex items-center">
            {!user ? (
              <>
                <Link href='/login' className="px-3 text-gray-700 hover:text-blue-500 font-bold">Login</Link>
                <Link href='/signup' className="px-3 text-gray-700 hover:text-blue-500 font-bold">Signup</Link>
              </>
            ) : (
              <Link href={'/profile'}>
                <img
                  src={user?.photoURL || avatar.src}
                  alt="User Avatar"
                  width={35}
                  height={35}
                  className="rounded-full border"
                />
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            {!user ? (
              <button onClick={() => setIsOpen(!isOpen)}>
                <Menu size={28} />
              </button>
            ) : (
              <Link href={'/profile'}>
                <img
                  src={user?.photoURL || avatar.src}
                  alt="User Avatar"
                  width={35}
                  height={35}
                  className="rounded-full border"
                />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu for NOT logged in */}
      {!user && isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-3 mt-3 bg-white py-4 rounded shadow-lg">
          <Link href='/login' className="text-gray-700 hover:text-blue-500 font-bold" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href='/signup' className="text-gray-700 hover:text-blue-500 font-bold" onClick={() => setIsOpen(false)}>Signup</Link>
        </div>
      )}
    </nav>
  );
}
