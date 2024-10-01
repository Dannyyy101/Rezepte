"use client";
import { Recipe } from "@/app/utils/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRecipeByName } from "../../api/firebase/firestore/getRecipeByName";
import EditRecipe from "@/app/components/EditRecipe";
import React from "react";
import { deleteRecipeByName } from "@/app/api/firebase/firestore/deleteRecipeByName";

export default function UpdateRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();
  const { name } = useParams();
  useEffect(() => {
    if (name && typeof name === "string") {
      getRecipeByName(name).then((result) => {
        if (result.result) {
          setRecipe(result.result);
        }
      });
    }
  }, []);

  const handleDelete = async () => {
    if (typeof name === "string") await deleteRecipeByName(name);
    router.push("/");
  };

  return (
    <>
      {" "}
      <div className="absolute top-28 right-20 flex justify-center items-center">
        <button
          className="h-10 w-20 border border-border rounded flex justify-center items-center text-error"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
      {recipe && <EditRecipe givenRecipe={recipe} />}
    </>
  );
}
