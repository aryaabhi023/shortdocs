"use client";
import { logout } from "@/config/firbaseAuth";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/useUserStore";
import { useEffect } from "react";
import avatar from "../../../public/avatar.svg";

export default function Profile() {
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const handleClick = async () => {
    await logout();
  };

 useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] pb-2 gap-4">
      <div className="w-[300px] h-[254px] bg-[#927dc3] rounded-[15px] shadow-[1px_5px_60px_0px_rgba(16,10,136,0.42)]">
        <div className="w-[80%] h-[3%] bg-[#9d98f9] mx-auto rounded-b-[15px]" />
        <div className="w-[100px] h-[80px] bg-[#9894f1] rounded-[15px] mx-auto mt-[25px]">
            <img
                src={user?.photoURL || avatar.src}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-[15px]"
            />
        </div>
        <span className="font-semibold text-white text-center block pt-[10px] text-[16px]">
          {user.displayName || "Anonymous"}
        </span>
        <p className="font-normal text-white text-center pt-[3px] text-[12px]">
          {user?.email}
        </p>
        <button
          className="px-[25px] py-[8px] block mx-auto rounded-[8px] mt-[30px] bg-[#9e99ef] text-white font-semibold hover:bg-[#817ce2]"
          onClick={handleClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
