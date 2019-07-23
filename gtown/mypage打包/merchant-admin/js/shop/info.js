var URL = http.urls.shop;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "店铺设置" , linker : "./index.html" } ,
            { text : "品牌申请" , linker : "./brand.html" } ,
            { text : "店铺信息" , linker : "javascript:void(0)" }
        ] ,
        last30 : true ,                                                //续签期限
        currData : {} ,                                                //分类当前数据
        shopData : {} ,                                                //店铺信息
        companyData : {} ,                                             //公司信息
        bankData : {} ,                                                 //财务信息
        shopLevel : [] ,                                                //店铺等级数据
        shopClass : [] ,                                                //店铺分类数据
        loading : false ,
        //shopValid : true ,                                            //店铺是否过期
        extendData : [] ,                                              //续签数据
        list : [] ,
        add : false
    } ,
    mounted : function () {
        var layer = layui.layer;
        var form = layui.form;

        this.queryClass();
        this.getCompanyData( JSON.parse( sessionStorage.getItem("userInfo") ).companyBaseInfoId );
        this.getBankData( JSON.parse( sessionStorage.getItem("userInfo") ).bankTaxInfoId );
        this.getShopLevel();
        this.getShopValid();

        form.render();


    } ,
    methods : {
        //获取经营类目
        getManageClass : function () {
            var layer = layui.layer,
                that = this;

            that.loading = true;
            http.Get( URL.manageClass , JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId ).done(function ( data ) {
                try{
                    switch ( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.length ) {
                                var t = $.fn.zTree.getZTreeObj("zTree");
                                result.forEach(function (item , index ) {
                                    var path = t.getNodeByParam("id" , item.categoryId , null );
                                    if( Boolean( path ) ) {
                                        item.classPath = path.getPath();
                                    }
                                })
                                that.list = result;
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
        //新增经营类目
        addClass : function () {
            var layer = layui.layer,
                that = this;

            this.add = true;
            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "添加经营类目" ,
                    content : $(".addclass") ,
                    area : ["40%","400px"] ,
                    cancel : function () {
                        that.add = false;
                    } ,
                })
                clearTimeout( t );
            })
        } ,
        //删除类目
        delManage : function ( item ) {
            var layer = layui.layer,
                that = this;

            layer.confirm("确认删除吗?",{ title : "提示" , icon : 3 },function ( index ) {
                http.Get( URL.delManageClass , item.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.close( index );
                                that.getManageClass();
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR :" , e );
                    }
                })
            })

        } ,
        //获取商品类目
        queryClass : function () {
            var that = this,
                layer = layui.layer;

            that.loading = true;
            http.Get( http.urls.goods.classQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
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
                            var t = $.fn.zTree.init($("#zTree"), setting, result );

                            that.getManageClass();
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
        //搜索类目
        searchClass : function () {
            var treeObj = $.fn.zTree.getZTreeObj("zTree");
            var nodes = treeObj.getNodesByParamFuzzy("name", $(".searcnName").val() , null);

            if( nodes.length ) {
                $("#zTree").show();
                treeObj.selectNode( nodes[0] );
            };
        } ,
        //添加新类目
        addNewClass : function () {
            var layer = layui.layer,
                that = this;

            var userInfo = JSON.parse( sessionStorage.getItem("userInfo") );

            if( JSON.stringify( this.currData ) == "{}" ) {
                layer.msg("请选择经营类目");
                return;
            }

            console.log(that.currData)
            var params = {
                shopId : userInfo.shopManagementInfoId ,
                shopkeeperUsername: that.shopData.sellerUsername ,
                shopName : that.shopData.shopName ,
                commissionProportion : that.currData.commissionRatio ,
                categoryId : that.currData.id ,
                categoryLev : that.currData.lev ,
                categoryName : that.currData.name
            }
            http.Post( URL.addManageClass , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :

                            that.add = false;
                            layer.closeAll();
                            that.getManageClass();
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
        getShopInfo : function ( id , userInfo ) {
            var layer = layui.layer,
                that = this;
            var form = layui.form;

            http.Get( http.urls.getShopInfo , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            var t = $.fn.zTree.getZTreeObj("zTree");
                            var classOption = "<option value=''></option>";

                            that.shopClass.forEach(function (item,index) {
                                if( item.id == result.shopCategoryId ) {
                                    result.shopClassName = item.name;
                                    result.deposit = ( item.deposit / 100 ).toFixed(2);
                                }
                                classOption += "<option value='"+ item.id +"'>"+ item.name +"</option>";
                            });
                            $(".shopClass").html( classOption );

                            that.shopLevel.forEach(function (item,index) {
                                if( item.id == result.shopLevelId ) {
                                    result.shopLevelName = item.name;
                                    result.price = ( item.chargeStandard / 100 ).toFixed(2);
                                }
                            })
                            result.managementList = [];

                            http.Get( http.urls.shop.manageClass , id ).done(function ( res ) {
                                try{
                                    console.log( "path..." , res.result  )
                                    //var treeObj = $.fn.zTree.getZTreeObj("zTree");
                                    res.result.forEach(function ( val, key ) {
                                        var path = t.getNodesByParam("id" , val.categoryId );

                                        if( Boolean( path.length ) ) {
                                            result.managementList.push( path[0].getPath() );
                                        }
                                    })
                                } catch ( e ) {

                                }
                            })

                            // result.useShopCategoryApplyDtoList.forEach(function ( item, index ) {
                            //     var path = t.getNodesByParam("id" , item.categoryId );
                            //     if( Boolean( path.length ) ) {
                            //         result.managementList.push( path[0].getPath() );
                            //     }
                            // }) ;
                            that.shopData = result;

                            var optionTimer = setTimeout(function () {
                                form.render();
                                clearTimeout( optionTimer );
                            })
                            
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch (e) {
                    console.error('ERROR : ' , e );
                }
            })
        } ,
        //获取公司资质信息
        getCompanyData : function ( id ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var form = layui.form;

            http.Get( http.urls.getCompanyData , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse(JSON.stringify(data.result));

                            result.businessLicenseBeginTime = new Date(result.businessLicenseBeginTime).format("yyyy-MM-dd");
                            result.businessLicenseEndTime = new Date(result.businessLicenseEndTime).format("yyyy-MM-dd");

                            that.companyData = result;

                            //公司所在地
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取财务资质信息
        getBankData : function ( id ) {
            var layer = layui.layer,
                that = this;

            http.Get( http.urls.getBankData , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.bankData = result;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取店铺等级
        getShopLevel : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var form = layui.form;

            http.Get( http.urls.shopLevel ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.shopLevel = result;
                            that.getShopClass();
                            that.getExtendTime();
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取店铺类目
        getShopClass : function () {
            var layer = layui.layer,
                that = this;
            var form = layui.form;
            var $ = layui.jquery;

            http.Get( http.urls.shopClass ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.shopClass = result;
                            if( Boolean( JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId ) ) {
                                that.getShopInfo( JSON.parse( sessionStorage.getItem("userInfo") ).shopManagementInfoId );
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询店铺有效期
        getShopValid : function () {
            var layer = layui.layer,
                that = this;

            http.Get( URL.shopValid ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            if( data.hasOwnProperty("result") ) {
                                this.shopValid = data.result;
                            }
                            console.log( "有效期" , data )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询续签申请
        getExtendTime : function () {
            var layer = layui.layer,
                that = this;

            http.Get( URL.extendTime ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            console.log( "续签申请..." , data )
                            if( data.hasOwnProperty("result") ) {
                                if( data.result.hasOwnProperty("list") && data.result.list instanceof Array ) {
                                    data.result.list.forEach(function (item,index) {
                                        item.renewApplyTime = new Date( item.renewApplyTime ).format("yyyy-MM-dd hh:mm:ss");
                                        item.renewEndTime = new Date( item.renewEndTime ).format("yyyy-MM-dd hh:mm:ss");
                                        item.shouldPayAmount = ( item.shouldPayAmount / 100 ).toFixed(2);
                                        for( var i = 0; i < that.shopLevel.length; i ++ ) {
                                            if( item.chargeLevel == that.shopLevel[i].id ) {
                                                item.chargeLevel = ( item.chargeLevel / 100 ).toFixed(2) || 0;
                                            }
                                        }
                                    })
                                }
                                that.extendData = data.result.list;
                            }
                            break;
                        default :
                    }
                } catch ( e ) {
                    console.error("error " , e );
                }
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
