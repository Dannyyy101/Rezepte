"use client";

import { useState } from "react";
import { createUser } from "../api/firebase/auth/createUser";
import React from "react";
import { signOutUser } from "../api/firebase/auth/signOutUser";
import { signInUser } from "../api/firebase/auth/signInUser";
import Link from "next/link";
import Image from "next/image";
import background from "../../../public/login_background.png";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const { error } = await signInUser({ email, password });
    if (error) {
      if(error.includes("auth/invalid-credential")){
        setErrorMessage("Invalid email or password");
      }
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <main className="w-screen flex justify-center mt-28">
        <section className="hidden justify-center items-center w-3/12 h-128 bg-slate-400 rounded-l min-w-80 sm:flex">
          <Image src={background} alt="" />
        </section>
        <section className="flex flex-col items-center w-3/12 h-128 rounded border-border border min-w-80 sm:rounded-r sm:rounded-l-none">
          <div className="flex flex-col items-center w-11/12 h-128 mt-6">
            <h1 className="text-4xl">Login</h1>
            <input
              className="w-full h-10 focus:outline-none border-border border mt-16 pl-1 bg-transparent rounded"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <input
              className="w-full h-10 focus:outline-none border-border border mt-4 pl-1 bg-transparent rounded"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <div className="w-full flex mt-1">
              <Link
                href={"/register"}
                className="w-1/2 text-left text-sm text-text hover:underline"
              >
                Register
              </Link>
              <Link
                href={"/"}
                className="w-1/2 text-sm text-text flex justify-end hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              className="mt-16 border-primary border w-24 h-8 rounded bg-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <p className="text-center text-sm text-error mt-1">
              {errorMessage}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
