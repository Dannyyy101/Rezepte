import { Recipe } from "../utils/types";
import Image from "next/image";

/**
 * Display of thumbnail of a recipe
 * @param {Recipe} recipe: the recipe that should be displayed
 */
export default function DisplayRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <section className="w-64 h-32 flex justify-center border border-secondary shadow-lg rounded m-4">
        <div className="w-4/12 h-1/2 flex justify-center mt-4">
          <Image
            src={""}
            alt={`thumbnail-from-${recipe.name}`}
            width={64}
            height={64}
          />
        </div>
        <section className="flex flex-col items-start w-8/12 h-1/2 mt-4">
          <h1 className="text-xl font-medium max-w-40">{recipe.name}</h1>
          <p className="text-secondary text-sm">Lorem ipsum</p>
        </section>
      </section>
    </>
  );
}
