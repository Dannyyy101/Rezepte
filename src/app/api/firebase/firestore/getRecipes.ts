'use server'

import { collection, getDocs, query, getDoc } from "firebase/firestore"
import { db } from "../connection"
import { Ingredient, IngredientWithAmount, Recipe } from "@/app/utils/types";

export const getRecipes = async (): Promise<{ result: Recipe[], error: string }> => {
    let result: Recipe[] = [];
    let error = "";
    const q = query(collection(db, 'recipes'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
        result = await Promise.all(querySnapshot.docs.map(async (doc) => {

            const data = doc.data();
            const ingredients = await Promise.all(data.ingredients.map(async (e: any) => {
                const ingredientDoc = await getDoc(e.ingredient);
                if (ingredientDoc.exists()) {
                    const ingredientData: Ingredient = ingredientDoc.data() as Ingredient;
                    return { ingredient: { name: ingredientData.name, calories: ingredientData.calories, unit: ingredientData.unit } as Ingredient, amount: e.amount } as IngredientWithAmount;
                }
                return null;
            }));

            const filteredIngredients = ingredients.filter(ingredient => ingredient !== null);

            let recipe = { ...data };
            recipe.ingredients = filteredIngredients;
            recipe.ingredients.map((e: IngredientWithAmount) => {
                if (e.ingredient.calories) {
                    recipe.totalCalories += e.ingredient.calories * e.amount / 100
                }
            })
            return recipe as Recipe;
        }));
    } else {
        error = "No recipes found";
    }

    return { result, error };
}
