export const clinics = [
  {
    id: 'graceville-fiveways',
    name: 'Graceville Fiveways Veterinary',
    shortName: 'Graceville Fiveways',
    hostnames: ['fivewaysvet.com.au'],
    websiteUrl: 'https://fivewaysvet.com.au/',
    logo: '/images/clinic-logo.jpg',
    email: 'info@fivewaysvet.com.au',
    phone: '+61733799336',
    phoneDisplay: '(07) 3379 9336',
    address: '316 Oxley Rd, Graceville QLD 4075',
    directionsUrl:
      'https://maps.google.com/?q=Graceville+Fiveways+Veterinary+Surgery,+316+Oxley+Rd,+Graceville+QLD+4075',
    accent: '#bbdc56',
    accentHover: '#a8c941',
    accentText: '#647c19',
    accentPale: '#f2f7e3',
  },
  {
    id: 'civic-centre',
    name: 'Civic Centre Veterinary Surgery',
    shortName: 'Civic Centre',
    hostnames: ['civiccentrevets.com.au'],
    websiteUrl: 'https://www.civiccentrevets.com.au/',
    email: 'info@civiccentrevets.com.au',
    phone: '+61733727699',
    phoneDisplay: '(07) 3372 7699',
    address: 'Shop 11, Civic Centre Shopping Centre, Corsair Ave, Inala QLD 4077',
    directionsUrl:
      'https://maps.google.com/?q=Civic+Centre+Veterinary+Surgery,+Shop+11,+Civic+Centre+Shopping+Centre,+Corsair+Ave,+Inala+QLD+4077',
    accent: '#e77826',
    accentHover: '#c95d18',
    accentText: '#984214',
    accentPale: '#fff1e7',
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
