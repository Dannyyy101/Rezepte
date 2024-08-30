"use client";
import { useState } from "react";
import InputField from "./InputField";
import { Recipe } from "../utils/types";
import { searchForRecipeByName } from "../api/firebase/firestore/searchForRecipeByName";
import DisplayRecipe from "./DisplayRecipe";

export default function FindRecipe() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Recipe[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSearch = async (result: string) => {
    setSearch(result);
    await searchForRecipeByName(result).then((r) => {
      setSearchResult(r.result);
      setErrorMessage(r.error);
    });
  };

  return (
    <>
      <section>
        <InputField
          type="text"
          value={search}
          setFunction={handleSearch}
          style=""
          placeholder="Search"
        />
        <p className="text-error text-center mt-1">{errorMessage}</p>
        <section>
          {searchResult.map((recipe: Recipe, index: number) => (
            <DisplayRecipe recipe={recipe} key={index} />
          ))}
        </section>
      </section>
    </>
  );
}
