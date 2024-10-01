"use client";

import { ChangeEvent, useRef, useState } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import background from "../../../public/login_background.png";
import { createUser } from "../api/firebase/auth/createUser";
import { useRouter } from "next/navigation";
import { AppUser } from "../utils/types";
import AddImageButton from "../components/ui/AddImageButton";
import { saveImage } from "../api/firebase/firestore/saveImage";
import { updateUser } from "../api/firebase/auth/updateUser";

export default function Register() {
  const [user, setUser] = useState<AppUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    let userTemp = user;

    const { error: createUserError } = await createUser(userTemp);
    if (createUserError) {
      if (createUserError.includes("auth/email-already-in-use")) {
        setErrorMessage("Email already exists");
        return;
      }
    } else {
      if (image) {
        const { result, error: imageError } = await saveImage(
          `user/${user.email}`,
          image,
          "profileImage",
          "profileImage"
        );
        if (imageError) {
          setErrorMessage(imageError);
          return;
        } else {
          userTemp.photoURL = result;
          await updateUser(userTemp);
        }
      }
    }
    router.push("/");
  };

  const handleProfileImageChange = (image: File) => {
    setImage(image);
  };
  return (
    <>
      <main className="w-screen flex justify-center mt-28" ref={mainRef}>
        <section className="hidden justify-center items-center w-3/12 h-128 bg-slate-400 rounded-l min-w-80 sm:flex">
          {image ? (
            <Image
              className="rounded-full border-border border-2"
              src={URL.createObjectURL(image)}
              alt=""
              width={200}
              height={200}
              priority={true}
            ></Image>
          ) : (
            <AddImageButton
              text="add profile image"
              handleClicked={handleProfileImageChange}
              mainRef={mainRef}
            />
          )}
        </section>
        <section className="flex flex-col items-center w-3/12 h-128 rounded border-border border min-w-80 sm:rounded-r sm:rounded-l-none">
          <div className="flex flex-col items-center w-11/12 h-128 mt-6">
            <h1 className="text-4xl">Register</h1>
            <div className="w-full flex mt-16">
              <input
                className="mr-2 w-1/2 h-10 focus:outline-none border-border border pl-1 bg-transparent rounded"
                value={user.firstName}
                type="text"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                placeholder="first name"
              />
              <input
                className="ml-2 w-1/2 h-10 focus:outline-none border-border border pl-1 bg-transparent rounded"
                value={user.lastName}
                type="text"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                placeholder="last name"
              />
            </div>
            <input
              className="w-full h-10 focus:outline-none border-border border mt-4 pl-1 bg-transparent rounded"
              value={user.email}
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
            <input
              className="w-full h-10 focus:outline-none border-border border mt-4 pl-1 bg-transparent rounded"
              value={user.password}
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
            <div className="w-full flex mt-1">
              <Link
                href={"/login"}
                className="w-1/2 text-left text-sm text-text hover:underline"
              >
                Login
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
              SignIn
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
