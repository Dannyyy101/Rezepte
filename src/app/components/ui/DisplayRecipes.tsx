"use client";

import { getRecipes } from "@/app/api/firebase/firestore/getRecipes";
import { Recipe } from "@/app/utils/types";
import { useCallback, useEffect, useState } from "react";
import DisplayRecipe from "./DisplayRecipe";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

interface DisplayRecipeProps {
  recipesToDisplay?: Recipe[];
}

export default function DisplayRecipes({
  recipesToDisplay,
}: DisplayRecipeProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const getInitialRecipes = async () => {
    try {
      const r = await getRecipes(12, null);
      setRecipes(r.result);
      setLastDoc(r.lastDoc);
      setHasMore(r.hasMore);
      setErrorMessage(r.error || "");
    } catch (error) {
      setErrorMessage("Failed to fetch recipes.");
    }
  };

  useEffect(() => {
    if (recipesToDisplay && recipesToDisplay.length > 0) {
      setRecipes(recipesToDisplay);
      setHasMore(false); 
    } else if (recipesToDisplay && recipesToDisplay.length === 0) {
      setRecipes([]);
      setLastDoc(null);
      setHasMore(true);
      getInitialRecipes();
    } else if (!recipesToDisplay) {
      getInitialRecipes();
    }
  }, [recipesToDisplay]);

  const fetchMoreRecipes = useCallback(async () => {
    if (hasMore && (!recipesToDisplay || recipesToDisplay.length === 0)) {
      try {
        const r = await getRecipes(3, lastDoc);
        setRecipes((prevRecipes) => [...prevRecipes, ...r.result]);
        setErrorMessage(r.error || "");
        setLastDoc(r.lastDoc);
        setHasMore(r.hasMore);
      } catch (error) {
        setErrorMessage("Failed to fetch more recipes.");
      }
    }
  }, [hasMore, lastDoc, recipesToDisplay]);

  return (
    <InfiniteScroll
      dataLength={recipes.length}
      next={fetchMoreRecipes}
      hasMore={hasMore}
      loader={<Loading height="16"/>}
    >
      <main className="flex w-screen flex-col items-center bg-background text-text mt-8">
        <section className="flex flex-wrap justify-center w-10/12">
          {recipes.map((recipe: Recipe, index: number) => (
            <DisplayRecipe recipe={recipe} key={index} />
          ))}
        </section>
        <p className="text-error mt-8">{errorMessage}</p>
      </main>
    </InfiniteScroll>
  );
}
