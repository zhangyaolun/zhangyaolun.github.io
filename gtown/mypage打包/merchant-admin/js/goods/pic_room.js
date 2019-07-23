var URL = http.urls.goods;
var content = new Vue({
    el : "#content" ,
    data : {
        loading : false ,
        navData : [
            { text : "已上架的商品" , linker : "./index.html" } ,
            { text : "仓库中的商品" , linker : "./storehouse.html" } ,
            { text : "新增商品" , linker : "./publish.html" } ,

            // { text : "商品规格" , linker : "./spec.html" } ,
            { text : "图片空间" , linker : "javascript:void(0)" } ,
        ] ,
        defTab : true ,                             //默认分组
        picSpace : false ,
        groupList : [] ,                            //图片空间分组
        currGroup : {} ,                            //当前图片分组
        pic : {
            list : []
        } ,                                           //分组图片
        picRow : 0 ,                                //图片行数 ,
        picCol : 5 ,                                //列数
        currPage : 1 ,                              //当前页数
        limit : 10 ,                                 //数据截至 ,
        checkNum : 0 ,                             //复选框勾选数量
    } ,
    mounted : function () {
        var that = this;
        var element = layui.element,
            $ = layui.jquery,
            layer = layui.layer;


        element.on("tab(tab)", function( data ){
            var $ = layui.jquery;
            var checkbox = $(".layui-show").find("input[type=checkbox]");

            that.currGroup = that.groupList[data.index];

            if( this.getAttribute("g-id") != "未分组" ) {
                that.defTab = false;
            } else {
                that.defTab = true;
            }
            checkbox.each(function (index,elem) {
                elem.checked = false;
                that.checkNum = 0;
            })
            that.queryPic(1);
        });

        bus.$on("uploadSuccess",function () {
            that.picSpace = false;
            layer.closeAll();
            that.queryPic( that.currPage );
        })


        this.queryGroup(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);


    } ,
    methods : {
        uploadBtn : function () {
            var layer = layui.layer,
                that = this;

            that.picSpace = true;
            var t = setTimeout(function () {

                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["80%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function () {
                        //传递事件
                        bus.$emit("repGroup");

                    } ,
                    cancel : function ( index , el ) {
                        bus.$emit("close");
                        that.picSpace = false;
                    }
                })
                clearTimeout( t );
            },20)

        }  ,
        //查询图片空间分组
        queryGroup : function ( id ) {
            var that = this,
                element = layui.element;


            http.Get( URL.picGroupQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.groupList = result;
                                result.forEach(function ( item ,index ) {
                                    if( item.picGroupName == "未分组" ) {
                                        that.currGroup = item;
                                        //that.defTab = true;
                                    }
                                });
                                if( !that.currGroup.hasOwnProperty("picGroupId") ) {
                                    that.currGroup = result[0];
                                };

                                that.defTab = that.currGroup.picGroupName == "未分组";

                                var t = setTimeout(function () {
                                    element.tabChange("tab", that.currGroup.picGroupId );
                                    clearTimeout( t );

                                });

                                that.queryPic( that.currPage );
                            } else {
                                that.groupList = [];
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR: " , e);
                }

            })
        } ,
        //删除图片空间分组
        delGroup : function () {
            var element = layui.element,
                layer = layui.layer;
            var that = this;

            console.log( this.defTab )
            if( this.defTab ) {
                layer.alert("默认分组不可删除");
                return;
            }

            layer.confirm("确认删除吗？",{ icon : "3" , title : "提示" } ,function ( index ) {
                http.Get( URL.picGroupDel , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , that.currGroup.id , that.currGroup.picGroupId ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.close( index );
                                that.queryGroup(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
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
        //分组添加
        addGroup : function () {
            var element = layui.element,
                layer = layui.layer;
            var that = this;


            layer.prompt({
                formType : 0 ,
                title : "新建分组"
            },function (value, index, elem) {
                var data = {
                    picGroupName : value ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
                };

                http.Post( URL.picGroupAdd , data ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryGroup(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                layer.close(index);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error( "ERROR: " , e );
                    }
                })

                // element.tabAdd('tab', {
                //     title: value ,
                //     content: "<div class='empty'><i class='layui-icon'>&#xe60d;\n</i><br />空空如也</div>" ,
                //     id: index
                // })

            })
        } ,
        //分组重命名
        reNameGroup : function () {
            var element = layui.element,
                layer = layui.layer;
            var that = this;
            layer.prompt({
                formType : 0 ,
                title : "重命名"
            },function ( value , index , elem ) {
                var data = {
                    id : that.currGroup.id ,
                    picGroupName : value
                }

                http.Post( URL.picGroupReName , data ).done(function ( data ) {
                    try {
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryGroup(JSON.parse( sessionStorage.getItem("userInfo") ).sellerId);
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR: " , e );
                    }
                })
            });
        } ,
        //查询图片
        queryPic : function ( currPage ) {
            var layer = layui.layer,
                laypage = layui.laypage,
                that = this;

            var data = {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                picGroupId : this.currGroup.picGroupId
            }
            this.loading = true;
            http.Post( URL.picQuery , data , currPage , that.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.pic = result;

                            that.picRow = Math.ceil( result.list.length / 5 );

                            laypage.render({
                                elem : "paging" ,
                                count : Math.max( result.total , 1 ) ,
                                limit : that.limit ,
                                curr : result.pageNum ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.queryPic( that.currPage );
                                        }
                                    }
                                }
                            });

                            var $ = layui.jquery;
                            var checkbox = $(".table").find("input[type=checkbox]");
                            checkbox.each(function ( index , elem ) {
                                elem.checked = false;
                            })
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch (e) {
                    console.error( "ERROR: " , e );
                }
                that.loading = false;
            })
        } ,
        //图片移动分组
        repGroup : function ( item , bol ) {
            var layer = layui.layer,
                element = layui.element,
                $ = layui.jquery,
                that = this;


            var id = item.id,
                picAlias = "",
                picGroupId = "";
            if( bol ) {
                layer.prompt({
                    formType : 0 ,
                    value : "" ,
                    title : "改名" ,
                    area : "200px"
                },function (value, index, elem) {
                    var li = $(".tabs li");
                    li.each(function (idx , elem) {
                        if( $(elem).hasClass("layui-this") ) {
                            picGroupId = $( elem ).attr("lay-id");
                        }
                    })
                    picAlias = Base64.encode( value );

                    http.Get( URL.picReName, id, picGroupId , picAlias ).done(function (data) {
                        try{
                            switch( data.httpCode ) {
                                case 200 :
                                    //layer.msg("修改成功");
                                    that.queryPic( that.currPage );
                                    layer.close( index );
                                    break;
                                default :
                                    layer.msg( data.msg );
                            }
                        } catch (e) {
                            console.error("ERROR: " , e );
                        }
                    })
                })
            } else {
                if( !Array.isArray( item.picAlias ) ) {
                    picAlias = Base64.encode( item.picAlias );
                } else {
                    picAlias = item.picAlias;
                }
                layer.open({
                    type: 1,
                    title: "选择分组",
                    content: $(".groupList"),
                    btn: ["确定", "取消"],
                    area: "200px",
                    yes: function (index, layero) {
                        var label = $(".groupList").find("label");
                        label.each(function (idx, elem) {
                            var radio = $(elem).find("input[type=radio]");
                            if (radio[0].checked) {
                                picGroupId = $(radio).val();

                                http.Get(URL.picReName, id, picGroupId, picAlias).done(function (data) {
                                    try {
                                        switch (data.httpCode) {
                                            case 200 :
                                                that.queryPic(that.currPage);
                                                layer.close(index);
                                                break;
                                            default :
                                                layer.msg(data.msg);
                                        }
                                    } catch (e) {
                                        console.error("ERROR: ", e);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        } ,
        //批量修改分组
        repAllGroup : function () {
            var $ = layui.jquery;
            var imgsId = [];
            var imgsAlias = [];
            var checkbox = $(".table").find("input[type=checkbox]");
            var layer = layui.layer;


            for (var i = 0, len = this.pic.list.length; i < len; i++) {
                if (checkbox[i].checked) {
                    imgsId.push(this.pic.list[i].id);
                    imgsAlias.push(Base64.encode(this.pic.list[i].picAlias));
                }
            }
            if (imgsId.length) {
                this.repGroup({id: imgsId, picAlias: imgsAlias});
            } else {
                layer.msg("请选择要移动分组的图片");
            }
        }


         ,
        //图片删除
        picDel : function ( item ) {
            var layer = layui.layer,
                element = layui.element,
                $ = layui.jquery,
                that = this;

            var id = item.id;
            layer.confirm("确认删除吗？",{ icon : "3" , title : "提示" },function ( idx ) {
                http.Get( URL.picDel , id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200:
                                layer.close( idx );
                                that.queryPic( that.currPage );
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
        //批量删除
        delPics : function () {
            var $ = layui.jquery;
            var imgsId = [];
            var checkbox = $(".table").find("input[type=checkbox]");
            var layer = layui.layer;

            for( var i = 0, len = this.pic.list.length; i < len; i ++ ) {
                if( checkbox[i].checked ) {
                    imgsId.push( this.pic.list[i].id );
                }
            }

            if( imgsId.length ) {
                this.picDel({ id : imgsId });
            } else {
                layer.msg("请选择要删除的图片");
            };

        } ,
        //全选
        checkAll : function ( evt ) {
            var $ = layui.jquery;
            var checkbox = $(".table").find("input[type=checkbox]");
            var all = $( evt.target ).parents(".layui-breadcrumb").find(".checkAll");


            this.checkNum = all[0].checked ? this.pic.list.length : 0;
            for( var i = 0, len = this.pic.list.length; i < len; i ++ ) {
                checkbox[i].checked = all[0].checked;
            }
        } ,
        //单选
        check : function ( evt ) {
            var $ = layui.jquery;
            var tar = $( evt.target ).parents("td").find("label").find("input[type=checkbox]");
            var all = $( ".checkAll" );

            if( tar[0].checked ) {
                this.checkNum ++;
                if( this.checkNum == this.pic.list.length ) {
                    all[0].checked = true;
                }
            } else {
                this.checkNum --;
                all[0].checked = false;
            }
        } ,
        //复制成功
        copyOk : function () {
            var layer = layui.layer;
            layer.msg( "复制成功" );
        } ,
        //复制失败
        copyErr : function () {
            var layer = layui.layer;
            layer.msg( "复制失败" );
        }
    } ,
})
