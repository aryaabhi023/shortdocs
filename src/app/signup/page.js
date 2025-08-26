'use client';
import { signup, signInWithGoogle } from "@/config/firbaseAuth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/useUserStore";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const user = useUserStore((state) => state.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password should be at least 6 characters");
        return;
      }

      await signup(email, password, name);

      toast.success("Please verify your email before logging in!", {
        duration: 5000, // 5 seconds
        style: {
          background: '#4ade80',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '12px',
        },
      });

      setError(null);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");

    }
    catch (error) {
      setError(error.message);
    }
  }

  const handleClick = async () => {
    try {
      const result = await signInWithGoogle();
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] pb-2">
      <div className="flex flex-col gap-2 bg-white p-8 py-4 w-[450px] rounded-2xl font-sans shadow mx-auto my-16 border-l-2 border-l-orange-200 border-r-2 border-r-orange-200 border-t-2 border-t-emerald-200 border-b-2 border-b-emerald-200">
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
          {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-[#151717] font-semibold">Full Name</label>
          </div>
          <div className="flex items-center border border-[#ecedec] rounded-xl h-12 pl-2 transition focus-within:border-blue-600">
            <input
              placeholder="Enter your Name"
              className="ml-2 rounded-xl border-none outline-none w-full h-full font-sans"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-[#151717] font-semibold">Password</label>
          </div>
          <div className="flex items-center border border-[#ecedec] rounded-xl h-12 pl-2 transition focus-within:border-blue-600">
            <input
              placeholder="Enter your Password"
              className="ml-2 rounded-xl border-none outline-none w-full h-full font-sans"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-[#151717] font-semibold">Confirm Password</label>
          </div>
          <div className="flex items-center border border-[#ecedec] rounded-xl h-12 pl-2 transition focus-within:border-blue-600">
            <input
              placeholder="Re-enter your Password"
              className="ml-2 rounded-xl border-none outline-none w-full h-full font-sans"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up button */}
          <button className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-xl h-12 w-full cursor-pointer" type="submit">
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-center text-black text-sm my-1">
            Already have an account?{" "}
            <Link href={'/login'} className="text-blue-600 font-medium cursor-pointer">
              Sign In
            </Link>
          </p>
          <p className="text-center text-black text-sm my-1">Or Sign Up With</p>

          {/* Social buttons */}
          <div className="flex flex-row gap-2">
            {/* Google */}
            <button className="mt-2 w-full h-12 rounded-xl flex justify-center items-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer hover:border-blue-600 transition" onClick={handleClick}>
              <svg
                viewBox="0 0 512 512"
                width={20}
                height={20}
              >
                <path
                  fill="#FBBB00"
                  d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                c0-42.451,10.324-82.483,28.624-117.732l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                C103.821,274.792,107.225,292.797,113.47,309.408z"
                />
                <path
                  fill="#518EF8"
                  d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                c-12.462,58.683-45.025,109.925-90.134,146.187l-73.044-3.727l-10.338-64.535
                c29.932-17.554,53.324-45.025,65.646-77.911H272.9V208.176h138.887L507.527,208.176z"
                />
                <path
                  fill="#28B446"
                  d="M416.253,455.624C372.396,490.901,316.666,512,256,512
                c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91
                c21.619,57.698,77.278,98.771,142.53,98.771
                c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                />
                <path
                  fill="#F14336"
                  d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                c-66.729,0-123.429,42.957-143.965,102.724L29.14,136.344
                C71.23,56.123,157.06,0,256,0
                C318.115,0,375.068,22.126,419.404,58.936z"
                />
              </svg>
              Google
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
