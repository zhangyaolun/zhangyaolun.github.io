new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '商品推荐'
    }],
    loading: true,
    setProduct:false,
    BrandName: '',
    selectedCity: 0,
    selectedProductStatus: 0,
    selectedExamine: 0,
    productListLength: 1,
    productLists: [],
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
  },
  mounted: function () {
    // FastClick.attach(document.body);
    commonScript.appShowhide('app');
    this.getInfo();
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index) {
      var _this = this;
      _this.loading = true;
      var res = function (data) {
        _this.loading = false;
        if(data.result){
          var result = data.result;
          if(result.length>0){
            result.forEach( function (_) {


            });
          }


          console.log(data.result)
        }
      };
      commonScript.getRcommand(res);
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
        }, );
      }
    },
    // 新增分类
    addClassify: function () {
      console.log(11)

    },
    // 新增分类结束
    // 删除分类
    removeProduct: function (id) {
      var _this = this;
      if (_this.productLists && _this.productLists.length > 0) {
        _this.productLists.forEach(function (_, i) {
          if (_.shopId == id) {
            _this.productLists.splice(_, 1);
          }
        });
      }
      console.log(_this.productLists);

    },

    // 删除分类结束
    // 选取分类
    selectedClassify: function () {
      $(".brandTree").show();
    },
    // 选取分类结束
    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      this.pagecount = val;
      this.getInfo();
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      this.pagenum = val;
      this.getInfo();
    }

  }

})