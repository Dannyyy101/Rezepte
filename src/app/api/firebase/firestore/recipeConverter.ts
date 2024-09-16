import { Ingredient, IngredientWithAmount, IngredientWithAmountDBModel, Product, Recipe, RecipeDBModel } from "@/app/utils/types";
import { doc, DocumentReference, FirestoreDataConverter, getDoc, WithFieldValue } from "firebase/firestore";
import { db } from "../connection";

export const recipeConverter: FirestoreDataConverter<Recipe, RecipeDBModel> = {
    toFirestore: (recipe: WithFieldValue<Recipe>): WithFieldValue<RecipeDBModel> => {
        let ingredientsWithRefs;
        if (Array.isArray(recipe.ingredients)) {
            ingredientsWithRefs = recipe.ingredients.map((value: any) => {
                const productRef: DocumentReference = doc(db, 'products', value.ingredient.name);
                return { ingredient: productRef, amount: value.amount };
            });
        }
        return {
            id: recipe.id,
            name: recipe.name,
            ingredients: ingredientsWithRefs,
            description: recipe.description,
            duration: recipe.duration,
            thumbnailUrl: recipe.thumbnailUrl
        } as WithFieldValue<RecipeDBModel>;

    }, fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);

        return {
            name: data.name,
            ingredients: data.ingredients,
            description: data.description,
            duration: data.duration,
            thumbnailUrl: data.thumbnailUrl,
        } as Recipe;
    }
};

export const getIngredientsByReferences = async (ingredients: IngredientWithAmountDBModel[]) => {
    const data = await Promise.all(ingredients.map(async (e: any) => {
        const ingredientDoc = await getDoc(e.ingredient);
        if (ingredientDoc.exists()) {
            const ingredientData: Product = ingredientDoc.data() as Product;
            return { ingredient: { name: ingredientData.name, calories: ingredientData.energy, unit: ingredientData.unit } as Ingredient, amount: e.amount } as IngredientWithAmount;
        }
        return null;
    }));
    return data.filter(ingredient => ingredient !== null);
}