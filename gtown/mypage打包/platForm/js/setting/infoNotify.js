new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '商家消息模板'
    }, {
      index: 1,
      title: '用户消息模板'
    }, {
      index: 2,
      title: '系统消息模板'
    }],
    loading: true,
    setProduct: false,
    productForm: {
      orderNumber: '',
      classifyName: '',
    },
    productListLength: 1,
    productLists: [{
      modelDescribe: '下单通知',
      stationMeg: '1',
      telMsg: '0',
      email: '1',
    }],
    productLists3:[],
    productLists2: [{
      sysName: '美的',
      sysDescribe: 'A',

    }],
    // 分页
    pagecount: 50,
    pagenum: 1,
    total: 0,
    // 新增消息通知
    currentMsg: 0,
    msgModels:[{
      index: 0,
      name: '站内信模板'
    }, {
      index: 1,
      name: '手机短信模板'
    }, {
      index: 2,
      name: '邮件模板'
    }],

    addForm:{
      showType:'1',
      isRecommend:'0',
      msgContent:'',
    },
    addForm1:{
      showType:'1',
      isRecommend:'0',
      msgContent:'',
    },
    addForm2:{
      showType:'1',
      isRecommend:'0',
      msgContent:'',
    },
    // 编辑id
    editId:'',
    curMessage:'',
    submitBtnDisabled:false,
    submit1BtnDisabled:false,
    submit2BtnDisabled:false,
    // 新增系统消息通知
    sysForm:{
      modelName:'',
      modelDescribe:'',
    },
  },
  mounted: function () {
    // FastClick.attach(document.body);
    commonScript.appShowhide('app');
    this.getInfo(0);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index) {
      var _this = this;
      _this.current = index;
      _this.loading = true;
      if(index == 0){
        // 获取商家消息模板
        var res = function (data) {
          _this.loading = false;
          if(data.result){
            _this.productLists = data.result.list;
            _this.total = data.result.total;
          }

        };
        commonScript.doGet('/settingsInfo/querySellerMessageTemplateInfo/'+_this.pagenum+'/'+_this.pagecount,'',res);

      }else if(index ==1){
        // 获取用户消息模板
        var res = function (data) {
          _this.loading = false;
          if (data.result) {
            _this.productLists3 = data.result.list;
            _this.total = data.result.total;

          }
        };
        commonScript.doGet('/settingsInfo/queryUserMessageTemplateInfo/'+_this.pagenum+'/'+_this.pagecount,'',res);

      }else if(index ==2) {
        // 获取系统消息模板
        var res = function (data) {
          _this.loading = false;
          if (data.result) {
            _this.productLists2 = data.result;
          }
        };
        commonScript.doGet('/settingsInfo/querySystemMessageTemplateInfo', '', res)
      }

    },
    // 切换
    getMsg: function (index) {
      var _this = this;
      _this.currentMsg = index;
      var item = _this.curMessage;
      _this.addForm.showType = item.stationmailState?'1':'0';
      _this.addForm.isRecommend = item.stationmailState?'1':'0';
      _this.addForm.msgContent = item.stationmailContent;
      _this.addForm1.showType = item.messageState?'1':'0';
      _this.addForm1.isRecommend = item.nessageIsforcereceived?'1':'0';
      _this.addForm1.msgContent = item.messageContent;
      _this.addForm2.showType = item.emailState?'1':'0';
      _this.addForm2.isRecommend = item.emailIsforcereceived?'1':'0';
      _this.addForm2.msgContent = item.emailTitle;
      if(_this.currentMsg==2){
        var ue = UE.getEditor('editor');
        ue.ready(function () {
          UE.getEditor('editor').setContent(item.emailContent);
        });
      }
    },
    // 页面数据加载结束
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },
    // 编辑消息通知
    addClassify: function (title,id) {
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: []
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
          _this.$refs.addForm1.resetFields();
          _this.$refs.addForm2.resetFields();
        }
      });
    },
    // 编辑消息
    showDetail:function(item){
      var _this = this;
      _this.editId = item.id;
      _this.curMessage = item;
      _this.addForm.showType = item.stationmailState?'1':'0';
      _this.addForm.isRecommend = item.stationmailState?'1':'0';
      _this.addForm.msgContent = item.stationmailContent;
      _this.addForm1.showType = item.messageState?'1':'0';
      _this.addForm1.isRecommend = item.nessageIsforcereceived?'1':'0';
      _this.addForm1.msgContent = item.messageContent;
      _this.addForm2.showType = item.emailState?'1':'0';
      _this.addForm2.isRecommend = item.emailIsforcereceived?'1':'0';
      _this.addForm2.msgContent = item.emailTitle;
      // 邮件内容
       _this.addClassify('编辑消息通知',item.id);
       _this.getMsg(0)

    },
    // 确定 新增 编辑 消息
    submit:function(){
      var _this = this;
      if(_this.currentMsg==0){
        var data = {
          "id": _this.editId,
          "stationmailContent": _this.addForm.msgContent,
          "stationmailIsforcereceived": _this.addForm.isRecommend *1,
          "stationmailState": _this.addForm.showType * 1,
        };
      }else if(_this.currentMsg==1){
        var data = {
          "id": _this.editId,
          "messageContent": _this.addForm1.msgContent,
          "messageState": _this.addForm1.showType * 1,
          "nessageIsforcereceived":  _this.addForm1.isRecommend *1,
        };
      }else if(_this.currentMsg==2){
        var emailContent = UE.getEditor('editor').getContent();
        var data = {
          "emailContent": emailContent,
          "emailIsforcereceived": _this.addForm2.isRecommend * 1,
          "emailState": _this.addForm2.showType * 1,
          "emailTitle": _this.addForm2.msgContent,
          "id": _this.editId,
        };
      }

      // 编辑
      var add = function (data) {
        _this.$message.success({ message: '编辑成功！' });
        _this.submitBtnDisabled=true;
        _this.getInfo(_this.current);
        _this.submitBtnDisabled=false;
      };
      if(_this.current==0){
        // 商家消息
        commonScript.doPost('/settingsInfo/updateSellerMessageTemplateInfo',data,add);

      }else if(_this.current==1){
        // 用户消息
        commonScript.doPost('/settingsInfo/updateUserMessageTemplateInfo',data,add);
      }
      _this.$refs.addForm.resetFields();
      _this.$refs.addForm1.resetFields();
      _this.$refs.addForm2.resetFields();
      layer.closeAll();

    },
    // 编辑消息通知结束

// 编辑系统消息通知
    addSystemMsg: function (title,id) {
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#sysModel")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        , yes: function () {
          _this.addSystem(id);
          layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.sysForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.sysForm.resetFields();
        }
      });
    },
    // 确定 编辑 系统消息
    addSystem:function(id){
      var _this = this;
      var data = {
        "id": id,
        "templateDescription": _this.sysForm.modelDescribe,
        "templateName":_this.sysForm.modelName ,
      };
      var add  = function (data) {
        _this.$message.success({ message: '编辑成功！' });
        _this.getInfo(_this.current);
      };
      commonScript.doPost('/settingsInfo/updateSystemMessageTemplateInfo',data,add);
      _this.$refs.sysForm.resetFields();


    },
    // 编辑系统消息
    editSystem:function(item){
      var _this = this;
      _this.sysForm.modelName = item.templateName;
      _this.sysForm.modelDescribe = item.templateDescription;
      _this.addSystemMsg('编辑消息通知',item.id);

    },

    // 编辑系统消息通知结束

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