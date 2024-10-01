import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../connection";

export const saveImage = async (foulder:string, file: File, fileName: string, recipeName: string): Promise<{ result: string, error: string }> => {
    let result = "";
    let error = "";
    const imageRef = ref(storage, `${foulder}/${recipeName}/${fileName}.jpg`);

    result = await uploadBytes(imageRef, file).then((snapshot) => {
        return snapshot.metadata.fullPath;
    });

    return { result, error }
}