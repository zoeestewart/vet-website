// Hero carousel photos come from a shared Google Drive folder, so clinic staff
// can add, remove or reorder photos without a redeploy.
//
// Setup:
// - Share the folder as "Anyone with the link can view".
// - VITE_HERO_PHOTOS_FOLDER: the folder's link or ID.
// - VITE_GOOGLE_API_KEY: a Google Cloud API key with the Drive API enabled,
//   restricted to the site's domains (it is visible in the browser).
//
// Photos show in filename order, so prefix names with numbers to set the order
// (e.g. "01 A close-up of a dog.jpg"). The alt text is the file's Drive
// description if it has one, otherwise the filename without the number prefix.

const DEFAULT_HERO_PHOTOS_FOLDER =
  'https://drive.google.com/drive/folders/1uVfjq55cBcJzeLaz_h7pchH1VlkzGwrg'

const folderSetting =
  import.meta.env?.VITE_HERO_PHOTOS_FOLDER?.trim() || DEFAULT_HERO_PHOTOS_FOLDER
const apiKey = import.meta.env?.VITE_GOOGLE_API_KEY?.trim() || ''

const folderId =
  folderSetting.match(/folders\/([a-zA-Z0-9_-]+)/)?.[1] ||
  folderSetting.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ||
  folderSetting

export const isHeroFolderConfigured = Boolean(folderId && apiKey)

// Shown until the folder is configured, or if Drive can't be reached.
export const fallbackHeroPhotos = [
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

const GENERIC_ALT = 'Pets cared for at the clinic'

// Camera and placeholder names like "carousel1" or "IMG_1234" don't describe
// the photo, so those get a general description instead.
function altFromFilename(name) {
  const text = name
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/^\d+[\s._-]*/, '')
    .replace(/[_-]+/g, ' ')
    .trim()
  if (!text || /^(carousel|img|image|photo|pxl|dsc|dscn|screenshot)?[\s\d]*$/i.test(text)) {
    return GENERIC_ALT
  }
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Drive descriptions can pick up formatting such as "<div><br /></div>".
function plainText(description) {
  if (!description) return ''
  const text = new DOMParser().parseFromString(description, 'text/html').body
    .textContent
  return text.replace(/\s+/g, ' ').trim()
}

export async function loadHeroPhotos(signal) {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: 'files(id,name,description)',
    orderBy: 'name_natural',
    pageSize: '100',
    key: apiKey,
  })
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?${params}`,
    { signal },
  )
  if (!response.ok) {
    throw new Error(`Hero photos folder returned HTTP ${response.status}.`)
  }

  const { files } = await response.json()
  return (Array.isArray(files) ? files : []).map((file) => ({
    src: `https://lh3.googleusercontent.com/d/${file.id}=w1600`,
    alt: plainText(file.description) || altFromFilename(file.name),
  }))
}
