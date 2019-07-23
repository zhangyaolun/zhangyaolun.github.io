new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '搜索管理'
    }],
    loading: true,
    isAdd: true,
    productForm: {
      brandName: '',
      classifyName: '',
    },
    initialData:{
      count: 10,
      fastnewsCategory: 31,
      index: 1,
      style: "",
      title: ""
    },
    changeValue:{
      count: 10,
      fastnewsCategory: 31,
      index: 1,
      style: "",
      title: ""
    },
    productLists: [],
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1,
    addForm: {
      addNewName: '',
    },
    userRights:{},
    rules: {
      addNewName: [
        {required: true, type: 'string', message: '请输入默认搜索词！', trigger: 'blur'}
      ],
    }
  },
  created: function () {
    var _this = this;
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    commonScript.appShowhide('app');
    this.getInfo(0,this.initialData);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index,values) {
      var _this = this;
      _this.loading = true;
      if (_this.current != index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
        _this.classifyId = '';
      }
      _this.current = index;
      values.index = _this.pagenum;
      values.count = _this.pagecount;
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                var result = data.result.list;
                if (result) {
                  _this.productLists = result;
                  _this.total = data.result.total;

                } else {
                  _this.productLists = [];
                  _this.total = 0
                }
                if(_this.productLists&&_this.productLists.length>0){
                  _this.isAdd = false
                }else{
                  _this.isAdd = true
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
      commonScript.doPost('/mobileInfo/queryMobileSearchWordInfo',values,res)

    },

    // 查询
    searchProduct: function () {
      var _this = this;
      _this.pagenum = 1;
      _this.pagecount = 10;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      // changeValue.name = _this.productForm.brandName ||null
      _this.changeValue = changeValue;
      _this.getInfo(_this.current,_this.changeValue);
    },
    // 查询结束
    // 单条数据选中
    selectOrder: function (item, lists) {
      var _this = this;
      if (item.active === undefined || !item.active) {
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item, lists);
    },
    // 新增品牌
    addClassify: function (title, id) {
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
          _this.addNewCalssigy('addForm', id);
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
      });
    },
    // 确定 新增 编辑 品牌
    addNewCalssigy: function (formName,id) {
      var _this = this;
      var datas = {
        fastnewsCategory: 31,
        isOpen: 1,
        sort: 1,
        title: _this.addForm.addNewName
      };
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (id !== undefined) {
            // 编辑
            datas['id'] = id;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '编辑成功！'});
                    _this.getInfo(_this.current,_this.changeValue);
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
            commonScript.doPost('/mobileInfo/updateMobileSearchWordInfo', datas, add);

          } else {
            // 新增
            // data['categoryLev'] = _this.categoryLev;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.$message.success({message: '新增成功！'});
                    _this.getInfo(_this.current,_this.initialData);
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
            commonScript.doPost('/mobileInfo/insertMobileSearchWordInfo', datas, add);

          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    showDetail: function (item) {
      var _this = this;
      _this.addForm.addNewName = item.title;
      _this.addClassify('编辑搜索词', item.id);
    },

    // 新增品牌结束
    // 删除品牌
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          try {
            switch (data.httpCode) {
              case 200 :
                _this.$message.success({message: '删除成功！'});
                _this.getInfo(_this.current,_this.changeValue);
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.error("REQUEST ERROR ", e);
          }
        };
        commonScript.doGet('/mobileInfo/deleteMobileSearchWordInfo/' + id, '', res);
      }).catch((err) => {

      });
    },
    // 删除品牌结束

    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
      _this.pagecount = val;
      _this.getInfo(_this.current,_this.changeValue);
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
      _this.pagenum = val;
      _this.getInfo(_this.current,_this.changeValue);
    }

  }

});