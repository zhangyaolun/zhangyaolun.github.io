new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
        index: 0,
        url: 'product.html',
        title: '全部商品'
    },{
        index: 1,
        url: 'productBrand.html',
        title: '等待审核'
    }],
    loading: true,
    // 搜索条件
    initialData:{
      commodityName:null,
      shopName :null,
      brandsId:null,
      status :null,
      approvalType:null,
      categoryLev :null,
      start:null,
      end:null
    },
    changeValue:{},
    productForm: {
        productName: '',
        shopName: '',
        brandName: '',
        classifyName: '全部分类',
        selectedCity: 0,
        selectedProductStatus:"00" ,
        selectedExamine: "00",
        fromDate: '',
        toDate: ''
    },
    brandId: '',
    classifyId: '',
    // 搜索条件结束
    productLists: [],
    selectedAll: false,
    selectedProduct: true,
    setProduct: false,
    setForm: {
      isExamine: '',
      isDistributor: '',
      isSupplier: '',
    },
    brands: [],
    brandTreeShow: false,
    brandsList:[],
    searchBrandName:'',
    categoryList:[],
    skuList:[],
    addForm: {
      number:'',
      productImg:'',
      name:'',
      shopName:'',
      lev1category:'',
      lev2category:'',
      lev3category:'',
      brandName:'',
      statuRemark:'',
      approvalPurchaser:'',
      approvalOperator:'',
      limitNums:0,
      imgList:[],

    },
    examineForm: {
      productNum: '',
      productName:'',
      percent:'',
      isExamine:'1',
      examineRemark:'',
    },
    downForm: {
      number: '',
      name:'',
      describe:'',
    },

    totalIds:[],
    totalIdExamine:[],
    userRights:{},
    rules:{
      percent:[
        {trigger: 'blur'}
        ],
      examineRemark:[
        {required: true,type:'string',message:'审核备注信息不能为空！',trigger: 'blur'}
      ]

    },
    // 品牌弹框分页
    pageDialogCount: 100,
    pageDialognum: 1,
    totalDialog: 100,
    // 页面分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1
  },
  created:function(){
    var _this = this;
    // 获取分类
    _this.categoryList = getTreeClassify();
    // 获取品牌
    _this.getBrandList();

      // 获取本地权限
      _this.userRights = getPows();
        console.log(_this.userRights )
  },
  mounted: function () {
    var _this = this;
    commonScript.appShowhide('app');
    this.getInfo(0,_this.initialData);
  },
  methods: {
    // 页面初始加载数据

    // 切换
    getInfo: function (index,values) {
      var _this = this;
      if (_this.current != index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
        _this.totalIds = []; //切换时所选id置空
        _this.totalIdExamine = [];
        _this.brandId= '';
        _this.classifyId= '';
        _this.changeValue = {
          commodityName:null,
          shopName :null,
          brandsId:null,
          status :null,
          approvalType:null,
          categoryLev :null,
          start:null,
          end:null
        };
        values = _this.changeValue
      }
      _this.current = index;
      // values.status = _this.productForm.selectedProductStatus;
      var approvalType = _this.productForm.selectedExamine;
      if(_this.current ==0){
        // values.status = values.status=="00"?'null':values.status;
        _this.initialData.approvalType = approvalType=="00"?'null':approvalType;
      }else if(_this.current ==1){
        // values.status = values.status=="00"?'null':values.status;
        values.approvalType = 3
      }
      _this.getDate(index,values);

    },
    getDate: function (index,values) {
      var _this = this;
      _this.loading = true;
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if(data.result){
                var result = data.result.list;
                if(result&&result.length>0){
                  result.forEach(function (item,index) {
                      if( item.approvalType == 3 ) {
                          // item.statuRemark = "审核中";
                        if( item.status.toLowerCase() == "onshelf" ) {
                          item.statuRemark = "下架审核中";
                        } else if( item.status.toLowerCase() == "downshelf" ) {
                          item.statuRemark = "上架审核中";
                        }
                      } else if( item.approvalType == 6 ) {
                          item.statuRemark = "待上架";
                      } else if( item.approvalType == 2 ) {
                        if( item.status.toLowerCase() == "onshelf" ) {
                          item.statuRemark = "下架未通过";
                        } else if( item.status.toLowerCase() == "downshelf" ) {
                          item.statuRemark = "上架未通过";
                        }
                      } else{
                          if( item.status.toLowerCase() == "onshelf" ) {
                              item.statuRemark = "已上架";
                          } else if( item.status.toLowerCase() == "downshelf" ) {
                              item.statuRemark = "已下架";
                          }else{
                            item.statuRemark = "违规下架";
                          }
                      }
                    // if( item.approvalType != 3 ) {
                      // 处理采购状态
                      if(item.approvalTypeByPurchaser==1){
                        item.approvalPurchaser = "通过";
                      }else if(item.approvalTypeByPurchaser==2){
                        item.approvalPurchaser = "未通过";
                      }else if(item.approvalTypeByPurchaser==3){
                        item.approvalPurchaser = "审核中";
                      }else{
                        item.approvalPurchaser = "";
                      }
                      // 处理运营状态
                      if(item.approvalTypeByOperator==1){
                        item.approvalOperator = "通过";
                      }else if(item.approvalTypeByOperator==2){
                        item.approvalOperator = "未通过";
                      }else if(item.approvalTypeByOperator==3){
                        item.approvalOperator = "审核中";
                      }else{
                        item.approvalOperator = "";
                      }
                    // }
                  })
                  _this.productLists = result;
                }else{
                  _this.productLists = []
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
      commonScript.getProduct(_this.pagenum,_this.pagecount,values.commodityName,values.shopName,values.brandsId,values.status,values.approvalType,values.categoryLev,values.start,values.end,'',res);

    },
    // 页面初始加载数据结束
    // 搜索
    searchDate:function(num){
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
       changeValue.commodityName = _this.productForm.productName||null;
       changeValue.shopName = _this.productForm.shopName||null;
       changeValue.brandsId = _this.brandId||null;
       changeValue.status = _this.productForm.selectedProductStatus;
       changeValue.approvalType = _this.productForm.selectedExamine;
       changeValue.categoryLev= _this.classifyId||null;
       changeValue.start = _this.productForm.fromDate||null;
       changeValue.end = _this.productForm.toDate||null;
      if(_this.current ==0){
        changeValue.status = changeValue.status=="00"?'null':changeValue.status;
        changeValue.approvalType = changeValue.approvalType=="00"?'null':changeValue.approvalType;
      }else if(_this.current ==1){
        changeValue.status = changeValue.status=="00"?'null':changeValue.status;
        changeValue.approvalType = 3
      }
      changeValue.start = _this.productForm.fromDate||null;
      changeValue.end = _this.productForm.toDate||null;
      _this.changeValue = changeValue;
      _this.getInfo(num,_this.changeValue);
    },
    // 双向审核
    // 审核通过
    passProduct:function(product,index ){
      var type = 1;
      var _this = this;
      //如果是审核中的状态
      if( product.approvalType == 3 ) {
          if( product.status == "OnShelf" ) {
              type = 2;
          } else {
              type = 1;
          }
      } else {
          _this.$message.success({ message: '此商品不需要审核！' });
          return;
      }

      _this.$confirm('你确定要审核通过吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          var userId = JSON.parse( sessionStorage.getItem("userData") ).id;
          var params = {
                approvalResult: 1 ,
                approvalType : type ,
                examinerId: userId ,
                productId: product.id ,
                refuseReason: "",
          };
          var res = function(data){
              try {
                  switch (data.httpCode) {
                    case 200 :
                        _this.$message.success({ message: '成功！' });
                        _this.getInfo(_this.current,_this.changeValue);
                        break;
                    default :
                        _this.$message.error({message: data.msg});
                  }
              } catch (e) {
                  console.log("REQUEST ERROR ", e);
              }
          };
          commonScript.doPost('/productInfo/approvalProductOnOff', params, res);
      }).catch((err) => {
      });
    },
    rejectProduct:function( product ,index ){
      var _this = this;
        //如果是审核中的状态
        if( product.approvalType == 3 ) {
            if( product.status == "OnShelf" ) {
                type = 2;
            } else {
                type = 1;
            }
        } else {
            _this.$message.success({ message: '此商品不需要审核！' });
            return;
        }
      _this.$confirm('你确定要拒绝通过吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          var userId = JSON.parse( sessionStorage.getItem("userData") ).id;
          var params = {
              approvalResult: 0 ,
              approvalType : type,
              examinerId: userId ,
              productId: product.id ,
              refuseReason: "",
          };
          var res = function(data){
              try {
                  switch (data.httpCode) {
                      case 200 :
                          _this.$message.success({ message: '成功！' });
                        _this.getInfo(_this.current,_this.changeValue);
                        break;
                    default :
                        _this.$message.error({message: data.msg});
                  }
              } catch (e) {
                  console.log("REQUEST ERROR ", e);
              }

          };
          if(index==1){
            // 采购拒绝
            commonScript.doPost('/productInfo/approvalProductOnOffByPurchaser', params , res);
          }else if(index==2){
            // 运营拒绝
            commonScript.doPost('/productInfo/approvalProductOnOffByOperator', params , res);
          }
      }).catch((err) => {
      });
    },
    // 紧急下架
    emergencyDown:function(id){
      var _this = this;
      _this.$confirm('你确定要紧急下架吗?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then(() => {
        var res = function(data){
          try {
            switch (data.httpCode) {
              case 200 :
                  if(data){
                    _this.$message.success({ message: '紧急下架成功！' })
                    _this.getInfo(_this.current,_this.changeValue);
                  }
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.log("REQUEST ERROR ", e);
          }

        };
        commonScript.doGet('/productInfo/urgencyDownShelfProduct/'+ id, '', res);
      }).catch((err) => {
      });
    },

    // 双向审核结束
    // 选取品牌
    // 获取品牌信息
    searchBrandList:function(){
      var _this = this;
      _this.pageDialognum= 1;
      _this.pageDialogCount = 100;
      _this.getBrandList ();

    },
    getBrandList:function(){
      var _this = this;
      // 获取品牌
      var name = _this.searchBrandName||null;
      var brand = [];
      var res = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              var result = data.result.list;
              if(result.length > 0){
                _this.brands = result;
              }
              _this.totalDialog = data.result.total;
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }
      };
      commonScript.getBrand(_this.pageDialognum,_this.pageDialogCount,name,null,null,'',res);
    },
    selectBrand: function () {
      var _this = this
      var layer = layui.layer
      layer.open({
        title: '选取品牌'
        , content: layui.jquery("#brandList")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        , yes: function () {
          _this.brandValue();
          layer.closeAll();
        }
      });
    },
    // 单个品牌勾选
    selectSignalBrand: function (brand, brands) {
      var _this = this;
      if(brand.active===undefined||!brand.active){
        _this.$set(brand, 'active', true);
      }
      commonScript.selected(brand, brands);
    },
    // 给品牌赋值
    brandValue: function () {
      var _this = this;
      _this.brands.forEach(function (_, i) {
        if (_.active) {
          _this.brandId = _.id;//品牌id
          _this.productForm.brandName = _.name;
        }
      });
    },
    // 品牌分页
    handleDialogSize: function (val) {
      var _this = this;
      // _this.searchBrandName = "";
      _this.pageDialogCount = val;
      _this.getBrandList();
    },
    handleDialogCurrent: function (val) {
      var _this = this;
      // _this.searchBrandName = "";
      _this.pageDialognum = val;
      _this.getBrandList();
    },
    // 选取品牌结束
    // 选取分类
    selectedClassify: function () {
      var _this = this;
      _this.brandTreeShow = true ;
      $("#brandTree").show();
      // 树结构
      var zTreeObj;
      // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      var setting = {
        callback: {
          onClick: onClick
        }
      };
      // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
      var zNodes = [{
        name: "全部分类",
        id:'null',
        open: true,
        children: _this.categoryList,
      }];

      // 树节点的点击事件
      function onClick(event, treeId, treeNode, clickFlag) {
        _this.classifyId = treeNode.lev;//分类id
        _this.productForm.classifyName = treeNode.name;
        _this.brandTreeShow = false;
      }
      // 初始化树节点
      $(document).ready(function () {
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      });
    },

    // 选取分类结束
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },

    // 删除单条数据
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function(data){
          try {
            switch (data.httpCode) {
              case 200 :
                _this.$message.success({ message: '删除成功！' })
                _this.getInfo(_this.current,_this.changeValue);
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.log("REQUEST ERROR ", e);
          }
        };
        commonScript.doGet('/productInfo/deleteProductInfo/'+ id, '', res);
      }).catch((err) => {
      });

    },
    // 删除单条数据结束
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
      _this.selectId();
    },
    // 审核单选
    selectSignle:function(item,index){
      var _this = this;
      if (item.active) {
        _this.$set(item, 'active', false);
      } else {
        _this.$set(item, 'active', true);
      }
      let num = 0;
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
      _this.selectId();
    },
    // 选取id  单选或多选
    selectId:function(){
      var _this=this;
      var ids = [],idExamine=[];
      if(_this.productLists && _this.productLists.length>0){
        _this.productLists.forEach(function (_, i) {
          if (_.active) {
            var examine = _.id+'-'+_.commodityReleaseStatus;
            ids.push(_.id);
            idExamine.push(examine)
          }
        });
        _this.totalIds = ids;
        _this.totalIdExamine = idExamine;
        // console.log(_this.totalIdExamine)
      }
    },

    // 查看商品详情
    skewProduct:function(item){
      var _this = this;
      _this.addForm.number = item.number;
      _this.addForm.productImg = item.mainPic;
      _this.addForm.name = item.name;
      _this.addForm.shopName = item.shopName;
      _this.addForm.lev1category = item.lev1category;
      _this.addForm.lev2category = item.lev2category;
      _this.addForm.lev3category = item.lev3category;
      _this.addForm.brandName = item.brandsName;
      _this.addForm.statuRemark = item.statuRemark;
      _this.addForm.approvalPurchaser = item.approvalPurchaser;
      _this.addForm.approvalOperator = item.approvalOperator;

      // 处理商品详情图
      if(item.pics){
        var pics = item.pics.replace('[','');
        pics = pics.replace(']','');
        var picsList = pics.split(',')
      }
      _this.addForm.imgList = picsList;
      // 处理sku列表
      _this.getSkuList(item.id);
      var layer = layui.layer;
      layer.open({
        title: '查看商品详情'
        , content: layui.jquery("#editAdd")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
      });
    },
    updateProduct:function(formName,id){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          var datas = {
            "id": id,
            "commission": _this.addForm.rate*1,
            "stock": _this.addForm.stock*1,
            "limitNumber":_this.addForm.limitNums*1,
          };
          // 编辑
          var add = function (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.getInfo(_this.current,_this.changeValue);
                  _this.$refs.addForm.resetFields(); //点击确认后清空表单
                  layer.closeAll();
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.log("REQUEST ERROR ", e);
            }

          };
          commonScript.doPost('/productInfo/updateProductPageInfo',datas,add);

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 查看商品详情结束
// 处理sku列表
    getSkuList:function(id){
      var _this = this;
      var add = function (data) {
        try {
          switch (data.httpCode) {
            case 200 :
              if(data.result){
                _this.skuList = data.result
              }else{
                _this.skuList = []
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }
      };
      commonScript.doGet('/productInfo/queryProductSku/'+id,'',add);

    },
    // 下架
    putDown:function(item){
      var _this = this;
      _this.downForm.number = item.number;
      _this.downForm.name=item.name;
      var layer = layui.layer;
      layer.open({
        title: '下架商品'
        , content: layui.jquery("#downProduct")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        , yes: function () {
          _this.putDownForm('downForm',item.id);
          // layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.downForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.downForm.resetFields();
        }
      });
    },
    putDownForm:function(formName,id){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        // if(_this.examineForm.isExamine == '1'){
        //   var approvalType = 1
        // }else if(_this.examineForm.isExamine == '0'){
        //   var approvalType = 2
        // }
        if (valid) {
          var datas = {
            "id": id,
            "downShelfReason": _this.downForm.describe,
            "status":'BreakRule',
          };
          // 编辑
          var add = function (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.getInfo(_this.current,_this.changeValue);
                  _this.$refs.downForm.resetFields(); //点击确认后清空表单
                  layer.closeAll();
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.log("REQUEST ERROR ", e);
            }

          };
          commonScript.doPost('/productInfo/updateProductPageInfo',datas,add);

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 下架结束

    // 审核商品
    // 批量审核
    examineProducts:function(){
      var _this = this;
      if(_this.totalIdExamine.length>0){
        var ids = _this.totalIdExamine.toString();
        _this.$confirm('你确定要审核通过吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var res = function(data){
            if(data){
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({ message: '审核成功！' });
                    _this.getInfo(_this.current,_this.changeValue);
                    break;
                  default :
                    _this.$message.error({message: data.msg});
                }
              } catch (e) {
                console.log("REQUEST ERROR ", e);
              }

            }
          };
          commonScript.doGet('/productInfo/approvalProductPageInfo/'+ids,'', res);
        }).catch((err) => {

        });
      }else {
        _this.$message.error({ message: '请先选择需要审核的项！' });
      }
    },
    // 单个商品审核
    examineProduct:function(item){
      var _this = this;
      _this.examineForm.productNum = item.number;
      _this.examineForm.productName = item.name;

      var layer = layui.layer;
      layer.open({
        title: '审核商品'
        , content: layui.jquery("#examineProduct")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        ,zIndex:100
        , yes: function () {
          _this.examineProductForm('examineForm',item.id);
          // layer.closeAll();
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.examineForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.examineForm.resetFields();
        }
      });

    },
    examineProductForm:function(formName,id){
      var _this = this;
      _this.$refs[formName].validate((valid) => {
        if(_this.examineForm.isExamine == '1'){
          var approvalType = 1
        }else if(_this.examineForm.isExamine == '0'){
          var approvalType = 2
        }
        if (valid) {
          var datas = {
            "id": id,
            "approvalContext": _this.examineForm.examineRemark,
            "approvalType": approvalType,
            "commissionRatio":_this.examineForm.percent,
            "status":'OnShelf',
          };
          // 编辑
          var add = function (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.getInfo(_this.current,_this.changeValue);
                  _this.$refs.examineForm.resetFields(); //点击确认后清空表单
                  layer.closeAll();
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.log("REQUEST ERROR ", e);
            }

          };
          commonScript.doPost('/productInfo/updateProductPageInfo',datas,add);

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
//     审核商品结束
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
