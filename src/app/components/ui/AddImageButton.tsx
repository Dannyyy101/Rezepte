import Image from "next/image";
import imageSymbol from "../../../../public/image_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz20.svg";
import { useRef } from "react";

interface addImageButtonProps {
  text: string;
  handleClicked: (f: any) => void;
}

export default function AddImageButton({
  text,
  handleClicked,
}: addImageButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleHiddenInputFieldClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <>
      <button
        className="w-48 flex items-center border-border border p-2"
        onClick={handleHiddenInputFieldClick}
      >
        <Image src={imageSymbol} alt="imageSymbol" width={32} height={32} />
        <p>{text}</p>
      </button>
      <input
        id="hiddenFileInput"
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleClicked(e)}
      />
    </>
  );
}
