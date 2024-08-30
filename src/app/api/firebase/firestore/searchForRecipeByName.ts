import { Recipe } from "@/app/utils/types";

export const searchForRecipeByName = async (name: string): Promise<{ result: Recipe[], error: string }> => {
    let result: Recipe[] = [];
    let error: string = "";

    return { result, error }
}