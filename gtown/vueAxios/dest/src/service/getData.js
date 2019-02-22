import request from '@/utils/request'

/*登录*/
export const loginByUsername = (username) => request({url: '/login',method: 'post',data: new URLSearchParams(username)})


/*登出*/
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/*品牌*/
export const searchBrand = (data) => request({url: '/brand/searchBrand',method: 'post',data: new URLSearchParams(data)})
/*供应商*/
export const searchSupplier = (data) => request({url: '/brand/searchSupplier',method: 'post'})

export const allParentMenu =() => request({url: '/sys/menu/allParentMenu',method: 'post'})
