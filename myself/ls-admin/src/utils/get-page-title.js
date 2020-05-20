const title = 'Lawson Admin'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${title}-${pageTitle}`
  } else {
    return `${title}`
  }
}
