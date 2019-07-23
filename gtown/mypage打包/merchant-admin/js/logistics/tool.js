var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "实物订单" , linker : "./index.html" } ,
            { text : "虚拟订单" , linker : "./fictitious_order.html" } ,
            // { text : "发货" , linker : "./deliver.html" } ,
            // { text : "发货设置" , linker : "./deliver_config.html" } ,
            { text : "物流工具" , linker : "javascript:void(0)" } ,
            // { text : "售卖区域" , linker : "./sale_area.html" } ,
            // { text : "导入物流单" , linker : "./import.html" }
        ] ,
        params : {
            templateStatus : 1 ,
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            billingRules : "1" ,
            freightTemplate : []
        } ,
        currTemp : {} ,                     //当前编辑的模版
        areas : [] ,                         //运送地区
        showZoneIndex : 0 ,                 //编辑索引
        trueData : {} ,                     //选中的地区
        openZone : false ,
        areaStr : "" ,
        addNew : false ,
        edit : false ,
        area : false ,
        tempList : [] ,
        loading : true ,
        spec : []
    } ,
    created : function () {

    } ,
    mounted : function () {
        // var laypage = layui.laypage;
        //
        // var upload = layui.upload;
        var element = layui.element;
        var that = this;
        this.tempQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);

        //
        // laypage.render({
        //     elem: "paging" , //注意，这里的 test1 是 ID，不用加 # 号,
        //     count: 50 //数据总数，从服务端得到
        // });
    } ,

    methods : {
        configAddress : function ( temp ) {
            var form = layui.form,
                that = this,
                params = this.params;
            var $ = layui.jquery;

            this.addNew = true;
            this.edit = temp ? true : false;

            if( temp ) {
                this.currTemp = temp;
                this.detailTemp( temp.id );
                var t = setTimeout(function () {
                    var statu = $(".tempStatu").find("input[type=radio]");

                    if( temp.templateStatus == 0 ) {
                        statu[0].checked = true;
                    } else {
                        statu[1].checked = true;
                    }
                    //params.templateName = temp.templateName;
                    params.templateStatus = temp.templateStatus;
                    form.render();

                    form.on("radio(statu)", function ( data ) {
                        params.templateStatus = parseInt(data.value);
                    });
                    $(".templateName").val( temp.templateName );
                    clearTimeout( t );
                });

            } else {
                this.currTemp = {};
                this.spec.length = 0;
                //params.templateName = "";
                params.billingRules = "1";
                params.freightTemplate.length = 0;
                params.templateStatus = 1;

                var t = setTimeout(function () {
                    var statu = $(".tempStatu").find("input[type=radio]");

                    if( params.templateStatus == 0 ) {
                        statu[0].checked = true;
                    } else {
                        statu[1].checked = true;
                    }
                    form.render();

                    form.on("radio(statu)", function ( data ) {
                        params.templateStatus = parseInt(data.value);
                    });

                    clearTimeout( t );
                })
            }
        } ,
        //返回
        back : function () {
            this.addNew = false;
        } ,
        showZone : function ( idx , temp ) {
            var layer = layui.layer;
            var that = this;
            //this.spec[idx].transportArea = JSON.stringify( this.areas[idx] );
            this.trueData = that.spec[idx];
            this.showZoneIndex = idx;
            this.openZone = true;

            console.log( this.trueData  )

            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择地区" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#zone") ,
                    cancel : function () {
                        that.openZone = false;
                    }
                })
            })
        } ,
        addSpec : function () {
            var o = {
                areaStr : null ,
                firstWeight : "" ,
                firstCost : "" ,
                continueWeight : "" ,
                continueCost : "" ,
                show : true
            }
            this.spec.push( o );
        } ,
        delSpec : function ( idx , item ) {
            this.spec.splice( idx , 1 , { id : item.id , status : 1 , show : false } );
        } ,
        //查询运费模版
        tempQuery : function ( id ) {
            var layer = layui.layer;
            var that = this;

            this.loading = true;
            http.Get( URL.tempQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data ) ).result;
                            that.tempList = result;
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
        //查询明细
        detailTemp : function ( id ) {
            var layer = layui.layer;
            var that = this;

            that.areas.length = 0;
            http.Get( URL.tempDetail , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            result.forEach(function (item,index) {
                                item.areaStr = "";
                                item.firstCost = ( item.firstCost / 100 ).toFixed(2);
                                item.continueCost = ( item.continueCost / 100 ).toFixed(2);
                                var area = eval( item.transportArea );
                                area.forEach(function ( val ,key ) {
                                    item.show= true;
                                        //val.forEach(function ( a , b ) {
                                            item.areaStr = val.province + ',' + val.area.join(",");
                                        //})


                                })
                                that.areas.push( area );
                            });
                            that.spec = result;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //删除运费模版
        delTemp : function ( temp ) {
            var layer = layui.layer;
            var that = this;
            layer.confirm("确定删除吗？",{ icon: 3, title:"提示" },function ( index ) {
                http.Get( URL.tempDel , temp.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.tempQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );

                        }
                    } catch (e) {
                        console.error("ERROR : " , e );
                    }
                })
            })
        } ,
        //新增运费模版
        submit : function () {
            var $ = layui.jquery,
                layer = layui.layer;
            var params = this.params;
            var that = this;
            var specs = $(".specs");
            var postUrl = null;

            if( this.edit ) {
                postUrl = URL.tempUpdate;
                params.id = this.currTemp.id;
            } else {
                delete params.id;
                if( $(".templateName").val() == "" ) {
                    layer.msg("请填写模版名称");
                    return;
                }
                params.freightTemplate.length = 0;

                postUrl = URL.tempAdd;
            }

            params.freightTemplate.length = 0;
            if( specs.length ) {
                specs.each(function (idx,elem) {
                    var fw = $( elem ).find(".fw").val(),
                        fc = $( elem ).find(".fc").val() * 100 ,
                        cw = $( elem ).find(".cw").val() ,
                        cc = $( elem ).find(".cc").val() * 100;

                    var data = {
                        transportArea : that.spec[idx].transportArea ,
                        firstWeight : fw ,
                        firstCost : fc ,
                        continueWeight : cw ,
                        continueCost : cc
                    }
                    if( that.spec[idx].templateId ) {
                        data.id = that.spec[idx].templateId;
                    }
                    params.templateName = $(".templateName").val();
                    params.freightTemplate.push( data );
                })
            } else {
                var data = {
                    transportArea : "[]" ,
                    firstWeight : 0 ,
                    firstCost : 0 ,
                    continueWeight : 0 ,
                    continueCost : 0
                }
                params.freightTemplate.push( data );
                params.templateName = $(".templateName").val();
            }
            http.Post( postUrl , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.tempQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                            that.addNew = false;
                            that.edit = false;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " ,e );
                }
            })
        } ,
        //选择区域
        showData : function ( data , index ) {
            var layer = layui.layer;
            var that = this;
            console.log(22222)
            that.spec[that.showZoneIndex].areaStr = "";
            data.forEach(function (item,index) {
                that.spec[that.showZoneIndex].areaStr = item.province + "," + item.area.join(",");
            });
            that.spec[index].transportArea = JSON.stringify( data );
            console.log( that.spec )
            //this.areas.push( data );
            this.areas = data;
            layer.closeAll();
            this.openZone = false;
        }
    }
})