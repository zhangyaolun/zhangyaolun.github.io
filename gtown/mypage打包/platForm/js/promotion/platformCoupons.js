new Vue({
  el: '#app',
  data(){
    var _this = this;
    // 验证开始时间
    var validateBegin = (rules2, value, callback) => {
      if (value) {
        if (value < Date.now()) {
          return callback(new Error('开始时间必须大于现在时间！'));
        }
        if (_this.addForm.toDate) {
          if (value > _this.addForm.toDate) {
            return callback(new Error('开始时间不能大于结束时间！'));
          } else {
            callback()
          }
        }
      } else {
        return callback(new Error('开始时间不能为空！'))
      }

    };
    // 验证结束时间
    var validateEnd = (rules2, value, callback) => {
      if (value) {
        if ( _this.addForm.toDate) {
          if (value <  _this.addForm.toDate) {
            return callback(new Error('开始时间不能大于结束时间！'));
          } else {
            callback()
          }
        }
      } else {
        return callback(new Error('结束时间不能为空！'))
      }

    };
    return {
      current: 0,
      productNav: [{
        index: 0,
        title: '平台优惠券'
      }],
      loading: true,
      productForm: {
        couponStatus: '00',
        couponName: '',
      },
      productListLength: 1,
      productLists: [{
        OrderNum: '5689785454561213121',
        productName: '张三',
        rewardMoney: 520,
        rewardTitle: '美的',
        transactionType: '',
        userType: '',
        orderStatus: '已支付',
        rewardDate: '2018-4-1 00:00:00',
        describe: '美的Midea 高端智能23L',
      }, {
        OrderNum: '5689785454561213121',
        productName: '张三',
        rewardMoney: 520,
        rewardTitle: '美的',
        transactionType: '',
        userType: '',
        orderStatus: '已支付',
        rewardDate: '2018-4-1 00:00:00',
        describe: '美的Midea 高端智能23L',
      }],
      brands: [],
      totalMoney: 0,
      selectedAll: false,
      selectedProduct: true,
      addForm: {
        addNewName: '',
        fromDate:'',
        toDate:'',
        sureMoney:'',
        issueLimitTotal:'',
        limitAmount: '',
        describe:'',
        couponImg:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        navType:'',
        brandSelect:'',
        navs:[
          {type:'0',
            navName:'通用优惠券 '},
          {type:'1',
            navName:'品牌优惠券'}
        ],
        helpSelect:'',
        selects:[
          {
            id:1,
            num:1,
          },
          {
            id:2,
            num:2,
          },
          {
            id:3,
            num:3,
          },
          {
            id:4,
            num:4,
          },
          {
            id:5,
            num:5,
          },
          {
            id:6,
            num:6,
          },
          {
            id:7,
            num:7,
          },
          {
            id:8,
            num:8,
          },
          {
            id:9,
            num:9,
          },
          {
            id:10,
            num:10,
          },
        ],
        position:'',
        positions:[
          {id:'0',
            name:'否'},
          {id:'1',
            name:'是'},
        ],
      },
      editForm: {
        addNewName: '',
        fromDate:'',
        toDate:'',
        sureMoney:'',
        issueLimitTotal:'',
        limitAmount: '',
        describe:'',
        couponImg:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        navType:'',
        brandSelect:'',
        brandName:'',
        navs:[
          {type:0,
            navName:'通用优惠券 '},
          {type:1,
            navName:'品牌优惠券'}
        ],
        helpSelect:'',
        selects:[
          {
            id:1,
            num:1,
          },
          {
            id:2,
            num:2,
          },
          {
            id:3,
            num:3,
          },
          {
            id:4,
            num:4,
          },
          {
            id:5,
            num:5,
          },
          {
            id:6,
            num:6,
          },
          {
            id:7,
            num:7,
          },
          {
            id:8,
            num:8,
          },
          {
            id:9,
            num:9,
          },
          {
            id:10,
            num:10,
          },
        ],
        position:'',
        positions:[
          {id:'0',
            name:'否'},
          {id:'1',
            name:'是'},
        ],
      },
      rules:{
        addNewName: [
          { required: true, message: '优惠券名称不能为空！', trigger: 'blur' },
        ],
        navType: [
          { required: true, type: 'string', message: '优惠券类型不能为空！', trigger: 'blur' }
        ],
        sureMoney: [
          { required: true, message: '面额不能为空！', trigger: 'blur' },
        ],
        issueLimitTotal: [
          { required: true, message: '可发放总数不能为空！', trigger: 'blur' },
        ],
        helpSelect: [
          { required: true, message: '每人限领张数不能为空！', trigger: 'blur' },
        ],
        limitAmount: [
          { required: true, message: '消费限额不能为空！', trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '优惠券描述不能为空！', trigger: 'blur' },
          {
            min: 0, max: 200, type: 'string', message: '长度在 1 到 200个字符', trigger: 'blur'
          }
        ],
        fromDate: [{ required: true, type: 'date', message: '开始时间不能为空！', trigger: 'change' },
          // { validator: validateBegin, trigger: 'change' }
          ],
        toDate: [{ required: true, type: 'date', message: '结束时间不能为空！', trigger: 'change' },
          // { validator: validateEnd, trigger: 'change' }
        ],
      },
      // 分页
      pagecount: 10,
      pagenum: 1,
      total: 0
    }
  },

  mounted: function () {
    // FastClick.attach(document.body);
    commonScript.appShowhide('app');
    this.getInfo(0);
    // 获取品牌
      var _this = this;
      // 获取品牌
      var res = function (data) {
        var result = data.result.list;
        if(result.length > 0){
          _this.brands = result;
        }
      };
      commonScript.doGet('/productInfo/queryBrandInfo/1/1000/null/null/null','',res);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index) {
      var _this = this;
      // 商品管理
      _this.setProduct = false;
      _this.current = index;
      _this.loading = true;
      if(_this.current!==index){
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      }
      var couponState = _this.productForm.couponStatus=='00'?'null':_this.productForm.couponStatus*1;
      var couponName = _this.productForm.couponName||null;
      var res = function (data) {
        _this.loading = false;
        if(data.result){
          var result = data.result.list;
          if(result){
            _this.productLists = result;

          }else{
            _this.productLists = [];

          }
          _this.total = data.result.total;
          _this.productLists.forEach(function (_) {
            var start =commonScript.changedate(_.beginTime,'yyyy-MM-dd HH:mm:ss');
            _.beginTime = start;
            var end =commonScript.changedate(_.effectiveTime ,'yyyy-MM-dd HH:mm:ss');
            _.effectiveTime  = end;
            var lastTime = commonScript.changedate(_.lastModifiedTime,'yyyy-MM-dd HH:mm:ss');
            _.lastModifiedTime = lastTime;
          })
        }
      };
      commonScript.getPlatformCoupon(_this.pagenum,_this.pagecount,index,couponState,couponName,'',res)
    },

    // 刷新页面
    refresh: function (index) {
      var _this = this;
      _this.$refs.productForm.resetFields(); //切换时搜索条件置空
      _this.getInfo(index);

    },
    changeNavType:function(val){
      var _this = this;
      _this.addForm.brandSelect =""
    },
    // 增加优惠券
    addCoupon:function(title,id){
      var _this = this;
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['800px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
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
          "description": _this.editForm.describe,
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
              "brandId": _this.addForm.brandSelect,
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
              _this.$message.success({ message: '新增成功！' })

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
    // 编辑优惠券
    editCoupon:function(item){
      var _this = this;
      _this.editForm.limitAmount=item.limitPay/100;
      _this.editForm.navType=item.platform?'1':'0';
      if(_this.brands && _this.brands.length>0){
        _this.brands.forEach(function (_) {
          if(_.id == item.brandId){
            _this.editForm.brandName = _.name
          }
        })
      }
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
      // _this.addCoupon('平台优惠券 - 编辑优惠券模板',item.id)
      var layer = layui.layer;
      layer.open({
        title: '平台优惠券 - 编辑优惠券模板'
        , content: layui.jquery("#editAdd")
        , btn: ['确定', '取消']
        , area: ['800px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        , yes: function () {
          _this.addNewCalssigy('editForm',item.id);
          // layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.editForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.editForm.resetFields();
        }
      });
    },
    // 查看优惠券明细
    skewCoupon: function (id) {
      var _this = this;
      var res = function (data) {

      };
      commonScript.doGet('/promotionInfo/queryPromotionPlatformCouponDetailInfo/1/1000/'+id,'',res);

      var layer = layui.layer;
      layer.open({
        title: '查看消费信息'
        , content: layui.jquery("#brandList")
        , btn: []
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
      });
    },
    // 查看优惠明细结束
    // 上传图片
    selectFile:function(e){
      var _this = this;
      var file = e.target.files[0];
      if(file!==undefined){
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
        ajax.open("post","/settingsInfo/uploadPicture",true);
        ajax.send( formData );
        ajax.onload = function () {
          var data = this.responseText;
          data = JSON.parse(data);
          if(data.httpCode==200) {
            if (data.result) {
              _this.addForm.couponImg = data.result;
            }
          }else{
            _this.$message.error({message: data.msg});
          }
        };
      }
    },
    // 删除优惠券
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
        commonScript.doGet('/promotionInfo/deletePromotionPlatformCouponInfo/'+ id, '', res);
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
    // 单条数据选中结束

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