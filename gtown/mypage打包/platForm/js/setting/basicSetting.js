new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '站点设置'
    },
      {
        index: 1,
        title: '上传设置'
      },
      {
        index: 2,
        title: '邮件设置'
      },{
        index: 3,
        title: '地区设置'
      },
      {
        index: 4,
        title: '敏感词设置'
      },
      {
        index: 5,
        title: '授权证书'
      },
      {
        index: 6,
        title: '数值参数设置'
      }],
    loading: true,
    // 站点设置
    stationForm:{
      stationName:'',
      language:'',
      timeZone:'',
      dataType:'',
      dateType:'',
      timeType:'',
      stationStatus:'1'
    },
    stationBtnDisabled:false,

    // 上传设置
    uploadForm:{
      uploadStatus:1,
      fileSize:'',
      imgExtension:'',
      uploadAddress:'',
      uploadKey:''

    },
    uploadBtnDisabled:false,

    // 邮件设置
    emailSetting:{
      SMTP_server:'',
      SMTP_port:'',
      SMTP_email:'',
      SMTP_userName:'',
      SMTP_userPsd:'',
      SMTP_testEmail:'',
    },
    emailBtnDisabled:false,
    messageForm:{
      account:'',
      password:'',
    },
    msgBtnDisabled:false,
    // 地区设置
    addZoneForm:{
      areaName:'',
      Pzone:'',
      zoneName:'',

    },
    areaZones:[],
    showArea:true,
    showCity:true,
    // 敏感词设置设置
    editfalse:false,
    addForm:{
      sensitive:'',
      changeWord:'',

    },
    wordLists:[
      {
        TypeId: 12,
        TypeName: '海牙湾',
        typeOrder: 58,
      }, {
        TypeId: 12,
        TypeName: '海牙湾',
        typeOrder: 58,
      },
    ],
    // 授权证书
    authorizeDisabled:true,
    authorizeForm:{
      authorizeName:'aaaa',
      authorizeDomain:'bbb',
      authorizeData:'666666',
      certificate:'',

    },
    authorizeBtnDisabled:false,
    // 数值参数设置
    percentageForm:{
      percentage:'',

    },
    percentageBtnDisabled:false,
    productForm: {
      productName: '',
      selectedMember: 0,
    },

    setRules: {
      stationName: [
        { required: true, type: 'string', message: '网站名称不能为空！', trigger: 'blur' },
      ],
      fileSize: [
        { required: true, type: 'string', message: '图片文件大小不能为空！', trigger: 'blur' },
      ],
      imgExtension: [
        { required: true, type: 'string', message: '图片扩展名不能为空！', trigger: 'blur' },
      ],
      SMTP_server: [
        { required: true, type: 'string', message: 'SMTP服务器不能为空！', trigger: 'blur' },
      ],
      SMTP_email: [
        { required: true, type: 'string', message: '发信人邮件地址不能为空！', trigger: 'blur' },
      ],
      SMTP_userPsd: [
        { required: true, type: 'string', message: 'SMTP 身份验证密码不能为空！', trigger: 'blur' },
      ],

    },

    scoreForm: {
      userName: '',
      isAddType: '0',
      scoreValue: '',
      describe: '',
    },
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
  },
  mounted: function () {
    commonScript.appShowhide('app');
    this.getInfo(0);
  },
  methods: {
    // 页面初始加载数据
    getDate: function () {
      var _this = this;
      _this.loading = true;
      // 查询基础设置
      var res = function (data) {
        _this.loading = false;
        if(data.result){
          var result = data.result;
          // 站点设置
          _this.stationForm.stationName=result.websiteName;
          _this.stationForm.language=result.defaultLanguage;
          _this.stationForm.timeZone=result.defaultTimeZone;
          _this.stationForm.currency=result.currencySymbol;
          _this.stationForm.dateType=result.dateFormat;
          _this.stationForm.timeType=result.timeFormat;
          _this.stationForm.ICP=result.icpNumber;
          _this.stationForm.describe=result.flowStatisticsCode;
          _this.stationForm.copyright=result.copyrightInfo;
          _this.stationForm.stationStatus=result.websiteStatus?'1':'0';
          _this.stationForm.closeReason=result.closedReason;
            // 站点设置结束
          // 上传设置
          _this.uploadForm.imgExtension=result.pictureExtensionName;
          _this.uploadForm.fileSize= result.pictureSize;
          _this.stationForm.uploadStatus=result.pictureStatus?'1':'0',
          _this.uploadForm.uploadAddress=result.pictureUploadAddress,
          _this.uploadForm.uploadKey= result.pictureUploadKey,
          // 上传设置结束

            // 邮件设置
           _this.emailSetting.SMTP_email = result.senderMailAddress;
           _this.emailSetting.SMTP_port=result.smtpPort;
           _this.emailSetting.SMTP_server=result.smtpServer;
           _this.emailSetting.SMTP_userPsd=result.smtpVerificationPassword;
           _this.emailSetting.SMTP_userName=result.smtpVerificationUsername;
           _this.emailSetting.SMTP_testEmail=result.testMailAddress;
          // 短信设置
          _this.messageForm.account = result.yuanfengMessageUsername;
          _this.messageForm.password=result.yuanfengMessagePassword;
            // 邮件设置结束
          // 授权证书
         _this.authorizeForm.authorizeName= result.grantCompanyName;
         _this.authorizeForm.authorizeDomain= result.grantDomainName;
         var vaildTime = commonScript.changedate(result.validTime,'yyyy-MM-dd');
         _this.authorizeForm.authorizeData = vaildTime ;
         _this.authorizeForm.certificate= result.certificateInformation;
          // 授权证书结束

          // 分佣比例
          _this.percentageForm.percentage= result.wapShareRatio;


        }
      };
      commonScript.getSettingBase(res);
    },
    getInfo: function (index) {
      var _this = this;
      _this.loading = true;
      _this.current = index;
      if(index == 3){
        // 地区
        _this.loading = true;
        // var result = getArea();
        var res = function(data){
          _this.loading = false;
          if(data.result){
            var result = data.result;
            _this.areaZones = result;
          }
        };
        commonScript.doGet('/settingsInfo/queryZoneInfo/0','',res);

      }else if(index ==4){
        // 敏感词
        var res = function (data) {
          _this.loading = false;
          if(data.result){
            var result = data.result.list;
            _this.wordLists = result;
            _this.total = data.result.total;
            if(_this.wordLists && _this.wordLists.length>0){
              _this.wordLists.forEach(function (_) {
                var time = _.updateTime;
                time = commonScript.changedate(time,'yyyy-MM-dd HH:mm:ss')
                _.updateTime = time;

                })
            }
            _this.total = data.result.total;
          }
        };
        commonScript.getSensitiveWord(_this.pagenum,_this.pagecount,res);

      }else {
        this.getDate();
      }


    },
    // 刷新页面
    // refresh: function (index) {
    //   var _this = this;
    //   _this.getInfo(index);
    //
    // },
    // 新增地区
    addArea:function(title,id,pid,pName){
      var _this = this;
      if(id != undefined||id!=null) {
        _this.addZoneForm.Pzone = pName;
      }
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#addZone")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        , yes: function () {
          _this.addZone(id,pid,pName);
          layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.addZoneForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.addZoneForm.resetFields();
        }
      });

    },
    // 确定 新增 编辑 地区
    addZone:function(id,pid,pName){
      var _this = this;
      _this.addZoneForm.Pzone = pName;
      var data = {
      "name": _this.addZoneForm.areaName,
      "parentid": pid,
      "regionname": _this.addZoneForm.zoneName,
  };
      if(id != undefined||id!==null){
        // 编辑
        data['id'] = id;
        var add = function (data) {
          _this.getInfo(_this.current);
        };
        commonScript.doPost('/settingsInfo/updateZoneInfo',data,add);

      }else{
        // 新增
        var add = function (data) {
          _this.getInfo(_this.current);
        };
        commonScript.doPost('/settingsInfo/insertZoneInfo',data,add);

  }
  _this.$refs.addZoneForm.resetFields(); //点击确认后清空表单

},
    // 编辑地区
    editZone:function(item){
      var _this = this;
      _this.addZoneForm.areaName = item.name;
      var pid= item.parentid;
      _this.addZoneForm.Pzone= item.parentName;
      _this.addZoneForm.zoneName= item.regionname;
      _this.addArea('编辑地区',item.id,pid,item.parentName);
},
    // 新增地区结束

    // 新增敏感词
    addWords:function(title,id){
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        , yes: function () {
          _this.addSensitive(id);
          layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.addForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
        }
      });
    },
    // 确定 新增 编辑 敏感词
    addSensitive:function(id){
      var _this = this;
      var data = {
        "newWord": _this.addForm.sensitive,
        "sensitiveWord": _this.addForm.changeWord,
      };
      if(id != undefined){
        // 编辑
        data['id'] = id;
        var add = function (data) {
          _this.getInfo(_this.current);
        };
        commonScript.doPost('/settingsInfo/updateSensitiveWordInfo',data,add);

      }else{
        // 新增
        var add = function (data) {
          _this.getInfo(_this.current);
        };
        commonScript.doPost('/settingsInfo/insertSensitiveWordInfo',data,add);


      }
      _this.$refs.addForm.resetFields(); //点击确认后清空表单
      _this.editfalse = false;



    },
    // 编辑敏感词
    showDetail:function(item){
      var _this = this;
      _this.editfalse = true;
      _this.addForm.sensitive = item.newWord;
      _this.addForm.changeWord = item.sensitiveWord;
      _this.addWords('编辑敏感词',item.id);
    },

    // 新增敏感词结束
    // 站点设置 提交
    submitStation: function (formName) {
      var _this = this;
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
              "closedReason": _this.stationForm.closeReason,
              "copyrightInfo": _this.stationForm.copyright,
              "currencySymbol": _this.stationForm.currency,
              "dateFormat": _this.stationForm.dateType,
              "defaultLanguage": _this.stationForm.language,
              "defaultTimeZone": _this.stationForm.timeZone,
              "flowStatisticsCode": _this.stationForm.describe,
              "icpNumber": _this.stationForm.ICP,
              "id": "19915bb1dd3b433ab486d50eaee14deb",
              "timeFormat": _this.stationForm.timeType,
              "websiteName": _this.stationForm.stationName,
              "websiteStatus": _this.stationForm.stationStatus * 1,
            };
            _this.$confirm('修改立马生效,是否继续？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var res = function (data) {
                _this.stationBtnDisabled=true;
                _this.$message.success({message: '修改成功！'});
                _this.getInfo(_this.current);
                _this.stationBtnDisabled=false;
              };
              commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
            }).catch((err) => {

            });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // 上传设置提交
    submitUpload:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "19915bb1dd3b433ab486d50eaee14deb",
            "pictureExtensionName":_this.uploadForm.imgExtension,
            "pictureSize": _this.uploadForm.fileSize,
            "pictureStatus": _this.stationForm.uploadStatus * 1,
            "pictureUploadAddress":_this.uploadForm.uploadAddress ,
            "pictureUploadKey": _this.uploadForm.uploadKey ,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.stationBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.stationBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 更新证书
    submitAuthorize:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "grantCompanyName":_this.authorizeForm.authorizeName,
            "grantDomainName": _this.authorizeForm.authorizeDomain,
            "id": "19915bb1dd3b433ab486d50eaee14deb",
            "certificateInformation": _this.authorizeForm.certificate,
            "validTime":_this.authorizeForm.authorizeData ,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.stationBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.stationBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 邮件设置提交
    submitEmail:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "19915bb1dd3b433ab486d50eaee14deb",
            "senderMailAddress": _this.emailSetting.SMTP_email,
            "smtpPort":_this.emailSetting.SMTP_port,
            "smtpServer": _this.emailSetting.SMTP_server,
            "smtpVerificationPassword": _this.emailSetting.SMTP_userPsd,
            "smtpVerificationUsername": _this.emailSetting.SMTP_userName,
            "testMailAddress": _this.emailSetting.SMTP_testEmail,
            "yuanfengMessagePassword": "",
            "yuanfengMessageUsername": ""
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.stationBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.stationBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 短信设置提交
    submitMessage:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "19915bb1dd3b433ab486d50eaee14deb",
            "yuanfengMessagePassword": _this.messageForm.password,
            "yuanfengMessageUsername": _this.messageForm.account
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.msgBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.msgBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 数值参数提交
    submitPercentage:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "wapShareRatio":_this.percentageForm.percentage,
            "id": "19915bb1dd3b433ab486d50eaee14deb",
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.percentageBtnDisabled = true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.percentageBtnDisabled = false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsBaseInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 站点设置 提交 结束

