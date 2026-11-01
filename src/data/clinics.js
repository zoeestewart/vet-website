const gracevilleBookingUrl =
  import.meta.env.VITE_BOOKING_URL_GRACEVILLE?.trim() ||
  import.meta.env.VITE_BOOKING_URL?.trim() ||
  ''

export const clinics = [
  {
    id: 'graceville-fiveways',
    name: 'Graceville Fiveways Veterinary',
    shortName: 'Graceville Fiveways',
    hostnames: ['fivewaysvet.com.au'],
    websiteUrl: 'https://fivewaysvet.com.au/',
    logo: '/images/clinic-logo.jpg',
    images: {
      home: '/images/graceville/hero.jpg',
      about: '/images/graceville/about.jpg',
      cat: '/images/graceville/cat.jpg',
      dog: '/images/graceville/dog.jpg',
    },
    phone: '+61733799336',
    phoneDisplay: '(07) 3379 9336',
    address: '316 Oxley Rd, Graceville QLD 4075',
    directionsUrl:
      'https://maps.google.com/?q=Graceville+Fiveways+Veterinary+Surgery,+316+Oxley+Rd,+Graceville+QLD+4075',
    bookingUrl: gracevilleBookingUrl,
    accent: '#bbdc56',
    accentHover: '#a8c941',
    accentText: '#647c19',
    accentPale: '#f2f7e3',
    tagline: 'Working with you to keep them healthy.',
    heroTitle: 'Special care for your pets',
    introduction:
      'Our veterinary hospital has been part of the local community for years. We care for cats and dogs, rabbits and guinea pigs, birds, horses and even the occasional snake.',
  },
  {
    id: 'civic-centre',
    name: 'Civic Centre Veterinary Surgery',
    shortName: 'Civic Centre',
    hostnames: ['civiccentrevets.com.au'],
    websiteUrl: 'https://www.civiccentrevets.com.au/',
    logo: '/images/civic-logo.jpg',
    images: {
      home: '/images/civic/hero.jpg',
      about: '/images/civic/love-your-pet.jpg',
      cat: '/images/civic/cat.jpg',
      dog: '/images/civic/dog.jpg',
    },
    phone: '+61733727699',
    phoneDisplay: '(07) 3372 7699',
    address: 'Shop 11, Civic Centre Shopping Centre, Corsair Ave, Inala QLD 4077',
    directionsUrl:
      'https://maps.google.com/?q=Civic+Centre+Veterinary+Surgery,+Shop+11,+Civic+Centre+Shopping+Centre,+Corsair+Ave,+Inala+QLD+4077',
    bookingUrl: import.meta.env.VITE_BOOKING_URL_CIVIC?.trim() || '',
    accent: '#e77826',
    accentHover: '#c95d18',
    accentText: '#984214',
    accentPale: '#fff1e7',
    tagline: 'Family owned and operated.',
    heroTitle: 'Personal care for every family member',
    introduction:
      'Civic Centre Veterinary Surgery provides personal and affordable health care for your other family members. We want you and your pets to feel welcome, with a caring and gentle approach. Treats are a must if you come to us.',
  },
]

function getClinicForHostname(hostname) {
  const normalizedHostname = hostname.toLowerCase().replace(/^www\./, '')
  return clinics.find((clinic) => clinic.hostnames.includes(normalizedHostname))
}

const hostnameClinic =
  typeof window === 'undefined'
    ? undefined
    : getClinicForHostname(window.location.hostname)
const developmentClinic =
  typeof window === 'undefined'
    ? undefined
    : new URLSearchParams(window.location.search).get('clinic')

export const currentClinic =
  clinics.find((clinic) => clinic.id === developmentClinic) ||
  hostnameClinic ||
  clinics[0]

export const otherClinic = clinics.find(
  (clinic) => clinic.id !== currentClinic.id,
)
