new Vue({
  el: '#app',
  data: {
    userId: 'null',
    activityProduct: [], //活动商品
    productList: [],  //正常售卖商品
    activityBegin: true,
    fiveDiscount: true,
    confirmOrder: false,
    selected: {},
    Api: {
      // homepageItems: 'js/homepage.json?',
      homepageItems: '/homepageItems/TX/',
    },
  },
  created: function () {
    // 判断用户是否登录
    this.loginUser();
  },
  mounted: function () {
    var _this = this;
    FastClick.attach(document.body);
    // 初始化轮播图
    _this.loadLunbo();
    // 倒计时
    _this.countDown();
    // 视频卡数据
    _this.getInfo();


  },
  methods: {
    // 轮播
    loadLunbo: function () {
      var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        autoplay: true,
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 36,
          stretch: 0,
          depth: 80,
          modifier: 1,
          slideShadows: false
        },
        pagination: {
          el: '.swiper-pagination',
        }
      });
    },
    // 轮播结束
    // 倒计时
    countDown: function () {
      var _this = this;
      var time2, time;
      setInterval(function () {
        var myDate = new Date();//获取系统当前时间
        var Year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        var Month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var Day = myDate.getDate();//获取当前天数
        var myHours = myDate.getHours();//获取当前小时数
        // 根据当前的小时来判断活动开始时间是今天十点还是明天十点
        if (myHours < 10) {
          time2 = new Date(Year + '/' + Month + '/' + Day + ' 10:00:00');
        } else {
          Day += 1;
          time2 = new Date(Year + '/' + Month + '/' + Day + ' 10:00:00');
        }
        var i = time2.getTime() - myDate.getTime();
        $("#countDown .second").html(num((i - i % 1000) / 1000 % 60));
        $("#countDown .minute").html(num((i - i % (1000 * 60)) / (60 * 1000) % 60));//剩余分钟
        $("#countDown .hour").html(num((i - i % (1000 * 60 * 60)) / (60 * 1000 * 60) % 24));//剩余小时
        // 0点
        if ((i - i % 1000) / 1000 % 60 == 0 && (i - i % (1000 * 60)) / (60 * 1000) % 60 == 0 && (i - i % (1000 * 60 * 60)) / (60 * 1000 * 60) % 24 == 0) {
          // 重新加载页面
          window.location.reload();
        }
        // 10点
        if ((i - i % 1000) / 1000 % 60 == 0 && (i - i % (1000 * 60)) / (60 * 1000) % 60 == 0 && (i - i % (1000 * 60 * 60)) / (60 * 1000 * 60) % 24 == 10) {
          window.location.reload();
        }
      }, 1);
      function num(obj) {
        if (obj < 10) {
          obj = '0' + obj;
        }
        return obj;
      }
      var discountFalg = discountRushTime();//true为活动
      if (discountFalg) {
        _this.activityBegin = true;
      } else {
        _this.activityBegin = false;
      }
    },
    // 倒计时结束
    // 弹框
    POP: function () {
      popUp('', '<img class="login" src="https://jhapp.oss-cn-beijing.aliyuncs.com/img/login.png"/>|请登录建行手机银行');
      $('.msgMain h4').remove();
      $('.msgTopArea').css({
        'padding': '10% 19% 5%',
        'text-align': 'center'
      });
    },
    popTips: function (title) {
      popUp('', title);
      $('.msgMain h4').remove();
    },
    // 用户登录
    loginUser: function () {
      var _this = this;
      var userId = getParameter('userId') ? getParameter('userId') : window.localStorage.getItem('userId');
      if (userId == null) {
        var userId = getParameter('user_id') ? getParameter('user_id') : window.localStorage.getItem('userId');
      }
      window.localStorage.setItem('userId', userId);
      var userid = window.localStorage.getItem('userId');
      if (userid == 'null' || userid == null) {
        _this.POP();
      }
    },
    // 数据
    getInfo: function () {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      if (userid != 'null') {
        var loginId = userid;
      } else {
        var loginId = 0;
      }
      var searchConsuc = function (data) {
        var res = data.result;
        var list = [];
        if (res && res.length > 0) {
          res.forEach(function (_) {
            // model (string, optional): 手机平台(Android,iPhone,null),字段为null表示为新需求商品 ,
            if (_.model == null || _.model == "") {
              list.push(_)
            }
          })
        }
        if (list.length > 0) {
          list.forEach(function (listItem) {
            // 判断是何种卡券
            if (listItem.name.indexOf("年卡") >= 0) {
              listItem.name = '年卡'
            } else if (listItem.name.indexOf('季卡') >= 0) {
              listItem.name = '季卡'
            } else if (listItem.name.indexOf('月卡') >= 0) {
              listItem.name = '月卡'
            }
            if (listItem.originalPrice && listItem.price) {
              var discount = listItem.price * 10 / listItem.originalPrice * 1;
              discount = Math.ceil(discount);
              _this.$set(listItem, 'discount', discount)
              // listItem['discount'] = discount;
            }
          })
        }
        _this.productList = list;
        console.log(_this.productList, 11111)
        // _this.fiveDiscountShow();//是否显示五折
      };
      doGet(_this.Api.homepageItems + loginId, '', searchConsuc);
    },
    // 五折卡券是否显示
    // fiveDiscountShow:function(){
    //   var _this = this;
    //   if(_this.productList.length>0){
    //     var num = 0;
    //     _this.productList.forEach(function (_) {
    //       if(_.discount===5){
    //         var scope = _.dayScope?_.dayScope:0;
    //         num += scope
    //       }
    //     });
    //     // console.log(num,'总数');
    //     if(num==0){
    //       _this.fiveDiscount = false;
    //     }else{
    //       _this.fiveDiscount = true;
    //     }
    //   }
    // },
    // 选取正常卡类
    selectProduct: function (item) {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      if (userid != 'null') {
        if (item.isActivity === undefined || !item.isActivity) {
          _this.$set(item, 'isActivity', true);
        } else {
          item.isActivity = false;
        }
        _this.selectedProduct(item);
      } else {
        _this.POP();
      }

    },
    selectFiveProduct: function (item) {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      if (userid != 'null') {
        if (item.isScope == true || item.isScope == null) {
          if (item.isActivity === undefined || !item.isActivity) {
            _this.$set(item, 'isActivity', true);
          } else {
            item.isActivity = false;
          }
          _this.selectedProduct(item);
        } else {
          // _this.popTips('此卡券已售罄！');
        }
      } else {
        _this.POP();
      }
    },
    // 选取2.5折活动卡
    selectActivityProduct: function (item) {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      if (userid != 'null') {
        if (_this.activityBegin) {
          if (item.isScope == true || item.isScope == null) {
            if (item.dayScope && item.dayScope > 0) {
              if (item.isActivity === undefined || !item.isActivity) {
                _this.$set(item, 'isActivity', true);
              } else {
                item.isActivity = false;
              }
              _this.selectedProduct(item);
            } else {
              // _this.popTips('此卡券已售罄！');
            }
          }
        } else {
          // _this.popTips('活动还未开始!');
        }
      } else {
        _this.POP();
      }
    },
    selectedProduct: function (item) {
      var _this = this;
      if (_this.productList.length > 0) {
        _this.productList.forEach(function (_) {
          if (_.id !== item.id) {
            if (_.isActivity) {
              _.isActivity = false;
            }
          }
        })
      }

    },
    // 查看购买记录
    skewList: function () {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      if (userid != 'null') {
        window.location.href = 'couponList.html'
      } else {
        _this.POP();
      }
    },
    // 支付下单
    createOrder: function () {
      var _this = this;
      var userid = window.localStorage.getItem('userId');
      var isPay = false;
      var tempSelect = {};
      if (_this.productList.length > 0) {
        _this.productList.forEach(function (_) {
          if (_.isActivity && _.dayScope !== 0) {
            isPay = true;
            tempSelect = _;
          }
        })
      }
      _this.selected = tempSelect;
      if (userid != 'null') {
        if (isPay) {
          // 可下单
          _this.confirmOrder = true;
        } else {
          _this.confirmOrder = false;
          // _this.popTips('您还未选取卡券');
        }
      } else {
        _this.POP();
      }
    },
    // 我要支付
    payOrder: function () {
      var _this = this;
      var phoneNumber = "";
      var userid = window.localStorage.getItem('userId');
      window.location.href = '/order/create?phoneNumber=' + phoneNumber + '&productId=' + _this.selected.id + '&num=1' + '&userId=' + userid
      // window.location.href = '../paySuccess.html' //test
    },
    // 我要取消
    cancelOrder: function () {
      var _this = this;
      _this.confirmOrder = false;

    }
  }
});