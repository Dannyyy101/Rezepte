export default function ErrorScreen({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <>
      <main className="flex justify-center items-center mt-64 w-screen text-5xl">
        <h1>{errorMessage} 🦦</h1>
      </main>
    </>
  );
}