// 删除地区
    removeZone:function(id){
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function(data){
          if(data){
            _this.$message.success({ message: '删除成功！' })
            _this.getInfo(_this.current);
          }
        };
        commonScript.doGet('/settingsInfo/deleteZoneInfo/'+ id, '', res);
      }).catch((err) => {
      });
    },
    // 删除敏感词
    removeProduct:function(id){
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function(data){
          if(data){
            _this.$message.success({ message: '删除成功！' })
            _this.getInfo(_this.current);
          }
        };
        commonScript.doGet('/settingsInfo/deleteSensitiveWordInfo/'+ id, '', res);
      }).catch((err) => {
      });
    },
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },
    // 根据id获取地区分类
    getCity:function(id,item){
      var _this = this;
      // console.log(item.children,'ccccccccccccc')
      var res = function (data) {
        if(data.result){
          if(data.result.length>0){
            var  result = data.result;
            // 如无children 直接push
            if(!item.children||!item.children===undefined) {
              var arr = [];
              result.forEach(function (_) {
                arr.push(_)
              });
              // item['children'] = arr;
              _this.$set(item,'children',arr);
            } else{
              result.forEach(function (_) {
                if (item.children.indexOf(_.zoneId) == -1) {
                  item.children.push(_)
                }
              });
            }
          }
        }
      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + id ,'',res)
    },
    getCityZone:function(id,item,parent){
      var _this = this;
      var res = function (data) {
        if(data.result){
          if(data.result.length>0){
            var  result = data.result;
            // 如无children 直接push
            if(!item.children||!item.children===undefined) {
              var arr = [];
              result.forEach(function (_) {
                arr.push(_)
              });
              if(parent && parent.length>0){
                parent.forEach(function (child) {
                  if(child.zoneId == item.zoneId){
                    _this.$set(child,'children',arr);
                    _this.$set(child,'showCity',true);
                  }
                })
              }
              // item['children'] = arr;
              // _this.$set(parent.children,'children',arr);
            } else{
              item.children = result;
              // result.forEach(function (_) {
                // if (item.children.indexOf(_.zoneId) == -1) {
                //   console.log(_,item.children)
                //   item.children.push(_)
                // }
              // });
              _this.$set(item,'showCity',true);
            }
            // console.log(_this.areaZones,1111111111)
          }
        }
      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + id ,'',res)

    },
    getStreet:function(id,item,parent){
      var _this = this;
      var res = function (data) {
        if(data.result){
          if(data.result.length>0){
            var  result = data.result;
            // 如无children 直接push
            if(!item.children||!item.children===undefined) {
              var arr = [];
              result.forEach(function (_) {
                arr.push(_)
              });
              if(parent && parent.length>0){
                parent.forEach(function (child) {
                  if(child.zoneId == item.zoneId){
                    _this.$set(child,'children',arr);
                    _this.$set(child,'showCity',true);
                  }
                })
              }
              // item['children'] = arr;
              // _this.$set(parent.children,'children',arr);
            } else{
              result.forEach(function (_) {
                if (item.children.indexOf(_.zoneId) == -1) {
                  item.children.push(_)
                }
              });
              _this.$set(item,'showCity',true);
            }
            // console.log(_this.areaZones,1111111111)
          }
        }
      };
      commonScript.doGet('/settingsInfo/queryZoneInfo/' + id ,'',res)
    },
    // 点击箭头是否显示
    areaShow:function(item,parent){
      var _this = this;
      if(!item.showCity||item.showCity===undefined){
        // _this.$set(item,'showArea',true);
        // _this.getCity(item.zoneId,item);
        _this.getCityZone(item.zoneId,item,parent);
      }else{
        _this.$set(item,'showCity',false);
      }

    },
    cityShow:function(item,parent){
      var _this = this;
      // console.log(item.showCity)
      if(!item.showCity||item.showCity===undefined){
        _this.getCityZone(item.zoneId,item,parent);
        // _this.$set(item,'showCity',true);
      }else{
        _this.$set(item,'showCity',false);

        // if(parent && parent.length>0){
        //   parent.forEach(function (child) {
        //     if(child.zoneId == item.zoneId) {
        //       _this.$set(child,'showCity',false);
        //       }
        //     })
        // }
      }

    },
    // 显示街道
    streetShow:function(item,parent){
      var _this = this;
      // _this.getCityZone(item.zoneId,item,parent);
      if(!item.showCity||item.showCity===undefined){
        _this.getCityZone(item.zoneId,item,parent);
        // _this.$set(item,'showStreet',true);
      }else {
        _this.$set(item, 'showCity', false);
      }
      // _this.getStreet(item.zoneId,item,parent);
    },
    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      this.pagecount = val;
      this.getInfo(this.current);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      this.pagenum = val;
      this.getInfo(this.current);
    }

  }

})