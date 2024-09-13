"use client";

import { Recipe } from "../utils/types";
import DisplayRecipe from "../components/ui/DisplayRecipe";
import { useEffect, useState } from "react";
import { getRecipes } from "../api/firebase/firestore/getRecipes";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getRecipesFromDB = async () => {
      await getRecipes().then((r) => {
        setRecipes(r.result);
        setErrorMessage(r.error);
      });
    };

    return () => {
      getRecipesFromDB();
    };
  }, []);

  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center bg-background text-text">
      <h1 className="text-4xl font-semibold mt-20">Rezepte101</h1>
      <section className="flex flex-wrap justify-center mt-20 w-10/12">
        {recipes.map((recipe: Recipe, index: number) => (
          <DisplayRecipe recipe={recipe} key={index} />
        ))}
      </section>
      <p className="text-error mt-8">{errorMessage}</p>
    </main>
  );
}
