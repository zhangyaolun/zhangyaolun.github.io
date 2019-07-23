var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "实物订单" , linker : "./index.html" } ,
            { text : "虚拟订单" , linker : "javascript:void(0)" } ,
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
        limit : 10 ,
        currPage : 1 ,
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
                fictitious : "1" ,                              //是否虚拟订单
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                orderState : "" ,
                orderNumber : "" ,                              //订单编号
                userName : "" ,
                productNumber : ""                              //商家货号
            } ,
            orderByName : "createTime" ,
            isDesc : true
        } ,
    } ,
    mounted : function () {
        var element = layui.element;
        var laydate = layui.laydate;
        var that = this;
        var $ = layui.jquery;

        this.queryList();


        laydate.render({
            elem : "#orderBegin" ,
            type : "datetime"
            // done : function ( val ) {
            //     console.log( Date.parse( val ))
            //     if( that.params.hasOwnProperty("greaterOrEqualFields") ) {
            //         that.params.greaterOrEqualFields.orderStartTime = Date.parse( val );
            //     } else {
            //         that.params.greaterOrEqualFields = Object.create( null );
            //         that.params.greaterOrEqualFields.orderStartTime = Date.parse( val );
            //     }
            //
            // }
        });
        laydate.render({
            elem : "#orderEnd" ,
            type : "datetime"
            // done : function ( val ) {
            //     if( that.params.hasOwnProperty("lessOrEqualFields") ) {
            //         that.params.lessOrEqualFields.orderStartTime = Date.parse( val );
            //     } else {
            //         that.params.lessOrEqualFields = Object.create( null );
            //         that.params.lessOrEqualFields.orderStartTime = Date.parse( val );
            //     }
            // }
        })
        element.on("tab(tab)",function ( data ) {
            var id = this.getAttribute("lay-id");

            that.params.equalFields.orderState = id;

            that.queryList();

            //$("input[name=hideCancel]")[0].checked = false;
            that.filterList = that.list;
            //form.render("checkbox");
        })
    } ,
    methods : {
        //查询订单列表
        queryList : function( fromBtn ) {
            var layer = layui.layer;
            var $ = layui.jquery,
                that = this;
            var laypage = layui.laypage;

            var params = this.params;


            if( fromBtn ) {
                params.equalFields.productNumber = $(".productNumber").val();
                params.greaterOrEqualFields = {
                    createTime : $("#orderBegin").val()  ,
                    //paymentTime : $("#payBegin").val()
                };
                params.lessOrEqualFields = {
                    createTime : $("#orderEnd").val()  ,
                    //paymentTime : $("#payEnd").val()
                };
                params.equalFields.orderNumber = $(".orderNum").val();
                params.equalFields.userName = $(".userName").val();
            }


            if( params.equalFields.orderState == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.orderState;
            }
            if( params.equalFields.orderNumber == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.orderNumber;
            }
            if( params.equalFields.userName == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.userName;
            }
            if( !Boolean( params.equalFields.productNumber ) ) {
                delete params.equalFields.productNumber;
            }
            if( params.hasOwnProperty("greaterOrEqualFields") ) {
                if( params.greaterOrEqualFields.createTime == "" ) {
                    delete params.greaterOrEqualFields.createTime;
                }
                if( params.greaterOrEqualFields.paymentTime == "" ) {
                    delete params.greaterOrEqualFields.paymentTime;
                }
                if( JSON.stringify( params.greaterOrEqualFields ) == "{}" ) {
                    delete params.greaterOrEqualFields;
                }
            }
            if( params.hasOwnProperty("lessOrEqualFields") ) {
                if( params.lessOrEqualFields.createTime == "" ) {
                    delete params.lessOrEqualFields.createTime;
                }
                if ( params.lessOrEqualFields.paymentTime == "" ) {
                    delete params.lessOrEqualFields.paymentTime;
                }
                if( Object.keys( params.lessOrEqualFields ) < 1 ) {
                    delete params.lessOrEqualFields;
                }
            }

            this.loading = true;
            http.Post( URL.orderQuery , params , this.currPage , this.limit ).done(function (data) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.hasOwnProperty("list") ) {
                                result.list.forEach(function (item,index) {
                                    item.createTime = new Date( item.createTime  ).format("yyyy-MM-dd hh:mm:ss");
                                    item.paymentTime = new Date( item.paymentTime ).format("yyyy-MM-dd hh:mm:ss");
                                })
                                that.list = result.list;
                                //that.filterList = result.list;
                                // console.log( laypage ,111)
                                laypage.render({
                                    elem: "paging" ,                                        //注意，这里的 test1 是 ID，不用加 # 号,
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

            console.log( item )
        } ,
        back : function () {
            this.showDetail = false;
        } ,
    }
})