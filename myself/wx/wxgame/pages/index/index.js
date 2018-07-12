//index.js
const service = require('../../utils/service.js');//接口调用 service.login(suc);
const city = require('../../utils/city.js');//城市转 city.getChina('beijing')
const App = getApp();
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorActiveColor: '#26a2ff',
    circular: true,
    previousMargin: '40rpx',
    nextMargin:'40rpx',
    tab_num:0,
    tabList: [
      { name: '优酷会员', id: '1', src: '../../images/youkuhuiyuan@2x.png' },
      { name: '腾讯会员', id: '2', src: '../../images/youkuhuiyuan@2x.png' },
      { name: '优酷会员', id: '3', src: '../../images/youkuhuiyuan@2x.png' },
      { name: '优酷会员', id: '4', src: '../../images/youkuhuiyuan@2x.png' }
    ],
  },
  onReady: function () {
    this.mainnav = this.selectComponent("#mainNav");
    //数据请求
    console.log(App.globalData.userInfo)
    const suc = data => {
      console.log(data)
    }
    service.login(suc);

  },
  menuClick: function (e) {
    let indexs = e.currentTarget.dataset.id;
    console.log(indexs)
    this.setData({
      tab_num: indexs
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  }
})
