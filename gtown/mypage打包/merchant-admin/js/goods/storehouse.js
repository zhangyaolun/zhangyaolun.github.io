var URL = http.urls.goods;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "已上架的商品" , linker : "./index.html" } ,
            { text : "仓库中的商品" , linker : "javascript:void(0)" } ,
            { text : "新增商品" , linker : "./publish.html" } ,

            // { text : "商品规格" , linker : "./spec.html" } ,
            { text : "图片空间" , linker : "./pic_room.html" } ,
        ] ,
        params : {
            index : 1 ,
            count : 10 ,
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            approvalType : 1
        } ,
        name : "" ,                                             //商品名称
        sellerNo : "" ,                                         //商家货号
        currPage : 1 ,
        limit : 10 ,
        //upper : true ,
        step : 0 ,
        big : false ,
        checkNum : 0 ,
        list : [] ,
        loading : false
    } ,
    mounted : function () {
        var laypage = layui.laypage;
        var element = layui.element,
            that = this;
        var $ = layui.jquery;

        element.on("tab(tab)",function ( data ) {
            var inputs = $(".layui-tab-item").find("input[type=checkbox]");
            var id = this.getAttribute("lay-id");
            that.params.approvalType = id;
            //that.upper = id == 5 ? true : false;
            that.queryProduct();

            inputs.each(function (index,item) {
                item.checked = false;
            })
        })

        if( Boolean( location.search ) ) {
            var tabId = utils.getHashCode("t");

            element.tabChange("tab", tabId );
        }

        this.queryClass();
    } ,
    methods : {
        showBig : function ( evt ) {
            var target = $( evt.target ).parents("td").find(".big-img");

            target.toggle();
        } ,
        //全选
        getAllGoods : function ( evt ) {
            var $ = layui.jquery;
            var tar = $( evt.target );
            var inputs = tar.parents(".layui-tab-item").find("input[type=checkbox]");
            var checked = tar[0].checked;

            this.checkNum = checked ? inputs.length - 2 : 0;
            inputs.each(function (index , item) {
                item.checked = checked;
            })
        } ,
        //单选
        check : function ( evt ) {
            var $ = layui.jquery;
            var tar = $( evt.target );
            var inputs = tar.parents(".layui-tab-item").find("input[type=checkbox]");
            var first = $(".first").get(0);
            var last = $(".last").get(0);

            if( tar[0].checked ) {
                this.checkNum ++;
            } else {
                this.checkNum --;
            }
            if( this.checkNum == inputs.length - 2 ) {
                first.checked = last.checked = true;
            } else {
                first.checked = last.checked = false;
            }
        } ,
        //删除商品
        delGood : function ( item ) {
            var layer = layui.layer;
            var that = this;
            var gTr = $(".goodsTr");

            var params = {
                listId : []
            }
            if( Boolean( item ) ) {
                params.listId.push( item.id );
            } else {
                gTr.each(function ( idx , tr ) {
                    var input = $( tr ).find("input[type=checkbox]");
                    if( input.get(0).checked ) {
                        params.listId.push( input.val() );
                    }
                })
            };
            if( !params.listId.length ) {
                layer.msg( "请选择要删除的商品" );
                return;
            }

            layer.confirm("确认删除吗?", {icon: 3, title:'提示'},function ( index ) {
                http.Post( URL.goodsDel , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryProduct();
                                layer.close( index );
                                break;
                            default :
                                layer.msg(data.msg);
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })
            })
            // var layer = layui.layer;
            // var that = this;
            //
            // layer.confirm("确认删除吗?", {icon: 3, title:'提示'},function ( index ) {
            //     var idList = [];
            //     idList.push( item.id );
            //     http.Post( URL.goodsDel , { listId : idList } ).done(function ( data ) {
            //         try{
            //             switch( data.httpCode ) {
            //                 case 200 :
            //                     that.queryProduct();
            //                     layer.close( index );
            //                     break;
            //                 default :
            //                     layer.msg(data.msg);
            //             }
            //         } catch ( e ) {
            //             console.error("ERROR : " , e );
            //         }
            //     })
            // })
        } ,
        //上架商品
        goodsUpLine : function () {
            var layer = layui.layer,
                that = this;
            var gTr = $(".goodsTr");
            var params = {
                listId : []
            };
            gTr.each(function ( idx , tr ) {
                var input = $( tr ).find("input[type=checkbox]");
                if( input.get(0).checked ) {
                    params.listId.push( input.val() );
                }
            });
            if( !params.listId.length ) {
                layer.msg("请选择要上架的商品");
                return;
            }
            //console.log( params.listId )
            layer.confirm("确认上架商品？",{ title : "提示" , icon : 3 },function ( idx ) {
                that.loading = true;
                http.Post( URL.goodsUpLine , params ).done(function ( data ) {
                    try {
                        switch ( data.httpCode ) {
                            case 200 :
                                that.queryProduct();
                                layer.close( idx );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                    that.loading = false;
                })
            })
        } ,
        //搜索
        search : function () {
            var layer = layui.layer,
                that = this,
                laypage = layui.laypage;
            var params = {

                like : {
                    name: this.fullSymbol( this.name ) ,
                    sellerNo : this.fullSymbol( this.sellerNo )
                } ,
                equalFields : {
                    approvalType : this.params.approvalType ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                    status : "DownShelf"
                } ,
                orderByName : "createTime" ,
                isDesc : true
            };
            this.loading = true;
            this.currPage = 1;
            http.Post( URL.goodsQuery , params , this.currPage , this.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.list = result.list;

                            var t = $.fn.zTree.getZTreeObj("zTree");
                            that.list.forEach(function (item,index) {
                                item.createTime = new Date( item.createTime ).format("yyyy-MM-dd");
                                item.price = ( item.price / 100 ).toFixed(2);
                                var path = t.getNodeByParam("id" , item.categoryId , null );
                                if( Boolean( path ) ) {
                                    item.classPath = path.getPath();
                                }
                            });

                            var t = setTimeout(function () {
                                var checkboxInputs = $(".layui-tab-item input[type=checkbox]");
                                checkboxInputs.each(function ( key , val ) {
                                    val.checked = false;
                                });
                                clearTimeout( t );
                            });

                            laypage.render({
                                elem: "paging",
                                count: Math.max( result.total,1 ) ,
                                limit : that.limit ,
                                curr : result.pageNum ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.queryProduct();
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
                that.loading = false;
            })
        } ,
        //批量删除
        delGroup : function ( item ) {
            var layer = layui.layer;
            var that = this;
            var gTr = $(".goodsTr");

            var params = {
                listId : []
            }
            if( Boolean( item ) ) {
                params.listId.push( item.id );
            } else {
                gTr.each(function ( idx , tr ) {
                    var input = $( tr ).find("input[type=checkbox]");
                    if( input.get(0).checked ) {
                        params.listId.push( input.val() );
                    }
                })
            }

            layer.confirm("确认删除吗?", {icon: 3, title:'提示'},function ( index ) {
                http.Post( URL.goodsDel , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryProduct();
                                layer.close( index );
                                break;
                            default :
                                layer.msg(data.msg);
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })
            })
        } ,
        //刷新
        refresh : function () {
            this.search();
        } ,
        //查询商品列表
        queryProduct : function () {
            var layer = layui.layer,
                laypage = layui.laypage ,
                that = this;

            this.loading = true;
            http.Get( URL.queryProduct , this.currPage , this.limit , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , this.params.approvalType , "DownShelf" ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.list = result.list;

                            var t = $.fn.zTree.getZTreeObj("zTree");
                            that.list.forEach(function (item,index) {
                                item.createTime = new Date( item.createTime ).format("yyyy-MM-dd");
                                item.price = ( item.price / 100 ).toFixed(2);
                                var path = t.getNodeByParam("id" , item.categoryId , null );
                                if( Boolean( path ) ) {
                                    item.classPath = path.getPath();
                                }
                            });

                            var t = setTimeout(function () {
                                var checkboxInputs = $(".layui-tab-item input[type=checkbox]");
                                checkboxInputs.each(function ( key , val ) {
                                    val.checked = false;
                                });
                                clearTimeout( t );
                            });

                            laypage.render({
                                elem: "paging",
                                count: Math.max( result.total,1 ) ,
                                limit : that.limit ,
                                curr : result.pageNum ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.queryProduct();
                                        }
                                    }
                                }
                            });
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR: " , e);
                }
                that.loading = false;
            })
        } ,
        //获取商品类目
        queryClass : function () {
            var that = this,
                layer = layui.layer;

            that.loading = true;
            http.Get( http.urls.goods.classQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
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
                                }
                            };

                            var t = $.fn.zTree.init($("#zTree"), setting, result );
                            that.queryProduct();

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "REQUEST ERROR " , e );
                }
                that.loading = false;
            })
        } ,
        //前后加%号
        fullSymbol : function ( str ) {
            return "%" + str + "%";
        } ,
    } ,
})