var URL = http.urls.logistics;
var content = new Vue({
    el : "#content" ,
    data : {
        loading : false ,
        loading2 : false ,
        navData : [
            { text : "已售订单管理" , linker : "./index.html" } ,
            // { text : "虚拟对码订单" , linker : "./fictitious_order.html" } ,
            { text : "发货" , linker : "./deliver.html" } ,
            { text : "发货设置" , linker : "./deliver_config.html" } ,
            { text : "物流工具" , linker : "./tool.html" } ,
            { text : "售卖区域" , linker : "javascript:void(0)" } ,
            { text : "导入物流单" , linker : "./import.html" }
        ] ,
        areaModels : [] ,                   //售卖区域模版
        edit : false ,                      //编辑入口
        custom : false ,                    //编辑&自定义售卖区域入口
        zone : [] ,                          //区域列表
        modelName : "" ,                    //模版名称
        areaRadio : "1" ,                   //区域模式
        checkNum : 0 ,                       //复选框选择数量
        provNum : 0 ,                        //省份选择数量
        newModel : false ,                  //是否新增
        editParams : {                      //修改参数
            id : "" ,
            templateId : "" ,
            name : "" ,
            area : "1" ,
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            zoneTemplateList : []
        }
    } ,
    created : function () {
        this.queryArea(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);

    } ,
    updated : function () {

    } ,
    mounted : function () {
        var form = layui.form;
        var that = this;

        form.render();
        form.on("radio(area)" , function ( data ) {
            if( data.value == 2 ) {
                that.custom = true;

                if( that.zone.length <= 0 ) {
                    that.queryZone( null , 1 );
                }

            } else {
                that.custom = false;
            }
            that.areaRadio = data.value;
        })

    } ,
    methods : {
        toEdit : function ( item , isNew ) {
            var form = layui.form,
                $ = layui.jquery;

            this.edit = true;
            if( isNew ) {
                this.modelName = "";
                this.newModel = true;

                this.editParams.id = "";
                this.editParams.templateId = "";
                this.areaRadio = "1";
            } else {
                var input = $(".radio").find("input[type=radio]");
                var ipts = $(".custom-table input[type=checkbox]");
                for( var i = 1; i < ipts.length;i ++ ) {
                    ipts[i].checked = false;
                }
                input.each(function (idx,elem) {
                    if( elem.value == item.area ) {
                        elem.checked = true;
                    }
                })
                this.modelName = item.name;
                this.newModel = false;

                this.editParams.id = item.id;
                this.editParams.templateId = item.templateId;
                this.editParams.name = item.name;

                this.areaRadio = item.area;

                this.custom = item.area == 2 ? true : false;


                if( this.zone.length <= 0 && item.area == 2 ) {
                    this.queryZone( item.templateId , 1 );
                } else {
                    this.getDetail( item.templateId , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                }
            }

            var t = setTimeout(function () {
                form.render("radio");
                clearTimeout( t );
            })

        } ,
        editBack : function () {
            this.edit = false;
            this.custom = false;
        } ,
        //查询详细设置
        getDetail : function ( id , sid ) {
            var layer = layui.layer;
            var that = this;
            var $ = layui.jquery;
            var input = $(".custom-table input[type=checkbox]");

            http.Get( URL.areaDetail , id , sid ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );


                            result.forEach(function (item,index) {
                                for( var i = 1, len = input.length; i < len;i ++ ) {
                                    if( item.zoneName == input[i].value ) {
                                        input[i].checked = true;
                                    }
                                }
                            });
                            for( var i = 1, len = input.length; i < len; i ++ ) {
                                if( input[i].checked ) {
                                    var o = {
                                        zoneName : $(input[i]).parents("label").text() ,
                                        zoneId : $(input[i]).val() ,
                                        parentId : $(input[i]).hasClass("row") ? "1" : $(input[i]).parents("tr").find(".row").val() ,
                                        id : $(input[i]).attr("data-id")
                                    }
                                    that.editParams.zoneTemplateList.push( o );
                                }
                            }
                            console.log( that.editParams.zoneTemplateList )
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询区域列表
        queryZone : function ( id , lev ) {
            var layer = layui.layer,that = this;

            this.loading2 = true;
            http.Get( URL.zoneMore , lev ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.filterZoneTemplate( result , id ,lev );
                            if( lev != 3 ) {
                                that.queryZone( id , ++lev );
                            }
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
        //查询售卖区域
        queryArea : function ( id ) {
            var that = this,
                layer = layui.layer;

            this.loading = true;
            http.Get( URL.areaQuery , id ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result instanceof Array && result.length ) {
                                that.areaModels = result;
                            } else {
                                that.areaModels = [];
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "ERROR: " , e );
                }
                that.loading = false;
            })
        } ,
        //删除售卖区域
        delArea : function ( item ) {
            var layer = layui.layer,
                that = this;

            layer.confirm("确认删除吗?",{ title : "提示" , icon : 3 },function ( index ) {
                this.loading = true;
                http.Get( URL.areaDel , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , item.templateId ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryArea(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    }
                })
            })

        } ,
        //筛选地区
        filterZoneTemplate : function ( data , id , lev ) {
            var that = this;

            switch( lev ) {
                case 1 :                //省数据
                    this.zone = this.zone.concat( data );
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

            var t = setTimeout(function () {
                if( Boolean( id ) && lev == 3 ) {
                    that.getDetail( id , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                }

                clearTimeout( t );
            })

        } ,
        //提交模版
        submit : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;

            var checkbox = $(".custom-table").find("input[type=checkbox]");
            var params = [];

            if( this.newModel ) {
                if( !Boolean( this.modelName ) ) {
                    layer.msg("请输入模版名称");
                    return;
                }
                params.push({
                    name : this.modelName ,
                    area : this.areaRadio ,
                    zoneName : "中国" ,
                    zoneId : "1" ,
                    parentId : "0" ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                });
                for( var i = 1, len = checkbox.length; i < len; i ++ ) {
                    if( checkbox[i].checked ) {
                        var o = {
                            name : this.modelName ,
                            area : this.areaRadio ,
                            zoneName : $(checkbox[i]).parents("label").text() ,
                            zoneId : $(checkbox[i]).val() ,
                            parentId : $(checkbox[i]).hasClass("row") ? "1" : $(checkbox[i]).parents("tr").find(".row").val() ,
                            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                        }
                        params.push( o );
                    }
                }

                this.loading = true;
                http.Post( URL.areaAdd , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.edit = false;
                                that.custom = false;
                                that.queryArea(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    };
                    that.loading = false;
                });
            } else {
                this.editParams.area = this.areaRadio;
                for( var i = 1, len = checkbox.length; i < len; i ++ ) {
                    if( !checkbox[i].checked ) {
                        for( var j = 0,templateList = this.editParams.zoneTemplateList; j < templateList.length; j ++) {
                            if( templateList[j].id == $(checkbox[i]).attr("data-id") ) {
                                templateList.splice( j , 1 , { id : templateList[j].id } );
                            }
                        }
                    }
                }
                for( var i = 1, len = checkbox.length; i < len; i ++ ) {
                    if( checkbox[i].checked ) {
                        var o = {
                            zoneName : $(checkbox[i]).parents("label").text() ,
                            zoneId : $(checkbox[i]).val() ,
                            parentId : $(checkbox[i]).hasClass("row") ? "1" : $(checkbox[i]).parents("tr").find(".row").val() ,
                            id : $(checkbox[i]).attr("data-id")
                        }
                        this.editParams.zoneTemplateList.push( o );
                    }
                }

                var obj = {},arr = [];
                for( var i = 0,templateList = this.editParams.zoneTemplateList; i < templateList.length; i ++ ) {
                    if( !obj[templateList[i].id] ) {
                        obj[templateList[i].id] = templateList[i];
                    }
                }
                for( var attr in obj ) {
                    arr.push( obj[attr] );
                }
                console.log( arr )
                this.editParams.zoneTemplateList = arr;
                this.loading = true;
                http.Post( URL.areaUpdate , this.editParams ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.edit = false;
                                that.custom = false;
                                that.queryArea(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "REQUEST ERROR " , e );
                    };
                    that.loading = false;
                });
            }

        } ,
        //全选
        checkAll : function ( evt ) {
            var $ = layui.jquery;
            var $this = $( evt.target ).parents("td").find("input[type=checkbox]");
            var checkbox = $( evt.target ).parents("tbody").find("input[type=checkbox]");
            var prov = $(".row");

            for( var i = 1, len = checkbox.length; i < len; i ++ ) {
                checkbox[i].checked = $this[0].checked;
            }
            prov.each(function ( k , v ) {
                var len = $(v).parents("tr").find("input[type=checkbox]").size() - 1;
                v.num = $this[0].checked ? len : 0;
            })

            this.checkNum = $this[0].checked ? checkbox.length - 1 : 0;
            //this.provNum = $this[0].checked ? this.zone.length : 0;
        } ,
        //单选
        check : function ( evt ) {
            var $ = layui.jquery;
            var checkAll = $(".checkAll").find("input[type=checkbox]");
            var checkbox = $( evt.target ).parents("tbody").find("input[type=checkbox]");
            var $this = evt.target.nodeName.toLowerCase() == "input" ? $( evt.target ) : $( evt.target ).find("input[type=checkbox]");
            var prov = $this.parents("tr").find(".row")[0];
            var len = $this.parents("td").find("input[type=checkbox]").size();

            if( $this[0].checked ) {
                this.checkNum ++;
                prov.num = typeof prov.num === "number" ? prov.num + 1 : 1;
                if( this.checkNum == checkbox.length - 1 ) {
                    checkAll[0].checked = true;
                }
                if( prov.num == len ) {
                    prov.checked = true;
                }
            } else {
                prov.num = typeof prov.num === "number" ? prov.num - 1 : 0;
                checkAll[0].checked = false;
                prov.checked = false;
                this.checkNum --;
            }
        } ,
        //选中省份
        checkParent : function ( evt ) {
            var $ = layui.jquery;
            var checkAll = $(".checkAll").find("input[type=checkbox]");
            var checkbox = $( evt.target ).parents("tr").find("input[type=checkbox]");
            var $this = evt.target.nodeName.toLowerCase() == "input" ? $( evt.target ) : $( evt.target ).find("input[type=checkbox]");
            var len = $this.parents("tr").find("input[type=checkbox]").size() - 1;
            var ipts = $this.parents("tbody").find("input[type=checkbox]");

            this.checkNum = $this[0].checked ? this.checkNum + checkbox.size() : this.checkNum - checkbox.size();
            $this[0].num = $this[0].checked ? len : 0;
            for( var i = 0, len = checkbox.length; i < len; i ++ ) {
                checkbox[i].checked = $this[0].checked;
            }
            if( this.checkNum == ipts.size() - 1 ) {
                checkAll[0].checked = true;
            } else {
                checkAll[0].checked = false;
            }

        }
    }
})
