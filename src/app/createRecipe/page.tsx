"use client";
import { recipes } from "@/app/utils/exampleData";
import {
  Description,
  Ingredient,
  IngredientWithAmount,
  Recipe,
} from "@/app/utils/types";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import imageSymbol from "../../../public/image_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz20.svg";
import downSymbol from "../../../public/keyboard_double_arrow_down_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz48.svg";
import { addRecipe } from "../api/firebase/firestore/addRecipe";
import { FocuseChildComponent } from "../components/ui/FocusChildComponent";
import IngredientNotFound from "../components/ui/IngredientNotFound";

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    id: -1,
    description: [{ text: "", imageUrl: "" }],
    ingredients: [{ ingredient: { name: "", unit: "", calories:0 }, amount: 0 }],
    durcation: 0,
    thumbnailUrl: "",
  });
  const [image, setImage] = useState<string>();
  const [ingredientNotFound, setIngredientNotFound] = useState<{
    ingredient: Ingredient;
    found: boolean;
  }>({ ingredient: { name: "", unit: "", calories: 0 }, found: true });

  const totalCalories = 400;
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleHiddenInputFieldClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const submit = async () => {
    const { error, product } = await addRecipe(recipe);
    if (error === "product-not-found" && product) {
      setIngredientNotFound({ ingredient: product, found: false });
    }
  };

  return (
    <>
      <main
        ref={mainRef}
        className="min-w-screen bg-background flex flex-col items-center z-0"
      >
        <section className="min-h-screen grid grid-cols-3 justify-center items-center">
          <div className="w-full h-full flex justify-center">
            <div>
              <DisplayIngredients
                recipe={recipe}
                totalCalories={totalCalories}
                updateRecipe={setRecipe}
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            {image ? (
              <Image
                src={image}
                alt=""
                width={496}
                height={496}
                priority={true}
              ></Image>
            ) : (
              <div className="w-496 h-496 flex justify-center items-center">
                <button
                  className="w-48 flex items-center border-border border p-2"
                  onClick={handleHiddenInputFieldClick}
                >
                  <Image
                    src={imageSymbol}
                    alt="imageSymbol"
                    width={32}
                    height={32}
                  />
                  <p>Add thumbnail</p>
                </button>
                <input
                  id="hiddenFileInput"
                  type="file"
                  className="hidden"
                  ref={hiddenFileInput}
                  value={image}
                  onChange={(e) => handleThumbnailChange(e)}
                />
              </div>
            )}
            <button className="border-border border p-2" onClick={submit}>
              Create recipe
            </button>
            <a href="#description" className="mt-16 animate-bounce">
              <Image
                src={downSymbol}
                alt="arrowDownSymbol"
                priority={true}
              ></Image>
            </a>
          </div>
        </section>
        <section id="description" className="w-11/12 flex justify-center">
          <DisplaySteps
            descriptions={recipe.description}
            recipe={recipe}
            updateRecipe={setRecipe}
          />
        </section>

        {ingredientNotFound.found ? (
          <></>
        ) : (
          <FocuseChildComponent
            mainRef={mainRef}
            handleClicked={(b: boolean) =>
              setIngredientNotFound({ ...ingredientNotFound, found: b })
            }
          >
            <IngredientNotFound
              ingredient={ingredientNotFound.ingredient}
              setVisibility={(b: boolean) =>
                setIngredientNotFound({ ...ingredientNotFound, found: b })
              }
            />
          </FocuseChildComponent>
        )}
      </main>
    </>
  );
}

const DisplayIngredients = ({
  recipe,
  totalCalories,
  updateRecipe,
}: {
  recipe: Recipe;
  totalCalories: number;
  updateRecipe: (recipe: Recipe) => void;
}) => {
  const addIngredientField = () => {
    let temp = recipe.ingredients;
    temp.push({ amount: 0, ingredient: { name: "", unit: "" } });
    updateRecipe({ ...recipe, ingredients: temp });
  };

  const addIngredientNameAtIndex = (name: string, index: number) => {
    let temp = recipe.ingredients;
    temp[index] = {
      ...temp[index],
      ingredient: { ...temp[index].ingredient, name: name },
    };
    updateRecipe({ ...recipe, ingredients: temp });
  };
  const addIngredientAmountAtIndex = (amount: number, index: number) => {
    let temp = recipe.ingredients;
    temp[index] = {
      ...temp[index],
      amount: amount,
    };
    updateRecipe({ ...recipe, ingredients: temp });
  };
  return (
    <>
      <section className="w-64 min-h-36 mt-24 border border-border">
        <input
          className="mt-2 ml-2 w-3/4 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
          placeholder="name"
          value={recipe.name}
          onChange={(e) => updateRecipe({ ...recipe, name: e.target.value })}
        />
        <section className="flex flex-col m-2">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={"" + ingredient + index} className="w-full flex mt-1">
              <input
                className="text-text text-sm w-3/4 pl-1 bg-transparent border-b border-border focus:outline-none mr-1"
                placeholder="ingredient"
                value={recipe.ingredients[index].ingredient.name}
                onChange={(e) =>
                  addIngredientNameAtIndex(e.target.value, index)
                }
              />
              <input
                className="text-text text-sm w-1/4 pl-1 bg-transparent border-b border-border focus:outline-none ml-1"
                placeholder="amount"
                value={recipe.ingredients[index].amount}
                onChange={(e) =>
                  addIngredientAmountAtIndex(parseInt(e.target.value), index)
                }
              />
            </div>
          ))}
        </section>
        <div className="w-full h-8 flex justify-center">
          <button className="text-border" onClick={addIngredientField}>
            +
          </button>
        </div>
        <section className="w-full h-12 flex border-t border-border items-center">
          <input
            type="number"
            className="ml-2 w-3/4 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
            placeholder="durcation"
          />
        </section>
      </section>
    </>
  );
};

const DisplaySteps = ({
  descriptions,
  recipe,
  updateRecipe,
}: {
  descriptions: Description[];
  recipe: Recipe;
  updateRecipe: (recipe: Recipe) => void;
}) => {
  const addIngredientField = () => {
    let temp = recipe.description;
    temp.push({ text: "", imageUrl: "" });
    updateRecipe({ ...recipe, description: temp });
  };
  const addDescriptionTextAtIndex = (text: string, index: number) => {
    let temp = recipe.description;
    temp[index] = { text: text, imageUrl: "" };
    updateRecipe({ ...recipe, description: temp });
  };
  return (
    <>
      <section className="w-11/12 mb-8">
        {descriptions.map((description, index) => (
          <section
            className="flex flex-col mb-2"
            key={description.imageUrl + index}
          >
            <h1 className="text-xl text-text">Step: {index + 1}</h1>
            <input
              className="text-text mb-2 pl-1 bg-transparent border-b border-border focus:outline-none"
              value={recipe.description[index].text}
              onChange={(e) => addDescriptionTextAtIndex(e.target.value, index)}
            />
            {description.imageUrl ? (
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
        <div className="w-full h-8 flex justify-center">
          <button className="text-border" onClick={addIngredientField}>
            +
          </button>
        </div>
      </section>
    </>
  );
};
