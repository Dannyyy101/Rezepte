'use server'
import { IngredientWithAmount, Recipe } from "@/app/utils/types";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../connection";
import { getIngredientsByReferences, recipeConverter } from "./recipeConverter";

export const getRecipeByName = async (name: string): Promise<{ result: Recipe | null, error: string }> => {
    let result = null;
    let error = "";

    const data = await getDoc(doc(db, "recipes", decodeURI(name)));
    if (data.exists()) {

        const ingredients = await getIngredientsByReferences(data.data().ingredients);

        let recipe = { ...data.data() };
        recipe.ingredients = ingredients;
        recipe.totalCalories = 0;
        recipe.ingredients.map((e: IngredientWithAmount) => {
            if (e.ingredient.calories) {
                recipe.totalCalories += e.ingredient.calories * e.amount / 100
            }
        })
        result = recipe as Recipe;
    }
    return { result, error }
}