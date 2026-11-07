import { useEffect, useState } from 'react'

// Grey placeholder shape used to sketch content while it loads.
export function SkeletonBlock({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-sm bg-[#ece6de] ${className}`} />
  )
}

// Holds the section's space straight away but only fades the placeholder in
// if loading takes a moment, so fast loads don't flash grey boxes.
export function SectionLoading({ label, children }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  )
}

export function SectionError({ message, onRetry }) {
  return (
    <div
      className="mt-5 border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="alert"
    >
      <p>{message}</p>
      {onRetry && (
        <button
          className="mt-2 font-semibold underline underline-offset-2"
          onClick={onRetry}
          type="button"
        >
          Try again
        </button>
      )}
    </div>
  )
}
