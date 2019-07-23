var URL = http.urls.shop;
var content = new Vue({
    el : "#content" ,
    data : {
        loading : false ,
        navData : [
            { text : "店铺设置" , linker : "javascript:void(0)" } ,
            { text : "品牌申请" , linker : "./brand.html" } ,
            { text : "店铺信息" , linker : "./info.html" }
        ] ,
        edit : false ,                                                      //切换编辑模块
        isUpdate : false ,                                                  //记录是否编辑入口
        genres : [] ,                                                        //分类数据（vue太坑，不能循环对象）
        parent1 : "" ,                              //下拉框选中
        shopLevel : [] ,                         //店铺等级
        currGroup : {} ,                         //图片空间分组
        params : {
            name : "" ,                           //分类名称
            pid : "" ,                            //父ID
            sorting : "" ,                       //排序
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,            //商家ID
            lev : "" ,                           //品类等级
            status : "1" ,                        //状态
        } ,
        updateParams : {                        //修改参数
            id : "" ,
            name : "" ,
            sorting : "" ,
            status : ""
        } ,
        shopConfigParams : {
            id    :  "",
            shopLogo:"",                        //店铺logo
            shopBanner :"",                     //店铺banner
            domain2name:"",
            qq:"",
            wangwang :"",
            linkmanTel :""
        } ,
        currGroupChecked : [] ,                 //复选框选中的条目
        checkListen : 0 ,                          //是否全选
        checkedAll : false ,
        list1: [
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
                            clickType:'goods',
                            imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/zheng.png',
                            imgLinkUrl: 'www.baidu.com',
                            imgText:'正品保障',
                        },
                        {
                            index:1,
                            clickType:'url',
                            imgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/lian.png',
                            imgLinkUrl: 'wwwwwwww',
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
        images:[],
        images1: [
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
        productNav: [{
            index: 0,
            title: '首页'
        }],
        addForm: {
            uploadImgUrl: 'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
            imgType: '',
            imgText:'',
            selectImgType:'',
        },
        productLists: [
            //   {
            //   id:'1',
            //   SPU: 12,
            //   name: '美的Midea 高端智能23L微波炉 M',
            //   price: '348.00',
            //   img:'http://jiansheyinhang.oss-cn-shanghai.aliyuncs.com/shop/data/upload/media/86eed725c53de6350c89c5b0234cddf0/10011/6/image/20171117/1510914845820103.jpg'
            // }
        ],
        addGoodsList:[],
        current: 0,
        list:[],
        title:'',
        imgUrl:'https://gtmall.oss-cn-beijing.aliyuncs.com/platform/image/imageAA.png',
        isBanner:true,
        isNavBanner:false,
        searchProduct:'',
        pagenum : 1 ,
        pagecount : 10 ,
    } ,
    beforeCreate : function () {

    } ,
    mounted : function () {
        var form = layui.form,
            that = this;
        var upload = layui.upload;
        this.getInfo();
        this.getProduct();

        form.on("radio(status)",function ( data ) {
            if( that.isUpdate ) {
                that.updateParams.status = data.value;
            } else {
                that.params.status = data.value;
            }
        });
        form.on("select(pSelect)",function ( data ) {
            if( that.isUpdate ) {
                that.updateParams.pid = data.value;
            } else {
                that.params.pid = data.value;
            }
        })

        var loadidx1;
        //店铺logo
        upload.render({
            elem: "#upload1" ,
            url : http.urls.uploadFile ,
            auto : true ,
            data : {
                sellerId :JSON.parse(sessionStorage.getItem("userInfo")).sellerId  ,
                picGroupId : that.currGroup.id
            } ,
            before : function () {
                loadidx1 = layer.load(1);
            } ,
            done : function ( res ) {
                layer.close( loadidx1 );
                that.shopConfigParams.shopLogo = res.result;
            } ,
            error : function ( err ) {
                layer.close( loadidx1 );
                layer.msg("上传失败");
            }
        })
        //店铺banner
        upload.render({
            elem: "#upload2" ,
            url : http.urls.uploadFile ,
            auto : true ,
            data : {
                sellerId :JSON.parse(sessionStorage.getItem("userInfo")).sellerId  ,
                picGroupId : that.currGroup.id
            } ,
            before : function () {
                loadidx1 = layer.load(1);
            } ,
            done : function ( res ) {
                layer.close( loadidx1 );
                that.shopConfigParams.shopBanner = res.result;
            } ,
            error : function ( err ) {
                layer.close( loadidx1 );
                layer.msg("上传失败");
            }
        })


        this.queryGener(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
        this.getShopLevel();
    } ,
    methods : {
        //新增条目
        addGenre : function ( val ) {
            var form = layui.form;

            this.edit = true;
            this.isUpdate = false;
            this.currGroupChecked.length = 0;

            var params = this.params;

            for( var item in params ) {
                params[item] = "";
            }
            params.sellerId = JSON.parse( sessionStorage.getItem("userInfo") ).sellerId;
            params.status = "1";
            if( typeof val !== "undefined" ) {              //添加下级 自动填写pid , lev 参数
                params.pid = val.id;
                params.lev = val.lev;
            } else {                                          //添加新类目
                params.pid = 0;
                params.lev = 0;
            }
            this.addOpts();
        } ,
        //编辑页
        toEdit : function ( val , bol  ) {
            var $ = layui.jquery,
                form = layui.form;

            this.edit = true;
            this.isUpdate = true;
            this.currGroupChecked.length = 0;

            var params = this.updateParams;

            params.id = val.id;
            params.name = val.name;
            params.status = val.status;
            params.sorting = val.sorting;
            this.addOpts( val );
        } ,
        addOpts : function ( val ) {
            var $ = layui.jquery,
                form = layui.form;

            $(".pSelect").html("");
            if( typeof val !== "undefined" ) {
                $(".status" + val.status).attr("checked", true ).siblings().removeAttr("checked");

                var html = "<option></option>";

                for( var i = 0, len = this.genres.length; i < len; i ++ ) {
                    if( val.pid == 0 ) {
                        if( this.genres[i].id == val.id ) {
                            continue;
                        } else {
                            html += "<option value=\""+ this.genres[i].id +"\">"+ this.genres[i].name +"</option>";
                        }
                    } else {
                        if( this.genres[i].id == val.pid ) {
                            html += "<option value=\""+ this.genres[i].id +"\" selected>"+ this.genres[i].name +"</option>";
                        } else {
                            html += "<option value=\""+ this.genres[i].id +"\">"+ this.genres[i].name +"</option>";
                        }
                    }
                }
            } else {
                var html = "<option></option>";
                for( var i = 0, len = this.genres.length; i < len; i ++ ) {
                    html += "<option value=\""+ this.genres[i].id +"\">"+ this.genres[i].name +"</option>";
                }
            }

            $(".pSelect").html( html );

            var t = setTimeout(function () {
                form.render();
                clearTimeout( t );
            })
        } ,
        editBack : function () {
            this.params.pid = "";
            this.isUpdate = false;
            this.edit = false;

            var $ = layui.jquery,input = $("input[type=checkbox]");
            input.each(function ( index , elem ) {
                elem.checked = false;
            })


        } ,
        //查询条目
        queryGener : function ( id ) {
            var layer = layui.layer,
                that = this ,
                obj = new Object();

            this.loading = true;
            this.genres.length = 0;
            http.Get( URL.genreQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( data.result );
                            if( result instanceof Array && result.length ) {
                                result.forEach(function (item,index) {
                                    if( item.pid == 0 ) {
                                        if( !item.checked ) {
                                            item.checked = false;
                                            item.checkNum = 0;
                                        }
                                        obj[item.lev] = item;
                                        obj[item.lev]["child"] = [];
                                    }
                                })
                                result.forEach(function (item,index) {
                                    for( var attr in obj ) {
                                        if( item.pid == obj[attr].id ) {
                                            if( !item.checked ) {
                                                item.checked = false;
                                            }
                                            obj[attr]["child"].push( item );
                                        }
                                    }
                                })
                                for( var item in obj ) {
                                    that.genres.push( obj[item] );
                                }
                                that.parent1 = that.genres[0].id;
                            } else {
                                that.genres = [];
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "REQUEST ERROR " , e );
                }
                that.loading = false;
            })
        } ,
        //删除条目
        delGenre : function ( ids  , bol ) {
            var layer = layui.layer,
                that = this;


            layer.confirm("确认删除吗?",{ icon : 3 , title : "提示" },function ( index ) {
                http.Get( URL.genreDel , ids , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.close( index );
                                that.queryGener( JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    }
                });
            })
        } ,
        //列表底部删除按钮
        globalDel : function () {
            var $ = layui.jquery;
            // if( this.checkedAll ) {
            //     this.delGenre("[]");
            // } else {
                var ipts = $(".genresBody").find("input[type=checkbox]");
                var arr = [];

                ipts.each(function ( idx , val ) {
                    if( val.checked ) {
                        arr.push( val.value );
                    }
                })
                this.delGenre( arr );
           // }
        } ,
        //新增条目
        submit : function () {
            var layer = layui.layer,
                that = this;

            //如果是编辑入口调用更新接口否则新增接口
            if( this.isUpdate ) {
                this.loading = true;
                http.Post( URL.genreUpdate , this.updateParams ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.edit = false;
                                that.isUpdate = false;
                                that.queryGener(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    }

                    that.loading = false;
                })
            } else {
                if( this.params.name == "" ) {
                    layer.msg("请输入分类名称");
                    return;
                }
                if( this.params.sorting == "" ) {
                    layer.msg("请输入分类排序");
                    return;
                }
                this.loading = true;
                http.Post( URL.genreAdd , this.params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.edit = false;
                                that.isUpdate = false;
                                that.queryGener(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    }

                    that.loading = false;
                })
            }
        } ,
        //获取店铺等级
        getShopLevel : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;

            http.Get( http.urls.shopLevel ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.shopLevel = result;
                            that.getShopInfo( JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId );

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询店铺信息
        getShopInfo : function ( id ) {
            var layer = layui.layer,
                that = this;
            var form = layui.form;

            http.Get( http.urls.getShopInfo , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.shopLevel.forEach(function ( item ,index ) {
                                if( item.id == result.shopLevelId ) {
                                    result.shopLevelName = item.name;
                                }
                            })
                            that.shopConfigParams = result;

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch (e) {
                    console.error('ERROR : ' , e );
                }
            })
        } ,
        //组选中
        getGroup : function ( type , parent , idx , item  ) {
            var $ = layui.jquery;
            var child = parent.child;
            var that = this;

            if( type == 1 ) {

                child.forEach(function ( v , k ) {
                    v.checked = parent.checked;
                })
                this.checkListen = parent.checked ? this.checkListen + 1 : this.checkListen - 1;
                parent.checkNum = parent.checked ? child.length : 0;

            }
            if( type == 2 ) {
                parent.checkNum = item.checked ? parent.checkNum + 1 : parent.checkNum - 1;

                if( parent.checkNum == child.length ) {
                    parent.checked = true;
                    this.checkListen += 1
                } else {
                    parent.checked = false;
                    this.checkListen -= 1
                }
            }

            if( this.checkListen == this.genres.length ) {
                this.checkedAll = true;
            } else {
                this.checkedAll = false;
            }
        } ,
        //全选
        checkAll : function ( evt ) {
            var ck = this.checkedAll;

            for( var i = 0; i < this.genres.length; i ++ ) {
                this.genres[i].checked = ck;
                this.genres[i].checkNum = ck ? this.genres[i].child.length : 0;
                for( var j = 0; j < this.genres[i].child.length; j ++ ) {
                    this.genres[i].child[j].checked = ck;
                }
            }
            this.checkListen = ck ? this.genres.length : 0;
        } ,
        //查询图片空间分组
        queryGroup : function ( id ) {
            var that = this,
                element = layui.element;

            http.Get( URL.picGroupQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                result.forEach(function ( item ,index ) {
                                    if( item.picGroupName == "未分组" ) {
                                        that.currGroup = item;
                                    } else {

                                    }
                                })
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR: " , e);
                }

            })
        } ,
        configShop : function () {
            var layer = layui.layer,
                that = this;

            //var params = this.shopConfigParams;
            var params = {
                id : JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId ,
                shopLogo : this.shopConfigParams.shopLogo ,
                shopBanner : this.shopConfigParams.shopBanner ,
                domain2name : this.shopConfigParams.domain2name ,
                qq : this.shopConfigParams.qq ,
                wangwang : this.shopConfigParams.wangwang ,
                linkmanTel : this.shopConfigParams.linkmanTel
            };

            var loadidx = layer.load();
            http.Post( URL.shopConfig ,params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            layer.msg("更新成功");
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
                layer.close( loadidx );
            })
        } ,
        // 添加新的广告条
        addNewBanner:function(){
            var _this = this;
            _this.editContent('添加')

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
                formData.append('sellerId', JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                formData.append('picGroupId', '2222');
                var ajax = new XMLHttpRequest();
                ajax.open("post", http.urls.goods.picUpload ,true );
                ajax.send( formData );
                ajax.onload = function () {
                    var data = this.responseText;
                    if(data){
                        data = JSON.parse(data);
                        _this.addForm.uploadImgUrl = data.result.picAddress;
                    }
                };

            }
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
                , area: ['800px', '450px']
                , type: 1
                ,zIndex:100
                ,scrollbar: false
                , yes: function () {
                    var length = _this.addGoodsList.length;

                    if(item.groupId == 'listTwo'){
                        if(length%2==0){
                            _this.savaTemplateContent(index);
                        }else{
                            layer.msg( '此模块添加商品的数量为2的倍数！' );
                        }
                    }else if(item.groupId == 'listThree'){
                        if(length%3==0){
                            _this.savaTemplateContent(index);
                        }else{
                            layer.msg('此模块添加商品的数量为3的倍数！' );
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
                            var templateName = _.linkType=='banner'?'广告条模块':_.linkType=='shopPromise'?'商城保障模块':_.linkType=='bannerNav'?'快捷导航模块':_.linkType=='templateImg'?'模块引导图':_.linkType=='listTwo'?'两列商品模块':_.linkType=='listThree'?'三列商品模块':'优惠券模块';
                            if(_.linkType=='listTwo'||_.linkType=='listThree'){
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
                                groupId: _.linkType,
                                templateName: templateName,
                                title: _.title,
                                showImg: _.image,
                                info: info
                            })

                        })
                    }
                    console.log(dataList,'从后端获取数据')
                    _this.list = dataList;

                }

            };
            commonScript.doGet( URL.homeConfig + "/" + JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , '',res)
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
                    var linkContent = [];
                    if(_.info&&_.info.imgList&&_.info.imgList.length>0){
                        // _.linkContent = _.info.imgList
                        var imgList = _.info.imgList;

                        imgList.forEach(function (img,j) {
                            linkContent.push({
                                "title": null,
                                "context": img.imgText,
                                "image": img.imgUrl,
                                "type": img.clickType,
                                "linkId": img.imgLinkUrl,
                                "sorting":j,
                                "shortName": null,
                                "sellerId": JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
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
                        product.forEach(function (p,k) {
                            linkContent.push({
                                "title": null,
                                "context": null,
                                "image": null,
                                "type": "goods",
                                "linkId": p.id,
                                "sorting":k,
                                "shortName": p.shortName,
                                "sellerId": JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                                "productPageDto": null,
                                "productPicture": p.img,
                                "productName": p.name,
                                "productPrice":p.price*100
                            })

                        })
                    }else {
                        //var linkContent = [];
                    }
                    // 最后整合数据
                    contentList.push({
                        "title": _.title,
                        "context": null,
                        "shape": null,
                        "sorting": i,
                        "position": null,
                        "sellerId":JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
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
                if(data.result){
                    // _this.getInfo();
                }

            };
            commonScript.doPost('/userSeller/saveMobileShopAllGroupAndDetailInfo',contentList,res)

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
        // 获取商品信息
        getProduct:function(){
            var _this = this;
            //var name = _this.searchProduct||null;
            var params = {
                like : {
                    name: _this.searchProduct ? "%" + _this.searchProduct + "%" : null
                } ,
                equalFields : {
                    approvalType : 1 ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                }
            };

            var res = function (data) {
                if(data.result){
                    if(data.result.list){
                        var result = data.result.list;
                        _this.total = data.result.total;
                        if(result.length>0){
                            var saleProducts = [];
                            result.forEach(function (_) {
                                saleProducts.push({
                                    id:_.id,
                                    SPU: _.skuDto.skuCombinationDescription,
                                    name:_.name,
                                    price: (_.price/100).toFixed(2),
                                    img:_.mainPic,
                                    shortName:_.shortName
                                })
                            });
                            _this.productLists = saleProducts;
                        }
                    }
                }
            };
            http.Get( http.urls.promotion.selectBySku , _this.pagenum , _this.pagecount , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done( res );
            //commonScript.doGet( http.urls.goods.queryProduct + '/'+_this.pagenum + '/'+_this.pagecount+'/'+ name,'',res)

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
        } ,
        // 搜索商品
        searchGoods:function () {
            this.getProduct();
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

    } ,



})