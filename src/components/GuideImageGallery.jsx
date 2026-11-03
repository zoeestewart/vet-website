import { useEffect, useRef, useState } from 'react'

export default function GuideImageGallery({ images }) {
  const galleryRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    if (!selectedImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const scrollGallery = (direction) => {
    galleryRef.current?.scrollBy({
      left: galleryRef.current.clientWidth * direction * 0.8,
      behavior: 'smooth',
    })
  }

  return (
    <section aria-label="Guide photos" className="mt-8">
      <div className="mb-3 flex justify-end">
        <div className="flex gap-2">
          <button
            aria-label="Scroll photos left"
            className="grid size-10 place-items-center border border-[#d8d0c6] bg-white text-xl text-[#383431] hover:bg-[#f3eee6]"
            onClick={() => scrollGallery(-1)}
            type="button"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            aria-label="Scroll photos right"
            className="grid size-10 place-items-center border border-[#d8d0c6] bg-white text-xl text-[#383431] hover:bg-[#f3eee6]"
            onClick={() => scrollGallery(1)}
            type="button"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
      <div
        aria-label="Scroll to view more photos"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3"
        ref={galleryRef}
        tabIndex={0}
      >
        {images.map(({ src, alt }) => (
          <figure
            className="flex h-64 min-w-[82%] snap-start items-center justify-center bg-[#f3eee6] p-3 sm:min-w-[48%] lg:min-w-[31%]"
            key={src}
          >
            <button
              aria-label={`View larger image: ${alt}`}
              className="flex h-full w-full cursor-zoom-in items-center justify-center"
              onClick={() => setSelectedImage({ src, alt })}
              type="button"
            >
              <img
                alt={alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                src={src}
              />
            </button>
          </figure>
        ))}
      </div>
      {selectedImage && (
        <div
          aria-label="Enlarged guide photo"
          aria-modal="true"
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
          role="dialog"
        >
          <button
            aria-label="Close enlarged image"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white text-2xl font-bold text-[#383431] hover:bg-[#f3eee6]"
            onClick={() => setSelectedImage(null)}
            type="button"
          >
            ×
          </button>
          <img
            alt={selectedImage.alt}
            className="max-h-full max-w-full cursor-default object-contain"
            onClick={(event) => event.stopPropagation()}
            src={selectedImage.src}
          />
        </div>
      )}
    </section>
  )
}
