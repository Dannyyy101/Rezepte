"use client";
import { useState } from "react";
import IngredientNotFound from "../components/ui/IngredientNotFound";
import NumberInputField from "../components/ui/NumberInputField";
import ResizeImage from "../components/ui/ResizeImage";

export default function Testing() {
  const [test, setTest] = useState<number>(0);
  return (
    <>
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="w-96 h-52">
        <ResizeImage />
      </div>
      </main>
    </>
  );
}
