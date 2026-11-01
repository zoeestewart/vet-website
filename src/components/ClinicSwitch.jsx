import { otherClinic } from '../data/clinics.js'

export default function ClinicSwitch({ onNavigate }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-sm border border-[#383431]/25 px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#383431] transition hover:border-[var(--clinic-accent)] hover:text-[var(--clinic-accent-text)] [&::-webkit-details-marker]:hidden">
        Our other clinic
        <span aria-hidden="true">⌄</span>
      </summary>
      <div className="absolute right-0 top-full z-20 mt-2 min-w-52 rounded-sm border border-[#e9e3da] bg-white p-2 text-[#383431] shadow-lg">
        <a
          className="block rounded-sm px-3 py-2 text-sm font-semibold hover:bg-[#f3eee6]"
          href={otherClinic.websiteUrl}
          onClick={onNavigate}
        >
          {otherClinic.shortName}
        </a>
      </div>
    </details>
  )
}
