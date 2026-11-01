import { Link } from 'react-router-dom'
import { textLink } from '../lib/styles.js'

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <h1 className="font-serif text-3xl font-bold text-[#383431] sm:text-4xl">
        Page not found
      </h1>
      <Link className={`mt-5 ${textLink}`} to="/">
        Return home
      </Link>
    </section>
  )
}
