import useSheetData from '../hooks/useSheetData.js'

const networks = [
  {
    key: 'facebookUrl',
    label: 'Facebook',
    path: 'M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.2H7.6v3.4h2.7V22H14V11.9h2.7l.4-3.4H14Z',
  },
  {
    key: 'instagramUrl',
    label: 'Instagram',
    path: 'M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1ZM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z',
  },
]

export default function SocialLinks({ className = '', iconClassName = 'size-5' }) {
  const { currentClinic } = useSheetData()
  const links = networks.filter(({ key }) => currentClinic[key])

  if (links.length === 0) return null

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ key, label, path }) => (
        <a
          aria-label={`${currentClinic.name} on ${label}`}
          className="transition hover:text-[var(--clinic-accent)]"
          href={currentClinic[key]}
          key={key}
          rel="noreferrer"
          target="_blank"
        >
          <svg
            aria-hidden="true"
            className={iconClassName}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d={path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
