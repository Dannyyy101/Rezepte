export const getCroppedImg = (imageSrc: string, pixelCrop: any, fileName: string = 'cropped-image.jpeg') => {
  return new Promise<File | null>((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: 'image/jpeg' });
          resolve(file); // Resolve with the File object instead of URL
        } else {
          reject(new Error('Canvas toBlob failed'));
        }
      }, 'image/jpeg');
    };

    image.onerror = () => {
      reject(new Error('Image failed to load'));
    };
  });
};
