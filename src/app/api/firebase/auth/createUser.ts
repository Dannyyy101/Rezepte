'use client'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../connection";
import { AppUser } from "@/app/utils/types";
import { doc, setDoc } from "firebase/firestore";

export const createUser = async ({ email, password, firstName, lastName, photoURL }: AppUser): Promise<{ error: string }> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (!user.email) {
            throw new Error("auth/email-already-in-use");
        }

        await setDoc(doc(db, "user", user.email), {
            email: email,
            firstName: firstName,
            lastName: lastName,
            photoURL: photoURL
        });

        return { error: "" };  // No error, return success
    } catch (error) {
        return { error: (error as Error).message };  // Return the error message on failure
    }
};
