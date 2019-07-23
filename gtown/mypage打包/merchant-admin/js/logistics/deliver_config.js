var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "已售订单管理" , linker : "./index.html" } ,
            { text : "虚拟对码订单" , linker : "./fictitious_order.html" } ,
            // { text : "发货" , linker : "./deliver.html" } ,
            { text : "发货设置" , linker : "javascript:void(0)" } ,
            { text : "物流工具" , linker : "./tool.html" } ,
            { text : "售卖区域" , linker : "./sale_area.html" } ,
            // { text : "导入物流单" , linker : "./import.html" }
        ] ,
        loading : false ,
        addStr : "" ,                                    //省市区拼接字符窜
        addNew : false ,                                            //新增地址
        select : false ,                                //地址选择框
        currModel : {} ,                                //当前编辑的模块
        list : [] ,                                                  //地址库数据列表
        expressList : [] ,                              //快递公司列表
        defaultData : {                                 //发货配置信息
            freeFreight : "" ,
            remark : "" ,
            picAddress : ""
        } ,
        zone : [] ,                                                 //全部地区列表
        city : false ,                                                //市列表
        county : false ,                                              //区县列表
        edit : false ,                                  //是否编辑入口
        newAddParams : {
            province : "" ,                              //省
            city : "" ,                                  //市
            area : "" ,                                  //区
            country : "国家" ,
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            defaultAddress : 0 ,
            sellerAddress  : "" ,                       //地址
            sellerLinkman : "" ,                        //联系人
            sellerPhone : "" ,                          //电话
            sellerCompany : ""                          //公司
        }
    } ,
    mounted : function () {
        var $ = layui.jquery;
        var element = layui.element;
        var layer = layui.layer;
        var laypage = layui.laypage;
        var upload = layui.upload;
        var form = layui.form;
        var that = this;

        form.render();
        // form.on("checkbox", function ( data ) {
        //     //console.log( data.elem.checked )
        // });
        //省下拉框
        // form.on("select(prov)",function ( data ) {
        //
        //     var index = data.elem.selectedIndex;
        //     var text = $( data.elem.options[index] ).text();
        //     var id = data.elem.value;
        //
        //     that.newAddParams.province = text;
        //     that.city = false;
        //     that.county = false;
        //     if( id !== "" ) {
        //         for( var i = 0, len = that.zone.length; i < len; i ++ ) {
        //             if( that.zone[i].id == id ) {
        //                 if( that.zone[i].hasOwnProperty("citys") ) {
        //                     that.city = true;
        //                     that.fullData( that.zone[i].citys , ".city" );
        //                 }
        //             }
        //         }
        //     }
        // })
        // //市下拉框
        // form.on("select(city)",function ( data ) {
        //     var index = data.elem.selectedIndex;
        //     var text = $( data.elem.options[index] ).text();
        //     var id = data.elem.value;
        //
        //     that.newAddParams.city = text;
        //     that.county = false;
        //     if( id !== "" ) {
        //         for( var i = 0, len = that.zone.length; i < len; i ++ ) {
        //             for( var j = 0, len2 = that.zone[i].citys.length; j < len2; j ++ ) {
        //                 if( that.zone[i].citys[j].id == id ) {
        //                     if( that.zone[i].citys[j].hasOwnProperty("citys") ) {
        //                         that.county = true;
        //                         that.fullData( that.zone[i].citys[j].citys , ".county" );
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
        // //区县下拉框
        // form.on("select(county)",function ( data ) {
        //     var index = data.elem.selectedIndex;
        //     var text = $( data.elem.options[index] ).text();
        //     var id = data.elem.value;
        //
        //     that.newAddParams.area = text;
        // });

        upload.render({
            elem : "#seal" ,
            url : http.urls.goods.picUpload ,
            data : {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                picGroupId : "16"
            } ,
            auto : true ,
            done : function ( res ) {
                that.defaultData.picAddress = res.result.picAddress;
            } ,
            error : function ( err ) {
                layer.msg( err.msg );
            }
           // bindAction : ".uploadBtn" ,
           //  choose : function ( obj ) {
           //      var file = obj.pushFile();
           //      var localImg = $(".localimg")
           //
           //      obj.preview(function(index, file, result) {
           //          localImg.attr("src" , result);
           //      })
           //  } ,
        });
        // laypage.render({
        //     elem: "paging" , //注意，这里的 test1 是 ID，不用加 # 号,
        //     count: 50 //数据总数，从服务端得到
        // });
        //this.deliverQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
        this.expressQuery();
    } ,

    methods : {
        configAddress : function ( item ) {
            this.addNew = true;
            this.city = this.county = false;
            var params = this.newAddParams;

            //编辑入口
            if( item ) {
                this.edit = true;
                this.select = false;

                this.currModel = item;
                this.deliverDetail( item.id );
            } else {            //新增入口
                this.edit = false;
                this.select = true;

                this.currModel = {};

                params.sellerLinkman = "";
                params.sellerAddress = "";
                params.sellerPhone = "";
                params.sellerCompany = "";
                params.province = "";
                params.city = "";
                params.area = "";
                params.sellerAddress = "";
            }

            this.queryZone( 1 );
        } ,
        back : function () {
            this.addNew = false;
        } ,
        areaEdit : function () {
            this.select = true;
        } ,
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

                            //that.configQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                            break;
                        default :
                    }
                } catch ( e ) {
                    layer.msg( data.msg );
                }
            })
        } ,
        //配置信息
        configData : function ( type ) {
            var $ = layui.jquery;
            var layer = layui.layer;
            var checkbox = $(".checkbox");

            switch( type ) {
                case 1 :                    //更新快递公司
                    var data = [];
                    checkbox.each(function (index,item) {
                        if( item.checked ) {
                            var o = new Object();
                            var id = item.value;
                            var name = item.dataset.symbol;
                            o[id] = name;
                            data.push( o );
                        }
                    })

                    this.updateConfig({ sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , defaultLogisticsList : data });
                    break;
                case 2 :                    //免运费额度
                    if( !utils.pattern.number.test( this.defaultData.freeFreight ) ) {
                        layer.msg("请输入正确的数字");
                        return;
                    }
                    this.updateConfig({ sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , freeFreight : ( parseFloat( this.defaultData.freeFreight ).toFixed(2) ) * 100 });
                    break;
                default :                   //打印发货单
                    this.updateConfig({ sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , remark : this.defaultData.remark , picAddress : this.defaultData.picAddress })
            }
        } ,
        //更新发货设置
        updateConfig : function ( data ) {
            var layer = layui.layer;
            var that = this;

            http.Post( URL.expressUpdate , data ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            layer.msg("更新成功");
                            that.configQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询发货设置
        configQuery : function ( id ) {
            var layer = layui.layer;
            var that = this;

            this.defaultData.freeFreight = 0;
            this.defaultData.remark = "";
            this.defaultData.picAddress = "";
            http.Get( URL.configQuery , id ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.length ) {
                                var obj = data.result[0];
                                var df = obj.defaultLogistics;
                                var list = df.replace(/\[|\]|\{|\}/g,"").split(", ");
                                var o = new Object();

                                that.defaultData = obj;
                                that.defaultData.freeFreight = isNaN( that.defaultData.freeFreight / 100 ) ? 0 : that.defaultData.freeFreight / 100;
                                list.forEach(function ( item, index ) {
                                    var key = item.split("=")[0];
                                    var val = item.split("=")[1];

                                    o[key] = val;
                                })
                                that.configExpress( o );
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR: " , e );
                }
            })
        } ,
        //配置快递信息
        configExpress : function ( data ) {
            var $ = layui.jquery;
            var checkbox = $(".checkbox");

            checkbox.each(function (index,item) {
                var id = item.value;
                if( data.hasOwnProperty( id ) ) {
                    item.checked = true;
                }
            })
        } ,
        //新增地址提交
        deliverAdd : function () {
            var layer = layui.layer;
            var $ = layui.jquery;
            var params = this.newAddParams;
            var that = this;

            if( params.sellerLinkman == "" ) {
                layer.msg("请输入联系人");
                return;
            }
            if( params.province == "" ) {
                layer.msg("请选择省");
                return;
            }
            if( this.city && params.city == "" ) {
                layer.msg("请选择市");
                return;
            }
            if( this.county && params.area == "" ) {
                layer.msg("请选择区/县");
                return;
            }
            if( params.sellerAddress == "" ) {
                layer.msg("请输入街道地址");
                return;
            }
            if( params.sellerPhone == "" ) {
                layer.msg("请输入手机号");
                return;
            }
            if( !utils.pattern.phone.test( params.sellerPhone ) ) {
                layer.msg("请输入正确的手机号");
                return;
            }

            var url = null;
            //编辑入口

            if( this.edit ) {
                url = URL.delverUpdate;
                params.id = this.currModel.id;
            } else {            //新增入口
                url = URL.delverAdd;
                delete params.id;
            }
            http.Post( url , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.addNew = false;
                            that.deliverQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询地区
        queryZone : function ( lev ) {
            var layer = layui.layer;
            var that = this;

            http.Get( http.urls.logistics.zoneMore , lev ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.filterZoneTemplate( result , lev );
                            if( lev != 3 ) {
                                that.queryZone( ++lev );
                            }

                            break;
                        default :
                            layer.msg( data.msg );

                    }
                } catch ( e ) {
                    console.error("ERROR: " , e );
                }
            })
        } ,
        //查询模版
        deliverQuery : function ( id ) {
            var layer = layui.layer;
            var that = this;
            this.loading = true;
            http.Get( URL.delverQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
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
        //查询详细模版设置
        deliverDetail : function ( id ) {
            var layer = layui.layer,
                that = this;
            var params = this.newAddParams;

            http.Get( URL.delverDetail , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            params.sellerLinkman = result.sellerLinkman;
                            params.sellerAddress = result.sellerAddress;
                            params.sellerPhone = result.sellerPhone;
                            params.sellerCompany = result.sellerCompany;
                            params.province = result.province;
                            params.city = result.city;
                            params.area = result.area;
                            params.sellerAddress = result.sellerAddress;
                            //
                            that.addStr = result.province + "," + result.city + "," + result.area;
                            // that.city = result.city != "";
                            // that.county = result.area != "";
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR :" , e );
                }
            })
        } ,
        //删除模版
        delModel : function ( item ) {
            var layer = layui.layer;
            var that = this;
            layer.confirm("确认删除吗?",{ icon : 3 , title : "提示" }, function ( index ) {
                http.Get( URL.delverDel , item.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.deliverQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR: " , e );
                    }
                })
            })
        } ,
        //更新默认地址
        updateDef : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var radio = $(".isDefault");

            radio.each(function ( index , elem ) {
                if( elem.checked ) {
                    var item = that.list[index];

                    item.defaultAddress = 1;

                    http.Post( URL.delverUpdateDef , item ).done(function ( data ) {
                        try{
                            switch( data.httpCode ) {
                                case 200 :
                                    that.deliverQuery(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                    layer.msg("更新成功");
                                    break;
                                default :
                                    layer.msg( data.msg );
                            }
                        } catch ( e ) {
                            console.error("ERROR : " , e );
                        }
                    })
                }
            })
        } ,
        //筛选地区
        filterZoneTemplate : function ( data , lev ) {
            var that = this;

            switch( lev ) {
                case 1 :                //省数据
                    this.zone = this.zone.concat( data );
                    this.fullData( this.zone , ".prov" );
                    break;
                case 2 :                //市数据
                    this.zone.forEach(function (item,index) {
                        item.citys = [];
                        data.forEach(function ( val , key ) {
                            if( val.parentId == item.zoneId ) {
                                item.citys.push( val );
                            }
                        })
                    })
                    break;
                case 3 :                //区数据
                    this.zone.forEach(function ( item,index ) {
                        if( item.citys.length > 0 ) {
                            item.citys.forEach(function (  val , key ) {
                                val.citys = [];
                                data.forEach(function ( v , k ) {
                                    if( v.parentId == val.zoneId ) {
                                        val.citys.push( v );
                                    }
                                })
                            })
                        }
                    })
                    break;
                default :
            }

        } ,
        //填充数据
        fullData : function ( data , elem ) {
            var $ = layui.jquery;
            var el = $( elem );
            var form = layui.form;

            var str = "<option></option>";
            for( var i = 0, len = data.length; i < len; i ++ ) {
                str += "<option value=\""+ data[i].id +"\">"+ data[i].name +"</option>";
            }
            el.html( str );

             var t = setTimeout(function () {
                 form.render("select");
                 clearTimeout( t );
             })
        }
    }
})