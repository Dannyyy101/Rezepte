"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ResizeImage() {
  const [clicked, setClicked] = useState<boolean>(false);
  const position = useMousePosition();

  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="w-full h-full border border-border">
      <Image
        src={
          "https://firebasestorage.googleapis.com/v0/b/nutrition101-42699.appspot.com/o/images%2Frecipes%2FHallo%2Fthumbnail.jpg?alt=media&token=d723a95b-ea5a-4319-86d3-e402eb75f7d3"
        }
        alt="test"
        width={200}
        height={200}
      />
      <button
        onClick={() => setClicked(!clicked)}
        style={{
          position: "fixed",
          top: `${clicked ? position.y : 0}px`,
          left: `${clicked ? position.x : 0}px`,
        }}
      ></button>
      <div
        className="flex flex-col mt-10 w-96 h-96 border border-red absolute top-50 right-50"
        ref={mainRef}
      >
        <div className="flex justify-center h-3">
          <ResizeBar
            width={12}
            height={12}
            cursor="nwse-resize"
            mainRef={mainRef}
            direction="wh"
          />
          <ResizeBar
            height={12}
            cursor="ns-resize"
            mainRef={mainRef}
            direction="hn"
          />
          <ResizeBar
            width={12}
            height={12}
            cursor="nesw-resize"
            mainRef={mainRef}
            direction="wh"
          />
        </div>
        <div className="flex justify-center h-full">
          <ResizeBar
            width={12}
            cursor="ew-resize"
            mainRef={mainRef}
            direction="ww"
          />
          <div className="w-full h-full"></div>
          <ResizeBar
            width={12}
            cursor="ew-resize"
            mainRef={mainRef}
            direction="we"
          />
        </div>
        <div className="flex justify-center h-3">
          <ResizeBar
            width={12}
            height={12}
            cursor="nesw-resize"
            mainRef={mainRef}
            direction="wh"
          />
          <ResizeBar
            height={12}
            cursor="ns-resize"
            mainRef={mainRef}
            direction="hs"
          />
          <ResizeBar
            width={12}
            height={12}
            cursor="nwse-resize"
            mainRef={mainRef}
            direction="wh"
          />
        </div>
      </div>
    </main>
  );
}

const ResizeBar = ({
  width,
  height,
  cursor,
  mainRef,
  direction,
}: {
  width?: number;
  height?: number;
  cursor: string;
  mainRef: React.RefObject<HTMLDivElement>;
  direction: "ww" | "we" | "hn" | "hs" | "wh";
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const position = useMousePosition();

  // Scaling factor to slow down resizing
  const scaleFactor = 0.05;

  useEffect(() => {
    const handleMouseUp = () => {
      setClicked(false);
      setStartPosition(null);
      document.body.style.userSelect = "auto"; // Re-enable text selection
    };

    if (clicked && startPosition && mainRef.current) {
      const currentWidth = mainRef.current.offsetWidth;
      const currentHeight = mainRef.current.offsetHeight;

      if (direction === "we" || direction === "wh") {
        const newWidth =
          currentWidth + (position.x - startPosition.x) * scaleFactor;
        mainRef.current.style.width = `${newWidth}px`;
      }

      if (direction === "hs" || direction === "wh") {
        const newHeight =
          currentHeight + (position.y - startPosition.y) * scaleFactor;
        mainRef.current.style.height = `${newHeight}px`;
      }
      if (direction === "hn" || direction === "wh") {
        const newHeight =
          currentHeight - (position.y - startPosition.y) * scaleFactor;
        const newTop = mainRef.current.offsetTop + (position.y - startPosition.y) * scaleFactor;
        mainRef.current.style.top = `${newTop}px`;
        mainRef.current.style.height = `${newHeight}px`;
      }
    }

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [position, clicked, startPosition, direction, mainRef]);

  const handleMouseDown = () => {
    setClicked(true);
    setStartPosition({ x: position.x, y: position.y });
    document.body.style.userSelect = "none";
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        cursor: cursor,
      }}
      className="border border-border"
    ></div>
  );
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};
