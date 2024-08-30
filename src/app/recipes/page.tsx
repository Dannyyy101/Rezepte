"use client";
import Image from "next/image";
import { Recipe } from "../utils/types";
import { recipes } from "../utils/exampleData";
import DisplayRecipe from "../components/DisplayRecipe";

export default function Recipes() {
  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center bg-background text-text">
      <h1 className="text-4xl font-semibold mt-20">Rezepte101</h1>
      <section className="flex flex-wrap justify-center mt-20 w-10/12">
        {recipes.map((recipe: Recipe, index: number) => (
          <DisplayRecipe recipe={recipe} key={index} />
        ))}
      </section>
    </main>
  );
}

