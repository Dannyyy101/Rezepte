'use server'

import { collection, getDocs, query, getDoc, limit, startAfter, doc } from "firebase/firestore"
import { db } from "../connection"
import { Ingredient, IngredientWithAmount, Recipe } from "@/app/utils/types";

export const getRecipes = async (numberOfItemsPerFetch: number, lastFetchedDoc: string | null): Promise<{ result: Recipe[], error: string, lastDoc: any, hasMore: boolean }> => {
    let result: Recipe[] = [];
    let error = "";
    let lastDoc = lastFetchedDoc;
    let hasMore = true;
    let q = null;

    if (lastFetchedDoc) {
        const lastFetchedDocRef = await getDoc(doc(db, 'recipes', lastFetchedDoc));
        q = query(collection(db, 'recipes'), startAfter(lastFetchedDocRef), limit(numberOfItemsPerFetch));
    } else {
        q = query(collection(db, 'recipes'), limit(numberOfItemsPerFetch));
    }

    const querySnapshot = await getDocs(q);
    if (querySnapshot.size < numberOfItemsPerFetch) {
        hasMore = false;

    }

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
        lastDoc = result[querySnapshot.size - 1].name;
    } else {
        if (!lastDoc) {
            error = "No recipes found";
        }
    }

    return { result, error, lastDoc, hasMore };
}
