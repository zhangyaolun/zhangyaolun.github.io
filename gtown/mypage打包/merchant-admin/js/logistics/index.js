var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "实物订单" , linker : "javascript:void(0)" } ,
            { text : "虚拟订单" , linker : "./fictitious_order.html" } ,
            // { text : "发货" , linker : "./deliver.html" } ,
            // { text : "发货设置" , linker : "./deliver_config.html" } ,
            { text : "物流工具" , linker : "./tool.html" } ,
            // { text : "售卖区域" , linker : "./sale_area.html" } ,
            // { text : "导入物流单" , linker : "./import.html" }
        ] ,
        list : [] ,                                         //数据列表
        filterList : [] ,                                   //过滤数据
        loading : false ,
        showDetail : false ,
        logStatus : false ,
        limit : 10 ,
        currPage : 1 ,
        logs : {} ,                                         //物流信息
        expressList : [] ,                                 //物流公司列表
        currOrder : {
            orderAddress : {}
        } ,
        params : {
            greaterOrEqualFields : {
                createTime : "" ,                           //下单开始日期
                paymentTime : ""                                //付款开始日期
            } ,
            lessOrEqualFields : {
                createTime : "" ,                           //下单结束日期
                paymentTime : ""                                //付款结束日期
            } ,
            equalFields : {
                fictitious : "0" ,                              //是否虚拟订单
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                orderState : "" ,
                orderNumber : "" ,                              //订单编号
                userName : "",
                productNumber : ""                                   //商家货号
            } ,
            orderByName : "createTime" ,
            isDesc : true
        } ,
    } ,
    mounted : function () {
        var laypage = layui.laypage;
        var element = layui.element;
        var form = layui.form;
        var that = this;
        var laydate = layui.laydate;
        var $ = layui.jquery;


        var isFromIndex = utils.getHashCode("page");
        if( Boolean( isFromIndex ) ) {
            element.tabChange("tab", "Pay");
            that.params.equalFields.orderState = "Pay";
        }
        //console.log( utils.getHashCode("page") )
        form.render();
        form.on("checkbox", function ( data ) {
            if( data.elem.checked ) {
                that.filterList = that.list.filter(function (item) {
                    return item.orderState != "Cancel";
                })
            }
        });

        laydate.render({
            elem: "#orderBegin" ,
            type : "datetime"
        })
        laydate.render({
            elem: "#orderEnd" ,
            type : "datetime"
        })
        // laydate.render({
        //     elem: "#payBegin" ,
        //     type : "datetime"
        // })
        // laydate.render({
        //     elem: "#payEnd" ,
        //     type : "datetime"
        // })


        element.on("tab(tab)",function ( data ) {
            var id = data.elem.context.getAttribute("lay-id");

            that.params.equalFields.orderState = id;

            that.queryList( that.currPage );

//            $("input[name=hideCancel]")[0].checked = false;
            that.filterList = that.list;
            form.render("checkbox");
        })
        if( Boolean( location.search ) ) {
            var tabId = utils.getHashCode("t");

            element.tabChange("tab", tabId );
        }

        this.queryList( this.currPage );
        this.expressQuery();
    } ,
    methods : {
        //获取快递公司
        expressQuery : function () {
            var layer = layui.layer,
                that = this;
            
            http.Get( URL.expressQuery ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.expressList = result;
                            break;
                        default :
                    }
                } catch ( e ) {
                    layer.msg( data.msg );
                }
            })
        } ,
        //查询订单列表
        queryList : function( index , fromBtn ) {
            var layer = layui.layer;
            var $ = layui.jquery,
                that = this;
            var laypage = layui.laypage;

            var params = this.params;

            if( fromBtn ) {
                params.equalFields.productNumber = $(".productNumber").val();
               // debugger;
                params.greaterOrEqualFields = {
                    createTime: $("#orderBegin").val(),
                    //paymentTime: $("#payBegin").val()
                };

                params.lessOrEqualFields = {
                    createTime: $("#orderEnd").val(),
                    //paymentTime: $("#payEnd").val()
                };
                params.equalFields.orderNumber = $(".orderNum").val();
                params.equalFields.userName = $(".userName").val();
            }


                if( !Boolean( params.equalFields.orderState ) ) {             //应后端需求，没有值把key删除
                    delete params.equalFields.orderState;
                }
                if( !Boolean( params.equalFields.orderNumber ) ) {             //应后端需求，没有值把key删除
                    delete params.equalFields.orderNumber;
                }
                if( !Boolean( params.equalFields.userName ) ) {                //应后端需求，没有值把key删除
                    delete params.equalFields.userName;
                }
                if( !Boolean( params.equalFields.productNumber ) ) {
                    delete params.equalFields.productNumber;
                }

                console.log( params.greaterOrEqualFields )
                if( params.hasOwnProperty("greaterOrEqualFields") ) {
                    if( !Boolean( params.greaterOrEqualFields.createTime ) ) {
                        delete params.greaterOrEqualFields.createTime;
                    }
                    if( !Boolean( params.greaterOrEqualFields.paymentTime ) ) {
                        delete params.greaterOrEqualFields.paymentTime;
                    }
                    if( Object.keys(params.greaterOrEqualFields).length < 1 ) {
                        delete params.greaterOrEqualFields;
                    }
                }
                if( params.hasOwnProperty("lessOrEqualFields") ) {
                    if( !Boolean( params.lessOrEqualFields.createTime ) ) {
                        delete params.lessOrEqualFields.createTime;
                    }
                    if ( !Boolean( params.lessOrEqualFields.paymentTime ) ) {
                        delete params.lessOrEqualFields.paymentTime;
                    }

                    if( Object.keys(params.lessOrEqualFields).length < 1 ) {
                        delete params.lessOrEqualFields;
                    }
                }
            //}
            this.loading = true;
            http.Post( URL.orderQuery , params , index , this.limit ).done(function (data) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.hasOwnProperty("list") ) {
                                result.list.forEach(function (item,index) {
                                    item.createTime = new Date( item.createTime  ).format("yyyy-MM-dd hh:mm:ss");
                                    item.paymentTime = new Date( item.paymentTime ).format("yyyy-MM-dd hh:mm:ss");


                                    // if( item.orderState  == "Submit" ) {
                                    //     item.productExp = 0;
                                    // }
                                    // if( item.orderState  == "Pay" ) {
                                    //     item.productExp = 1;
                                    // }
                                    // if( item.orderState  == "Delivering" ) {
                                    //     item.productExp = 2;
                                    // }
                                    // if( item.orderState  == "Received" ) {
                                    //     item.productExp = 3;
                                    // }
                                    // if( item.orderState  == "Reject" ) {
                                    //     item.productExp = 4;
                                    // }

                                });

                                that.list = result.list;
                                that.filterList = result.list;

                                laypage.render({
                                    elem: "paging" ,                                        //注意，这里的 test1 是 ID
                                    count: Math.max( result.total , 1 ) ,                   //数据总数，从服务端得到
                                    limit : that.limit ,
                                    curr : result.pageNum ,
                                    jump : function ( obj , first ) {
                                        if( !first ) {
                                            if( obj.curr != that.currPage ) {
                                                that.currPage = obj.curr;
                                                that.queryList( that.currPage );
                                            }
                                        }
                                    }
                                });
                            } else {
                                that.list = [];
                                that.filterList = [];
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "ERROR : " , e  )
                }
                that.loading = false;
            })
        }   ,
        //订单详情
        detail : function ( item ) {
            this.showDetail = true;
            this.currOrder = item;

            //console.log( item )
        } ,
        //搜索
        search : function () {
            this.currPage = 1;
            this.queryList( this.currPage , true );
        } ,
        refresh : function () {
            this.queryList( this.currPage );
        } ,
        back : function () {
            this.showDetail = false;
        } ,
        //查看物流信息
        getLogs : function( order ){
            var layer = layui.layer;
            var $ = layui.jquery;
            var that = this;
            this.logStatus = true;

            var idx = layer.load(2);
            //console.log( order )
            http.Get( URL.logInfo , order.logisticsCode , order.waybill ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.logs = JSON.parse( data.result );
                            that.logs.productLogo = order.orderProduct[0].productLogo;
                            that.expressList.forEach(function (item,index) {
                                if( item.id == order.logisticsId  ) {
                                  //  console.log( item )
                                    that.logs.logisticsName = item.name;
                                }
                            });
                            that.logs.Traces = that.logs.Traces.reverse();
                            var t = setTimeout(function () {
                                layer.open({
                                    type : 1 ,
                                    content : $("#logs") ,
                                    title : "查看物流信息" ,
                                    area : ["600px","400px"] ,
                                    btn : ["确认"] ,
                                    yes : function ( index ) {
                                        that.logStatus = false;
                                        layer.close( index );
                                    }
                                });
                                clearTimeout( t );
                            });
//                            console.log( that.logs )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("error = " , e );
                }
                layer.close( idx );
            })


        }
    }
});
