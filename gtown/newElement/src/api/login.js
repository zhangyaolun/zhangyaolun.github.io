import request from '@/utils/request'

export function loginByUsername(username) {
  return request({
    url: '/login',
    method: 'post',
    data: new URLSearchParams(username)
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
