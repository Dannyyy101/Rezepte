'use server'
import { Ingredient, Recipe } from "@/app/utils/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../connection";
import { recipeConverter } from "./recipeConverter";

export const addRecipe = async (recipe: Recipe): Promise<{ error: string, product: Ingredient | null }> => {
    let error = "";
    let product: Ingredient | null = null;

    const searchIngredients = recipe.ingredients.map(async (e) => {
        const ref = doc(db, 'products', e.ingredient.name);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return { element: e.ingredient, found: true };
        }
        return { element: e.ingredient, found: false };
    })

    const resolvedResult = await Promise.all(searchIngredients);

    for (let index = 0; index < resolvedResult.length; index++) {
        const element = resolvedResult[index];
        if (!element.found) {
            error = "product-not-found";
            product = element.element;
            return { error, product }
        }
    }
    const ref = doc(db, "recipes", recipe.name).withConverter(recipeConverter);
    await setDoc(ref, recipe);

    return { error, product }
}

