new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '管理'
    }],
    loading: true,
    setProduct: false,
    productForm: {
      brandName: '',
      classifyName: '',
    },
    initialData:{
      name :null,
    },
    changeValue:{
      name :null,
    },
    categoryList: [],
    categorys: [],
    classifyId: '',
    classifyId2: '',
    categoryLev: '',
    brandTreeShow: false,
    addTreeShow: false,
    selectedCity: 0,
    selectedProductStatus: 0,
    selectedExamine: 0,
    productListLength: 1,
    productLists: [],
    selectedAll: false,
    selectedProduct: true,
    totalId: '',
    // 分页
    pagecount: 10,
    pagenum: 1,
    total: 0,
    currentPage:1,
    // 新增分类
    XXX: '',
    addForm: {
      addNewName: '',
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
    },
    userRights:{},
    rules: {
      addNewName: [
        {required: true, type: 'string', message: '请输入品牌名称！', trigger: 'blur'}
      ],
      orderType: [
        {required: true, message: '请输入排序！', trigger: 'blur'},
        { pattern: /^([0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/, message: '请输入0~255的整数！', trigger: 'blur' },
      ],
    }
  },
  created: function () {
    var _this = this;
    // _this.categoryList = getTreeClassify();
    // var res = function (data) {
    //   if (data.result) {
    //     _this.categorys = data.result;
    //   }
    // };
    // commonScript.doGet('/productInfo/queryCategoryInfo', '', res);
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    commonScript.appShowhide('app');
    this.getInfo(0,this.initialData);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index,value) {
      var _this = this;
      _this.loading = true;
      if (_this.current != index) {
        _this.$refs.productForm.resetFields(); //切换时搜索条件置空
        _this.classifyId = '';
      }
      _this.current = index;
      // var name = _this.productForm.brandName == '' ? 'null' : _this.productForm.brandName;
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
              }
              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.error("REQUEST ERROR ", e);
        }

      };
      commonScript.getBrand(_this.pagenum, _this.pagecount, value.name, null, 1, '', res);


      // _this.getData(index);
      // 获取分类
    },
    // 获取品牌列表
    getData: function (index) {
      var _this = this;
      var name = _this.productForm.brandName == '' ? 'null' : _this.productForm.brandName;
      var categoryId = _this.classifyId == '' ? 'null' : _this.classifyId;
      if (index == 0) {
        var examineState = 1;
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
                }
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.error("REQUEST ERROR ", e);
          }

        };

      } else if (index == 1) {
        var examineState = 0;

        var res = function (data) {
          _this.loading = false;
          try {
            switch (data.httpCode) {
              case 200 :
                if (data.result) {
                  var result = data.result.list;
                  _this.productLists2 = result;
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
      }
      commonScript.getBrand(_this.pagenum, _this.pagecount, name, categoryId, examineState, '', res);

    },
    // 品牌列表结束
    // 查询
    searchProduct: function () {
      var _this = this;
      _this.pagenum = 1;
      _this.pagecount = 10;
      _this.currentPage = 1;
      var changeValue = commonScript.changeJson(_this.initialData);
      changeValue.name = _this.productForm.brandName ||null
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
        name: _this.addForm.addNewName,
        displaytype: _this.addForm.showType * 1,
        examineState: _this.addForm.examineStatus * 1,
        pictureIdentification: _this.addForm.categoryImg,
        activityIsdisplayed: _this.addForm.activityShow * 1,
        categoryId: _this.classifyId2,
        categoryLev: _this.categoryLev,
        iscommended: _this.addForm.isRecommend * 1,
        sorting: _this.addForm.orderType,
        activityIdentification: _this.addForm.activityImg,
        activityAddress: _this.addForm.activityURL,
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
            commonScript.doPost('/productInfo/updateBrandInfo', datas, add);

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
            commonScript.doPost('/productInfo/insertBrandInfo', datas, add);

          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    // 编辑品牌
    showDetail: function (item) {
      var _this = this;
      _this.addForm.addNewName = item.name;
      _this.addForm.showType = item.displaytype == true ? '1' : '0';
      _this.addForm.examineStatus = item.examineState == true ? '1' : '0';
      _this.addForm.activityShow = item.activityIsdisplayed;
      _this.addForm.addClassifyId = item.categoryId;
      if (_this.categorys.length > 0) {
        _this.categorys.forEach(function (_) {
          if (_.id == item.categoryId) {
            _this.addForm.addNewClassify = _.name;
          }
        })
      }
      _this.categoryLev = item.categoryLev;
      _this.addForm.isRecommend = item.iscommended == true ? '1' : '0';
      _this.addForm.orderType = item.sorting;
      _this.addForm.activityURL = item.activityAddress;
      _this.addForm.categoryImg = item.pictureIdentification;
      _this.addForm.activityImg = item.activityIdentification;
      _this.addClassify('编辑品牌', item.id);
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
        commonScript.doGet('/productInfo/deleteBrandInfo/' + id, '', res);
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