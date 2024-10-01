export const convertFirebaseErrorToUIErrors = (firebaseError: string): string => {
    let errorMessage = "An unexpected error occurred.";

    if (firebaseError.includes("storage/unauthorized")) {
        errorMessage = "You must be logged in to create a recipe.";
    }
    console.log(firebaseError)
    return errorMessage;
}
