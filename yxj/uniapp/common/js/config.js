let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://test.api.yishengzhan.cn'
}else{
    // 生产环境
    url_config = 'https://test.api.yishengzhan.cn'
}

export default url_config