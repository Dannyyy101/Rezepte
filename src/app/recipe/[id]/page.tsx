"use client";
import { recipes } from "@/app/utils/exampleData";
import { Description, IngredientWithAmount, Recipe } from "@/app/utils/types";
import { useState } from "react";
import Image from "next/image";

export default function DisplayRecipe() {
  const [recipe, setRecipe] = useState<Recipe>(recipes[0]);
  return (
    <>
      <main className="min-h-screen min-w-screen bg-background flex flex-col">
        <h1 className="text-5xl font-semibold text-primary mt-14 ml-6">
          {recipe.name}
        </h1>
        <section className="flex mt-20">
          <section className="flex flex-col ml-4 w-5/12">
            <DisplayIngredients ingredients={recipe.ingredients} />
          </section>
          <section className="flex flex-col w-7/12">
            <DisplaySetps descriptions={recipe.description} />
          </section>
        </section>
      </main>
    </>
  );
}

const DisplayIngredients = ({
  ingredients,
}: {
  ingredients: IngredientWithAmount[];
}) => {
  return (
    <>
      <section className="w-1/2 border border-primary ml-4">
        <h1 className="text-primary text-3xl text-center mt-2">Ingredients</h1>
        <section className="flex flex-col m-2">
          {ingredients.map((ingredient, index) => (
            <p className="text-secondary text-xl" key={"" + ingredient + index}>
              {ingredient.ingredient.name} {ingredient.amount}
              {ingredient.ingredient.unit}
            </p>
          ))}
        </section>
      </section>
    </>
  );
};

const DisplaySetps = ({ descriptions }: { descriptions: Description[] }) => {
  return (
    <>
      <section className="w-11/12">
        {descriptions.map((description, index) => (
          <section className="flex flex-col border-b border-b-primary mb-2">
            <h1 className="text-xl text-primary">Step: {index + 1}</h1>
            <p className="text-secondary mb-2">{description.text}</p>
            {description.imageUrl != "none" ? (
              <Image
                src={""}
                alt={`image-for-step-${index}`}
                width={200}
                height={200}
              />
            ) : (
              <></>
            )}
          </section>
        ))}
      </section>
    </>
  );
};
