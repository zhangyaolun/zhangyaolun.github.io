new Vue({
  el: '#app',
  data: {
    // validateAccount = (rules2, value, callback) => {
    //
    // },
    validateAccount:{

    },
    pickerfromDate:{
      disabledDate(time) {
        let now = new Date().getTime() - (24 * 60 * 60 * 1000);
        return time.getTime() < now
      }
    },
    current: 0,
    productNav: [{
      index: 0,
      title: '商家列表'
    }],
    loading: true,
    productForm: {
      productName: '',
      selectedMember: '0',
      shopType: 'null',
      isEnable: 'null',
    },
    initialData: {},
    changeValue: {},
    shopCategotyList: [],
    shopLevelList: [],
    productLists: [],
    productLists2: [],
    editTrue: false,
    addForm: {
      userName: '',
      userPsw: '111111',
      shopName: '',
      openTime: commonScript.changedate(Date.now(), 'yyyy-MM-dd HH:mm:ss'),
      shopDescribe: '',
      shopLicense: '',
      shopICP: '',
      address: '',
      shopType: "1",
      fromDate: '',
      phone: '',
      email: '',
      status: 1,
    },
    shopForm: {
      id: '',
      examineCompany: 1,
      examineBankTax: 1,
      examineShop: 1,
      examineMsg: '',
    },
    userRights:{},
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1,
    rules: {
      userName: [
        {required: true, type: 'string', message: '请输入店主账号！', trigger: 'blur'},
        {pattern: /^[0-9a-zA-Z]+$/, message: '英文或者数字！', trigger: 'blur' },
        {min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur'},

      ],
      shopName: [
        {required: true, type: 'string', message: '请输入店铺名称！', trigger: 'blur'}
      ],
      email: [
        {required: true, message: '电子邮件不能为空！', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change']}
      ]
    }
  },
  created: function () {
    var _this = this;
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    var _this = this;
    commonScript.appShowhide('app');
    _this.getInfo(0,_this.initialData);
  },
  methods: {
    checkAccount:function(){
      var _this = this;
      if(_this.addForm.userName!=""){
        var datas = {
          account:_this.addForm.userName
        };
        var res = function (data) {
          try {
            switch (data.httpCode) {
              case 200 :
                if(data.result){
                  _this.$message.success({message: data.msg});

                }else{
                  _this.$message.error({message: data.msg});

                }
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.error("REQUEST ERROR ", e);
          }
        };
        commonScript.doPost('/taikangSeller/judge',datas,res)
      }else{
        _this.$message.error({message: '请先输入店主账号！'});
      }

    },
    // 页面初始加载数据
    getDate: function (index,values) {
      var _this = this;
      _this.loading = true;

      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data) {
                _this.loading = false;
                if (data.result) {
                  var result = data.result.list
                  if (result && result.length > 0) {
                    _this.productLists = result;
                    result.forEach(function (_) {
                      if(_.createTime){
                        var time = _.createTime;
                        time = commonScript.changedate(time, 'yyyy-MM-dd HH:mm:ss')
                        _.createTime = time
                      }
                      if(_.effectiveTime){
                        var time2 = _.effectiveTime;
                        time2 = commonScript.changedate(time2, 'yyyy-MM-dd HH:mm:ss')
                        _.effectiveTime = time2
                      }
                    })
                    _this.total = data.result.total;

                  } else {
                    _this.productLists = []
                    _this.total = 0;
                  }
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
      commonScript.doPost('/taikangSeller/' + _this.pagenum + '/' + _this.pagecount, values, res)
      // commonScript.getShopManger(_this.pagenum,_this.pagecount,shopkeeperUsername,shopName,shopType,status,'',res);

    },
    getInfo: function (index,values) {
      var _this = this;
      if (_this.current !== index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      }
      _this.current = index;
      _this.loading = true;
      _this.getDate(index,values);
    },
    // 搜索
    searchDate:function(num){
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      var state = _this.productForm.selectedMember;
      if (state == "1") {
        changeValue.account= _this.productForm.productName
      } else if (state == "2") {
          changeValue.shopName= _this.productForm.productName
      } else {
        changeValue = {}
      }
      _this.changeValue = changeValue;
      _this.getInfo(num,changeValue);
    },

    // 单条数据选中
    selectOrder: function (item, lists) {
      var _this = this;
      if (item.active === undefined || !item.active) {
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item, lists);
    },
    // 单条数据选中结束
    // 新增店铺
    addClassify: function (title, id) {
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        , zIndex: 99
        , scrollbar: false
        , yes: function () {
          _this.addNewShop('addForm', id);
          _this.editTrue = false;
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          _this.editTrue = false;
          _this.$refs.addForm.resetFields();
        }
        , cancel: function () {
          //右上角关闭回调
          _this.editTrue = false;
          _this.$refs.addForm.resetFields();
        }
      });

    },
    // 确定 新增 编辑 店铺
    addNewShop: function (formName, id) {
      var _this = this;
      // 更新店铺地址
      var address = "";
      if (_this.selectedPro !== 'choose') {
        address = _this.selectedPro;
        if (_this.selectedCity !== 'choose') {
          address += '-' + _this.selectedCity;
          if (_this.selectedArea !== 'choose') {
            address += '-' + _this.selectedArea;
            if (_this.selectedTown !== 'choose') {
              address += '-' + _this.selectedTown;
            }
          }
        }
      } else {
        address = "";
      }
      // if (_this.addForm.fromDate) {
      //   var limitTime = commonScript.changedate(_this.addForm.fromDate, 'yyyy-MM-dd HH:mm:ss')
      // }
      // var startTime = commonScript.changedate(Date.now(), 'yyyy-MM-dd HH:mm:ss');
      var datas = {
        "address": _this.addForm.address,
        "bizLicence": _this.addForm.shopLicense,
        "effectiveTime": _this.addForm.fromDate,
        "email": _this.addForm.email,
        "icpNumber": _this.addForm.shopICP,
        "openTime": '',
        "password": _this.addForm.userPsw,
        "shopDesc": _this.addForm.shopDescribe,
        "shopName": _this.addForm.shopName,
        "shopType": _this.addForm.shopType * 1,
        "telephone": _this.addForm.phone,
      };
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (id !== undefined) {
            // 编辑
            datas['id'] = id;
            if (_this.addForm.status == 0) {
              var status = 9
            } else if (_this.addForm.status == 1) {
              var status = 1
            }
            datas['status'] = status;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '编辑成功！'});
                    _this.getInfo(_this.current,_this.changeValue);
                    _this.$refs.addForm.resetFields();//点击确认后清空表单
                    layer.closeAll();
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.error("REQUEST ERROR ", e);
              }
            };
            commonScript.doPost('/taikangSeller/update', datas, add);
          } else {
            datas['account'] = _this.addForm.userName;
            // 新增
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '新增成功！'});
                    _this.getInfo(_this.current,_this.initialData);
                    _this.$refs.addForm.resetFields();//点击确认后清空表单
                    layer.closeAll();
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.error("REQUEST ERROR ", e);
              }
            };
            commonScript.doPost('/taikangSeller/save', datas, add);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 编辑店铺
    showDetail: function (item) {
      var _this = this;
      _this.editTrue = true;
      _this.addForm.userName = item.account;
      _this.addForm.shopName = item.shopName;
      _this.addForm.userPwd = item.password;
      if (item.openTime) {
        var openTime = commonScript.changedate(item.openTime, 'yyyy-MM-dd HH:mm:ss');
      } else {
        openTime = ""
      }
      _this.addForm.openTime = openTime;
      _this.addForm.shopDescribe = item.shopDesc;
      _this.addForm.shopLicense = item.bizLicence;
      _this.addForm.shopICP = item.icpNumber;
      _this.addForm.address = item.address;
      _this.addForm.shopType = "1";
      if(item.effectiveTime){
        _this.addForm.fromDate =  Date.parse(item.effectiveTime);
      }
      _this.addForm.phone = item.telephone;
      _this.addForm.email = item.email;
      if(item.status==0||item.status==9){
        _this.addForm.status = 0
      }else{
        _this.addForm.status = 1
      }
      _this.addClassify('编辑店铺', item.id);
    },


    // 审核店铺
    passShop: function (id) {
      var _this = this;
      var datas = {
        "id": id,
        "status": 1
      };
      _this.$confirm('你确定审核该商家?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '审核成功！'});
                  _this.getInfo(_this.current,_this.changeValue);
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doPost('/taikangSeller/check', datas, res);
      }).catch((err) => {

      });
    },
// 禁止店铺
    closeShop: function (id) {
      var _this = this;
      var datas = {
        "id": id,
        "status": 9
      };
      _this.$confirm('你确定关闭该商家?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '店铺已关闭！'});
                  _this.getInfo(_this.current,_this.changeValue);
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doPost('/taikangSeller/check', datas, res);
        // commonScript.doPost('/shopInfo/approvalTaikangSellerInfo', datas, res);
      }).catch((err) => {

      });
    },
    // 删除
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            _this.$message.success({message: '删除成功！'});
            _this.getInfo(_this.current,_this.initialData);
          }
        };
        commonScript.doGet('/shopInfo/deleteShopSelfsupportShopInfo/' + id, '', res);
      }).catch((err) => {

      });
    },
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