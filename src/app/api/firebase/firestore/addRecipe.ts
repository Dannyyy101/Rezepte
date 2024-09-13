'use server'
import { Ingredient, Recipe } from "@/app/utils/types";
import { doc, DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { db } from "../connection";

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
            console.log(product)
            error = "product-not-found";
            product = element.element;
            return { error, product }
        }
    }
    const ref = doc(db, "recipes", recipe.id.toString()).withConverter(recipeConverter);
    await setDoc(ref, recipe);



    return { error, product }
}

const recipeConverter = {
    toFirestore: (recipe: Recipe) => {
        const ingredientsWithRefs = recipe.ingredients.map((value) => {
            const productRef:DocumentReference = doc(db, 'products', value.ingredient.name);
            console.log(productRef.path)
            return {ingredient: productRef, amount: value.amount}
        })
        return {
            'name': recipe.name,
            'ingredients': ingredientsWithRefs,
            'description': recipe.description,
            'duration': recipe.durcation,
            'thubmnailUrl': recipe.thumbnailUrl
        };
    },fromFirestore: (snapshot:any, options:any) => {
        const data = snapshot.data(options);
        return null
    }
};