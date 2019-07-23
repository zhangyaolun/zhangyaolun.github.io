new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '礼品列表'
    }, {
      index: 1,
      title: '兑换列表'
    }, {
      index: 2,
      title: '积分商城首页图片'
    }],
    loading: true,
    listForm: {
      giftName: '',
    },
    productForm: {
      exchangeNum: '',
      memberName: '',
    },
    productListLength: 1,
    productLists: [{
      exchangeNum: '张三',
      memberName:'111',
      exchangeScore:'12',
      exchangeTime: '2018-4-1 00:00:00',
      status: '已结束',
    }, {
      exchangeNum: '张三',
      memberName:'111',
      exchangeScore:'12',
      exchangeTime: '2018-4-1 00:00:00',
      status: '已结束',
    },],
    giftLists: [{
      giftName: '张三',
      startTime: '2018-4-1 00:00:00',
      endTime: '2018-4-1 00:00:00',
      status: '已结束',
    }],
    sliderForm: {
      slideImg1: 'https://jhapp.oss-cn-beijing.aliyuncs.com/img/dashu@2x.png',
      slideImgUrl: 'http://localhost/shop/yf_shop/index.php',
    },
    bannerDisabled:false,
    selectedFile:false,
    picNo:'',
    X:0,
    Y: 0,
    Width:0,
    Height:0,
    currentFile:'',
    addForm: {
      addNewName: '',
      fromDate: '',
      toDate: '',
      sureMoney: '',
      issueLimitTotal: '',
      limitAmount: '',
      describe: '',
      couponImg: '',
    },
    rules:{
      addNewName: [
        { required: true, message: '优惠券名称不能为空！', trigger: 'blur' },
      ],

      sureMoney: [
        { required: true, message: '面额不能为空！', trigger: 'blur' },
      ],

      describe: [
        { required: true, message: '优惠券描述不能为空！', trigger: 'blur' },
        {
          min: 0, max: 200, type: 'string', message: '长度在 1 到 200个字符', trigger: 'blur'
        }
      ],
      fromDate: [{ required: true, type: 'date', message: '开始时间不能为空！', trigger: 'change' },
      ],
      toDate: [{ required: true, type: 'date', message: '结束时间不能为空！', trigger: 'change' },
      ],
    },
    totalMoney: 0,
    selectedAll: false,
    selectedProduct: true,
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0
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
      _this.loading = true;
      if (_this.current != index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
        _this.$refs.listForm.resetFields(); //切换时搜索条件置空
        _this.$refs.sliderForm.resetFields(); //切换时幻灯片置空

      }
      _this.current = index;
      // 商品管理
      // 礼品列表
      if(index==0){
        var giftName = _this.listForm.giftName||null;
        var res = function (data) {
          _this.loading = false;

        };
        commonScript.getPromotionGift(_this.pagenum,_this.pagecount,giftName,'',res);

      }else if(index==1){
        // 兑换列表

        var exchangeNum = _this.productForm.exchangeNum||null;
        var memberName = _this.productForm.memberName||null;
        var res = function (data) {
          _this.loading = false;

        };
        commonScript.getExchangeGift(_this.pagenum,_this.pagecount,exchangeNum,memberName,'',res);
      }else if(index ==2){
        // 积分商城首页图片
        var res = function (data) {
          _this.loading=false;
          if(data.result){
            var result = data.result;
            _this.sliderForm.slideImg1 = result.scoreShoppingMallFrontpagePicture ;
            _this.sliderForm.slideImgUrl= result.scoreShoppingMallFrontpagePictureLinkAddress ;
          }
        };
        commonScript.getPromotionSetting(res);
      }

    },
    // 刷新页面
    refresh: function (index) {
      var _this = this;
      _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      _this.$refs.listForm.resetFields(); //切换时搜索条件置空
      _this.getInfo(index);

    },
    // 删除优惠券
    removeCoupon: function () {

    },
    // 增加礼品列表
    addList: function (title,id) {
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:99
        , yes: function () {
          _this.addNewCalssigy('addForm',id);
          // layer.closeAll();
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
    // 确定 新增 编辑优惠券
    addNewCalssigy:function(formName,id){
      var _this = this;
      if(id != undefined){
        // 编辑
        var data = {
          "id":id,
          "description": _this.addForm.describe,
        };
        var add = function (data) {
          _this.getInfo(_this.current);
        };
        commonScript.doPost('/promotionInfo/updatePromotionPlatformCouponInfo',data,add);
        _this.$refs.addForm.resetFields(); //点击确认后清空表单
        layer.closeAll();
      }else {
        // 新增
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            if(_this.addForm.fromDate){
              var start = _this.addForm.fromDate.getTime();
            }
            if(_this.addForm.toDate){
              var end = _this.addForm.toDate.getTime();
            }
            var data = {
              "beginTime": start,
              "brandId": "",
              "couponState": 1,
              "couponType": 0,
              "description": _this.addForm.describe,
              "effectiveTime": end,
              "fetchAmount": 0,
              "image": _this.addForm.couponImg,
              "isCommended": false,
              "limitNum": _this.addForm.helpSelect * 1,
              "limitPay": _this.addForm.limitAmount * 100,
              "name": _this.addForm.addNewName,
              "platform": _this.addForm.navType * 1,
              "quota": _this.addForm.sureMoney * 100,
              "receiveMode": "免费领取",
              "sellerId": "",
              "stock": _this.addForm.issueLimitTotal * 1,
              "vipLevel": ""
            };

            var add = function (data) {
              _this.getInfo(_this.current);
            };
            commonScript.doPost('/promotionInfo/insertPromotionPlatformCouponInfo', data, add);

            _this.$refs.addForm.resetFields(); //点击确认后清空表单
            layer.closeAll();
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
      // });

    },
    // 编辑礼品列表
    editCoupon:function(item){
      var _this = this;
      _this.editForm.limitAmount=item.limitPay/100;
      _this.editForm.navType=item.couponCategory?'1':'0';
      if(item.beginTime&&item.beginTime!=''){
        var start =commonScript.changedate(item.beginTime,'yyyy-MM-dd HH:mm:ss');
        _this.editForm.fromDate = start;
      }
      if(item.effectiveTime&&item.effectiveTime!=''){
        var end =commonScript.changedate( item.effectiveTime,'yyyy-MM-dd HH:mm:ss');
        _this.editForm.toDate= end;
      }
      _this.editForm.sureMoney=item.quota/100;
      _this.editForm.addNewName=item.name;
      _this.editForm.couponImg=item.couponPicture;
      _this.editForm.describe = item.description;
      _this.editForm.issueLimitTotal=item.stock  ;
      _this.editForm.helpSelect = item.limitNum;
      _this.editForm.couponImg = item.image;
      _this.addList('编辑礼品',item.id)

    },
    // 删除礼品列表
    removeCoupon:function(id){
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
        commonScript.doGet('/promotionInfo/deletePromotionGiftInfo/'+ id, '', res);
      }).catch((err) => {
      });
    },


    // 单条数据选中
    selectOrder: function (item, index) {
      var _this = this;
      if (_this.productLists && _this.productLists.length > 0) {
        _this.productLists.forEach(function (_, i) {
          if (index == i) {
            _this.$set(item, 'active', true);
          } else {
            _.active = false
          }
        } );
      }
    },
    // 单条数据选中结束
    // 图片裁切上传
    selectImg:function(index){
      var _this = this;
      _this.picNo = index;
      _this.loadCropper();
      var layer = layui.layer;
      layer.open({
        title: '图片裁剪'
        , content: layui.jquery("#chooseImg")
        , btn: []
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        ,cancel: function(){
          //右上角关闭回调
          _this.destoryCropper();    //销毁cropper

        }
      });
      // _this.loadCropper();
    },
    // 选取文件
    // 上传图片
    selectFile:function(e){
      var _this = this;
      _this.currentFile= e.target.files[0];
      if(_this.currentFile!==undefined){
        _this.selectedFile = true;
        $('.img-container').css({
          'border': 'none',
        });   //去掉边框
      }
    },
    // 启动cropper
    loadCropper:function(){
      var _this = this;
      var URL = window.URL || window.webkitURL||null;
      var $image = $('#image');
      var options = {
        aspectRatio: 1 / 1,
        viewMode:3,
        crop: function (e) {
          _this.X = Math.round(e.detail.x);
          _this.Y = Math.round(e.detail.y);
          _this.Width=Math.round(e.detail.width);
          _this.Height=Math.round(e.detail.height);
        }
      };
      if(_this.picNo==1){
        options.aspectRatio = 4 / 1
      }else if(_this.picNo==2){
        options.aspectRatio= 15 / 4
      }else if(_this.picNo==3){
        options.aspectRatio= 8 / 3
      }
      var originalImageURL = $image.attr('src');
      var uploadedImageName = 'cropped.jpg';
      var uploadedImageType = 'image/jpeg';
      var uploadedImageURL;

      $('#image').cropper(options);
      // Import image
      var $inputImage = $('#inputImage');

      if (URL) {
        $inputImage.change(function () {
          var files = this.files;
          var file;
          if (!$image.data('cropper')) {
            return;
          }
          if (files && files.length) {
            file = files[0];
            if (/^image\/\w+$/.test(file.type)) {
              // uploadedImageName = file.name;
              // uploadedImageType = file.type;
              if (uploadedImageURL) {
                URL.revokeObjectURL(uploadedImageURL);
              }
              uploadedImageURL = URL.createObjectURL(file);
              $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
              $inputImage.val('');
              _this.selectedFile = true;
              $('.img-container').css({
                'border': 'none',
                // 'padding': '20px'
              });   //去掉边框
            } else {
              // window.alert('Please choose an image file.');
            }
          }
        });
      } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
      }
    },
    // 上传图片
    uploadImg:function(){
      var _this = this;
      var formData = new FormData();
      var oXHRHeadrs = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      // 判断上传在什么位置
      var fileData = {
        'x':_this.X,
        'y':_this.Y,
        'width':_this.Width,
        'height':_this.Height,
      };
      fileData = JSON.stringify(fileData);
      formData.append('file', _this.currentFile);
      formData.append('userId', '1111');
      formData.append('pictureSizeData', fileData);
      var ajax = new XMLHttpRequest();
      ajax.open("post","/settingsInfo/uploadCuttingPicture",true);
      ajax.send( formData );
      ajax.onload = function () {
        var data = this.responseText;
        data = JSON.parse(data);
        if(data.httpCode==200){
          if(data.result){
            if(_this.picNo==1){
              _this.sliderForm.slideImg1 = data.result;
            }else if(_this.picNo==2){
              _this.sliderForm.slideImg2 = data.result;

            }
          }
        }else{
          _this.$message.error({message: data.msg});
        }

        _this.destoryCropper();    //销毁cropper

      };
      layer.closeAll();

    },
    // 销毁cropper
    destoryCropper:function(){
      $('#image').cropper('destroy');
      $('#image').attr('src','');
      $('.img-container').removeAttr('style');
      this.selectedFile = false;
    },
    // 图片裁切上传结束
    // 提交幻灯片
    submitBanner: function (formName) {
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
            "scoreShoppingMallFrontpagePicture": _this.sliderForm.slideImg1,
            "scoreShoppingMallFrontpagePictureLinkAddress": _this.sliderForm.slideImgUrl,
            "id": "66b254d17fe0462bbb08a7dec16ec197",
          };
          _this.$confirm('修改立马生效,是否继续？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var res = function (data) {
              _this.bannerDisabled=true;
              _this.$message.success({message: '修改成功！'});
              _this.getInfo(_this.current);
              _this.bannerDisabled=false;
            };
            commonScript.doPost('/promotionInfo/updatePromotionSettingsInfo', data, res);
          }).catch((err) => {

          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 幻灯片提交结束
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