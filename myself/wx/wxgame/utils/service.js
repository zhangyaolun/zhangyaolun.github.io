const API_URL = 'https://api.douban.com';
//GET请求  
const GET = requestHandler => {
  request('GET', requestHandler)
}
//POST请求  
const POST = requestHandler => {
  request('POST', requestHandler)
}
const request = (method, requestHandler) => {
  const params = requestHandler.params;
  wx.request({
    url: API_URL + params.url,
    data: params.data,
    header: { 'Content-Type': 'json' },
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: res => {
      //注意：可以对参数解密等处理  
      requestHandler.success(res)
    },
    fail: res => {
      console.log(res)
    },
    complete: () => {
      // complete  
    }
  })
}

const login = (suc) => {
  GET({
    params: {
      url:'/v2/movie/in_theaters',
      data:{
        'apikey': '0b2bdeda43b5688921839c8ecb20399b',
        'city': '上海',
        'start': 1,
        'count': '36',
        'client': '',
        'udid': ''
      }
    },
    success: res => {
      suc(res);
    }
  })
}

module.exports = {
  login: login
}  