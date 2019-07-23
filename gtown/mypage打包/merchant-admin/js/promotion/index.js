var URL = http.urls.promotion;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "拼团管理" , linker : "javascript:void(0)" } ,
            // { text : "代金券管理" , linker : "./coupons.html" }
        ] ,
        showDetail : false ,
        add : false ,
        loading : false ,                       //活动列表
        loading2 : false ,                      //商品加载
        collageList : [] ,                      //拼团列表
        goodsList : [] ,                        //商品列表
        goodName : "" ,                         //商品名称
        collageGood : null ,                      //拼团商品
        currPage : 1 ,                          //当前页
        limit : 12 ,                            //每页显示
        picRow : 0,                             //循环行
        currColl : {} ,                       //当前查看的活动
        params : {
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            activityStatus : ""
        } ,
        addParams : {
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            activityName : "拼团" ,
            categoryId : "" ,                   //类目id
            productId : "" ,                    //商品id
            activityPeopleNum : "" ,           //成团人数
            activityStock : "" ,                //拼团库存
            originalPrice : "" ,                //商品原价
            individualPrice : "" ,              //个人价格
            activityPrice : "" ,                //拼团价格
            activityStatus : "0" ,               //启用状态 0.不启用 1.启用 ,
            startActivityTime : "" ,            //活动开始时间
            endActivityTime : "" ,              //活动结束时间
            productSkuId : ""
        }
    } ,
    mounted : function () {
        var form = layui.form;
        var laydate = layui.laydate;
        var that = this;
        form.render();

        // laypage.render({
        //     elem: "paging" , //注意，这里的 test1 是 ID，不用加 # 号
        //     count: 50 //数据总数，从服务端得到-->
        // });
        form.on("select(statu)",function ( data ) {
            var statu = data.elem.value;

            that.params.activityStatus = statu;
        })

        laydate.render({
            elem : "#begin" ,
            type : "datetime"
        })
        laydate.render({
            elem : "#end" ,
            type : "datetime"
        })

        this.collageQuery();
        this.goodsQuery( this.currPage );
    } ,
    methods : {
        goodStatus : function ( coll ) {


            this.currColl = coll;
            //console.log( this.currColl )
            //that.currColl.good = data.result.good;
            this.queryGoodById( coll.productId );

        } ,
        back : function () {
            this.showDetail = false;
        } ,
        addFn : function () {
            this.add = !this.add;
        } ,
        //查询所有活动
        collageQuery : function () {
            var layer = layui.layer,
                that = this;

            this.loading = true;
            http.Post( URL.collageQuery , this.params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            result.forEach(function ( item ,index ) {
                                item.startActivityTime = new Date( item.startActivityTime ).format("yyyy-MM-dd hh:mm:ss");
                                item.endActivityTime  = new Date( item.endActivityTime  ).format("yyyy-MM-dd hh:mm:ss");
                            })
                            that.collageList = result;
                            // console.log( result )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error();
                }
                that.loading = false;
            })
        } ,
        //删除活动
        delColl : function ( coll ) {
            var layer = layui.layer,
                that = this;

            layer.confirm("确定删除吗?",{ icon : 3 , title : "提示" } , function ( index ) {
                that.loading = true;
                http.Get( URL.collageDel , coll.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.close( index );
                                that.collageQuery();
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })
            })
        } ,
        //查询商品
        queryGoodById : function ( id ) {
            var layer = layui.layer,
                that = this;

            http.Get( http.urls.goods.queryById , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :

                            that.currColl.good = data.result;
                            that.showDetail = true;
                            console.log( that.currColl.good )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //按状态搜索
        searchStatu : function () {
            this.collageQuery();
        } ,
        //刷新
        refresh : function () {
            this.collageQuery();
        } ,
        //获取商品
        goodsQuery : function ( currPage ) {
            var layer = layui.layer,
                that = this;
            var laypage = layui.laypage;

            this.loading2 = true;
            http.Get( URL.selectBySku , currPage , this.limit ,JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.hasOwnProperty("list") ) {
                                that.goodsList = result.list;
                                that.picRow = Math.ceil( result.list.length / 3 );

                                laypage.render({
                                    elem: "paging2" ,                                 //注意，这里的 test1 是 ID，不用加 # 号
                                    count: Math.max( 1, result.total ),               //数据总数，从服务端得到-->
                                    limit : that.limit ,
                                    curr : result.pageNum ,
                                    last : false ,
                                    jump : function ( obj , first ) {
                                        if( !first ) {
                                            if( obj.curr != that.currPage ) {
                                                that.currPage = obj.curr;
                                                that.goodsQuery( that.currPage );
                                            }
                                        }
                                    }
                                });
                            } else {
                                that.goodsList = []
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
                that.loading2 = false;
            })
        } ,
        //新增拼团
        collageAdd : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var element = layui.element;

            var params = this.addParams;
            params.startActivityTime = Date.parse( $("#begin").val() );
            params.endActivityTime = Date.parse( $("#end").val() );

            if( params.activityName == "" ) {
                layer.alert("请填写拼团名称");
                return;
            }
            if( params.activityPeopleNum == "" ) {
                layer.alert("请填写成团人数");
                return;
            }
            if( params.activityStock == "" ) {
                layer.alert("请填写拼团库存");
                return;
            }
            if( params.individualPrice == "" ) {
                layer.alert("请填写个人价格");
                return;
            }
            if( params.individualPrice * 100 >= params.originalPrice * 100 ) {
                layer.alert("个人价格不能大于等于商品原价");
                return;
            }
            if( params.activityPrice == "" ) {
                layer.alert("请填写拼团价格");
                return;
            }
            // if( params.activityPrice >= params.individualPrice ) {
            //     layer.alert("拼团价格不能大于等于个人购买价格");
            //     return;
            // }
            if( !Boolean( params.startActivityTime ) ) {
                layer.alert("请选择活动开始时间");
                return;
            }
            if( !Boolean( params.endActivityTime ) ) {
                layer.alert("请选择活动结束时间");
                return;
            }


            var copyParams = JSON.parse( JSON.stringify( params ) );
            copyParams.individualPrice = ( copyParams.individualPrice * 100 ).toFixed(0);
            copyParams.originalPrice = ( copyParams.originalPrice * 100 ).toFixed(0);
            copyParams.activityPrice = ( copyParams.activityPrice * 100 ).toFixed(0);
            //console.log( JSON.stringify( params ) )
            http.Post( URL.collageAdd , copyParams ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.add = false;
                            element.tabChange("tab",  0 );
                            that.collageQuery();
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //搜索商品
        searchGood : function () {
            var layer = layui.layer,
                that = this;

            var laypage = layui.laypage;

            var params = {
                like : {
                    name: this.fullSymbol( this.goodName )
                } ,
                equalFields : {
                    approvalType : 4 ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                }
            };
            this.loading2 = true;
            http.Post( http.urls.goods.goodsQuery , params , this.currPage , this.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.goodsList = result.list;

                            laypage.render({
                                elem: "paging2" ,                                 //注意，这里的 test1 是 ID，不用加 # 号
                                count: Math.max( 1, result.total ),               //数据总数，从服务端得到-->
                                limit : that.limit ,
                                curr : result.pageNum ,
                                last : false ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.goodsQuery( that.currPage );
                                        }
                                    }
                                }
                            });
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR: " , e );
                }
                that.loading2 = false;
            })
        } ,
        //设置拼团商品
        getCollageGood : function ( good ) {
            this.collageGood = good;
            this.addParams.productId = good.id;
            this.addParams.productSkuId = good.skuDto.id;
            this.addParams.originalPrice = ( good.price / 100 ).toFixed(2);
            this.addParams.categoryId = good.productCategory.categoryId;
            this.add = false;
        } ,
        //前后加%号
        fullSymbol : function ( str ) {
            return "%" + str + "%";
        } ,
    } ,
})