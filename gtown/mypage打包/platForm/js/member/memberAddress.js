new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '地址管理'
    }],
    loading: true,
    productForm: {
      memberId: '',
      productName: '',
    },
    productLists: [],
    initialData: {
      telephone: "",
      userId: ""
    },
    changeValue: {
      telephone: "",
      userId: ""
    },
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1
  },
  mounted: function () {
    var _this = this;
    // FastClick.attach(document.body);
    commonScript.appShowhide('app');
    _this.getInfo(0,_this.initialData);
  },
  // beforeUpdate: function () {
  //   debugger
  //   var tag=commonScript.getParameter('tag');
  //   console.log(tag)
  //   if(tag===1){
  //     _this.$message.success({ message: '类型添加成功！' });
  //   }
  // },
  methods: {
    // 页面初始加载数据
    getInfo: function (index,values) {
      var _this = this;
      _this.loading = false;
      var res = function (datas) {
        _this.loading = false;
        try {
          switch (datas.httpCode) {
            case 200 :
              if(datas.result){
                var res = datas.result.list;
                if(res){
                  _this.productLists = res;
                }else{
                  _this.productLists = [];
                }
                _this.total = datas.result.total;
              }
              break;
            default :
              _this.$message.error({message: datas.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }

      };

      commonScript.doPost('/address/'+_this.pagenum+'/'+_this.pagecount,values,res)

    },
    // 搜索
    searchDate:function(num){
      var _this = this;
      _this.pagecount = 10;
      _this.pagenum = 1;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      changeValue.userId=_this.productForm.memberId||"";
      changeValue.telephone=_this.productForm.productName||"";
      _this.changeValue = changeValue;
      _this.getInfo(num,changeValue);
    },
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },

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