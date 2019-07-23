var ue = null;
var bus = new Vue();
new Vue({
  el: '#app',
  data: {
    pickerfromDate:{
      disabledDate(time) {
        let now = new Date().getTime() - (24 * 60 * 60 * 1000);
        return time.getTime() < now
      }
    },
    current: 0,
    productNav: [{
      index: 0,
      title: '广告位管理'
    }],
    loading: true,
    setProduct: false,
    productForm: {
      selectedType:0,
      brandName: '',
      classifyName: '',
    },
    productLists: [ ],
      selectParams : {                //查询参数
          index : 1 ,
          count : 10 ,
          fastnewsCategory : 20 ,
          title : "" ,
          style : ""
      } ,
    selectedAll: false,
    selectedProduct: true,
    totalId: '',
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    // 新增分类
    editTrue:false,
    XXX: '',
    addForm: {
      addNewName: '',
      sorting:'',
      addNewClassify: '',
      addClassifyId: '',
      showType: 1,
      isRecommend: 0,
      examineStatus: 1,
      orderType: '',
      categoryImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      activityImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      activityShow: 1,
      activityURL: '',
      fromDate:'',
      toDate:'',
      adsType:"",
      adsTypes:[{
        id:21,
        name:"推荐分类"
      },
        {
          id:22,
          name:"用户页活动"
        },{
          id:23,
          name:"积分页活动"
        }
        ],
      linkType:'2',
      url:'',
    },
    editForm:{
      adsType:'',
      addNewName:'',
      sorting:'',
      categoryImg:'',
      fromDate:'',
      toDate:'',
      status:'',
      text:''

    },
    userId:"",
    userRights:{},
    rules: {
      addNewName: [
        {required: true, type: 'string', message: '请输入广告位名称', trigger: 'blur'}
      ],
      sorting: [
        {required: true, message: '快报排序不能为空！', trigger: 'blur'},
        { pattern: /^([0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/, message: '请输入0~255的整数！', trigger: 'blur' },
      ],
      fromDate: [{ required: true,  message: '开始时间不能为空！', trigger: 'change' }],
      toDate: [{ required: true,  message: '结束时间不能为空！', trigger: 'change' }],
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
    this.getInfo(0);
    var userData = JSON.parse( sessionStorage.getItem("userData") );
    if( userData ) {
      _this.userId = userData.id;
    };
      ue = UE.getEditor("editor",{
          toolbars : [
              ["bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","insertunorderedlist","insertunorderedlist","emotion","link","removeformat","rowspacingtop","rowspacingbottom","lineheight","paragraph","fontsize","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","picspace"] ,
              ["insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols"]
          ]
      });

      //监听上传图片按钮
      bus.$on("picspace",function () {
          var hasInput = $("#upload_file").length > 0;
          var file;
          if( !hasInput ) {
              file = $("<input type='file' id='upload_file' style='position: absolute; top:-9999px' />");
              $("body").append( file );
          } else {
              file = $("#upload_file");
          }

          file.get(0).click();
          file.change(function() {
              var formData = new FormData();
              formData.append("file" ,this.files[0] );
              formData.append('sellerId', 'admin');
              formData.append('picGroupId', '123');
              var xhr = new XMLHttpRequest();
              xhr.open("post","/settingsInfo/uploadPicture",true);
              xhr.send( formData );
              xhr.onload = function () {
                  var data = JSON.parse( this.responseText );
                  switch ( data.httpCode ) {
                      case 200 :
                          ue.execCommand("insertimage",{
                              src : data.result ,
                              width : 150 ,
                              height : 150
                          });
                          file.remove();
                          break;
                      default :
                          _this.$message.error({message: "上传图片错误，请重试"});
                  }

                  //console.log( "上传图片成功" , JSON.parse( this.responseText ) )
              }
          });
          //console.log("假装有图片弹窗")
      });
    // 获取本地权限
    _this.userRights = getPows();
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index) {
      var _this = this;
      _this.loading = true;
      if (_this.current != index) {
          _this.$refs.productForm.resetFields(); //切换时搜索条件置空
          _this.classifyId = '';
      }
      _this.current = index;
      _this.getData(index);
      // 获取分类
    },
    //查询广告位
    getData: function (index) {
        var _this = this;
        var res = function ( data ) {
            try{
                switch( data.httpCode ) {
                    case 200 :
                        if( data.hasOwnProperty("result") ) {
                            if( data.result.hasOwnProperty("list") && Array.isArray( data.result.list ) ) {
                                data.result.list.forEach(function ( item ,index ) {
                                  _this.$set(item,'start',item.startTime);
                                  _this.$set(item,'end',item.endTime);
                                  item.startTime = commonScript.changedate(item.startTime, 'yyyy-MM-dd HH:mm:ss');
                                    item.endTime  = commonScript.changedate(item.endTime , 'yyyy-MM-dd HH:mm:ss')
                                })
                              _this.productLists = data.result.list;
                              _this.total = data.result.total;
                            } else {
                                _this.productLists = [];
                              _this.total =0
                            }
                        } else {
                            _this.$message.error({message: "返回值错误"});
                        }
                        break;
                    default :
                        _this.$message.error({message: data.msg});
                }
            } catch ( e ) {
                console.error("请求错误 e = " , e );
            };
            _this.loading = false;
        };

        commonScript.doPost("/mobileInfo/queryMobileAdvertisementInfo", this.selectParams, res);
    },
      selectType : function ( evt ) {
          console.log( evt.target.value  )
      } ,

    // 页面数据加载结束
    // 查看
    editCoupon: function (item) {
      var _this = this;
      _this.editTrue = true;
      _this.editForm.adsType = item.fastnewsCategory==21?"推荐分类":item.fastnewsCategory==22?"用户页活动":item.fastnewsCategory==23?"积分页活动":"";
      _this.editForm.addNewName = item.title;
      _this.editForm.sorting = item.sort;
      _this.editForm.categoryImg = item.picture;
      _this.editForm.fromDate = item.startTime;
      _this.editForm.toDate = item.endTime
      _this.editForm.linkType = item.style;
      if(item.style=="1"){
        _this.editForm.url = item.detailContent
      }else if(item.style=="2"){
        _this.editForm.url ="";
        ue.ready(function () {
          //UE.getEditor('editor').setContent('<p>12345</p>');
          UE.getEditor('editor').setContent(item.detailContent);
        });

      }
      var layer = layui.layer;
      layer.open({
        title: "审核广告位"
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        , scrollbar: false
        , zIndex: 100
        , yes: function () {
          // _this.getPass(item.id,);
          layer.closeAll();
          _this.editTrue = false

        }
        , btn2: function (index, layero) {
          _this.editTrue = false
          //按钮【取消】的回调
          _this.$refs.addForm.resetFields();
        }
        , cancel: function () {
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
          _this.editTrue = false

        }
        ,success:function () {
          if(item&&item.detailContent){
            var t = setTimeout(function () {
              ue.setContent( item.detailContent );
              clearTimeout( t );
            },400)
          }
        }
      });
    },

// 审核
    getPass:function(id){
      var _this = this;
      var datas = {
        // examinerId:
        id: id,
        reviewStatus: 3,
        examinerId:_this.userId,
        isOpen:1
      };
      _this.$confirm('你确定审核通过该广告位?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '审核通过成功！'});
                  _this.getInfo(_this.current);
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doPost('/mobileInfo/approvalMobileAdvertisementInfo', datas, res);
      }).catch((err) => {

      });

    },
    reject:function(id){
      var _this = this;
      var datas = {
        // examinerId:
        id: id,
        reviewStatus: 2,
        examinerId:_this.userId,
        isOpen:1
      };
      _this.$confirm('你确定审核拒绝该广告位?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '拒绝成功！'});
                  _this.getInfo(_this.current);
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doPost('/mobileInfo/approvalMobileAdvertisementInfo', datas, res);
      }).catch((err) => {

      });

    },


    // 单条数据选中
    selectOrder: function (item, lists) {
      var _this = this;
      if (item.active === undefined || !item.active) {
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item, lists);
    },
    // 上传图片
    selectFile: function (e) {
      var _this = this;
      var file = e.target.files[0];
      if (file !== undefined) {
        var formData = new FormData();
        var oXHRHeadrs = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        formData.append('file', file);
        formData.append('sellerId', 'admin');
        formData.append('picGroupId', '123');
        var ajax = new XMLHttpRequest();
        ajax.open("post", "/settingsInfo/uploadPicture", true);
        ajax.send(formData);
        ajax.onload = function () {
          var data = this.responseText;
          data = JSON.parse(data);
          if (data) {
            _this.addForm.categoryImg = data.result;
          }
        };
      }

    },

    // 新增广告位
    addClassify: function (title, item , id ) {
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        , scrollbar: false
        , zIndex: 100
        , yes: function () {
          _this.addNewCalssigy('addForm',item , id);
          // layer.closeAll();
        }
        , btn2: function (index, layero) {
          //按钮【取消】的回调
          _this.$refs.addForm.resetFields();
        }
        , cancel: function () {
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
        }
        ,success:function () {
          if(item&&item.detailContent){
            var t = setTimeout(function () {
              ue.setContent( item.detailContent );
              clearTimeout( t );
            },400)
          }
          }
      });
    },
    // 确定 新增 编辑 广告位
    addNewCalssigy: function (formName,item,id) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var UEcontent ="",style="";
          var ue = UE.getEditor('editor');
          ue.ready(function () {
            if(_this.addForm.linkType =="1"){
              style="1";
              UEcontent= _this.addForm.url;
            }else{
              style="2";
              UEcontent = UE.getEditor('editor').getContent();
            }
            var start = _this.addForm.fromDate;
            var end = _this.addForm.toDate;
            var datas = {
              fastnewsCategory: _this.addForm.adsType,
              title: _this.addForm.addNewName,
              sort: _this.addForm.sorting*1,
              picture: _this.addForm.categoryImg,
              startTime: start,
              endTime:end,
              detailContent: UEcontent,
              publisherId: _this.userId,
              style:style,
            };
          if (id !== undefined) {
            // 编辑
            datas['id'] = id;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '编辑成功！'});
                    _this.getInfo(_this.current);
                    _this.$refs.addForm.resetFields(); //点击确认后清空表单
                    layer.closeAll();
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.error("REQUEST ERROR ", e);
              }
            };
            commonScript.doPost('/mobileInfo/updateMobileAdvertisementInfo', datas, add);

          } else {
            datas['isOpen'] = 0;
            datas['reviewStatus'] = 0;
            // 新增
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '新增成功！'});
                    _this.getInfo(_this.current);
                    _this.$refs.addForm.resetFields(); //点击确认后清空表单
                    layer.closeAll();
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.error("REQUEST ERROR ", e);
              }
            };
            commonScript.doPost('/mobileInfo/insertMobileAdvertisementInfo', datas, add);

          }
        })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 编辑广告位
    // showDetail:function(item){
    //   var _this = this;
    //
    // },
    showDetail: function (item){
      var _this = this;
      _this.addForm.adsType = item.fastnewsCategory;
      _this.addForm.addNewName = item.title;
      this.addForm.sorting = item.sort;
      _this.addForm.categoryImg = item.picture;
      if(item.startTime){
        _this.addForm.fromDate =  Date.parse(item.startTime);
      }
      if(item.endTime){
        _this.addForm.toDate =  Date.parse(item.endTime);
      }
      _this.addForm.linkType = item.style;
      _this.addClassify('编辑广告位', item ,item.id);
      if(item.style=="1"){
        _this.addForm.url = item.detailContent

      }else if(item.style=="2"){
        _this.addForm.url ="";
        ue.ready(function () {
            //UE.getEditor('editor').setContent('<p>12345</p>');
            UE.getEditor('editor').setContent(item.detailContent);
        });

      }
    },

    // 新增广告位结束
    // 删除广告位
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '删除成功！'})
                  _this.getInfo(_this.current);
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doGet('/mobileInfo/deleteMobileAdvertisementInfo/' + id, '', res);
      }).catch((err) => {
      });
    },
    // 删除广告位结束

    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
        _this.pagecount = val;
      _this.selectParams.count = val;
        _this.getInfo(_this.current);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
        _this.pagenum = val;
        _this.selectParams.index = val;
        _this.getInfo(_this.current);
    }

  }

});