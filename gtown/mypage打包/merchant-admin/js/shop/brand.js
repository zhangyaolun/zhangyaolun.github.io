var URL = http.urls.shop;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "店铺设置" , linker : "./index.html" } ,
            { text : "品牌申请" , linker : "javascript:void(0)" } ,
            { text : "店铺信息" , linker : "./info.html" }
        ] ,
        params : {
            name : "" ,
            categoryId : "" ,
            shopId : "" ,
            pictureIdentification : "" ,
            categoryLev : ""
        } ,
        currData : {} ,
        currGroup : {} ,
        treeData : [] ,
        loading : false ,
        currPage : 1 ,
        limit : 10 ,
        list : [] ,
        add : false ,
        edit : false
    } ,
    mounted : function() {
        var form = layui.form;
        var that = this;
        
        form.on("submit(add)",function ( data ) {
            that.createBrand();
            return false;
        })

        this.queryClass();
    } ,
    methods : {
        //查询品牌申请
        getBrands : function () {
            var that = this,
                layer = layui.layer;
            var laypage = layui.laypage;

            that.loading = true;
            var params = {
                shopId : JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId
            }
            http.Post( URL.brandQuery  , params , that.currPage , that.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.hasOwnProperty("list") && result.list.length > 0 ) {
                                result.list.forEach(function (item,index) {
                                    that.treeData.forEach(function ( v , k ) {
                                        if( item.categoryId == v.id ) {
                                            item.categoryName = v.name;
                                        }
                                    })
                                })
                                that.list = result.list;

                                laypage.render({
                                    elem : "paging" ,
                                    count : Math.max( 1, result.total ),
                                    limit : that.limit ,
                                    curr : result.pageNum ,
                                    jump : function ( obj , first ) {
                                        if( !first ) {
                                            if( obj.curr != that.currPage ) {
                                                that.currPage = obj.curr;
                                                that.getBrands( that.currPage );
                                            }
                                        }
                                    }
                                })
                            } else {
                                that.list = [];
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
                that.loading = false;
            })
        } ,
        //新建申请
        createBrand : function () {
            var that = this,
                layer = layui.layer;

            that.loading = true;
            that.params.categoryId = that.currData.id;
            that.params.categoryLev = that.currData.lev;
            that.params.shopId = JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId;

            var url;
            if( this.edit ) {
                url = URL.updateBrand;
            } else {
                url = URL.addBrand;
            }
            //console.log( that.params , that.currData )
            http.Post( url , that.params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.add = false;
                            layer.closeAll();
                            that.getBrands();
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
                that.loading = false;
            })
        } ,
        addBrand : function ( item ) {
            var layer = layui.layer,
                that = this;
            var upload = layui.upload;
            var params = this.params;

            this.add = true;


            var t = setTimeout(function () {
                var setting = {
                    view: {
                        dblClickExpand: false,
                        showLine: true,
                        selectedMulti: false
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pid",
                            rootPId: ""
                        } ,
                        key : {
                            name : "name"
                        }
                    } ,
                    callback : {
                        onClick : function ( evt, obj , data ) {
                            evt.stopPropagation ? evt.stopPropagation() : event.cancelable = true;
                            if( !data.hasOwnProperty("children") ) {
                                $("#zTree").hide();
                                that.currData = data;
                                //that.querySpec( data.id );
                            }
                        }
                    }
                };
                var t = $.fn.zTree.init($("#zTree"), setting, that.treeData );
                if( Boolean( item ) ) {
                    that.edit = true;

                    var treeObj = $.fn.zTree.getZTreeObj("zTree");
                    params.name = item.name;
                    params.pictureIdentification = item.pictureIdentification;
                    params.id = item.id;

                    that.currData = t.getNodesByParam( "id" , item.categoryId , null )[0];
                } else {
                    that.edit = false;
                    if( params.hasOwnProperty("id") ) {
                        delete params.id;
                    }
                    params.name = "";
                    params.pictureIdentification = "";
                    that.currData = {};
                }

                layer.open({
                    type : 1 ,
                    title : "添加品牌" ,
                    content : $(".addbrand") ,
                    area : ["40%"] ,
                    cancel : function () {
                        that.add = false;
                    } ,
                    success : function (layero, index) {

                    }
                });


                var loadidx = 0;
                upload.render({
                    elem : "#upload" ,
                    url:  http.urls.goods.picUpload , //上传接口 ,
                    auto : true ,
                    data : {
                        sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId  ,
                        picGroupId : that.currGroup.id
                    } ,
                    before : function () {
                        loadidx = layer.load(1);
                    } ,
                    done : function ( res ) {
                        var result = JSON.parse( JSON.stringify( res.result ) );
                        that.params.pictureIdentification = result.picAddress;
                        layer.close( loadidx );
                    } ,
                    error : function ( err ) {
                        layer.msg("上传失败");
                        layer.close( loadidx );
                    }
                });
                clearTimeout( t );
            })

        } ,
        //查询图片空间分组
        queryGroup : function ( id ) {
            var that = this,
                element = layui.element;

            http.Get( http.urls.goods.picGroupQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.groupList = result;
                                result.forEach(function ( item ,index ) {
                                    if( item.picGroupName == "未分组" ) {
                                        that.currGroup = item;
                                    } else {

                                    }
                                })
                            } else {
                                that.groupList = [];
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
        //获取商品类目
        queryClass : function () {
            var that = this,
                layer = layui.layer;

            http.Get( http.urls.goods.classQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.treeData = result;


                            that.getBrands();
                            that.queryGroup( JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "REQUEST ERROR " , e );
                }
            })
        } ,
        //按名称搜索
        search : function () {
           var layer = layui.layer,
               that = this;
           var laypage = layui.laypage;

           that.loading = true;
           http.Post( URL.searchByName , { name : $(".brandName").val() } ).done(function ( data ) {
               try{
                   switch( data.httpCode ) {
                       case 200 :
                           var result = JSON.parse( JSON.stringify( data.result ) );
                           if( result.hasOwnProperty("list") && result.list.length > 0 ) {
                               result.list.forEach(function (item,index) {
                                   that.treeData.forEach(function ( v , k ) {
                                       if( item.categoryId == v.id ) {
                                           item.categoryName = v.name;
                                       }
                                   })
                               })
                               that.list = result.list;

                               laypage.render({
                                   elem : "paging" ,
                                   count : Math.max( 1, result.total ),
                                   limit : that.limit ,
                                   curr : result.pageNum ,
                                   jump : function ( obj , first ) {
                                       if( !first ) {
                                           if( obj.curr != that.currPage ) {
                                               that.currPage = obj.curr;
                                               that.getBrands( that.currPage );
                                           }
                                       }
                                   }
                               })
                           } else {
                               that.list = [];
                           }
                           break;
                       default :
                           layer.msg( data.msg );
                   }
               } catch ( e ) {
                   console.error("ERROR : " , e );
               }
               that.loading = false;
           })
        } ,
        //删除品牌申请
        delBrand : function ( item ) {
            var that = this,
                layer = layui.layer;

            layer.confirm("确认删除吗?",{ title : "提示" , icon : 3  },function (index) {
                that.loading = true;
                http.Get( URL.delBrand , item.id ).done(function ( data ) {
                    try{
                        switch ( data.httpCode ) {
                            case 200 :
                                layer.close( index );
                                that.getBrands();
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })
                that.loading = false;
            })
        } ,
        //调出树结构
        getTree : function ( evt ) {
            if( $("#zTree").css("display") == "block" && $( evt.target )[0].className == "treeBox" ) {
                $("#zTree").hide();
            } else {
                $("#zTree").show();
            }
        } ,
    }
})