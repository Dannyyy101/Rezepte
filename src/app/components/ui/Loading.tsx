interface LoadingProps {
  width?: string;
  height?: string;
}

export default function Loading({ width, height }: LoadingProps) {
  const w = width ? width : "w-screen";
  const h = height ? height : "h-screen";
  return (
    <main
      className={`flex ${w} ${h} justify-center items-center bg-background`}
    >
      <section className="loader"></section>
    </main>
  );
}
