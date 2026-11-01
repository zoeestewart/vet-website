export default function PageImage({ src, alt = '', className = '' }) {
  return (
    <img
      alt={alt}
      className={`h-44 w-full rounded-sm object-cover sm:h-56 md:h-64 ${className}`}
      loading="lazy"
      src={src}
    />
  )
}
