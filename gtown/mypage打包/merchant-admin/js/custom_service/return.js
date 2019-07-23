var URL = http.urls.custom_service;
var content = new Vue({
    el : "#content" ,
    data : {
        userInfo : {} ,
        navData : [
            { text : "退款管理" , linker : "./index.html" } ,
            { text : "退货管理" , linker : "javascript:void(0)" }
        ] ,
        list : [] ,
        loading : false ,
        currOrder : {
            orderRefundProductDto : {
                productName : "" ,
                price : "" ,
                count : ""
            }
        } ,
        params : {
            equalFields : {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                refundType : "2" ,
                sellerAgreeStatus : "" ,
                orderId : ""
            } ,
            greaterOrEqualFields : {
                applyRefundTime : ""
            } ,
            lessOrEqualFields : {
                applyRefundTime : ""
            }
        } ,
        detail : false ,
        currPage : 1 ,                                  //当前页
        limit : 10 ,                                    //每页数据
    } ,
    mounted : function () {
        var form = layui.form;
        var laydate = layui.laydate;
        var that = this;

        form.on("select(statu)",function ( data ) {
            console.log(data)
            that.params.equalFields.sellerAgreeStatus = data.value;
        });
        laydate.render({
            elem : "#begin" ,
            done : function (value, date, endDate) {
                that.params.greaterOrEqualFields.applyRefundTime = Date.parse( value );
            }
        })
        laydate.render({
            elem : "#end" ,
            done : function (value, date, endDate) {
                that.params.lessOrEqualFields.applyRefundTime = Date.parse( value );
            }
        })
        form.render();
        this.userInfo = JSON.parse( sessionStorage.getItem("userInfo") );

        this.orders();
    } ,
    methods : {
        goodStatus : function ( item ) {
            this.currOrder = item;
            console.log( this.currOrder )
            this.detail = true;
        } ,
        //搜索
        search : function () {
            this.orders();
        } ,
        //查询退货
        orders : function () {
            var layer = layui.layer,
                $ = layui.jquery;
            var laypage = layui.laypage;

            var that = this;
            this.loading = true;
            http.Post( URL.orderRefundSelect , this.params , this.currPage , this.limit ).done(function ( data ) {
                try{
                    switch ( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.list instanceof Array && result.list.length ) {
                                result.list.forEach(function ( v , k ) {
                                    v.applyRefundRmb = ( v.applyRefundRmb / 100 ).toFixed(2);
                                    v.applyRefundTime = new Date( v.applyRefundTime ).format("yyyy-MM-dd hh:mm:ss");
                                })
                                that.list = result.list;

                                laypage.render({
                                    elem: "paging",
                                    count: Math.max( result.total,1 ) ,
                                    limit : that.limit ,
                                    curr : result.pageNum ,
                                    jump : function ( obj , first ) {
                                        if( !first ) {
                                            if( obj.curr != that.currPage ) {
                                                that.currPage = obj.curr;
                                                that.orders();
                                            }
                                        }
                                    }
                                })
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR :" , e );
                };
                that.loading = false;
            })
        } ,
        //退货
        refundGood : function ( statu ) {
            var item = "";
            var layer = layui.layer;
            var that = this;

            http.Get( URL.orderRefund , this.currOrder.id , statu ).done(function ( data ) {
                try{
                    switch ( data.httpCode ) {
                        case 200 :
                            that.currOrder.sellerAgreeStatus = statu;
                            //that.currOrder.sellerAgreeStatus = statu;

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( e );
                }
            })
        }
    }
})