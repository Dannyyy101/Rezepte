"use client";

import { useState } from "react";
import { Recipe } from "../utils/types";
import EditRecipe from "../components/EditRecipe";
import Link from "next/link";

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
  return (
    <>
      <EditRecipe givenRecipe={recipe} />
    </>
  );
}
