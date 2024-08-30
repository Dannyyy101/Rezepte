"use client";
import { recipes } from "@/app/utils/exampleData";
import { Description, IngredientWithAmount, Recipe } from "@/app/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import InputField from "../components/InputField";

export default function DisplayRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    id: 0,
    description: [{ text: "", imageUrl: "none" }],
    ingredients: [{ amount: 0, ingredient: { name: "", unit: "" } }],
    thumbnailUrl: "none",
  });

  useEffect(() => {
    console.log(recipe);

    return () => {};
  }, [recipe]);

  const handleIngredientsChange = (
    incredient: IngredientWithAmount,
    index: number
  ) => {
    console.log(incredient)
    let arr = recipe;
    arr.ingredients[index] = incredient;
    setRecipe({...recipe, ingredients:arr.ingredients});
  };

  const addIngredientField = () => {
    let arr = recipe;
    arr.ingredients.push({ ingredient: { name: "", unit: "" }, amount: 0 });
    setRecipe({...recipe, ingredients:arr.ingredients});
  };

  return (
    <>
      <main className="min-h-screen min-w-screen bg-background flex flex-col">
        <h1 className="text-5xl font-semibold text-primary mt-14 ml-6">
          <InputField
            setFunction={(n: string) => {
              setRecipe({ ...recipe, name: n });
            }}
            type="text"
            value={recipe.name}
            style="w-80 focus:outline-none pl-2 pr-2 h-10 text-lg bg-background border border-primary"
          />
        </h1>
        <section className="flex mt-20">
          <section className="flex flex-col ml-4 w-5/12">
            <DisplayIngredients
              ingredients={recipe.ingredients}
              addIngredient={handleIngredientsChange}
              addOneField={addIngredientField}
            />
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
  addIngredient,
  addOneField,
}: {
  ingredients: IngredientWithAmount[];
  addIngredient: (e:IngredientWithAmount, i:number) => void;
  addOneField: () => void;
}) => {
  return (
    <>
      <section className="w-1/2 border border-primary ml-4">
        <h1 className="text-primary text-3xl text-center mt-2">Ingredients</h1>
        <section className="flex flex-col m-2">
          {ingredients.map((value, index) => (
            <div className="flex w-full" key={"ingredient: " + index}>
              <InputField
                setFunction={(n: string) => {
                  addIngredient({
                    ingredient: { name: n, unit: "" },
                    amount: value.amount,
                  }, index);
                }}
                type="text"
                value={value.ingredient.name}
                style="w-2/3 focus:outline-none pl-2 pr-2 h-10 text-secondary bg-background border border-primary"
              />
              <InputField
                setFunction={(n: string) => {
                  addIngredient({
                    ingredient: value.ingredient,
                    amount: parseInt(n),
                  }, index);
                }}
                type="number"
                value={value.amount.toString()}
                style="w-1/3 focus:outline-none pl-2 pr-2 h-10 text-secondary bg-background border border-primary"
                key={"ingredient: " + index}
              />
            </div>
          ))}
          <button onClick={addOneField}>+</button>
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
          <section
            className="flex flex-col border-b border-b-primary mb-2"
            key={"description: " + index}
          >
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
