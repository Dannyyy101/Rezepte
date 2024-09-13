"use client";
import FindRecipe from "./components/ui/FindRecipe";
import Navbar from "./components/ui/Navbar";

export default function Home() {
  return (
    <main className="flex min-w-screen min-h-screen flex-col items-center bg-background text-text">
      <Navbar/>
      <h1 className="text-4xl font-semibold mt-20">Rezepte101</h1>
      <section className="mt-20 w-11/12 flex justify-center">
        <FindRecipe />
      </section>
    </main>
  );
}
