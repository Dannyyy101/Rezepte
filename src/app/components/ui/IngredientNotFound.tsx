"use client";
import ReactDOM from "react-dom";
import { Ingredient } from "../../utils/types";
import { useState } from "react";
import { addProduct } from "../../api/firebase/firestore/addProduct";

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
      <main className="min-w-52 max-w-64 h-64 border-border border flex items-center flex-col">
        <h1 className="mt-2 text-xl">Couldn't find {ingredient.name}</h1>
        <input
          className="mt-6 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
          type="text"
          value={product.unit}
          placeholder="unit"
          onChange={(e) => setProduct({ ...product, unit: e.target.value })}
        />
        <input
          className="mt-2 text-left pl-1 bg-transparent border-b border-border focus:outline-none"
          type="number"
          value={product.calories}
          placeholder="kcal"
          onChange={(e) =>
            setProduct({ ...product, calories: parseInt(e.target.value) })
          }
        />
        <button className="mt-16 w-24 h-8 border border-border" onClick={submit}>
          submit
        </button>
        <p className="text-center text-error">{errorMessage}</p>
      </main>
    </>
  );
}
