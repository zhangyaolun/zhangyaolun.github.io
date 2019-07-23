new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      url: 'product.html',
      title: '会员管理'
    }],
    loading: true,
    productForm: {
      productName: '',
      selectedMember: 0,
      fromDate: '',
      toDate: ''
    },
    productLists: [],
    initialData:{
      idView:null,
      name :null,
      start:null,
      end:null
    },
    changeValue:{
      idView:null,
      name :null,
      start:null,
      end:null
    },
    editTrue: false,
    addForm: {
      id: '',
      score: '',
      name: '',
      selectedSex: '1',
      birthday: '',
      email: '',
      mobileTel: '',
      status: 1,
      isUse: 1
    },
    selectedPro: 'choose',
    selectedCity: 'choose',
    selectedArea: 'choose',
    selectedTown: 'choose',
    provinces: [],
    citys: [],
    areas: [],
    towns: [],
    // 分页
    pagecount: 10,
    pagenum: 1,
    total:10,
    currentPage:1,
    userRights:{},
    rules: {
      email: [
        // {required: true, message: '电子邮件不能为空！', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change']}
      ]
    }
  },
  created: function () {
    // 获取本地权限
    var _this = this;
    _this.userRights = getPows();
    console.log(_this.userRights)
  },
  mounted: function () {
    var _this = this;
    commonScript.appShowhide('app');
    _this.getInfo(0,_this.initialData);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index,values) {
      var _this = this;
      _this.loading = true;
      _this.current = index;
      // var start = _this.productForm.fromDate || null;
      // var end = _this.productForm.toDate || null;
      // if(_this.productForm.selectedMember=="0"){
      //   var name = null;
      //   var idView = _this.productForm.productName|| null
      // }else{
      //   var name = _this.productForm.productName || null;
      //   var idView =  null
      // }

      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                var result = data.result.list;
                if (result && result.length > 0) {
                  _this.productLists = result;
                  _this.productLists.forEach(function (_) {
                    var time = commonScript.changedate(_.registerTime, 'yyyy-MM-dd HH:mm:ss')
                    _.registerTime = time;
                  })
                } else {
                  _this.productLists = [];
                }
                _this.total = data.result.total;
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }
      };
      commonScript.getMember(_this.pagenum, _this.pagecount, values.idView, values.name, values.start, values.end, '', res)

    },
    // 刷新页面
    refresh: function (index) {
      var _this = this;
      _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      _this.getInfo(index,_this.initialData);

    },
    // 搜索
    searchDate:function(num){
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);

      if(_this.productForm.selectedMember=="0"){
        changeValue.name = null;
        changeValue.idView = _this.productForm.productName||null
      }else{
        changeValue.name = _this.productForm.productName||null;
        changeValue.idView = null
      }
      changeValue.start = _this.productForm.fromDate||null;
      changeValue.end = _this.productForm.toDate||null;

      _this.changeValue = changeValue;
      _this.getInfo(num , changeValue);

    },
    // 获取省份
    getProvince: function () {
      var _this = this;
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                _this.provinces = data.result;
                if (_this.provinces.length > 0) {
                  _this.provinces.unshift({
                    zoneId: 'choose',
                    name: '请选择'
                  });
                  _this.selectedPro = _this.provinces[0].zoneId;
                }
              } else {
                _this.provinces = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }
      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/0', '', res)
    },
    // 获取省对应的市
    changePro: function (val) {
      // console.log(val)
      var _this = this;
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                _this.citys = data.result;
                if (_this.citys && _this.citys.length > 0) {
                  _this.citys.unshift({
                    zoneId: 'choose',
                    name: '请选择'
                  });
                  _this.selectedCity = _this.citys[0].zoneId;
                  _this.areas = [];
                  _this.towns = [];
                }
              } else {
                _this.citys = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + val, '', res)
    },
    // 获取市对应的区
    changeCity: function (val) {
      var _this = this;
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                _this.areas = data.result;
                if (_this.areas.length > 0) {
                  _this.areas.unshift({
                    zoneId: 'choose',
                    name: '请选择'
                  });
                  _this.selectedArea = _this.areas[0].zoneId;
                  _this.towns = [];
                }
              } else {
                _this.areas = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + val, '', res)
    },
    // 获取区对应的街道
    changeArea: function (val) {
      var _this = this;
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                _this.towns = data.result;
                if (_this.towns.length > 0) {
                  _this.towns.unshift({
                    zoneId: 'choose',
                    name: '请选择'
                  });
                  _this.selectedTown = _this.towns[0].zoneId;
                }
              } else {
                _this.towns = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + val, '', res)
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
    // 审核
    examineUser: function (item) {
      var _this = this;
      _this.getProvince();
      _this.editTrue = true;
      var memberAdd = []
      if (item.address && item.address != "") {
        if(item.address.indexOf("|") != -1){
          var arr = item.address.split("|");
          if(arr[1].indexOf(" ") != -1) {
            memberAdd = arr[1].split(" ");
          }
        }

        var num = memberAdd.length;
        switch (num) {
          case 0:
            break;
          case 1:
            if (memberAdd[0]) {
              _this.selectedPro = memberAdd[0];
            }
            break;
          case 2:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.selectedCity = memberAdd[1];
            }
            break;
          case 3:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.changeCity(memberAdd[1]);
              _this.selectedCity = memberAdd[1];

            }
            if (memberAdd[2]) {
              _this.selectedArea = memberAdd[2];
            }

            break;
          case 4:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.changeCity(memberAdd[1]);
              _this.selectedCity = memberAdd[1];

            }
            if (memberAdd[2]) {
              _this.changeArea(memberAdd[2]);
              _this.selectedArea = memberAdd[2];
            }
            if (memberAdd[3]) {
              _this.selectedTown = memberAdd[3];
            }
            break;
        }
      }

      _this.addForm.id = item.idView;
      _this.addForm.name = item.nickname;
      _this.addForm.score = item.score;
      if (item.gender) {
        _this.addForm.selectedSex = item.gender.toString();
      }
      if(item.birthday){
        _this.addForm.birthday = item.birthday;
      }
      _this.addForm.constellation = item.constellation;
      _this.addForm.mobileTel = item.telephone;
      _this.addForm.email = item.email;
      var layer = layui.layer;
      layer.open({
        title: '审核会员信息'
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['760px', '525px']
        , type: 1
        , zIndex: 99
        , scrollbar: false
        , yes: function () {
          _this.examined('addForm', item.id);
          layer.closeAll();
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          _this.$refs.addForm.resetFields();
          _this.selectedPro = "choose"
          _this.citys = _this.areas = _this.towns = [];
          _this.editTrue = false;
        }
        , cancel: function () {
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
          _this.selectedPro = "choose"
          _this.citys = _this.areas = _this.towns = [];
          _this.editTrue = false;

        }
      });
    },
    // 审核
    examined: function (formName,id) {
      var _this = this;
      // 勾选地址
      var address = "",addrssName = "";
      if (_this.selectedPro !== 'choose') {
        address = _this.selectedPro;
        if(_this.provinces.length>0){
          _this.provinces.forEach(function (p) {
            if(p.zoneId == _this.selectedPro){
              addrssName = p.name
            }
          })
        }
        if (_this.selectedCity !== 'choose') {
          address += ' ' + _this.selectedCity;
          if(_this.citys.length>0){
            _this.citys.forEach(function (c) {
              if(c.zoneId == _this.selectedCity){
                addrssName +=' '+ c.name
              }
            })
          }
          if (_this.selectedArea !== 'choose') {
            address += ' ' + _this.selectedArea;
            if(_this.areas.length>0){
              _this.areas.forEach(function (a) {
                if(a.zoneId == _this.selectedArea){
                  addrssName +=' '+ a.name
                }
              })
            }
            if (_this.selectedTown !== 'choose') {
              address += ' ' + _this.selectedTown;
              if(_this.towns.length>0){
                _this.towns.forEach(function (t) {
                  if(t.zoneId == _this.selectedTown){
                    addrssName +=' '+ t.name
                  }
                })
              }
            }
          }
        }
      } else {
        address = "";
        addrssName="";
      }
      linkAddress = addrssName + "|"+ address
      var datas={
        id: id,
        address: linkAddress,
        allowLogin: _this.addForm.isUse,
        birthday: _this.addForm.birthday,
        email: _this.addForm.email,
        gender: _this.addForm.selectedSex,
      };
      // 审核会员信息
      var add = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              _this.getInfo(_this.current,_this.changeValue);
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }
      };
      commonScript.doPost('/memberInfo/updateMemberInfoInfo',datas , add);
    },
    // 审核结束

    // 查看会员详情
    skewDetail: function (item) {
      var _this = this;
      _this.editTrue = false;
      _this.getProvince();
      var memberAdd = []
      if (item.address && item.address != "") {
        if(item.address.indexOf("|") != -1){
          var arr = item.address.split("|");
          if(arr[1].indexOf(" ") != -1) {
            memberAdd = arr[1].split(" ");
          }
        }

        var num = memberAdd.length;
        switch (num) {
          case 0:
            break;
          case 1:
            if (memberAdd[0]) {
              _this.selectedPro = memberAdd[0];
            }
            break;
          case 2:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.selectedCity = memberAdd[1];
            }
            break;
          case 3:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.changeCity(memberAdd[1]);
              _this.selectedCity = memberAdd[1];

            }
            if (memberAdd[2]) {
              _this.selectedArea = memberAdd[2];
            }

            break;
          case 4:
            if (memberAdd[0]) {
              _this.changePro(memberAdd[0]);
              _this.selectedPro = memberAdd[0];
            }
            if (memberAdd[1]) {
              _this.changeCity(memberAdd[1]);
              _this.selectedCity = memberAdd[1];

            }
            if (memberAdd[2]) {
              _this.changeArea(memberAdd[2]);
              _this.selectedArea = memberAdd[2];
            }
            if (memberAdd[3]) {
              _this.selectedTown = memberAdd[3];
            }
            break;
        }
      }
      _this.addForm.id = item.idView;
      _this.addForm.name = item.nickname;
      _this.addForm.score = item.score;
      if (item.gender) {
        _this.addForm.selectedSex = item.gender.toString();
      }
      if(item.birthday){
        _this.addForm.birthday = item.birthday;
      }
      _this.addForm.constellation = item.constellation;
      _this.addForm.mobileTel = item.telephone;
      _this.addForm.email = item.email;
      var layer = layui.layer;
      layer.open({
        title: '查看会员信息'
        , content: layui.jquery("#add")
        , btn: []
        , area: ['757px', '525px']
        , type: 1
        , zIndex: 99
        , scrollbar: false
      });

    },
    // 查看会员详情结束
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