import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface FocuseChildComponentProps {
  children: React.ReactNode;
  mainRef: React.RefObject<HTMLDivElement>;
  handleClicked: (isClickedOutside: boolean) => void;
}

export const FocuseChildComponent: React.FC<FocuseChildComponentProps> = ({
  children,
  mainRef,
  handleClicked,
}) => {
  const mainDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mainDivRef.current && !mainDivRef.current.contains(event.target as Node)) {
        console.log("Clicked outside of the child component.");
        handleClicked(true);

        // Unblur the main component when clicking outside
        if (mainRef && mainRef.current) {
          mainRef.current.style.filter = "blur(0px)";
          console.log("Blur removed from mainRef.");
        }
      }
    };

    // Apply blur to mainRef when the component mounts
    if (mainRef && mainRef.current) {
      mainRef.current.style.filter = "blur(10px)";
      console.log("Blur applied to mainRef.");
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Reset the blur when the component unmounts or on cleanup
      if (mainRef && mainRef.current) {
        mainRef.current.style.filter = "blur(0px)";
        console.log("Component unmounted, blur removed from mainRef.");
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mainRef, handleClicked]);

  return ReactDOM.createPortal(
    <>
      <main
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        ref={mainDivRef}
      >
        {children}
      </main>
    </>,
    document.body
  );
};
