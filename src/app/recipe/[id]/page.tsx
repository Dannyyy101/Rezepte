"use client";

import { Description, Recipe } from "@/app/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import downSymbol from "../../../../public/keyboard_double_arrow_down_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz48.svg";
import { useParams } from "next/navigation";
import { getRecipeByName } from "@/app/api/firebase/firestore/getRecipeByName";
import Loading from "@/app/components/ui/Loading";
import { loadImage } from "@/app/api/firebase/firestore/loadImage";
import Link from "next/link";
import React from "react";
import ErrorScreen from "@/app/components/ui/ErrorScreen";

export default function DisplayRecipe() {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    description: [],
    id: 0,
    ingredients: [],
    duration: 0,
    totalCalories: 0,
    portions: 1,
  });
  const [thumbnail, setThumbnail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      await getRecipeByName(params.id).then((result) => {
        if (result.result) {
          setRecipe(result.result);
        }
        setErrorMessage(result.error);
      });
    };
    fetchRecipe();
  }, [params.id]);

  useEffect(() => {
    const fetchThumbnail = async () => {
      if (recipe.thumbnailUrl) {
        const result = await loadImage(recipe.thumbnailUrl);
        setThumbnail(result.result);
      }
    };

    fetchThumbnail();
    setLoading(false);
  }, [recipe.thumbnailUrl]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {errorMessage === "" ? (
        <main className="min-w-screen bg-background">
          <section className="min-h-screen md:grid grid-cols-3 justify-center items-center flex flex-col">
            <div className="h-full w-full flex justify-center">
              <DisplayIngredients
                recipe={recipe}
                totalCalories={recipe.totalCalories}
              />
            </div>
            <div className="flex flex-col items-center">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt=""
                  width={496}
                  height={496}
                  priority={true}
                ></Image>
              ) : (
                <div className="w-496 h-496"></div>
              )}
              <a href="#description" className="mt-16 animate-bounce">
                <Image src={downSymbol} alt="arrowDownSymbol"></Image>
              </a>
            </div>
            <div className="absolute top-28 right-20 flex justify-center items-center">
              <Link
                href={`/updateRecipe/${recipe.name}`}
                className="h-10 w-20 border border-border rounded text-text flex justify-center items-center"
              >
                edit
              </Link>
            </div>
          </section>
          <section id="description" className="w-11/12 flex justify-center">
            <DisplaySteps descriptions={recipe.description} />
          </section>
        </main>
      ) : (
        <ErrorScreen errorMessage={errorMessage}/>
      )}
    </>
  );
}

const DisplayIngredients = ({
  recipe,
  totalCalories,
}: {
  recipe: Recipe;
  totalCalories: number | undefined;
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
          <p className="ml-2 w-1/2 text-left">{recipe.duration}min</p>

            <p className="mr-10 w-1/2 text-right">{recipe.portions}servings</p>
        </section>
      </section>
    </>
  );
};

const DisplaySteps = ({ descriptions }: { descriptions: Description[] }) => {
  const [descriptionImages, setDescriptionImages] = useState<
    { file: string; index: number }[]
  >([]);

  useEffect(() => {
    const fetchDescribtionImages = async () => {
      const promises = descriptions.map(async (e, index) => {
        if (e.imageUrl !== "") {
          const result = await loadImage(e.imageUrl);
          return { file: result.result, index };
        }
        return null;
      });

      const imageResults = await Promise.all(promises);

      const validImages = imageResults.filter((img) => img !== null) as {
        file: string;
        index: number;
      }[];
      setDescriptionImages(validImages);
    };

    fetchDescribtionImages();
  }, [descriptions]);

  return (
    <section className="w-11/12 mb-8">
      {descriptions.map((description, index) => (
        <section
          className="flex flex-col border-b border-b-border mb-2"
          key={index}
        >
          <h1 className="text-xl text-text">Step: {index + 1}</h1>
          <p className="text-text mb-2">{description.text}</p>
          {descriptionImages.find((img) => img.index === index) ? (
            <Image
              src={
                descriptionImages.find((img) => img.index === index)?.file || ""
              }
              alt={`image-for-step-${index}`}
              width={200}
              height={200}
              priority={true}
            />
          ) : null}
        </section>
      ))}
    </section>
  );
};
