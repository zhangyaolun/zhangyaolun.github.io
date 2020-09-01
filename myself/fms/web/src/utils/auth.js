export function setItem(Key, token) {
    return sessionStorage.setItem(`admin_${Key}`, token)
}

export function getItem(Key) {
    return sessionStorage.getItem(`admin_${Key}`)
}

export function removeItem(Key) {
    return sessionStorage.removeItem(`admin_${Key}`)
}

