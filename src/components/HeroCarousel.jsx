import { useState } from 'react'

const slides = [
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczPVm_HqyTyvc1dhmGzmUm8tNw0G0kKJH90mZMWfsvEnd5f0s0jrjy5Ob1gVOKi6AqMVY6lEwTo52_lepRCy-53tqH99biPy2mW9-C7s-d8W0sHXK3gB=w1600-h1200-no',
    alt: 'A close-up of a dog',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczP85QKES-SuINAznUSilE6TEVrwyEHrYPo9dVC0-d9sLFclTrVbpjd_AWG0JUqlLeqHp-MDf05pcnD69NVQHARr6pMHl8S-tCfJ3im2o-HO-gQG5A7r=w1600-h1200-no',
    alt: 'A close-up of a black cat',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczM2PqoJyubHuHLmY77XC4MbRkHi6E4NNa650VSNvbY2KkRb63BRW_5GeDgsUUlIzIdYZH4ci3-KZ22B-GqRslkZNsFbx73tDH-n-WN-2DPoHnyZXnw-=w1600-h1200-no',
    alt: 'Three cats',
  },
  {
    src: 'https://lh3.googleusercontent.com/pw/AP1GczPlmNEhiMyZoR3kSzbWE4s_PykzoWW8uWhIYjym2MIOLUUS_P7d74pi-H8Fal4d5-oIRi2xZ_RzGJe5VD8zOADTUvpxXW7ydo-XAMOsXVhrrUSoHrfr=w1600-h1200-no',
    alt: 'A family with their pets',
  },
]

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

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
