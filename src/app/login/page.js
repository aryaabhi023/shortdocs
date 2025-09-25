'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login,signInWithGoogle } from "@/config/firbaseAuth";
import { useUserStore } from "@/context/useUserStore";

export default function Login() {

    const user = useUserStore((state) => state.user);

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setError(null);
            setEmail("");
            setPassword("");
            router.push('/');
        } catch (error) {
            setError(error.message);
        }
    }

    const handleClick = async () => {
      try {
        await signInWithGoogle();
        router.push('/');
      } catch (error) {
        setError(error.message);
      }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#c7d2fe] via-white to-[#fbcfe8] pb-2">
            <div className="flex flex-col gap-2 bg-neutral-100 p-8 py-4 w-[450px] rounded-2xl font-sans shadow border-l-2 my-16 border-l-orange-200 border-r-2 border-r-orange-200 border-t-2 border-t-emerald-200 border-b-2 border-b-emerald-200">
                <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
                    {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-[#151717] font-semibold">Email</label>
                    </div>
                    <div className="flex items-center border border-[#ecedec] rounded-xl h-12 pl-2 transition focus-within:border-blue-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 32 32"
                        >
                            <g>
                                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                            </g>
                        </svg>
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="-64 0 512 512"
                        >
                            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                        </svg>
                        <input
                            placeholder="Enter your Password"
                            className="ml-2 rounded-xl border-none outline-none w-full h-full font-sans"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Remember me */}
                    <div className="flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                            <input type="radio" />
                            <label className="text-sm text-black font-normal">
                                Remember me
                            </label>
                        </div>
                        <span className="text-sm ml-1 text-blue-600 font-medium cursor-pointer">
                            Forgot password?
                        </span>
                    </div>

                    {/* Sign In button */}
                    <button className="mt-5 mb-2 bg-[#151717] text-white text-sm font-medium rounded-xl h-12 w-full cursor-pointer" type="submit">
                        Sign In
                    </button>

                    {/* Sign up link */}
                    <p className="text-center text-black text-sm my-1">
                        Don't have an account?{" "}
                        <Link href={'/signup'} className="text-blue-600 font-medium cursor-pointer">
                            Sign Up
                        </Link>
                    </p>
                    <p className="text-center text-black text-sm my-1">Or With</p>

                    {/* Social buttons */}
                    <div className="flex flex-row gap-2">
                        <button className="mt-2 w-full h-12 rounded-xl flex justify-center items-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer hover:border-blue-600 transition" onClick={handleClick}>
                            {/* Google Icon */}
                            <svg
                                xmlSpace="preserve"
                                style={{ enableBackground: "new 0 0 512 512" }}
                                viewBox="0 0 512 512"
                                width={20}
                                height={20}
                            >
                                <path
                                    style={{ fill: "#FBBB00" }}
                                    d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                    c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                    C103.821,274.792,107.225,292.797,113.47,309.408z"
                                />
                                <path
                                    style={{ fill: "#518EF8" }}
                                    d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                    c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                    c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                                />
                                <path
                                    style={{ fill: "#28B446" }}
                                    d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                    c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                    c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                                />
                                <path
                                    style={{ fill: "#F14336" }}
                                    d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                    c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
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