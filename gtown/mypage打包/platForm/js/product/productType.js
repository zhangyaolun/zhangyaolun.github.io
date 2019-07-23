new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '类别'
    }],
    loading: true,
    setProduct: false,
    BrandName: '',
    selectedCity: 0,
    selectedProductStatus: 0,
    selectedExamine: 0,
    productListLength: 1,
    productLists: [],
    userRights:{},
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
  },
  created: function () {
    var _this = this;
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
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
        try {
          switch (data.httpCode) {
            case 200 :
              if(data.result){
                var res = data.result.list;
                if(res){
                  _this.productLists = res;
                }else{
                  _this.productLists = [];

                }
                _this.total = data.result.total;
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.getType(_this.pagenum,_this.pagecount,res);
    },
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },
    // 新增类型
    addClassify: function () {
      window.location.href = 'addproductType.html';
    },
    // 新增类型结束
    // 编辑类型
    showDetail:function(item){
      window.location.href = 'addproductType.html?item='+JSON.stringify(item);
    },
    // 编辑类型结束

    // 删除类型
    removeProduct:function(id){
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
                _this.getInfo();
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.error("REQUEST ERROR ", e);
          }
        };
        commonScript.doGet('/productInfo/deleteTypeInfo/'+ id, '', res);
      }).catch((err) => {

      });
    },
    // 删除类型结束
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