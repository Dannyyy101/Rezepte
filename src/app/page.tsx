"use client";
import Image from "next/image";
import { Recipe } from "./utils/types";
import { recipes } from "./utils/exampleData";

export default function Home() {
  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center bg-background text-text">
      <h1 className="text-4xl font-semibold mt-20">Rezepte101</h1>
      <section className="flex flex-wrap justify-center mt-20">
        {recipes.map((recipe: Recipe, index: number) => (
          <DisplayRecipe recipe={recipe} key={index} />
        ))}
      </section>
    </main>
  );
}

/**
 * Display of thumbnail of a recipe
 * @param {Recipe} recipe: the recipe that should be displayed
 */
const DisplayRecipe = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <section className="w-64 h-32 flex justify-center border border-secondary shadow-lg rounded m-4">
        <div className="w-4/12 h-1/2 flex justify-center mt-4">
          <Image src={""} alt={`thumbnail-from-${recipe.name}`} width={64} height={64} />
        </div>
        <section className="flex flex-col items-start w-8/12 h-1/2 mt-4">
          <h1 className="text-xl font-medium max-w-40">{recipe.name}</h1>
          <p className="text-secondary text-sm">Lorem ipsum</p>
        </section>
      </section>
    </>
  );
};
