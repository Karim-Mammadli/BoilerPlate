'use client'
import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (<section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="text-center">
          <h1 className="text-4xl font-bold text-white pb-3">BoilerPlate</h1>
          <h2 className="text-xl text-gray-500 mb-4">AI agent finding better dining court options @ Purdue</h2>
      </div>

      <div className="grid place-items-center mt-4">
          <button onClick={handleSignIn} className="w-52 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="w-52 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Sign In</span>
          </button>

          <button onClick={handleSignUp} className="w-52 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
              <span className="w-52 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Sign Up</span>
          </button>
      </div>
    </div>
  </section>);
}
