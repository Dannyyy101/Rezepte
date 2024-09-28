"use client";
import { useState } from "react";
import DisplayRecipes from "./components/ui/DisplayRecipes";
import FindRecipe from "./components/ui/FindRecipe";
import Navbar from "./components/ui/Navbar";
import { Recipe } from "./utils/types";
import DisplayRecipe from "./components/ui/DisplayRecipe";

export default function Home() {
  const [searchResult, setSearchResult] = useState<Recipe[]>([]);

  return (
    <main className="flex min-w-screen flex-col items-center bg-background text-text">
      <h1 className="text-5xl font-semibold mt-20">Rezepte101</h1>
      <FindRecipe setSearchResult={setSearchResult} />
      <section className="mt-20 w-11/12 flex justify-center">
        {searchResult.length > 0 ? (
          <DisplayRecipes recipesToDisplay={searchResult} />
        ) : (
          <DisplayRecipes />
        )}
      </section>
    </main>
  );
}
