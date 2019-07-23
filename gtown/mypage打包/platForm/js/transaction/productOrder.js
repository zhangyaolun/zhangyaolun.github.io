new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '商品订单'
    }],
    loading: true,
    addForm: {
      name: '',
      description: '',
      status: '1',
      isUse: '1'
    },
    productForm: {
      productName: '',
      shopName: '',
      reciverTel: '',
      payOrder: '',
      selectedOrderStatus: 0,
      fromDate: '',
      toDate: ''
    },
    initialData: {
      count: 10,
      index: 1,
      orderNumber: "",
      orderState: "",
      payTimeLowLimit: "",
      payTimeUpLimit: "",
      productNumber: "",
      shopName: "",
      telephone: ""
    },
    changeValue: {
      count: 10,
      index: 1,
      orderNumber: "",
      orderState: "",
      payTimeLowLimit: "",
      payTimeUpLimit: "",
      productNumber: "",
      shopName: "",
      telephone: ""
    },
    productLists: [],
    products: [],
    selectedAll: false,
    selectedProduct: false,
    totalMoney: 0,
    orderPayment: 0,
    scores: 0,
    userRights: {},
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage: 1,
  },
  created: function () {
    var _this = this;
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    // FastClick.attach(document.body);
    var _this = this;
    commonScript.appShowhide('app');
    _this.getInfo(0,_this.initialData);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index,values) {
      var _this = this;
      _this.current = index;
      _this.loading = true;
      values.count = _this.pagecount;
      values.index = _this.pagenum;
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                var result = data.result.list;
                _this.productLists = result;
                _this.total = data.result.total;
                if (result && result.length > 0) {
                  _this.productLists.forEach(function (_) {
                    var create = commonScript.changedate(_.createTime, 'yyyy-MM-dd HH:mm:ss')
                    _.createTime = create;
                    var payTime = commonScript.changedate(_.paymentTime, 'yyyy-MM-dd HH:mm:ss')
                    _.paymentTime = payTime;

                  })
                } else {
                  _this.productLists = []
                }
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }
      };
      // commonScript.getOrderInfo(_this.pagenum,_this.pagecount,false,orderState,orderNumber,buyerUsername,telephone,shopName,payorderNumber,start,end,'',res)
      commonScript.doPost('/transactionInfo/queryProductOrderInfo', values, res);

    },
    // 刷新页面
    refresh: function (index) {
      var _this = this;
      _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      _this.getInfo(index,_this.initialData);
    },
    // 搜索
    searchDate: function (num) {
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      var orderState = _this.productForm.selectedOrderStatus || "";
      if (orderState == 0) {
        orderState = ""
      } else {
        orderState = _this.productForm.selectedOrderStatus || "";
      }
      changeValue.count = _this.pagecount;
      changeValue.index = _this.pagenum;
      changeValue.orderNumber = _this.productForm.productName || "";
      changeValue.orderState = orderState;
      changeValue.payTimeLowLimit = _this.productForm.fromDate || "";
      changeValue.payTimeUpLimit = _this.productForm.toDate || "";
      changeValue.productNumber = _this.productForm.payOrder || "";
      changeValue.shopName = _this.productForm.shopName || "";
      changeValue.telephone = _this.productForm.reciverTel || "";

      _this.changeValue = changeValue;
      _this.getInfo(num,changeValue);
    },
    // 渠道销售明细报表导出
    exportSell: function () {
      var _this = this;
      var orderState = _this.productForm.selectedOrderStatus || null;
      if (orderState == 0) {
        orderState = null
      } else {
        orderState = _this.productForm.selectedOrderStatus || null;
      }
      var orderNumber = _this.productForm.productName || null;
      var buyerUsername = null;
      var telephone = _this.productForm.reciverTel || null;
      var shopName = _this.productForm.shopName || null;
      var payorderNumber = _this.productForm.payOrder || null;
      var start = _this.productForm.fromDate || null;
      var end = _this.productForm.toDate || null;
      // /transactionInfo/exportTransactionOrdersInfo/{index}/{count}/{isVirtualOrder}/{orderState}/{orderNumber}/{buyerAccount}/{telephone}/{shopName}/{payorderNumber}/{payTimeLowLimit}/{payTimeUpLimit}
      // 导出交易订单信息
      window.location.href = '/transactionInfo/exportTransactionOrdersInfo/' + _this.pagenum + '/' + _this.pagecount + '/' + false + '/' + orderState + '/' + orderNumber + '/' + buyerUsername + '/' + telephone + '/' + shopName + '/' + payorderNumber + '/' + start + '/' + end;
    },
    // 发货状态报表导出
    exportSendStatus: function () {
      this.exportSell();

    },
    getOrderMsg: function (id) {
      var _this = this;
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result && data.result.length > 0) {
                _this.products = data.result;
              } else {
                _this.products = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }


      };
      commonScript.doGet('/transactionInfo/queryOrderDetailInfo/' + id, '', res);

    },
    // 查看详情
    skewDetail: function (item) {
      var _this = this;
      var result = item;
      _this.addForm.receiverName = result.receiverName;
      _this.addForm.telephone = result.telephone;
      _this.addForm.address = result.address;
      _this.addForm.status = result.orderStateRemark;
      _this.addForm.number = item.id;
      if (result.createTime) {
        var time = commonScript.changedate(result.createTime, 'yyyy-MM-dd HH:mm:ss');
        _this.addForm.createTime = time
      }
      _this.addForm.buyerRemark = result.buyerRemark;
      _this.totalMoney = result.productTotalPrice;
      _this.orderPayment = result.orderPayment;

      _this.getOrderMsg(item.id);
      var layer = layui.layer;
      layer.open({
        title: '订单详情'
        , content: layui.jquery("#brandList")
        , btn: []
        , area: ['800px', '525px']
        , type: 1
        , scrollbar: false
      });

    },
    // 查看详情结束
    // 全选
    selectedAllProduct: function (val) {
      var _this = this;
      _this.selectedAll = !_this.selectedAll;
      if (_this.productLists && _this.productLists.length > 0) {
        if (_this.selectedAll) {
          _this.productLists.forEach(function (_, i) {
            _this.$set(_, 'active', true)
          });
        } else {
          _this.productLists.forEach(function (_, i) {
            _this.$set(_, 'active', false)
          });
        }
      }
      _this.addMoney();
    },
    // 单条数据选中
    selectOrder: function (item, index) {
      var _this = this;
      if (item.active) {
        _this.$set(item, 'active', false);
      } else {
        _this.$set(item, 'active', true);
      }
      let num = 0
      if (_this.productLists) {
        _this.productLists.forEach(function (_, i) {
          if (_.active) {
            num++;
          }
        });
        if (num === _this.productLists.length) {
          _this.selectedAll = true;
        } else {
          _this.selectedAll = false;
        }
      }
      _this.addMoney();
    },
    // 单条数据选中结束
    // 计算选中金额
    addMoney: function () {
      var _this = this
      var money = 0;
      if (_this.productLists && _this.productLists.length > 0) {
        _this.productLists.forEach(function (_, i) {
          if (_.active) {
            money += _.salePrice * 1;
          }
        });
        _this.totalMoney = money;
      }
    },
    // 选中金额结束
    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagecount = val;
      _this.getInfo(_this.current,_this.changeValue);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagenum = val;
      _this.getInfo(_this.current,_this.changeValue);
    }

  }

})