"use client";
import Image from "next/image";
import React from "react";
import { deleteAccount } from "../api/firebase/auth/deleteAccount";
import { signOutUser } from "../api/firebase/auth/signOutUser";
export default function User() {
  const handleDeleteUser = () => {
    deleteAccount();
  };

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <>
      <main className="flex mt-30 w-screen ">
        <section className="ml-20 flex flex-col">
          <Image
            className="rounded-full text-text mt-16"
            src={
              "https://firebasestorage.googleapis.com/v0/b/nutrition101-42699.appspot.com/o/images%2Frecipes%2FHallo%2Fthumbnail.jpg?alt=media&token=d723a95b-ea5a-4319-86d3-e402eb75f7d3"
            }
            alt="profile-image"
            width={200}
            height={200}
          />
          <h1 className="mt-4 text-3xl">Daniel Stöcklein</h1>
          <button
            className="mt-72 h-10 w-32 border border-border rounded text-text flex justify-center items-center"
            onClick={handleSignOut}
          >
            sign out
          </button>
          <button
            className="mt-4 h-10 w-32 border border-error bg-error rounded text-text flex justify-center items-center"
            onClick={handleDeleteUser}
          >
            delete account
          </button>
        </section>
      </main>
    </>
  );
}
