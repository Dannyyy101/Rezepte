"use server";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../connection";

export const loadImage = async (
  path: string
): Promise<{ result: string; error: string }> => {
  let result = "";
  let error = "";
  result = await getDownloadURL(ref(storage, path));
  return { result, error };
};
