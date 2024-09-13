import Link from "next/link";

export default function Navbar() {

  return (
    <>
      <main className="sticky w-screen h-14 bg-background border-b-2 top-0 border-border grid grid-cols-3">
        <Link className="flex items-center justify-center text-lg" href={"/"}>Home</Link>
        <Link className="flex items-center justify-center text-lg" href={"/recipes"}>Recipes</Link>
        <Link className="flex items-center justify-center text-lg" href={"/createRecipe"}>create Recipe</Link>
      </main>
    </>
  );
}
