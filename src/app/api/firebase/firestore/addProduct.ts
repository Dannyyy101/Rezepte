'use server'

import { Ingredient } from "@/app/utils/types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../connection";

export const addProduct = async (product: Ingredient): Promise<{ error: string }> => {
    let error = "";

    await setDoc(doc(db, "products", product.name), {
        'name': product.name,
        'carbhohydrates': product.calories,
        'unit': product.unit
    })

    return { error }
};
