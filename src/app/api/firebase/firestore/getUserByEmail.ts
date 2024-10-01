'use server'
import { AppUser, IngredientWithAmount, Recipe } from "@/app/utils/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../connection";
import { getIngredientsByReferences, recipeConverter } from "./recipeConverter";

export const getUserByEmail = async (name: string): Promise<{ result: AppUser | null, error: string }> => {
    let result = null;
    let error = "";

    const data = await getDoc(doc(db, "user", decodeURI(name)));
    if (data.exists()) {
        result = data.data() as AppUser;
    }
    return { result, error }
}