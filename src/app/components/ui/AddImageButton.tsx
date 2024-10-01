"use client";
import Image from "next/image";
import imageSymbol from "../../../../public/image_48dp_A5A3A3_FILL0_wght400_GRAD0_opsz20.svg";
import { ChangeEvent, useRef, useState } from "react";
import React from "react";
import ImageCropper from "./ImageCropper";

interface addImageButtonProps {
  text: string;
  handleClicked: (f: any) => void;
  mainRef:React.RefObject<HTMLDivElement>
}

export default function AddImageButton({
  text,
  handleClicked,
  mainRef
}: addImageButtonProps) {
  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleHiddenInputFieldClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <>
      {image ? (
        <ImageCropper image={image} setImage={handleClicked} mainRef={mainRef}/>
      ) : (
        <section>
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
            onChange={(e) => setImage(e.target.files?.[0])}
          />
        </section>
      )}
    </>
  );
}
