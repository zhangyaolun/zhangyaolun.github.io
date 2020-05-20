import Cookies from 'js-cookie'

const TokenKey = 'admin-token'
const NameKey = 'admin-name'
const RegionBlockCodeKey = 'admin-regionBlockCode'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function getRegionBlockCode () {
  return Cookies.get(RegionBlockCodeKey)
}

export function setRegionBlockCode (regionBlockCode) {
  return Cookies.set(RegionBlockCodeKey, regionBlockCode)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function setName (name) {
  return Cookies.set(NameKey, name)
}

export function removeName () {
  return Cookies.remove(NameKey)
}

export function getName () {
  return Cookies.get(NameKey)
}
