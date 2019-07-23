new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '首页'
    }],
    loading: true,
    list:[],
    addForm: {
      uploadImgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      imgType: '',
      imgText:'',
      selectImgType:'',
    },
    images:[],
    title:'',
    imgUrl:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
    isBanner:true,
    isNavBanner:false,
    searchProduct:'',
    productLists: [],
    addGoodsList:[],
    userRights:{},
    // 页面分页
    pagecount: 100,
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
    this.getProduct();
    this.getInfo();
  },
  methods: {
    // 获取商品信息
    getProduct:function(){
      var _this = this;
      var name = _this.searchProduct||null;
      var res = function (data) {
        if(data.result){
          if(data.result.list){
            var result = data.result.list;
            _this.total = data.result.total;
            if(result&&result.length>0){
              // 判断是否是正规商品
              var saleProducts = [];
              result.forEach(function (_) {
                if(_.fictitiousType!=2) {
                  saleProducts.push({
                    id: _.id,
                    SPU: _.number,
                    name: _.name,
                    price: (_.price / 100).toFixed(2),
                    img: _.mainPic,
                    shortName: _.shortName
                  })
                }
              });
              _this.productLists = saleProducts;
            }else{
              _this.productLists = []
            }
          }
        }
      };
      commonScript.doGet('/mobileInfo/searchProductPageInfo/'+_this.pagenum + '/'+_this.pagecount+'/'+ name,'',res)

    },

    // 页面初始加载数据
    getInfo: function () {
      var _this = this;
      var res = function(data){
        _this.loading = false;
        if(data.result){
          var result = data.result;
          var dataList = [];
          if(result.length>0){
            result.forEach(function (_) {
              var info = {
                imgList:[],
                product:[]
              };
              // 处理templateName
              var link = (_.linkType).toLowerCase();
              var templateName ="",tag = "";
              switch (link){
                case 'banner':templateName="广告条版块";  tag = false; break;
                case 'shoppromise':templateName="商城保障"; tag = false;  break;
                case 'bannernav':templateName="快捷导航";  tag = false; break;
                case 'scoreactivity':templateName="积分活动";  tag = false; break;
                case 'templateimg':templateName="模块引导图";  tag = true; break;
                case 'listtwo':templateName="两列商品模块"; tag = true;  break;
                case 'listthree':templateName="三列商品模块"; tag = true;  break;
                case 'score':templateName="积分专区"; tag = true; break;
                case 'baokuan':templateName="爆款专区"; tag = true; break;
                case 'titleimg':templateName="标题图片"; tag = true; break;
              }

              if(_.linkType=='listTwo'||_.linkType=='listThree'||_.linkType=='baokuan'||_.linkType=='score'){
                // 处理商品
                if(_.linkContentList && _.linkContentList.length>0){
                  _.linkContentList.forEach(function (item) {
                    info.product.push({
                      id:item.linkId,
                      name:item.productName,
                      price:(item.productPrice/100).toFixed(2),
                      img:item.productPicture,
                      shortName:item.shortName
                    })
                  })
                }

              }else{
                // 处理模块图片列表
                if(_.linkContentList && _.linkContentList.length>0){
                  _.linkContentList.forEach(function (item) {
                    info.imgList.push({
                        index:item.sorting,
                        clickType:item.type,
                        imgUrl: item.image,
                        imgLinkUrl: item.linkId,
                        imgText:item.context||null
                    })
                  })
                }
              }

              dataList.push({
                index: _.sorting,
                listActive: false,  //当前活动模板
                isEnable: _.status,  //是否启用
                isMoveUp:tag,
                isMoveDown:tag,
                groupId: _.linkType,
                templateName: templateName,
                title: _.title,
                showImg: _.image,
                info: info
              })
              
            })
          }
          // console.log(dataList,'从后端获取数据')
          _this.list = dataList;
        }

      };
      commonScript.doGet('/mobileInfo/queryMobileFrongtPageAllGroupAndDetailInfo','',res)
    },
    // 选中当前模板
    checkedTemplate:function(index){
      var _this = this;
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          if(index===i){
            _.listActive = true;
          }else{
            _.listActive = false;
          }
        });
      }
    },
    // 上移
    moveUp:function (item) {
      var _this = this;
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          if(_.index==item.index){
            _this.list.splice(i,1); //先删除
            _this.list.splice(i-1,0,item); //后添加
          }
        });
      }
    },
    // 下移
    moveDown:function (item) {
      var _this = this;
      var index = '';
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          if(_.index==item.index){
            _this.list.splice(i,1); //先删除
            index = i;
          }
        });
        _this.list.splice(index+1,0,item); //后添加
      }
      // console.log(_this.list,'removeDown')
    },
    // 删除
    removeTemplate:function (item) {
      var _this = this;
      _this.$confirm('你确定要删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(_this.list&&_this.list.length>0){
          _this.list.forEach(function (_,i) {
            if(_.index==item.index){
              _this.list.splice(i,1);
            }
          });
        }
        _this.$message.success({ message: '删除成功！' })

      }).catch((err) => {
      });

    },
    // 插入模板
    insertSlideBanner:function(groupId,name){
      var _this = this;
      var isAdd = true;
      var curindex = null;
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          if((_.groupId=='banner'&&groupId=='banner')||(_.groupId=='shopPromise'&&groupId=='shopPromise')||(_.groupId=='bannerNav'&&groupId=='bannerNav')){
          // if(_.groupId=='banner'&&groupId=='banner'){
            _this.$message.error({ message: '此版块只能添加一个！' });
            isAdd = false;
          }
          if(_.listActive){
            curindex = i;
          }
        });
      }
      if(isAdd){
        var templateNums = [];
        var templateIndex = [];
        var differenceIndex = 0;
        if(groupId!=='banner'){
          for(var i=1;i<1000;i++){
            templateNums.push(i)
          }
          if(_this.list&&_this.list.length>0){
            _this.list.forEach(function (_,i) {
              templateIndex.push(_.index);
            })
          }
          differenceIndex = _.difference(templateNums, templateIndex);
          differenceIndex = Math.min.apply(null, differenceIndex);
        }
        // 处理插入模块
        if(groupId == "banner"||groupId =="shopPromise"||groupId =="bannerNav"||groupId =="scoreActivity"){
          var tag = false
        }else {
          var tag = true
        }
        var data = {
          // 轮播图
          index:differenceIndex,
          listActive:false,  //当前活动模板
          isEnable:true,  //是否启用
          isMoveUp:tag,
          isMoveDown:tag,
          groupId: groupId,
          templateName:name,
          title:'',
          showImg:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
          info:{
            imgList:[],
            product:[],
          },
        };
        if(curindex!==null && groupId!=='banner'){
          // 从当前模板插入
          _this.list.splice(curindex+1,0,data); //后添加
        }else if(groupId==='banner'){
          _this.list.unshift(data);
        } else{
          // 从尾部插入
          _this.list.push(data);
        }
      }

    },
    // 编辑 模板
    editTemplate:function (item,index) {
      var _this = this;
      _this.title = item.title;
      var product = item.info.product;
      _this.addGoodsList = commonScript.deepCopy(product);
      if(item.groupId =='banner' || item.groupId =='bannerNav' ||item.groupId =='shopPromise'||item.groupId =='scoreActivity'){
        _this.isBanner = true;
        if(item.groupId =='bannerNav'||item.groupId =='shopPromise'||item.groupId =='scoreActivity'){
          _this.isNavBanner = true;
        }else {
          _this.isNavBanner = false;
        }
      }else {
        _this.isBanner = false;
        _this.isNavBanner = false;
      }

      // 判断图片列表是否有数据
      if(item.info.imgList.length>0){
        var img = item.info.imgList;
        _this.images = commonScript.deepCopy(img);
      }else{
        _this.images = [{
            index:0,
            clickType:'',
            imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
            imgLinkUrl: '',
            imgText: '',
        }]
      }
      // 判断是否是商品模块弹框
      if(item.groupId == 'listThree'||item.groupId == 'listTwo'||item.groupId == 'baokuan'||item.groupId == 'score'){
        var idName = '#editProductList';
      }else {
        var idName = '#editBanner';
      }
      // 弹框
      var layer = layui.layer;
      layer.open({
        title: item.templateName
        , content: layui.jquery(idName)
        , btn: ['确定', '取消']
        , area: ['800px', '525px']
        , type: 1
        ,zIndex:100
        ,scrollbar: false
        , yes: function () {

          // 处理商品
          var length = _this.addGoodsList.length;
          var bannerNum = _this.images.length;

          if(item.groupId == 'listTwo'){
            if(length%2==0){
              _this.savaTemplateContent(index);
            }else{
              _this.$message.error({ message: '此模块添加商品的数量为2的倍数！' });
            }
          }else if(item.groupId == 'listThree'){
            if(length%3==0){
              _this.savaTemplateContent(index);
            }else{
              _this.$message.error({ message: '此模块添加商品的数量为3的倍数！' });
            }
          }else if(item.groupId == 'banner'){
            // 处理banner
            if(bannerNum<8){
              _this.savaTemplateContent(index);
            }else{
              _this.$message.error({ message: '此模块最多添加7张轮播图！' });
            }
          }else{
            _this.savaTemplateContent(index);
          }
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          // _this.$refs.addForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          // _this.$refs.addForm.resetFields();
        }
      });
    },

    // 保存模板编辑内容
    savaTemplateContent:function(index){
      var _this = this;
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          if(index===i){
            _.title=_this.title;
            if(_this.addGoodsList.length>0){
              _.info.product = _this.addGoodsList;
            }else {
              _.info.product = [];
              _.info.imgList = _this.images;
              if(_this.images&&_this.images.length>0){
                _.showImg = _this.images[0].imgUrl;
              }else{
                _.showImg = ''
              }

            }
          }
        });
      }
      layer.closeAll();
      // console.log(_this.list,88888888)

    },

    // 模板保存结束

    // 编辑 模板弹框 内容
    editContent:function (title,item,index) {
      var _this = this;
      if(item){
        _this.addForm.uploadImgUrl = item.imgUrl;
        _this.addForm.imgText = item.imgText;
        _this.addForm.uploadImgUrl = item.imgUrl;
        _this.addForm.selectImgType = item.clickType;
        _this.addForm.imgType = item.imgLinkUrl;//商品编号或链接
      }

      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#dialog_content")
        , btn: ['确定', '取消']
        , area: ['600px', '450px']
        , type: 1
        // ,scrollbar: false
        ,zIndex:110
        , yes: function () {
          _this.submitBanner(index);
          layer.close(layer.index);
        }
        ,btn2: function(index, layero){
          //按钮【取消】的回调
          _this.$refs.addForm.resetFields();
        }
        ,cancel: function(){
          //右上角关闭回调
          _this.$refs.addForm.resetFields();
        }
      });
    },
    // 点击 添加/编辑 确认保存
    submitBanner:function (index) {
      var _this = this;
      var templateNums = [];
      var templateIndex=[];
      for(var i=0;i<50;i++){
        templateNums.push(i)
      }
      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          templateIndex.push(_.index);
        })
      }
      var differenceIndex = _.difference(templateNums, templateIndex);
      differenceIndex = Math.min.apply(null, differenceIndex);

      var data = {
        index:differenceIndex,
        clickType:_this.addForm.selectImgType,
        imgUrl: _this.addForm.uploadImgUrl,
        imgText:_this.addForm.imgText,
        imgLinkUrl: _this.addForm.imgType,
      };
      if(index!==undefined){
        // 编辑
        data[index] = index;
        if(_this.images&&_this.images.length>0){
          _this.images.forEach(function (_,i) {
            if(index===i){
              _this.images.splice(i,1);  //先删除
              _this.images.splice(i,0,data); //后替换
            }
          });
        }
      }else{
        // 添加
        data[index] = differenceIndex;
        _this.images.push(data);
      }
      _this.$refs.addForm.resetFields(); //最后确认时   清空内容

    },
    // 添加新的广告条
    addNewBanner:function(){
      var _this = this;
      _this.editContent('添加')

    },
    // 上移 banner
    moveUpBanner:function (item) {
      var _this = this;
      if(_this.images&&_this.images.length>0){
        _this.images.forEach(function (_,i) {
          if(_.index==item.index){
            _this.images.splice(i,1); //先删除
            _this.images.splice(i-1,0,item); //后添加
          }
        });
      }
    },
    // 下移 banner
    moveDownBanner:function (item) {
      var _this = this;
      var index = '';
      if(_this.images&&_this.images.length>0){
        _this.images.forEach(function (_,i) {
          if(_.index==item.index){
            _this.images.splice(i,1); //先删除
            index = i;
          }
        });
        _this.images.splice(index+1,0,item); //后添加
      }
    },
    // 删除广告条
    removeContent:function(item){
      var _this = this;
        if(_this.images&&_this.images.length>0){
          _this.images.forEach(function (_,i) {
            if(_.imgUrl==item.imgUrl){
              _this.images.splice(i,1);
            }
          });
        }
        // console.log(_this.images,11111111111)
      // console.log(_this.list)
        // _this.$message.success({ message: '删除成功！' })

    },
    // 上传图片
    selectFile:function (e) {
      var _this = this;
      var file = e.target.files[0];
      if(file!==undefined){
        var formData = new FormData();
        var oXHRHeadrs = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        formData.append('file', file);
        formData.append('sellerId', 'admin');
        formData.append('picGroupId', '2222');
        var ajax = new XMLHttpRequest();
        ajax.open("post","/settingsInfo/uploadPicture",true);
        ajax.send( formData );
        ajax.onload = function () {
          var data = this.responseText;
          if(data){
            data = JSON.parse(data);
            _this.addForm.uploadImgUrl = data.result;
          }
        };

      }

      
    },
    // 搜索商品
    searchGoods:function () {
      var _this = this;
      _this.pagenum = 1;
      _this.pagecount = 100;
      _this.getProduct();
    },
    // 添加商品
    addGoods:function (item) {
      var _this = this;
      var tag = true;
      if(_this.addGoodsList && _this.addGoodsList.length>0){
        _this.addGoodsList.forEach(function (_,i) {
          if(_.id==item.id){
            tag = false;
          }
          _.shortName = item.shortName;
        })
      }
      if(tag){
        _this.addGoodsList.push(item);
      }else{
        _this.$message.error({ message: '已添加过此商品！' })
      }
      // console.log(_this.list,'test');
    },

    // 保存整个首页
    saveTemplate:function(){
      var _this = this;
      console.log(_this.list,'最后要提交数据');

      // 对数据进行处理
      var contentList = [];
      var contentListArry=[]
      // var content ={
      //   "title": "",
      //   "context": "",
      //   "shape": "",
      //   "sorting": "",
      //   "position": "",
      //   "sellerId": "",
      //   "linkType": "",
      //   "linkId": "",
      //   "status": "",
      //   "image": "",
      //   "linkContentList": "",
      //   "linkContent": []
      // };

      if(_this.list&&_this.list.length>0){
        _this.list.forEach(function (_,i) {
          // 处理图片列表
          if(_.info&&_.info.imgList&&_.info.imgList.length>0){
            // _.linkContent = _.info.imgList
            var imgList = _.info.imgList;
            var linkContent = [];
              imgList.forEach(function (img,j) {
              linkContent.push({
                "title": null,
                "context": img.imgText,
                "image": img.imgUrl,
                "type": img.clickType,
                "linkId": img.imgLinkUrl,
                "sorting":j,
                "shortName": null,
                "sellerId": "admin",
                "productPageDto": null,
                "productPicture": null,
                "productName": null,
                "productPrice": null
              })
            })
          }else if(_.info&&_.info.product&&_.info.product.length>0){
            // 处理商品列表
            // _.linkContent = _.info.product
            var product = _.info.product;
            console.log(product,'product')
            var linkContent = [];
            product.forEach(function (p,k) {
              linkContent.push({
                "title": null,
                "context": null,
                "image": null,
                "type": "goods",
                "linkId": p.id,
                "sorting":k,
                "shortName": p.shortName,
                "sellerId": "admin",
                "productPageDto": null,
                "productPicture": p.img,
                "productName": p.name,
                "productPrice":p.price*100
              })
              
            })
          }else {
            var linkContent = [];
          }
          // 最后整合数据
          contentList.push({
            "title": _.title,
            "context": null,
            "shape": null,
            "sorting": i,
            "position": null,
            "sellerId":"admin",
            "linkType": _.groupId,
            "linkId": null,
            "status": _.isEnable?1:0,
            "image":_.showImg,
            "linkContentList": null,
            "linkContent": linkContent
          })

        })
      }
      // contentListArry.push(contentList);
       console.log(contentList,222222)
      // 数据处理结束
      var res = function (data) {
        _this.getInfo();
        _this.$message.success({ message: "保存成功！" })

      };
      commonScript.doPost('/mobileInfo/saveMobileFrongtPageAllGroupAndDetailInfo',contentList,res)

    },

    // 删除商品
    removeGoods:function(item){
      var _this = this;
      if(_this.addGoodsList && _this.addGoodsList.length>0){
        _this.addGoodsList.forEach(function (_,i) {
          if(_.id==item.id){
            _this.addGoodsList.splice(i,1);
          }
        })
      }

    },
    // 单条数据选中
    selectOrder: function (item, index) {
      var _this = this;
      _this.selected(_this.productLists, item, index);
    },
    // common
    selected: function (lists, item, index) {
      var _this = this;
      if (lists && lists.length > 0) {
        lists.forEach(function (_, i) {
          if (index == i) {
            _this.$set(item, 'active', true);
          } else {
            _.active = false
          }
        }, );
      }
    },
    // 分页器
    //每页显示多少条
    handleSizeChange: function (val) {
      var _this = this;
      _this.searchProduct = "";
      _this.pagecount = val;
      _this.getProduct();
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      var _this = this;
      _this.searchProduct = "";
      _this.pagenum = val;
      _this.getProduct();
    }
    // 编辑结束

  },



});