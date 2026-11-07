import { useState } from 'react'
import useSheetData from '../hooks/useSheetData.js'
import { SectionError, SectionLoading, SkeletonBlock } from './SectionStatus.jsx'

function StaffCard({ member }) {
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <article className="border border-[#e1d8cc] bg-white p-5">
      {member.photo && !photoFailed ? (
        <img
          alt=""
          className="-mx-5 -mt-5 mb-5 block aspect-[4/3] w-[calc(100%+2.5rem)] max-w-none object-cover object-top"
          height="900"
          loading="lazy"
          onError={() => setPhotoFailed(true)}
          src={member.photo}
          width="1200"
        />
      ) : (
        <div
          aria-hidden="true"
          className="-mx-5 -mt-5 mb-5 grid aspect-[4/3] w-[calc(100%+2.5rem)] place-items-center bg-[var(--clinic-accent-pale)] font-serif text-6xl font-bold text-[var(--clinic-accent-text)]"
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

function StaffCardSkeleton() {
  return (
    <div className="border border-[#e1d8cc] bg-white p-5">
      <SkeletonBlock className="-mx-5 -mt-5 mb-5 aspect-[4/3] w-[calc(100%+2.5rem)] rounded-none" />
      <SkeletonBlock className="h-6 w-2/3" />
      <SkeletonBlock className="mt-2 h-4 w-1/3" />
    </div>
  )
}

export default function StaffDirectory() {
  const { staff, staffError, retryStaff } = useSheetData()

  if (!staff) {
    return (
      <SectionLoading label="Loading our team">
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StaffCardSkeleton />
          <StaffCardSkeleton />
          <StaffCardSkeleton />
        </div>
      </SectionLoading>
    )
  }

  return (
    <>
      {staffError && <SectionError message={staffError} onRetry={retryStaff} />}
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
