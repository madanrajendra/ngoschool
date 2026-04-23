"use client";

import { useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export default function SafeImage({ src, fallbackSrc, alt, className, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
