import { DocumentReference } from "firebase/firestore";
import { InputHTMLAttributes } from "react";

export interface Recipe {
    id: number;
    name: string;
    ingredients: IngredientWithAmount[];
    description: Description[];
    thumbnailUrl?: string;
    duration: number;
    totalCalories?: number;
    portions: number;
}

export interface RecipeDBModel {
    id: number;
    name: string;
    ingredients: IngredientWithAmountDBModel[];
    description: Description[];
    thumbnailUrl?: string;
    duration?: number;
}

export interface IngredientWithAmountDBModel {
    ingredient: DocumentReference;
    amount: number;
}

export interface Ingredient {
    name: string;
    calories: number,
    unit: string;
}

export interface IngredientWithAmount {
    ingredient: Ingredient;
    amount: number;
}

export interface Description {
    text: string;
    imageUrl: string;
}

export interface Product {
    name: string;
    energy: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
    protein: number;
    salt: number;
    unit: string;
}

export interface InputFieldInterface {
    type: string;
    value: string;
    setFunction: (e: string) => void;
    style: string;
    placeholder?: string;
}

export interface DescriptionImagesWithIndex {
    file: File;
    index: number;
}
