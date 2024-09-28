"use client";
import {
  Description,
  DescriptionImagesWithIndex,
  Ingredient,
  Recipe,
} from "@/app/utils/types";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import downSymbol from "../../../public/keyboard_double_arrow_down_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz48.svg";
import { addRecipe } from "../api/firebase/firestore/addRecipe";
import { FocuseChildComponent } from "../components/ui/FocusChildComponent";
import IngredientNotFound from "../components/ui/IngredientNotFound";
import NumberInputField from "../components/ui/NumberInputField";
import { saveImage } from "../api/firebase/firestore/saveImage";
import Navbar from "../components/ui/Navbar";
import AddImageButton from "../components/ui/AddImageButton";
import { useRouter } from "next/navigation";

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    id: -1,
    description: [{ text: "", imageUrl: "" }],
    ingredients: [
      { ingredient: { name: "", unit: "", calories: 0 }, amount: 0 },
    ],
    duration: 0,
    thumbnailUrl: "",
    portions: 0,
  });
  const [descriptionImages, setDescriptionImages] = useState<
    DescriptionImagesWithIndex[]
  >([]);
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ingredientNotFound, setIngredientNotFound] = useState<{
    ingredient: Ingredient;
    found: boolean;
  }>({ ingredient: { name: "", unit: "", calories: 0 }, found: true });

  const totalCalories = 400;
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files?.[0]);
    }
  };

  const submit = async () => {
    let thumbnailPath = "";
    let descriptions = [...recipe.description];
    if (image) {
      const { result, error } = await saveImage(
        image,
        "thumbnail",
        recipe.name
      );
      thumbnailPath = result;
      setErrorMessage(error);
    }
    if (descriptionImages.length > 0) {
      const descriptionPromises = descriptionImages.map(async (e) => {
        const { result, error } = await saveImage(
          e.file,
          "step" + e.index,
          recipe.name
        );
        descriptions[e.index - 1].imageUrl = result;
        setErrorMessage(error);
      });

      await Promise.all(descriptionPromises);
    }

    console.log(descriptions);
    const updatedRecipe: Recipe = {
      ...recipe,
      thumbnailUrl: thumbnailPath,
      description: descriptions,
    };

    const { error, product } = await addRecipe(updatedRecipe);
    if (error === "product-not-found" && product) {
      setIngredientNotFound({ ingredient: product, found: false });
    }

    if (error === "" && !product) {
      router.push("/");
    }
  };
  return (
    <>
      <main
        ref={mainRef}
        className="min-w-screen bg-background flex flex-col items-center"
      >
        <section className="min-h-screen md:grid grid-cols-3 justify-center items-center flex flex-col">
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
                src={URL.createObjectURL(image)}
                alt=""
                width={496}
                height={496}
                priority={true}
              ></Image>
            ) : (
              <div className="w-496 h-496 flex justify-center items-center">
                <AddImageButton
                  text="Add thumbnail"
                  handleClicked={handleThumbnailChange}
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
            setImages={setDescriptionImages}
            images={descriptionImages}
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
    temp.push({ amount: 0, ingredient: { name: "", unit: "", calories: 0 } });
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
  const addDuration = (duration: number) => {
    updateRecipe({ ...recipe, duration: duration });
  };
  const addPortions = (portions: number) => {
    updateRecipe({ ...recipe, portions: portions });
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
              <NumberInputField
                value={recipe.ingredients[index].amount}
                customStyle="text-text text-sm w-1/4 pl-1 bg-transparent border-b border-border"
                handleChange={(e) => addIngredientAmountAtIndex(e, index)}
              />
            </div>
          ))}
        </section>
        <div className="w-full h-8 flex justify-center">
          <button className="text-border" onClick={addIngredientField}>
            +
          </button>
        </div>
        <section className="w-full h-16 flex border-t border-border items-center">
          <div className="flex flex-col">
            <label className="ml-2 text-label">duration</label>
            <NumberInputField
              value={recipe.duration}
              handleChange={(e) => addDuration(e)}
              customStyle="ml-2 mr-2 w-3/4 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="ml-2 text-label">portions</label>
            <NumberInputField
              value={recipe.portions}
              handleChange={(e) => addPortions(e)}
              customStyle="ml-2 mr-2 w-3/4 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
            />
          </div>
        </section>
      </section>
    </>
  );
};

const DisplaySteps = ({
  descriptions,
  recipe,
  updateRecipe,
  images,
  setImages,
}: {
  descriptions: Description[];
  recipe: Recipe;
  updateRecipe: (recipe: Recipe) => void;
  images: DescriptionImagesWithIndex[];
  setImages: (i: DescriptionImagesWithIndex[]) => void;
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

  const addDescriptionImageAtIndex = async (
    image: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (image.target.files) {
      let temp = [...images];
      temp.push({ file: image.target.files?.[0], index: index });
      console.log(temp);
      setImages(temp);
    }
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
            {images[index] ? (
              <Image
                src={URL.createObjectURL(images[index].file)}
                alt={`image-for-step-${index}`}
                width={200}
                height={200}
              />
            ) : (
              <AddImageButton
                text={`Add image`}
                handleClicked={(e) => addDescriptionImageAtIndex(e, index + 1)}
              />
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
