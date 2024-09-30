'use server'

import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../connection";
import { deleteObject, listAll, ref } from "firebase/storage";

export const deleteRecipeByName = async (name: string) => {
    await deleteDoc(doc(db, "recipes", name));

    // Create a reference under which you want to list
    const listRef = ref(storage, `images/recipes/${name}`);

    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
                deleteObject(itemRef).then(() => {
                    // File deleted successfully
                }).catch((error) => {
                    // Uh-oh, an error occurred!
                });

            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
}