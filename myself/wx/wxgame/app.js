//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    const _this = this;
    // 获取用户信息
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              _this.globalData.userInfo = res.userInfo;
            }
          })
        }else{
          wx.navigateTo({
            url: "./pages/login/login"
          })
        }
      }
    })
  },
  globalData: {
    userInfo:null
  }
})