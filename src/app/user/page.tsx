"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { deleteAccount } from "../api/firebase/auth/deleteAccount";
import { signOutUser } from "../api/firebase/auth/signOutUser";
import { useAuthContext } from "../context/AuthContext";
import { AppUser } from "../utils/types";
import { useRouter } from "next/navigation";
export default function User() {
  const { user } = useAuthContext() as { user: AppUser };
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleDeleteUser = () => {
    deleteAccount();
  };

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <>
      {user && (
        <main className="flex mt-30 w-screen ">
          <section className="ml-20 flex flex-col">
            {user.photoURL && (
              <Image
                className="rounded-full text-text mt-16"
                src={user.photoURL}
                alt="profile-image"
                width={192}
                height={192}
              />
            )}
            <h1 className="mt-4 text-3xl">
              {user.firstName} {user.lastName}
            </h1>
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
      )}
    </>
  );
}
