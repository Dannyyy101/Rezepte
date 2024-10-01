"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import light from "../../../../public/light_mode_48dp_11100E_FILL0_wght400_GRAD0_opsz48.svg";
import dark from "../../../../public/dark_mode_48dp_F1F0EE_FILL0_wght400_GRAD0_opsz48.svg";

import logo from "../../favicon.ico";

import React from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { AppUser } from "@/app/utils/types";
import { loadImage } from "@/app/api/firebase/firestore/loadImage";
import { getUserByEmail } from "@/app/api/firebase/firestore/getUserByEmail";

export default function Navbar() {
  const [theme, setTheme] = useState<string>("");
  const [profileImage, setProfileImage] = useState("");

  const { user } = useAuthContext() as { user: AppUser };
  useEffect(() => {
    getUserByEmail(user.email).then((e) => {
      if (e.result?.photoURL) {
        loadImage(e.result?.photoURL).then((image) => {
          setProfileImage(image.result);
        });
      }
    });
  }, [user.email]);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      setTheme("light");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <main className="sticky w-screen h-16 bg-background border-b-2 top-0 border-border flex">
        <section className="w-1/3 flex ml-2 items-center">
          <div className="flex items-center justify-center text-lg text-text ml-10">
            <Image
              className={`text-text w-15 h-15 ${
                theme === "light" ? "" : "invert"
              }`}
              src={logo}
              alt=""
              width={60}
              height={60}
            />
            <Link href={"/"} className="hover:text-primary">
              Home
            </Link>
          </div>
          <div className="flex items-center justify-center text-lg text-text ml-14 hover:text-primary">
            <Link href={"/createRecipe"}>create Recipe</Link>
          </div>
        </section>
        <div className="flex items-center justify-end text-lg text-text w-2/3">
          <button onClick={handleThemeChange} className="mr-8 text-text">
            <Image
              className="text-text"
              src={theme === "light" ? light : dark}
              alt=""
              width={32}
              height={32}
            />
          </button>
          {user ? (
            profileImage ? (
              <Link
                href={"/user"}
                className="w-10 h-10 mr-10 border-2 border-border rounded-full"
              >
                <Image
                  className="rounded-full text-text mr-16"
                  src={profileImage}
                  alt="profile-image"
                  width={40}
                  height={40}
                />
              </Link>
            ) : (
              <div className="w-10 h-10 mr-10"></div>
            )
          ) : (
            <Link
              className="flex items-center justify-center text-lg text-text mr-10 hover:text-primary"
              href={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
