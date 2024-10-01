"use client";
import { useState } from "react";
import IngredientNotFound from "../components/ui/IngredientNotFound";
import NumberInputField from "../components/ui/NumberInputField";
import ResizeImage from "../components/ui/ResizeImage";
import React from "react";
import ImageCropper from "../components/ui/ImageCropper";

export default function Testing() {
  const [test, setTest] = useState<number>(0);
  return (
    <>
    <main className="flex justify-center items-center w-screen h-screen">
      <ImageCropper 
      image={new File([""], "example.png", { type: "image/png" })} 
      setImage={(e: File) => {}} 
      mainRef={React.createRef<HTMLDivElement>()} 
      />
    </main>
    </>
  );
}
