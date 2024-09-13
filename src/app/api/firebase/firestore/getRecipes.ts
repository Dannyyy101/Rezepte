'use server'

import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../connection"
import { Recipe } from "@/app/utils/types";

export const getRecipes = async (): Promise<{result: Recipe[], error:string}> => {
    let result: Recipe[] = [];
    let error = "";
    const q = query(collection(db, 'recipes'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
        result = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const recipe:Recipe = {
                name: data.name,
                id: data.id,
                description: [],
                ingredients: []
            }
            return recipe;
        });
    }else{
        error = "No recipes found"
    }
    return {result, error};
}