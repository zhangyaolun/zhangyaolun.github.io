new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '店铺报表'
    }],
    loading: true,
    productForm: {
      productNumber:'',
      productName: '',
      selectedMember: 0,
      fromDate: '',
      toDate: ''
    },
    initialData: {
      start:null,
      end:null
    },
    changeValue: {
      start:null,
      end:null
    },
    productListLength: 1,
    productLists: [{
      id:1
    }],
    treeShow: false,
    setProduct: false,
    isExamine: 1,
    isDistributor: 1,
    isSupplier: 1,
    showBrandDialog: false,
    ldg_lockmask: false,
    addForm:{
      name:'',
      description:'',
      status:'1',
      isUse:'1'
    },
    brands: [
      {
        name: 'nike',
      },
      {
        name: 'new blance',
      },
    ],
    categoryList:[],
    userRights:{},
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1,
  },
  created:function(){
    var _this = this;
    _this.loading = true;
    // 获取分类
    _this.categoryList = getTreeClassify();
    // 获取本地权限
    _this.userRights = getPows();
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
      // var start = _this.productForm.fromDate|| null;
      // var end = _this.productForm.toDate|| null;
      // var name = _this.productForm.productName||null;
      // var number = _this.productForm.productNumber||null;
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if(data.result){
                var result = data.result.list;
                if(result&&result.length>0){
                  _this.productLists = result;
                  _this.total = data.result.total;
                }else {
                  _this.productLists = [];
                  _this.total = 0;
                }
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.doGet('/reportInfo/queryShopStatisticsInfo/'+ _this.pagenum + '/' + _this.pagecount+'/'+values.start+'/'+ values.end,'',res)
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
      changeValue.start = _this.productForm.fromDate || null
      changeValue.end = _this.productForm.toDate || null
      _this.changeValue = changeValue;

      _this.getInfo(num,changeValue);
    },
    // 导出
    exportBrand:function(){
      var _this = this;
      var start = _this.productForm.fromDate|| null;
      var end = _this.productForm.toDate|| null;
      var getToken = window.getCookie('token');

      window.location.href = '/reportInfo/exportShopStatisticsInfo/'+ _this.pagenum + '/'+ _this.pagecount+'/'+start+'/'+ end+'/'+getToken;

    },

    // 导出结束
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