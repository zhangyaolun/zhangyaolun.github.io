new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '积分明细'
    },
      {
        index: 1,
        title: '规则设置'
      }
      // {
      //   index: 2,
      //   title: '积分增减'
      // }
      ],
    loading: true,
    productForm: {
      productName: '',
      selectedMember: 0,
    },
    productName: '',
    selectedMember: 0,
    productListLength: 1,
    productLists: [],
    initialData: {
      memberIdView: null,
      name: null
    },
    changeValue: {
      memberIdView: null,
      name: null
    },
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1,
    // 规则设置
    setRuleForm: {
      userRegister: '500',
      userLogin: '50',
      ordereValuate: '30',
      userRecharge: '1',
      userOrder: '1000',
    },
    btnDisabled:false,
    setRules: {
      userName: [
        { required: true, type: 'string', message: '请输入会员注册的数量！', trigger: 'blur' },
      ],
    },
    // 积分增减
    scoreForm: {
      userName: '',
      isAddType: '0',
      scoreValue: '',
      describe: '',
    },
    scoreBtnDisabled:false,
    scoreRules: {
      userName: [
        { required: true, type: 'string', message: '请输入会员名称！', trigger: 'blur' },
      ],
      isAddType: [
        { required: true, type: 'string', message: '请选择积分增减类型！', trigger: 'blur' },
      ],
      scoreValue: [
        { required: true,  message: '积分值不能为空！', trigger: 'blur' },
      ],
    },
    userRights:{},
  },
  created: function () {
    // 获取本地权限
    var _this = this;
    _this.userRights = getPows();
  },
  mounted: function () {
    var _this = this;
    commonScript.appShowhide('app');
    _this.getInfo(0,_this.initialData);
  },
  methods: {
    // 页面初始加载数据
    getDate: function (index) {
      // 商品管理
      var _this = this;
      _this.loading = true;
      // 查询积分管理
        var res = function (data) {
          _this.loading = false;
          try {
            switch (data.httpCode) {
              case 200 :
                if(data.result&&data.result.length>0){
                  var result = data.result;
                  _this.setRuleForm.userLogin = result.dailyLogin;
                  _this.setRuleForm.userOrder = result.maxBonusExperiencePoint;
                  _this.setRuleForm.ordereValuate = result.orderComment;
                  _this.setRuleForm.userRegister = result.register;
                  _this.setRuleForm.userRecharge = result.salesPerExperiencePoint;
                  _this.scoreForm.describe = result.description;
                  _this.scoreForm.isAddType = result.increaseOrDecreaseType?'1':'0';
                  _this.scoreForm.userName = result.memberName;
                  _this.scoreForm.scoreValue = result.score.toString();
                }
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.log("REQUEST ERROR ", e);
          }
        };
        commonScript.doGet('/memberInfo/queryMemberScoreSettingsInfo','',res)
    },
    getInfo: function (index,values) {
      var _this = this;
      if (_this.current != index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
        // _this.$refs.setRuleForm.resetFields(); //切换时规则设置置空
        // _this.$refs.scoreForm.resetFields(); //切换时规则设置置空
      }
      _this.current = index;
      _this.loading = true;
      if(index==0){
        // 查询积分明细

        var res = function (data) {
          _this.loading = false;
          try {
            switch (data.httpCode) {
              case 200 :
                if(data.result){
                  var result = data.result.list;
                  _this.productLists = result;
                  _this.total = data.result.total;
                  if(result&&result.length>0){
                    _this.productLists.forEach(function (_) {
                      var time = commonScript.changedate(_.operationTime,'yyyy-MM-dd HH:mm:ss')
                      _.operationTime=time;
                    })
                  }else{
                    _this.productLists = [];
                  }
                }
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.log("REQUEST ERROR ", e);
          }

        };
        commonScript.doGet('/memberInfo/queryMemberScoreDetailInfo/'+ _this.pagenum + '/'+ _this.pagecount+'/'+values.memberIdView+'/'+values.name,'',res);

      }else{
        this.getDate(index);
      }

    },
    searchProduct: function () {
      var _this = this;
      _this.pagenum = 1;
      _this.pagecount = 10;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      changeValue.memberIdView=_this.productForm.selectedMember||null;
      changeValue.name = _this.productForm.productName||null;
      _this.changeValue = changeValue;
      _this.getInfo(0,changeValue);

    },
    // 刷新页面
    refresh: function (index) {
      var _this = this;
      _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      _this.getInfo(index,_this.initialData);

    },
    // 规则设置 提交
    submitRules: function (formName) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var datas={
            dailyLogin: _this.setRuleForm.userLogin,
            id: "7cc8a72235ca4b6d95a6915d977b9599",
            maxBonusExperiencePoint: _this.setRuleForm.userOrder,
            orderComment: _this.setRuleForm.ordereValuate,
            register:_this.setRuleForm.userRegister,
            salesPerExperiencePoint: _this.setRuleForm.userRecharge,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.btnDisabled=true;
                    _this.$message.success({message: '修改成功！'});
                    _this.getInfo(_this.current,_this.changeValue);
                    _this.btnDisabled=false;
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.log("REQUEST ERROR ", e);
              }

            };
            commonScript.doPost('/memberInfo/updateMemberScoreSettingsInfo', datas, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 规则设置结束
    // 积分增减 提交
    submitScore: function (formName) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var datas={
            description: _this.scoreForm.describe,
            id: "7cc8a72235ca4b6d95a6915d977b9599",
            increaseOrDecreaseType: _this.scoreForm.isAddType * 1,
            memberName: _this.scoreForm.userName,
            score:_this.scoreForm.scoreValue,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.scoreBtnDisabled=true;
                    _this.$message.success({message: '修改成功！'});
                    _this.getInfo(_this.current,_this.changeValue);
                    _this.scoreBtnDisabled=false;
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.log("REQUEST ERROR ", e);
              }

            };
            commonScript.doPost('/memberInfo/updateMemberScoreSettingsInfo', datas, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    // 积分增减结束
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },
    // 结束
    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagecount = val;
      _this.getInfo(this.current,_this.changeValue);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagenum = val;
      _this.getInfo(this.current,_this.changeValue);
    }

  }

})