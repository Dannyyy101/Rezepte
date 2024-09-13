"use client";
import { useState } from "react";
import IngredientNotFound from "../components/ui/IngredientNotFound";

export default function Testing() {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <>
      <main>
        {visible ? (
           <IngredientNotFound
           ingredient={{ name: "Tomatoes", unit: "", calories: 0 }}
           setVisibility={setVisible}
         />
        ) : (
         <></>
        )}
      </main>
    </>
  );
}
