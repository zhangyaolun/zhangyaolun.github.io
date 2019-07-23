new Vue({
  el: '#app',
  data: {
    current: 0,
    productNav: [{
      index: 0,
      title: '品牌特惠专区'
    }],
    loading: true,
    list: [
      {
        // 轮播图
        index: 0,
        listActive: false,  //当前活动模板
        isEnable: true,  //是否启用
        groupId: 'banner',
        templateName: '广告条',
        title: '',
        // showImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        showImg: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180518/1526601826480037.jpg',
        info: {
          imgList: [
            {
              index:0,
              clickType:'',
              imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180518/1526601826480037.jpg',
              imgLinkUrl: '',
            },
            {
              index:1,
              clickType:'',
              imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180503/1525324172325376.jpg',
              imgLinkUrl: '',
            },
            {
              index:2,
              clickType:'',
              imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180417/1523949161461242.jpg',
              imgLinkUrl: '',
            }],
          product: [],
        },
      },
      {
        // 轮播图
        index: 2,
        listActive: false,  //当前活动模板
        isEnable: true,  //是否启用
        groupId: 'shopPromise',
        templateName: '商城保障',
        title: '',
        // showImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        showImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        info: {
          imgList: [
            {
              index:0,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/zheng.png',
              imgLinkUrl: '',
              imgText:'正品保障',
            },
            {
              index:1,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/lian.png',
              imgLinkUrl: '',
              imgText:'全国联保',
            },
            {
              index:2,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/you.png',
              imgLinkUrl: '',
              imgText:'全场包邮',
            },
            {
              index:3,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/fenqi.png',
              imgLinkUrl: '',
              imgText:'0费息分期',
            }],
          product: [],
        },
      },
      {
        // 轮播图
        index: 3,
        listActive: false,  //当前活动模板
        isEnable: true,  //是否启用
        groupId: 'bannerNav',
        templateName: '快捷导航',
        title: '',
        // showImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        showImg: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        info: {
          imgList: [
            {
              index:0,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/daohang01.png',
              imgLinkUrl: '',
              imgText:'品牌专区'
            },
            {
              index:1,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/daohang02.png',
              imgLinkUrl: '',
              imgText:'秒杀风暴'
            },{
              index:2,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/daohang03.png',
              imgLinkUrl: '',
              imgText:'伙拼成团'
            },{
              index:3,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/daohang04.png',
              imgLinkUrl: '',
              imgText:'分享有礼'
            },{
              index:4,
              clickType:'',
              imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/daohang05.png',
              imgLinkUrl: '',
              imgText:'在线办卡'
            }],
          product: [],
        },
      },
      {
        // 轮播图
        index: 1,
        listActive: false,  //当前活动模板
        isEnable: true,  //是否启用
        groupId: 'listTwo',
        templateName: '商品2列表',
        title: '',
        showImg: '',
        info: {
          imgList: [],
          product: [
            {
              id:'1',
              SPU: 12,
              name: '美的Midea 高端智能23L微波炉 M',
              price: '348.00',
              img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510914845820103.jpg'
            }
          ],
        },
      },

    ],
    addForm: {
      uploadImgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
      imgType: '',
      imgText:'',
      selectImgType:'',
    },
    images: [
      {
        index:0,
        clickType:'',
        imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180518/1526601826480037.jpg',
        imgLinkUrl: '',
        imgText:'七天无理由',
      },
      {
        index:1,
        clickType:'',
        imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180503/1525324172325376.jpg',
        imgLinkUrl: '',
        imgText:'全场包邮',
      },
      {
        index:2,
        clickType:'',
        imgUrl: 'http://img.g-town.com.cn/shop/data/upload/media/plantform/00020e8a6780294db329d41fd9770968/image/20180417/1523949161461242.jpg',
        imgLinkUrl: '',
        imgText:'正品保障',
      }],
    title:'',
    imgUrl:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
    isBanner:true,
    isNavBanner:false,
    productLists: [
      {
      id:'1',
      SPU: 12,
      name: '美的Midea 高端智能23L微波炉 M',
      price: '348.00',
      img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510914845820103.jpg'
    },{
      id:'2',
      SPU: 1222,
      name: '美的Midea 智能4L电饭煲 FS4027 金色',
      price: '100.00',
      img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510913688963758.jpg'
    },{
      id:'3',
      SPU: 12,
      name: '美的Midea 高端智能23L微波炉 M',
      price: '348.00',
      img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510914845820103.jpg'
    },{
      id:'4',
      SPU: 1222,
      name: '美的Midea 智能4L电饭煲 FS4027 金色',
      price: '100.00',
      img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510913688963758.jpg'
    }
    ],
    addGoodsList:[],
    // 页面分页
    pagecount: 100,
    pagenum: 1,
    total: 0,

  },
  mounted: function () {
    commonScript.appShowhide('app');
    this.getInfo();
  },
  methods: {
    // 页面初始加载数据
    getInfo: function () {
      var _this = this;
      _this.loading = false;
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
          if(_.groupId=='banner'&&groupId=='banner'){
            _this.$message.error({ message: '广告条版块只能添加一个！' });
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

        var data = {
          // 轮播图
          index:differenceIndex,
          listActive:false,  //当前活动模板
          isEnable:true,  //是否启用
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
      if(item.groupId =='banner' || item.groupId =='bannerNav' ||item.groupId =='shopPromise'){
        _this.isBanner = true;
        if(item.groupId =='bannerNav'||item.groupId =='shopPromise'){
          _this.isNavBanner = true;
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
      if(item.groupId == 'listThree'||item.groupId == 'listTwo'){
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
          var length = _this.addGoodsList.length;
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
              _.info.imgList = _this.images;
              _.showImg = _this.images[0].imgUrl;
            }
          }
        });
      }
      layer.closeAll();
      console.log(_this.list,88888888)

    },

    // 模板保存结束

    // 编辑 模板弹框 内容
    editContent:function (title,item,index) {
      var _this = this;
      _this.addForm.uploadImgUrl = item.imgUrl;
      _this.addForm.imgText = item.imgText;
      _this.addForm.uploadImgUrl = item.imgUrl;
      _this.addForm.selectImgType = item.clickType;
      _this.addForm.imgType = item.imgLinkUrl;//商品编号或链接
      var layer = layui.layer;
      layer.open({
        title: title
        , content: layui.jquery("#dialog_content")
        , btn: ['确定', '取消']
        , area: ['600px', '480px']
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
        console.log(_this.images,11111111111)
      console.log(_this.list)
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
        formData.append('sellerId', '1111');
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


    },
    // 预览
    preView:function(){

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
      this.pagecount = val;
      this.searchGoods();
    },
    //当前页及跳转到第几页
    handleCurrentChange: function (val) {
      this.pagenum = val;
      this.searchGoods();
    }
    // 编辑结束

  },



});