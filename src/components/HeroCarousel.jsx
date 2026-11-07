import { useEffect, useState } from 'react'
import {
  fallbackHeroPhotos,
  isHeroFolderConfigured,
  loadHeroPhotos,
} from '../data/heroPhotos.js'

const CACHE_KEY = 'vet-hero-photos-v1'

function readCachedPhotos() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
    return Array.isArray(cached) && cached.length ? cached : null
  } catch {
    return null
  }
}

// Shows the last loaded folder contents straight away, then refreshes them.
function useHeroPhotos() {
  const [photos, setPhotos] = useState(
    () => (isHeroFolderConfigured && readCachedPhotos()) || fallbackHeroPhotos,
  )

  useEffect(() => {
    if (!isHeroFolderConfigured) return undefined

    const controller = new AbortController()
    loadHeroPhotos(controller.signal)
      .then((freshPhotos) => {
        // An empty folder keeps the current photos rather than an empty carousel.
        if (freshPhotos.length === 0) return
        setPhotos(freshPhotos)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(freshPhotos))
        } catch {
          // Storage can be full or blocked; the carousel works without it.
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') return
        console.warn(error)
      })
    return () => controller.abort()
  }, [])

  return photos
}

export default function HeroCarousel() {
  const slides = useHeroPhotos()
  const [selectedIndex, setActiveIndex] = useState(0)
  // Stays in range if the folder ends up with fewer photos than before.
  const activeIndex = selectedIndex % slides.length

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length)
  }

  return (
    <div
      aria-label="Featured clinic photos"
      aria-roledescription="carousel"
      className="relative h-44 w-full overflow-hidden rounded-sm sm:h-56 md:h-72"
      role="region"
    >
      <div
        aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
        aria-live="polite"
        aria-roledescription="slide"
        className="h-full"
        role="group"
      >
        <img
          alt={slides[activeIndex].alt}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          src={slides[activeIndex].src}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8">
        <button
          aria-label="Show previous photo"
          className="grid size-9 place-items-center rounded-full bg-white/90 text-xl font-bold text-[#383431] hover:bg-white"
          onClick={() => showSlide(activeIndex - 1)}
          type="button"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              aria-current={index === activeIndex ? 'true' : undefined}
              aria-label={`Show photo ${index + 1} of ${slides.length}`}
              className={`size-2.5 rounded-full border border-white ${
                index === activeIndex ? 'bg-white' : 'bg-white/40'
              }`}
              key={index}
              onClick={() => showSlide(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="Show next photo"
          className="grid size-9 place-items-center rounded-full bg-white/90 text-xl font-bold text-[#383431] hover:bg-white"
          onClick={() => showSlide(activeIndex + 1)}
          type="button"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  )
}
