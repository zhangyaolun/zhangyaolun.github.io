new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '商品分类'
    }],
    loading: true,
    productName: '',
    shopName: '',
    selectedCity: 0,
    selectedProductStatus: 0,
    selectedExamine: 0,
    productLists: [],
    // 分页
    pagecount: 0,
    pagenum: 0,
    total: 0,
    // 新增分类
    thirdShow:false,
    addForm: {
      addNewName: '',
      checked: false,
      isSpecial:false,
      recommand:'',
      types:[{
        id:1,
        name:'专场推荐'
      },{
        id:2,
        name:'热门分类'
      }],
      percentage: '',
      categoryImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      categoryBackground: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      fontColor: '',
      prevCategory: '',
      type: '',
      selects: [],
      orderType: '',
      status:0
    },
    userRights:{},
    rules: {
      addNewName: [
        {required: true, type: 'string', message: '请输入分类名称!', trigger: 'blur'}
      ],
      type: [
        {required: true, message: '请选择类别!', trigger: 'change'}
      ],
      orderType: [
        {required: true, message: '请输入排序!', trigger: 'blur'},
        { pattern: /^([0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/, message: '请输入0~255的整数！', trigger: 'blur' },
      ],
    }
  },
  created: function () {
    var _this = this;
    commonScript.appShowhide('app');
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    this.getInfo();
  },
  methods: {
    // 页面初始加载数据
    getInfo: function () {
      var _this = this;
      _this.loading = true;
      var result = getTreeClassify();
      _this.productLists = result;
      _this.loading = true;
      // 分类管理
      // 获取类型
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if (data.result) {
                var result = data.result.list;
                if (result) {
                  _this.addForm.selects = result;
                } else {
                  _this.addForm.selects = [];
                }
              }

              break;
            default :
              _this.$message.error({message: data.msg});
          }
        } catch (e) {
          console.log("REQUEST ERROR ", e);
        }

      };
      commonScript.getType(1, 100000, res);
      // 页面分类中显示类型
      if (_this.addForm.selects.length > 0 && _this.productLists.length > 0) {
        // console.log(_this.addForm.selects,'ssssssssss')
        _this.addForm.selects.forEach(function (_) {
          // 遍历一级
          _this.productLists.forEach(function (level) {
            if (level.typeId) {
              if (_.id === level.typeId) {
                _this.$set(level, 'typeName', _.name)
              }
            }
            // 遍历二级
            if (level.children && level.children.length > 0) {
              level.children.forEach(function (level2) {
                if (level2.typeId) {
                  if (_.id === level2.typeId) {
                    _this.$set(level2, 'typeName', _.name)
                  }
                }
                // 遍历三级
                if (level2.children && level2.children.length > 0) {
                  level2.children.forEach(function (level3) {
                    if (level3.typeId) {
                      if (_.id === level3.typeId) {
                        _this.$set(level3, 'typeName', _.name)
                      }
                    }
                  })
                }
              })

            }
          });
        })
      }

    },
    // 单条数据选中
    selectOrder: function (item, lists) {
      var _this = this;
      if (item.active === undefined || !item.active) {
        _this.$set(item, 'active', true);
      }
      if (_this.productLists && _this.productLists.length > 0) {
        // 遍历一级
        _this.productLists.forEach(function (_, i) {
          if (_.id !== item.id) {
            if (_.active) {
              _.active = false;
            }
          }
          // 遍历二级
          if (_.children && _.children.length > 0) {
            _.children.forEach(function (level2) {
              if (level2.id !== item.id) {
                if (level2.active) {
                  level2.active = false;
                }
              }
              // 遍历三级
              if (level2.children && level2.children.length > 0) {
                level2.children.forEach(function (level3) {
                  if (level3.id !== item.id) {
                    if (level3.active) {
                      level3.active = false;
                    }
                  }
                })
              }
            })

          }

        });
      }
    },
    // 点击箭头是否显示
    categoryShow: function (item) {
      var _this = this;
      if (!item.showCategory || item.showCategory === undefined) {
        _this.$set(item, 'showCategory', true);
      } else {
        _this.$set(item, 'showCategory', false);
      }

    },
    // 新增分类
    addClassify: function (title, pid, pName, lev, id) {
      var _this = this;
      if (pid != undefined || pid != null) {
        _this.addForm.prevCategory = pName;
      }
      // 判断是否三级分类
      if (id != undefined) {
        // 编辑
        if (lev && lev.length == 12) {
          _this.thirdShow = true
        } else {
          _this.thirdShow = false
        }
      }else{
        if (lev && lev.length == 8) {
          _this.thirdShow = true
        } else {
          _this.thirdShow = false
        }
      }
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
          _this.addNewCalssigy('addForm', pid, lev, id);
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
    // 确定 新增 编辑 分类
    addNewCalssigy: function (formName, pid, lev, id) {
      var _this = this;
      if (pid == undefined) {
        pid = "";
      }
      if (lev === undefined) {
        lev = ""
      }
      // 处理推荐
      if(_this.addForm.recommand==""){
        var recommand = 0
      }else{
        var recommand = _this.addForm.recommand
      }
      // 处理状态
      if(_this.addForm.status=="1"){
        var status = true
      }else if(_this.addForm.status=="0"){
        var status = false
      }
      var datas = {
        childer: [],
        name: _this.addForm.addNewName,
        image: _this.addForm.categoryImg,
        wapImage: _this.addForm.categoryBackground,
        // wapColor: _this.addForm.isSpecial?'1':'0',
        isRecommend :recommand,
        commissionRatio: _this.addForm.percentage,
        pid: pid,
        typeId: _this.addForm.type,
        sorting: _this.addForm.orderType,
        isHide:status
      };
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (id != undefined) {
            // 编辑
            datas['id'] = id;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.getInfo();
                    _this.$message.success({message: "编辑成功！"});
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
            commonScript.doPost('/productInfo/updateCategoryInfo', datas, add);

          } else {
            // 新增
            datas['lev'] = lev;
            var add = function (data) {
              try {
                switch (data.httpCode) {
                  case 200 :
                    _this.getInfo();
                    _this.$message.success({message: "新增成功！"});
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
            commonScript.doPost('/productInfo/insertCategoryInfo', datas, add);
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    // 编辑分类
    showDetail: function (item) {
      var _this = this;
      console.log(item)
      _this.addForm.addNewName = item.name;
      _this.addForm.checked = item.isRecommend ;
      _this.addForm.percentage = item.commissionRatio;
      if (item.image) {
        _this.addForm.categoryImg = item.image;
      }
      if (item.wapImage) {
        _this.addForm.categoryBackground = item.wapImage;
      }
      // 判断是否三级分类
        if(item.lev&&item.lev.length==12){
          _this.thirdShow = true
        }else{
          _this.thirdShow = false
        }

      // if(item.wapColor=='1'){
      //   _this.addForm.isSpecial = true
      // }else{
      //   _this.addForm.isSpecial = false
      // }
      // _this.addForm.isSpecial = item.wapColor;
      // 处理分类属性
      if(!item.isRecommend||item.isRecommend==""){
        _this.addForm.recommand = ""
      }else{
        _this.addForm.recommand =item.isRecommend
      }
      _this.addForm.prevCategory = item.pName;
      _this.addForm.type = item.typeId;
      _this.addForm.orderType = item.sorting;
      if(item.isHide){
        _this.addForm.status = 1
      }else{
        _this.addForm.status = 0
      }
      _this.addClassify('编辑分类', item.pid, item.parentName, item.lev, item.id);
    },

    // 新增分类结束
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
    selectFile2: function (e) {
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
            _this.addForm.categoryBackground = data.result;
          }
        };
      }
    },
    // 删除分类
    removeProduct: function (id) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var res = function (data) {
          if (data) {
            try {
              switch (data.httpCode) {
                case 200 :
                  _this.$message.success({message: '删除成功！'});
                  _this.getInfo();
                  break;
                default :
                  _this.$message.error({message: data.msg});
              }
            } catch (e) {
              console.error("REQUEST ERROR ", e);
            }
          }
        };
        commonScript.doGet('/productInfo/deleteCategoryInfo/' + id, '', res);
      }).catch((err) => {

      });
    },

    // 删除分类结束

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