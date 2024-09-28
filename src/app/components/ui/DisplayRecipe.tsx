"use client";
import { loadImage } from "@/app/api/firebase/firestore/loadImage";
import { Recipe } from "../../utils/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Displays a recipe
 * @param {Recipe} recipe: the recipe that should be displayed
 */
export default function DisplayRecipe({ recipe }: { recipe: Recipe }) {
  const [thumbnail, setThumbnail] = useState<string>("");
  useEffect(() => {
    const fetchThumbnail = async () => {
      if (recipe.thumbnailUrl) {
        const result = await loadImage(recipe.thumbnailUrl);
        setThumbnail(result.result);
      }
    };

    fetchThumbnail();
  }, []);
  return (
    <>
      <Link
        href={`recipe/${encodeURI(recipe.name)}`}
        className="w-64 h-32 flex justify-center border border-border shadow-lg rounded m-4"
      >
        <div className="w-4/12 h-1/2 flex justify-center mt-3">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={"thumbnail"}
              width={64}
              height={64}
              className="w-auto h-auto"
            ></Image>
          ) : (
            <div className="w-16 h-16"></div>
          )}
        </div>
        <section className="flex flex-col items-start w-8/12 h-1/2 mt-4">
          <h1 className="text-xl font-medium max-w-40">{recipe.name}</h1>
        </section>
      </Link>
    </>
  );
}
