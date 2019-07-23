new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      url: 'product.html',
      title: '销售报表'
    }],
    loading: true,
    // 搜索条件
    productForm: {
      productCode: '',
      productName: '',
      shopName: '',
      brandName: '',
      classifyName: '全部分类',
      selectedCity: 0,
      selectedProductStatus: "00",
      selectedExamine: "00",
      fromDate: '',
      toDate: ''
    },
    brandId: '',
    classifyId: '',
    initialData: {
      brandId: "",
      categoryId: "",
      count: 10,
      index:1,
      payTimeLowLimit: "",
      payTimeUpLimit: "",
      productName: "",
      productNumber: "",
      shopName: ""
    },
    changeValue: {
      brandId: "",
      categoryId: "",
      count: 10,
      index:1,
      payTimeLowLimit: "",
      payTimeUpLimit: "",
      productName: "",
      productNumber: "",
      shopName: ""
    },
    // 搜索条件结束
    productListLength: 1,
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
    brandsList: [],
    searchBrandName: '',
    categoryList: [],
    addForm: {
      number: '',
      productImg: '',
      name: '',
      shopName: '',
      lev1category: '',
      lev2category: '',
      lev3category: '',
      brandName: '',
      productPrice: '',
      customerPrice: '',
      realPrice: '',
      status: '',
      approval: '',
      rate: '',
      stock: '',
      buy: '0',
      limitNums: 0,
      imgList: [],

    },
    examineForm: {
      productNum: '',
      productName: '',
      percent: '',
      isExamine: '1',
      examineRemark: '',
    },
    downForm: {
      number: '',
      name: '',
      describe: '',
    },
    totalIds: [],
    userRights: {},
    rules: {
      percent: [
        {trigger: 'blur'}
      ],
      examineRemark: [
        {required: true, type: 'string', message: '审核备注信息不能为空！', trigger: 'blur'}
      ]

    },
    // 品牌弹框分页
    pageDialogCount: 100000,
    pageDialognum: 1,
    totalDialog: 100,
    // 页面分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage: 1
  },
  created: function () {
    var _this = this;
    // 获取分类
    _this.categoryList = getTreeClassify();
    // 获取品牌
    _this.getBrandList();
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    var _this = this;
    commonScript.appShowhide('app');
    this.getInfo(0, _this.initialData);
  },
  methods: {
    // 页面初始加载数据

    // 切换
    getInfo: function (index, values) {
      var _this = this;
      _this.current = index;
      _this.getDate(index, values);
    },
    getDate: function (index, values) {
      var _this = this;
      _this.loading = true;
      var datas = {
        brandId: _this.brandId || "",
        categoryId: _this.classifyId || "",
        count: _this.pagecount,
        index: _this.pagenum,
        payTimeLowLimit: _this.productForm.fromDate || "",
        payTimeUpLimit: _this.productForm.toDate || "",
        productName: _this.productForm.productName || "",
        productNumber: _this.productForm.productCode || "",
        shopName: _this.productForm.shopName || ""
      };
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result && data.result.list) {
                _this.productLists = data.result.list;
                if (_this.productLists.length > 0) {
                  _this.productLists.forEach(function (_) {
                    if (_.createTime) {
                      var time = _.createTime;
                      time = commonScript.changedate(time, 'yyyy-MM-dd HH:mm:ss');
                      _.createTime = time
                    }
                  })
                }
                _this.total = data.result.total;

              } else {
                _this.productLists = [];
                _this.total = 0;
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }
      };
      // commonScript.getProductSales(_this.pagenum,_this.pagecount,commodityName,shopName,brandsId,status,approvalType,categoryLev,start,end,'',res);
      commonScript.doPost("/reportInfo/querySalesStatisticsInfo", values, res)

    },
    // 页面初始加载数据结束
    // 搜索
    searchDate: function (num) {
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      changeValue.brandId = _this.brandId || "";
      changeValue.categoryId = _this.classifyId || "";
      changeValue.count = _this.pagecount;
      changeValue.index = _this.pagenum;
      changeValue.payTimeLowLimit = _this.productForm.fromDate || ""
      changeValue.payTimeUpLimit = _this.productForm.toDate || ""
      changeValue.productName = _this.productForm.productName || ""
      changeValue.productNumber = _this.productForm.productCode || ""
      changeValue.shopName = _this.productForm.shopName || ""
      _this.changeValue = changeValue;
      _this.getInfo(num,changeValue);
    },
    // 导出
    exportProduct: function () {
      var _this = this;
      var productNumber = _this.productForm.productCode || null;
      var productName = _this.productForm.productName || null;
      var shopName = _this.productForm.shopName || null;
      var brandsId = _this.brandId || null;
      var categoryLev = _this.classifyId || null;
      var start = _this.productForm.fromDate || null;
      var end = _this.productForm.toDate || null;
      var getToken = window.getCookie('token');

      window.location.href = '/reportInfo/exportSalesStatisticsInfo/' + _this.pagenum + '/' + _this.pagecount + '/' + productNumber + '/' + productName + '/' + shopName + '/' + brandsId + '/' + categoryLev + '/' + start + '/' + end + '/'+ getToken;
    },
    exportProduct2: function () {
      var _this = this;
      var datas = {
        brandId: _this.brandId || "",
        categoryId: _this.classifyId || "",
        count: _this.pagecount,
        index: _this.pagenum,
        payTimeLowLimit: _this.productForm.fromDate || "",
        payTimeUpLimit: _this.productForm.toDate || "",
        productName: _this.productForm.productName || "",
        productNumber: _this.productForm.productCode || "",
        shopName: _this.productForm.shopName || ""
      };

      // var xhr = new XMLHttpRequest();
      // xhr.open("post","/reportInfo/exportSalesStatisticsInfo",true);
      // xhr.setRequestHeader("content-type","application/json");
      // xhr.send( JSON.stringify( datas ) );
      // xhr.onload = function () {
      //   var blob = new Blob([this.responseText], { type: 'application/vnd.ms-excel,charset=utf-8' });
      //   var a = $("<a target='_blank' download='销售报表' href='" + URL.createObjectURL(blob) + "'></a>");
      //   $("body").append(a);
      //   a[0].click();
      //   a.remove();
      // }
      //
      var res = function (data) {

      };
      commonScript.doPost("/reportInfo/exportSalesStatisticsInfo", datas, res);
    },
    // 导出结束
    // 选取品牌
    // 获取品牌信息
    searchBrandList: function () {
      var _this = this;
      _this.pageDialognum = 1;
      _this.pageDialogCount = 100;
      _this.getBrandList();
    },
    getBrandList: function () {
      var _this = this;
      // 获取品牌
      var name = _this.searchBrandName || null;
      var brand = [];
      var res = function (data) {
        if(data){
          if(data.result&&data.result.list){


        var result = data.result.list;
        if (result.length > 0) {
          _this.brands = result;
        } else {
          _this.brands = []
        }
        _this.totalDialog = data.result.total;
          }
        }
      };
      commonScript.getBrand(_this.pageDialognum, _this.pageDialogCount, name, null, null, '', res);
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
        , scrollbar: false
        , zIndex: 100
        , yes: function () {
          _this.brandValue();
          layer.closeAll();
        }
      });
    },

    // 单个品牌勾选
    selectSignalBrand: function (brand, brands) {
      var _this = this;
      if (brand.active === undefined || !brand.active) {
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
      _this.searchBrandName = "";
      _this.pageDialogCount = val;
      _this.getBrandList();
    },
    handleDialogCurrent: function (val) {
      var _this = this;
      _this.searchBrandName = "";
      _this.pageDialognum = val;
      _this.getBrandList();
    },
    // 选取品牌结束
    // 选取分类
    selectedClassify: function () {
      var _this = this;
      _this.brandTreeShow = true;
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
        id: 'null',
        open: true,
        children: _this.categoryList,
      }];

      // 树节点的点击事件
      function onClick(event, treeId, treeNode, clickFlag) {
        _this.classifyId = treeNode.id;//分类id
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
    selectOrder: function (item, lists) {
      var _this = this;
      if (item.active === undefined || !item.active) {
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item, lists);
    },

    // 删除单条数据
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            _this.$message.success({message: '删除成功！'})
            _this.getInfo(_this.current,_this.initialData);
          }
        };
        commonScript.doGet('/productInfo/deleteProductInfo/' + id, '', res);
      }).catch((err) => {
      });

    },
    // 删除单条数据结束


    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagecount = val;
      _this.changeValue.count = val
      _this.getInfo(_this.current,_this.changeValue);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
      // _this.$refs.productForm.resetFields();
      _this.pagenum = val;
      _this.changeValue.index = val
      _this.getInfo(_this.current,_this.changeValue);
    }

  }

})