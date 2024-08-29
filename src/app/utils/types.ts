export interface Recipe {
    id: number;
    name: string;
    ingredients: IngredientWithAmount[];
    description: Description[];
    thumbnailUrl: string;
}

export interface Ingredient {
    name: string;
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