const App = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  bindGetUserInfo: (e) => {
    let _e = e.detail.userInfo;
    App.globalData.userInfo = _e;
    if (_e){
      wx.switchTab({
        url: '../index/index'
      })
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权'
      })
    }
  }
})
