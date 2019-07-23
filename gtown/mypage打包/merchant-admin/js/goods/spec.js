var URL = http.urls.goods;
var content = new Vue({
    el : "#content" ,
    data : {
        loading : false ,
        navData : [
            { text : "出售中的商品" , linker : "./index.html" } ,
            { text : "商品发布" , linker : "./publish.html" } ,
            { text : "仓库中的商品" , linker : "./storehouse.html" } ,
            // { text : "商品规格" , linker : "javascript:void(0)" } ,
            { text : "图片空间" , linker : "./pic_room.html" } ,
        ] ,
        treeData : [] ,                             //
        currData : {} ,                            //当前选中的树
        specs : { attr : [] } ,
    } ,
    mounted : function () {
        this.queryClass();
    } ,
    methods : {
        //获取商品类目
        queryClass : function () {
            var that = this,
                layer = layui.layer;
            http.Get( URL.classQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.treeData = result;

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

                                            that.querySpec( data.id );
                                        }
                                    }
                                }
                            };

                            var t = $.fn.zTree.init($("#zTree"), setting, that.treeData );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "REQUEST ERROR " , e );
                }
            })
        } ,
        //查询商品规格
        querySpec : function ( id ) {
           var layer = layui.layer,
                that = this;

           this.loading = true;
           http.Get( URL.specQuery , id ).done(function ( data ) {
               try{
                   switch( data.httpCode ) {
                       case 200 :
                           var result = JSON.parse( JSON.stringify( data.result ) );


                           if( result.length ) {
                               var str = result[0].attr.replace(/=/g,":").replace(/\[|\]/g,"");
                               var arr = str.split(", {");
                               var item = [];
                               for( var i = 0; i < arr.length; i ++ ) {
                                   var s = arr[i].replace(/\{|\}/g,"").split(", ");
                                   var o = new Object();
                                   for( var j = 0; j < s.length; j ++ ) {
                                       var keyVal = s[j].split(/:/g);
                                       o[keyVal[0]] = keyVal[1];
                                   }
                                   item.push( o );
                               }
                               result[0].attr = item;

                               that.specs = result[0];
                               console.log( that.specs )
                           }

                           break;
                       default :
                           layer.msg( data.msg );
                   }
               } catch ( e ) {
                    console.error("ERROR :" , e );
               }
               that.loading = false;
           })
        } ,
        //删除规格
        delSpec : function ( item , idx ) {
            var layer = layui.layer;
            var that = this;


            layer.confirm("确定删除吗？",{
                icon: 3,
                title:'提示'
            },function ( index ) {
                that.specs.attr.splice( idx , 1 );
                var data = {
                    id : that.specs.id ,
                    attrList : that.specs.attr  ,
                }

                http.Post( URL.specDel , data ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200:
                                that.querySpec( that.currData.id );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch (e) {
                        console.error("ERROR: " , e );
                    }
                })
                layer.close( index );
            })
        } ,
        //保存规格值
        submit : function () {
            var $ = layui.jquery;
            var layer = layui.layer;
            var specs = $(".specBody tr");
            var that = this;

            //console.log( this.currData )
            var data = {
                name : "" ,
                attrList : [] ,
                categoryId  : that.currData.id
            }
            var attr = [];

            for( var i =0, len = specs.length; i < len; i ++ ) {
                var sorting = $(specs[i]).find(".sorting").val();
                var name = $(specs[i]).find(".name").val()

                if( sorting == "" || name == "" ) {
                    layer.msg("请填写第 "+ (i + 1) +" 个的规格");
                    return;
                }

                var o = {
                    name : name ,
                    sorting : sorting
                }
                data.attrList.push( o );
            }
            console.log( JSON.stringify( data ) )
            http.Post( URL.specAdd , data ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.querySpec( that.currData.id );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
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
        //添加规格
        addSpec : function () {
            this.specs.attr.push({});
        }

    }
})