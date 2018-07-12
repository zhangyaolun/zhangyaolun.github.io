//logs.js
const oData = require('../../data/home.js')

Page({
  data: {
    categoryinfo: [],//场地类目数据
    current_city:{},//城市信息
    recommended:[],//场馆信息
  },
  onLoad: function () {
    let _homeData = oData.homeData.result;
    this.setData({
      categoryinfo: _homeData.categoryinfo,
      current_city: _homeData.current_city,
      recommended: _homeData.recommended
    })
  },
  onReady: function () {
    this.mainnav = this.selectComponent("#mainNav");
    this.scoreNav = this.selectComponent("#scoreNav");
  },
  onGetCode:function(e){//子传父
    console.log(e)
    console.log(e.detail)
  }
})
