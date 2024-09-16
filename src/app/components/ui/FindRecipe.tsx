"use client";
import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import { Recipe } from "../../utils/types";
import { searchForRecipeByName } from "../../api/firebase/firestore/searchForRecipeByName";
import DisplayRecipe from "./DisplayRecipe";
import { recipes } from "../../utils/exampleData";

export default function FindRecipe() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Recipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const debounceSearch = async (search: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    if (searchRef.current && searchRef.current.value === search) {
      return false;
    }
    return true;
  };

  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (result: string) => {
    setSearch(result);
    const succes = await debounceSearch(result);
    if (succes) {
      return;
    }
    if (result.length > 0) {
      await searchForRecipeByName(result).then((r) => {
        setSearchResult(r.result);
        setErrorMessage(r.error);
      });
    } else {
      setSearchResult([]);
    }
  };

  return (
    <>
      <section className="w-full flex justify-center items-center flex-col">
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="min-w-80 w-1/3 h-10 text-text pl-2 pr-2 focus: outline-none border-text border-2 bg-background"
          placeholder="Search"
        />
        <p className="text-error text-center mt-1">{errorMessage}</p>
        <section className="w-full mt-8 flex flex-wrap justify-center">
          {searchResult.map((recipe: Recipe, index: number) => (
            <DisplayRecipe recipe={recipe} key={index} />
          ))}
        </section>
      </section>
    </>
  );
}
