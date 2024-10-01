import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../connection";
import { AppUser } from "@/app/utils/types";

export const signInUser = ({ email, password }: { email: string, password: string }): Promise<{ error: string }> => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { error: "" }
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
            return { error: errorMessage }
        });


}