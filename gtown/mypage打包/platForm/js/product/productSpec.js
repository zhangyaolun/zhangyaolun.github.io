new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '规格管理'
    }],
    loading: true,
    editTrue:true,
    productLists: [],
    // 分页
    pagecount: 0,
    pagenum: 0,
    total: 0,
    addForm: {
      addNewName: '',
      parentSpec:'',
      userPwd: '',
    },
    userRights:{},
    rules:{
      addNewName: [
        {required: true, type: 'string', message: '请输入规格名称!', trigger: 'blur'}
      ],
      userPwd: [
        {required: true, message: '请输入排序!', trigger: 'blur'},
        { pattern: /^([0-9]|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/, message: '请输入0~255的整数！', trigger: 'blur' },
      ],
    }
  },
  created: function () {
    var _this = this;
    // 获取本地权限
    _this.userRights = getPows();
  },
  mounted: function () {
    // FastClick.attach(document.body);
    commonScript.appShowhide('app');
    this.getInfo(0);
  },
  methods: {
    // 页面初始加载数据
    getInfo: function (index) {
      var _this = this;
      _this.current = index;
      _this.loading = true;
      var res = function (data) {
        _this.loading = false;
        try {
          switch (data.httpCode) {
            case 200 :
              if(data.result){
                var result = data.result;
                if(result&&result.length>0){
                  var specLevel=[];level2=[]
                  result.forEach(function (_) {
                    if(_.parentId==null||_.parentId==='null'||_.parentId===""){
                      specLevel.push(_);
                      _.children=[];
                    }
                  });
                  if(specLevel.length>0){
                    specLevel.forEach(function (level) {
                      result.forEach(function (level2) {
                        if(level2.parentId === level.id){
                          level2['pName']=level.name;
                          level.children.push(level2)
                        }
                      })
                    })
                  }
                  _this.productLists = specLevel;
                  // console.log(_this.productLists )
                }else{
                  _this.productLists = [];
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
      commonScript.getSpec(res);
    },
    // 点击箭头是否显示
    specShow: function (item) {
      var _this = this;
      if (!item.showSpec || item.showSpec === undefined) {
        _this.$set(item, 'showSpec', true);
      } else {
        _this.$set(item, 'showSpec', false);
      }
    },
    // 单条数据选中
    selectOrder: function (item,lists) {
      var _this = this;
      if(item.active===undefined||!item.active){
        _this.$set(item, 'active', true);
      }
      commonScript.selected(item,lists);
    },
    // 新增规格
    addClassify: function (title, pid, pName, id) {
      var _this = this;
      if (pid != undefined || pid != null) {
        _this.addForm.parentSpec = pName;
      }
      // console.log(_this.addForm)
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#add")
        , btn: ['确定', '取消']
        , area: ['757px', '525px']
        , type: 1
        ,scrollbar: false
        , yes: function () {
          _this.addNewCalssigy('addForm', pid,id);
        }
        ,btn2: function(index, layero){
        //按钮【取消】的回调
        _this.$refs.addForm.resetFields();
          _this.editTrue = false

        }
    ,cancel: function(){
        //右上角关闭回调
          _this.editTrue = false
          _this.$refs.addForm.resetFields();
      }
      });
    },
    // 确定 新增 编辑 规格
    addNewCalssigy:function(formName,pid,id){
      var _this = this;
      if (pid == undefined) {
        pid = "";
      }
      var datas = {
        name:_this.addForm.addNewName,
        sorting:_this.addForm.userPwd,
        parentId: pid,
      };
      _this.$refs[formName].validate((valid) => {
        if (valid) {
      if(id != undefined){
        // 编辑
        datas['id'] = id;
        var add = function (data) {
          try {
            switch (data.httpCode) {
              case 200 :
                _this.getInfo(_this.current);
                _this.$message.success({ message: '编辑成功！' })
                _this.$refs.addForm.resetFields(); //点击确认后清空表单
                layer.closeAll();
                _this.editTrue = false
                break;
              default :
                _this.editTrue = true
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            _this.editTrue = true
            console.error("REQUEST ERROR ", e);
          }
        };
        commonScript.doPost('/productInfo/updateSpecificationInfo',datas,add);

      }else{
        // 新增
        var add = function (data) {
          _this.editTrue = false
          try {
            switch (data.httpCode) {
              case 200 :
                _this.getInfo(_this.current);
                _this.$message.success({ message: '新增成功！' })
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
        commonScript.doPost('/productInfo/insertSpecificationInfo',datas,add);
      }

        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    // 编辑规格
    showDetail:function(item){
      var _this = this;
      _this.addForm.addNewName = item.name;
      _this.addForm.userPwd = item.sorting;
      _this.addForm.parentSpec = item.pName;
      _this.addClassify('编辑规格',item.parentId,item.pName,item.id);
    },

    // 新增规格结束
    // 删除规格
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
                _this.getInfo(0);
                break;
              default :
                _this.$message.error({message: data.msg});
            }
          } catch (e) {
            console.error("REQUEST ERROR ", e);
          }
        };
        commonScript.doGet('/productInfo/deleteSpecificationInfo/'+ id, '', res);
      }).catch((err) => {
      });
    },

    // 删除规格结束
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