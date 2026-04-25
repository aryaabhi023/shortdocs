"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendPasswordReset } from "@/config/firbaseAuth";
import toast from "react-hot-toast";

export default function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email);
      toast.success("Password reset email sent. Check your inbox.", {
        duration: 5000,
      });
      setError(null);
      setEmail("");
      router.push("/login");
    } catch (err) {
      setError(err.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] pb-2">
      <div className="flex flex-col gap-2 bg-neutral-100 p-8 py-4 w-[450px] rounded-2xl font-sans shadow-2xl my-16 border-[#ededef]">
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-4">
            Reset Password
          </h1>
          {error && (
            <p className="text-red-500 text-sm text-center py-2">{error}</p>
          )}

          <div className="flex flex-col">
            <label className="text-[#151717] font-semibold">Email</label>
          </div>
          <div className="flex items-center border border-[#ecedec] rounded-xl h-12 pl-2 transition focus-within:border-blue-600">
            <input
              placeholder="Enter your Email"
              className="ml-2 rounded-xl border-none outline-none w-full h-full font-sans"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-xl h-12 w-full cursor-pointer"
            type="submit"
          >
            Send Reset Email
          </button>

          <p className="text-center text-black text-sm my-1">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
