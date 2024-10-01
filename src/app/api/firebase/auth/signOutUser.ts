

import { signOut } from "firebase/auth"
import { auth } from "../connection"

export const signOutUser =  () =>{
    signOut(auth)
}