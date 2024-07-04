'use client';

import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  return (
      <div className="flex flex-col gap-8 overflow-y-auto h-[100vh]"> {/* Set height to 100vh */}
        {images.map((image, index) => (
            <div key={index} className="relative aspect-square w-full overflow-hidden">
              <Image
                  className="h-full w-full object-cover"
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  alt={image.altText}
                  src={image.src}
                  priority={index === 0}
              />
            </div>
        ))}
      </div>
  );
}
