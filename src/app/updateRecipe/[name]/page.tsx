"use client";
import {
  Description,
  DescriptionImagesWithIndex,
  Ingredient,
  Recipe,
} from "@/app/utils/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import downSymbol from "../../../../public/keyboard_double_arrow_down_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz48.svg";
import { addRecipe } from "../../api/firebase/firestore/addRecipe";
import { FocuseChildComponent } from "../../components/ui/FocusChildComponent";
import IngredientNotFound from "../../components/ui/IngredientNotFound";
import NumberInputField from "../../components/ui/NumberInputField";
import { saveImage } from "../../api/firebase/firestore/saveImage";
import Navbar from "../../components/ui/Navbar";
import AddImageButton from "../../components/ui/AddImageButton";
import { useParams, useRouter } from "next/navigation";
import { getRecipeByName } from "../../api/firebase/firestore/getRecipeByName";
import EditRecipe from "@/app/components/EditRecipe";
import React from "react";

export default function UpdateRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
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
  return <>{recipe && <EditRecipe givenRecipe={recipe} />}</>;
}
