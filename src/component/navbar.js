"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/shub-logo.svg";
import avatar from "../../public/avatar.svg";
import { useUserStore } from "@/context/useUserStore";
import { useEffect } from "react";
import { listenToAuthChanges } from "@/config/firbaseAuth";

export default function Navbar() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);  

   useEffect(() => {
    const unsub = listenToAuthChanges();
    return () => unsub();
  }, []);
  
  console.log("Navbar user:", user);

  const linkClasses = (path) =>
    pathname === path
      ? "px-4 text-orange-400 font-bold"
      : "px-4 text-gray-700 hover:text-blue-500";

  return (
    <div className="absolute bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] w-full flex justify-center items-center py-4 rounded">
      <div className="absolute left-20 hidden md:block">
        <Image src={Logo} alt="Short Docs Logo" width={100} height={50} />
      </div>

      <div className="flex items-center space-x-4 border border-gray-300 rounded-full px-4 py-2 shadow-lg bg-white backdrop-blur-md">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        <Link href="/write" className={linkClasses("/write")}>
          Write
        </Link>
        <Link href="/read" className={linkClasses("/read")}>
          Read
        </Link>
      </div>
      <div className="absolute right-20 hidden md:block">
        {!user && 
        <>
          <Link href='/login' className="px-4 text-gray-700 hover:text-blue-500 font-bold">Login</Link>
          <Link href='/signup' className="px-4 text-gray-700 hover:text-blue-500 font-bold">Signup</Link>
        </>
        }
        {user &&
        <div className="flex items-center bg-amber-50 p-1 rounded-full border border-gray-300 shadow-lg">
          <Link href={'/profile'}>
            <img
              src={user?.photoURL || avatar.src}
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
        </div>
        }
      </div>
    </div>
  );
}
