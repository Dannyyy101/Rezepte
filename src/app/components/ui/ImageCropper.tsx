"use client";
import React, { useState, useCallback, useEffect } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { FocuseChildComponent } from "./FocusChildComponent";
import { getCroppedImg } from "@/app/api/getCroppedImg";

export default function ImageCropper({
  image,
  setImage,
  mainRef,
}: {
  image: File;
  setImage: (e: File) => void;
  mainRef: React.RefObject<HTMLDivElement>;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [focus, setFocus] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleClicked = async () => {
    setFocus(true);
    const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
    if (croppedImage) setImage(croppedImage);
  };

  useEffect(() => {
    // Create the object URL once when the image changes
    const url = URL.createObjectURL(image);
    setImageUrl(url);

    // Cleanup the object URL when the component is unmounted or the image changes
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  return (
    <>
      <FocuseChildComponent mainRef={mainRef} handleClicked={handleClicked}>
        {imageUrl && (
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </FocuseChildComponent>
    </>
  );
}
