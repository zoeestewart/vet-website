import { useState } from 'react'
import useSheetData from '../hooks/useSheetData.js'

function StaffCard({ member }) {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <article className="border border-[#e1d8cc] bg-white p-5">
      {member.photo && !photoFailed ? (
        <img
          alt=""
          className="mb-4 size-16 rounded-full object-cover"
          height="64"
          loading="lazy"
          onError={() => setPhotoFailed(true)}
          src={member.photo}
          width="64"
        />
      ) : (
        <div
          aria-hidden="true"
          className="mb-4 grid size-16 place-items-center rounded-full bg-[var(--clinic-accent-pale)] font-serif text-2xl font-bold text-[var(--clinic-accent-text)]"
        >
          {member.name.charAt(0)}
        </div>
      )}
      <h2 className="font-serif text-xl font-bold text-[#383431]">
        {member.name}
      </h2>
      <p className="mt-1 text-sm font-semibold text-[var(--clinic-accent-text)]">
        {member.role}
      </p>
      {member.bio && (
        <p className="mt-3 text-sm leading-6 text-[#6b655f]">{member.bio}</p>
      )}
    </article>
  )
}

export default function StaffDirectory() {
  const { staff, staffError } = useSheetData()

  return (
    <>
      {staffError && (
        <p
          className="mt-5 border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {staffError}
        </p>
      )}
      {staff.length > 0 && (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <StaffCard
              key={`${member.name}-${member.role}`}
              member={member}
            />
          ))}
        </div>
      )}
    </>
  )
}
