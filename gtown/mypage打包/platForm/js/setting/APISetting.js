new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '本系统 API设置'
    },
      {
        index: 1,
        title: 'UCenter API设置'
      },
      {
        index: 2,
        title: 'PayCenter API设置'
      },{
        index: 3,
        title: 'IM API设置'
      },
      {
        index: 4,
        title: 'Analytics API设置'
      }],
    loading: true,
    // api设置
    stationForm:{
      stationName:'',
      language:'',
      timeZone:'',
      stationStatus:'1'
    },
    stationBtnDisabled:false,
    // UCenterAPI设置
    uploadForm:{
      UcenterURL:'',
      UcenterBackURL:'',
      UcenterKey:'',
    },
    UploadBtnDisabled:false,
    // Paycenter设置
    emailSetting:{
      SMTPName:'',
      PaycenterURL:'',
      PaycenterBackURL:'',
      PaycenterKey:'',
    },
    EmailBtnDisabled:false,
    // 授权证书
    authorizeDisabled:true,
    authorizeForm:{
      IMStatus:0,
      IM_URL:'aaaaaaaaa',
      IM_API_URL:'ssssssssss',
      IM_Back_URL:'ddddddddd',
      IM_key:'ffffffffff',
    },
    IMBtnDisabled:false,
    IMDisabled:true,
    // 数值参数设置
    percentageForm:{
      startStatus:1,
      AnalyticsID:'',
      AnalyticsKey:'',
    },
    analyticsBtnDisabled:false,
    setRules: {
      stationName: [
        { required: true, type: 'string', message: 'PC版前台URL不能为空！', trigger: 'blur' },
      ],
      ICP: [
        { required: true, type: 'string', message: '本系统Key不能为空！', trigger: 'blur' },
      ],
      UcenterURL: [
        { required: true, type: 'string', message: 'Ucenter URL不能为空！', trigger: 'blur' },
      ],
      UcenterKey: [
        { required: true, type: 'string', message: 'Ucenter Key不能为空！', trigger: 'blur' },
      ],
      PaycenterURL: [
        { required: true, type: 'string', message: 'Paycenter URL不能为空！', trigger: 'blur' },
      ],
      PaycenterKey: [
        { required: true, type: 'string', message: 'Paycenter Key不能为空！', trigger: 'blur' },
      ],
      AnalyticsID: [
        { required: true, type: 'string', message: 'Analytics ID不能为空！', trigger: 'blur' },
      ],
      AnalyticsKey: [
        { required: true, type: 'string', message: 'Analytics Key不能为空！', trigger: 'blur' },
      ],
    },
  },
  mounted: function () {
    commonScript.appShowhide('app');
    this.getDate(0);
  },
  methods: {
    // 页面初始加载数据
    getDate: function () {
      var _this = this;
      _this.loading = true;
      // 查询基础设置
      var res = function (data) {
        _this.loading = false;
        if (data.result) {
          var result = data.result;
          // 本系统api
          _this.stationForm.stationName = result.pcReceptionUrl;
          _this.stationForm.ICP = result.systemKey;
          _this.stationForm.currency= result.wapReceptionUrl;
          // uCenter
         _this.uploadForm.UcenterBackURL=result.ucenterBackstageUrl;
         _this.uploadForm.UcenterKey= result.ucenterKey;
         _this.uploadForm.UcenterURL= result.ucenterUrl;
          // Paycenter
            _this.emailSetting.PaycenterBackURL= result.paycenterBackstageUrl;
            _this.emailSetting.SMTPName= result.paycenterDisplayedName;
            _this.emailSetting.PaycenterKey=result.paycenterKey;
            _this.emailSetting.PaycenterURL= result.paycenterUrl;
          // Im
          _this.authorizeForm.IM_API_URL= result.imApiUrl;
          _this.authorizeForm.IM_Back_URL= result.imBackstageUrl;
          _this.authorizeForm.IM_key=result.imKey;
          _this.authorizeForm.IMStatus=result.imState?'1':'0';
          _this.authorizeForm.IM_URL=result.imUrl;
          // Analytics
          _this.percentageForm.AnalyticsID= result.analyticsId;
          _this.percentageForm.AnalyticsKey= result.analyticsKey;
          _this.percentageForm.startStatus=result.analyticsStatus?'1':'0';
        }
      };
      commonScript.getSettingApi(res);
    },
    getInfo: function (index) {
      var _this = this;
      if (_this.current != index) {
        // _this.$refs.stationForm.resetFields(); //切换时搜索条件置空
        // _this.$refs.uploadForm.resetFields(); //切换时规则设置置空
        // _this.$refs.emailSetting.resetFields(); //切换时规则设置置空
        // _this.$refs.authorizeForm.resetFields(); //切换时规则设置置空
        // _this.$refs.percentageForm.resetFields(); //切换时规则设置置空
      }
      _this.current = index;

      this.getDate();

    },
    // 本系统api 提交
    submitStation: function (formName) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "83dd710b3dea4c2dad5941e2af4ed719",
            "pcReceptionUrl": _this.stationForm.stationName,
            "systemKey": _this.stationForm.ICP,
            "wapReceptionUrl": _this.stationForm.currency
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
            commonScript.doPost('/settingsInfo/updateSettingsApiInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },
    // ucenter api
    submitUpload:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "83dd710b3dea4c2dad5941e2af4ed719",
            "ucenterBackstageUrl":_this.uploadForm.UcenterBackURL,
            "ucenterKey": _this.uploadForm.UcenterKey,
            "ucenterUrl": _this.uploadForm.UcenterURL,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.UploadBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.UploadBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsApiInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // paycenter api
    submitAuthorize:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "83dd710b3dea4c2dad5941e2af4ed719",
            "paycenterBackstageUrl": _this.emailSetting.PaycenterBackURL,
            "paycenterDisplayedName": _this.emailSetting.SMTPName,
            "paycenterKey": _this.emailSetting.PaycenterKey,
            "paycenterUrl": _this.emailSetting.PaycenterURL,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.EmailBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.EmailBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsApiInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // im api
    submitEmail:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "id": "83dd710b3dea4c2dad5941e2af4ed719",
            "imApiUrl": _this.authorizeForm.IM_API_URL,
            "imBackstageUrl": _this.authorizeForm.IM_Back_URL,
            "imKey": _this.authorizeForm.IM_key,
            "imState": _this.authorizeForm.IMStatus * 1,
            "imUrl":  _this.authorizeForm.IM_URL,
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.IMBtnDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.IMBtnDisabled=false;
            };
            commonScript.doPost('/settingsInfo/updateSettingsApiInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // analytics api
    submitPercentage:function(formName){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "analyticsId": _this.percentageForm.AnalyticsID,
            "analyticsKey": _this.percentageForm.AnalyticsKey,
            "analyticsStatus": _this.percentageForm.startStatus * 1,
            "id": "83dd710b3dea4c2dad5941e2af4ed719",
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
            commonScript.doPost('/settingsInfo/updateSettingsApiInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // api 提交 结束

  }

});