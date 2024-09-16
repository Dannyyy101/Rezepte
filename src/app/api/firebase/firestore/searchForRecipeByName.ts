import { Recipe } from "@/app/utils/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../connection";

export const searchForRecipeByName = async (name: string): Promise<{ result: Recipe[], error: string }> => {
    let result: Recipe[] = [];
    let error: string = "";
    const q = query(
        collection(db, "recipes"),
        where("name", ">=", name),
        where("name", "<=", name + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        result.push({
            ...doc.data()
        } as Recipe);
    });
    return { result, error }
}