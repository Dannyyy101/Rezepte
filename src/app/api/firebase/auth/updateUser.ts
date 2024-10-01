import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../connection";
import { AppUser } from "@/app/utils/types";

export const updateUser = async (user: AppUser) => {
    const userRef = doc(db, "user", user.email);

    await setDoc(userRef, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        photoURL: user.photoURL
    })

}