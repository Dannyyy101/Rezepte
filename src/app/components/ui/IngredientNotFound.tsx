"use client";
import ReactDOM from "react-dom";
import { Ingredient } from "../../utils/types";
import { useState } from "react";
import { addProduct } from "../../api/firebase/firestore/addProduct";
import NumberInputField from "./NumberInputField";
import React from "react";

export default function IngredientNotFound({
  ingredient,
  setVisibility,
}: {
  ingredient: Ingredient;
  setVisibility: (visibility: boolean) => void;
}) {
  const [product, setProduct] = useState<Ingredient>(ingredient);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const submit = async () => {
    const { error } = await addProduct(product);
    if (error) {
      setErrorMessage(error);
    } else {
      setVisibility(true);
    }
  };

  return (
    <>
      <main className="w-full h-full border-border border flex items-center flex-col bg-background shadow-md rounded">
        <h1 className="mt-8 text-xl">Couldn't find {ingredient.name}</h1>
        <div className="w-full flex flex-col items-center mt-6">
        <label className="w-10/12">unit</label>
        <input
          className="w-10/12 h-10 focus:outline-none border-border border pl-1 bg-transparent rounded"
          type="text"
          value={product.unit}
          onChange={(e) => setProduct({ ...product, unit: e.target.value })}
        />
        </div>
        <div className="w-full flex flex-col items-center mt-2">
          <label className="w-10/12">calories</label>
          <NumberInputField
            customStyle="w-10/12 h-10 focus:outline-none border-border border pl-1 bg-transparent rounded"
            value={product.calories}
            handleChange={(e) => setProduct({ ...product, calories: e })}
          />
        </div>
        <button
          className="mt-12 w-24 h-8 border border-border rounded"
          onClick={submit}
        >
          submit
        </button>
        <p className="text-center text-error">{errorMessage}</p>
      </main>
    </>
  );
}
