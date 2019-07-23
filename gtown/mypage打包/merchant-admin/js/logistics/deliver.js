var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "实物订单" , linker : "./index.html" } ,
            { text : "虚拟订单" , linker : "./fictitious_order.html" } ,
            // { text : "发货" , linker : "javascript:void(0)" } ,
            // { text : "发货设置" , linker : "./deliver_config.html" } ,
            { text : "运费设置" , linker : "./tool.html" } ,
            // { text : "售卖区域" , linker : "./sale_area.html" } ,
            // { text : "导入物流单" , linker : "./import.html" }
        ] ,
        edit : true ,
        list : [] ,                                         //数据列表
        filterList : [] ,                                   //过滤数据
        expressList :[] ,                                   //快递公司
        currOrder : {} ,                                    //当前编辑的订单
        deliverAdds : [] ,                                  //发货地址
        defaultDeliver : {} ,                               //默认发货地址
        maxDelayTime : "" ,                                 //最晚收货时间
        searchIndex : 0 ,                                   //查询物流公司索引
        loading : false ,
        limit : 10 ,
        currPage : 1 ,
        params : {
            greaterOrEqualFields : {
                createTime : "" ,                           //下单开始日期
            } ,
            lessOrEqualFields : {
                createTime : "" ,                           //下单结束日期
            } ,
            equalFields : {
                fictitious : "0" ,                              //是否虚拟订单
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                orderState : "Pay" ,
                orderNumber : "" ,                              //订单编号
                userName : ""
            }
        } ,
    } ,
    created : function () {

    } ,
    mounted : function () {
        var element = layui.element;
        var form = layui.form;
        var that = this;
        var laydate = layui.laydate;
        var $ = layui.jquery;


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

        element.on("tab(tab)",function ( data ) {
            var id = data.elem.context.getAttribute("lay-id");

            that.params.equalFields.orderState = id;

            that.queryList( that.currPage );

            $("input[name=hideCancel]")[0].checked = false;
            that.filterList = that.list;
            form.render("checkbox");
        });
        this.queryList( this.currPage );


        //设置发货流程
        var id = utils.getHashCode("orderId");
        if( id != null ) {
            var params = {
                equalFields : {
                    orderNumber : id ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                }
            }
            http.Post( URL.orderQuery , params , 1 , 10 ).done(function (res) {
                try{
                    switch( res.httpCode ) {
                        case 200 :
                            console.log( res.result )
                            that.editDeliverInfo( res.result.list[0] );
                            break;
                        default :

                    }
                } catch ( e ) {
                    console.error( e );
                }
            })
        }
    } ,
    methods :  {
        queryList : function ( index ) {
            var layer = layui.layer;
            var $ = layui.jquery,
                that = this;
            var laypage = layui.laypage;

            var params = this.params;

            params.greaterOrEqualFields = {
                createTime : $("#orderBegin").val()
            };
            params.lessOrEqualFields = {
                createTime : $("#orderEnd").val()
            };
            params.equalFields.orderNumber = $(".orderNum").val();
            params.equalFields.userName = $(".userName").val();

            if( params.equalFields.orderState == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.orderState;
            }
            if( params.equalFields.orderNumber == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.orderNumber;
            }
            if( params.equalFields.userName == "" ) {             //应后端需求，没有值把key删除
                delete params.equalFields.userName;
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
                if( JSON.stringify( params.lessOrEqualFields ) == "{}" ) {
                    delete params.lessOrEqualFields;
                }
            }

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
                                })
                                that.list = result.list;
                                that.filterList = result.list;
                               // console.log( that.list)
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
        } ,
        //获取发货地址
        deliverAddressQuery : function ( id ) {
            var that = this,
                layer = layui.layer;

            http.Get( http.urls.logistics.delverQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.length ) {
                                that.deliverAdds = result;

                                result.forEach(function ( item ,index ) {
                                    if( item.id == id || item.defaultAddress == 1 ) {
                                        that.defaultDeliver = item;
                                    }
                                })
                            } else {
                                that.deliverAdds = [];
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
        //发货第一步
        firstStep : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;

            var params = {
                id : this.currOrder.id ,                             //订单id
                logisicsRemark : $(".logisicsRemark").val() ,      //给买家的留言
                sellerRemark : $(".sellerRemark").val() ,           //卖家备注
                orderAddress : {                                      //收货地址信息
                    id : this.currOrder.orderAddress.id ,           //收货地址id
                    receiverName : $(".receiverName").val() ,       //收货人
                    telephone : $(".telephone").val() ,              //联系方式
                    address : $(".address").val()                     //地址
                }
            }

            http.Post( URL.orderDeliverFirst , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            console.log( data )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //发货第二步
        secondStep : function ( exp , idx ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;

            console.log( exp )
            var val = $(".log").eq(idx).val();
            // if( !this.defaultDeliver.hasOwnProperty("id") ) {
            //     layer.alert("请选择发货地址");
            //     return;
            // }
            if( val == "" ) {
                layer.alert("请填写物流单号");
                return;
            }
            var params = {
                id : utils.getHashCode("id") ,                                        //订单id
                sellerAddressId : this.defaultDeliver.id ,                    //发货地址id
                logisticsId : exp.id ,                                                            //物流公司id
                waybill : val ,                                                 //物流单号
                logisticsCode : exp.description
            };

            http.Post( URL.orderDeliverSecond , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            layer.msg( typeof data.result == "boolean" ? "发货成功" : data.result ,{ time : 2000 },function () {
                                location.href = "./index.html";
                            });

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //延迟收货d
        eliverDelay : function ( params , index ) {
            var layer = layui.layer,
                that = this;

            http.Post( URL.orderDeliverDelay , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            layer.msg("更新成功");
                            layer.close( index );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取快递公司
        expressQuery : function () {
            var layer = layui.layer,
                that = this;

            that.expressList = [];
            http.Get( URL.expressQuery ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            result.forEach(function ( item, index) {
                                if( item.iscommon ) {
                                    that.expressList.push( item );
                                }
                            });
                            //that.expressList = result;

                            //that.configQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                            break;
                        default :
                    }
                } catch ( e ) {
                    layer.msg( data.msg );
                }
            })
        } ,
        //延迟收货
        delay : function ( order , idx ) {
            var layer = layui.layer;
            var $ = layui.jquery;
            var select = $(".selectDate");
            var that = this;

            select.get(0).selectedIndex = 0;

            var delayTime = new Date().getTime() + 86400000 * select.val();
            this.maxDelayTime = new Date( delayTime ).format("yyyy-MM-dd hh:mm:ss");

            this.currOrder = order;
            layer.open({
                type : 1 ,
                title : "延迟收货" ,
                area : ["50%","350px"] ,
                content : $(".delay") ,
                btn : ["确定","取消"] ,
                yes : function ( index ) {
                    var params = {
                        id : order.id ,
                        delayedDelivery : select.val()
                    }
                    that.eliverDelay( params , index );
                }
            })
        } ,
        //搜索物流公司
        searchExp : function () {
            var $ = layui.jquery;
            var val = $("#searchText").val();
            var exps = $(".expName");
            var that = this;
            exps.css("color","#666");
            if( Boolean( val ) ) {

                for( var i = this.searchIndex; i < exps.size(); i ++ ) {

                    if( exps.eq(i).text().indexOf( val )  > -1 ) {
                        that.searchIndex = i;
                        exps.eq(i).css("color","blue");
                        window.scrollTo( 0 , exps.eq(i).offset().top - 60 );
                        return;
                    }
                }
                that.searchIndex = 0;
            }
        } ,
        //切换时间
        changeDate : function ( evt ) {
            var $ = layui.jquery;
            var val = $( evt.target ).val();

            var delayTime = new Date().getTime() + 86400000 * val;
            this.maxDelayTime = new Date( delayTime ).format("yyyy-MM-dd hh:mm:ss");

        } ,
        //编辑发货
        editDeliverInfo : function ( order ) {
            this.currOrder = order;
            this.edit = true;

            console.log( order )
            //this.deliverAddressQuery( order.sellerAddressId );
            this.expressQuery();
        } ,
        choiceAddress : function ( add ) {
            var layer = layui.layer;

            layer.closeAll();
            this.defaultDeliver = add;
        } ,
        //搜索
        search : function () {
            this.queryList( this.currPage );
        } ,
        refresh : function () {
            this.queryList( this.currPage );
        } ,
        //返回
        back : function () {
           //this.edit = false;
            location.href = "./index.html";
        } ,
        //编辑收货地址
        editAdd : function ( step , item , idx ) {
            var layer = layui.layer;
            var $ = layui.jquery;
            var that = this;

            if( step == 1 ) {
                layer.open({
                    type : 1 ,
                    title : "编辑收货地址" ,
                    area : ["600px"] ,
                    content : $(".sendAdd") ,
                    btn : ["确定","取消"] ,
                    yes : function ( index ) {

                        that.firstStep();
                        //console.log( 1111 )
                    }
                })
            } else {
                this.secondStep( item , idx );
            }

        } ,
        //编辑发货人
        editMan : function () {
            var layer = layui.layer;
            var $ = layui.jquery;

            layer.open({
                type : 1 ,
                title : "我的发货地址" ,
                area : ["600px"] ,
                content : $(".sendMan") ,

            })
        }
    }


})