"use client";
import { recipes } from "@/app/utils/exampleData";
import {
  Description,
  Ingredient,
  IngredientWithAmount,
  Recipe,
} from "@/app/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import downSymbol from "../../../../public/keyboard_double_arrow_down_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz48.svg";
import { useParams } from "next/navigation";

export default function DisplayRecipe() {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>(recipes[parseInt(params.id)-1]);
  const totalCalories = 400;

  return (
    <>
      <main className="min-w-screen  bg-background">
        <section className="min-h-screen grid grid-cols-3 justify-center items-center">
          <div className="h-full w-full flex justify-center">
            <DisplayIngredients recipe={recipe} totalCalories={totalCalories} />
          </div>
          <div className="flex flex-col items-center">
            {recipe.thumbnailUrl ? (
              <Image
                src={recipe.thumbnailUrl}
                alt=""
                width={496}
                height={496}
              ></Image>
            ) : (
              <div className="w-496 h-496"></div>
            )}
            <a href="#description" className="mt-16 animate-bounce">
              <Image src={downSymbol} alt="arrowDownSymbol"></Image>
            </a>
          </div>
        </section>
        <section id="description" className="w-11/12 flex justify-center">
          <DisplaySteps descriptions={recipe.description} />
        </section>
      </main>
    </>
  );
}

const DisplayIngredients = ({
  recipe,
  totalCalories,
}: {
  recipe: Recipe;
  totalCalories: number;
}) => {
  return (
    <>
      <section className="w-64 h-52 mt-24 border border-border">
        <h1 className="text-text text-2xl ml-2 mt-2">{recipe.name}</h1>
        <section className="flex flex-col m-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={"" + ingredient + index} className="w-full flex">
              <p className="text-text text-sm w-3/4">
                {ingredient.ingredient.name}
              </p>
              <p className="text-text text-sm w-1/4">
                {ingredient.amount}
                {ingredient.ingredient.unit}
              </p>
            </div>
          ))}
        </section>
        <section className="w-full h-14 flex border-t border-border items-center">
          <p className="ml-2 w-3/4 text-left">{recipe.durcation}min</p>
          <p className="mr-2 w-1/4">{totalCalories}kcal</p>
        </section>
      </section>
    </>
  );
};

const DisplaySteps = ({ descriptions }: { descriptions: Description[] }) => {
  return (
    <>
      <section className="w-11/12 mb-8">
        {descriptions.map((description, index) => (
          <section className="flex flex-col border-b border-b-border mb-2">
            <h1 className="text-xl text-text">Step: {index + 1}</h1>
            <p className="text-text mb-2">{description.text}</p>
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
