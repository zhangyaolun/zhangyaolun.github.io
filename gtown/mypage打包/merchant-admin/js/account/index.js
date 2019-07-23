var URL = http.urls.account;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "权限组" , linker : "javascript:void(0)" } ,
            { text : "子账号" , linker : "./child.html" } ,
            { text : "操作日志" , linker : "./operate_log.html" }
        ] ,
        params : {
            groupName : "" ,
            sellerId : "" ,
            useSellerRoleGroupList : []
        } ,
        groupList : [] ,                                            //权限组
        powerList : [] ,                                            //全部菜单
        currGroup : {} ,                                            //当前编辑组
        checkGroupLen : 0 ,                                         //组选数量
        isUpdate : false ,                                          //更新状态
        add : false ,
        loading : false ,
        loading2 : false
    } ,
    mounted : function () {
        this.getPowerGroup();

        this.submit();
        this.getPower();
    } ,
    methods : {
        addPower : function () {
            this.add = true;
            this.params.groupName = "";
            this.isUpdate = false;
        } ,
        back : function () {
            this.add = false;
        } ,
        //查询权限组
        getPowerGroup : function () {
            var layer = layui.layer,
                that = this;

            this.loading = true;
            http.Get( URL.powerGroup , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.groupList = result;
                            } else {
                                that.groupList = [];
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
        //查询所有权限
        getPower : function () {
            var layer = layui.layer,
                that = this;

            that.loading2 = true;
            http.Get( URL.menuList ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.powerList = that.filterMenu( result );
                            } else {
                                that.powerList = [];
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "ERROR : " , e  );
                }
                that.loading2 = false;
            })
        } ,
        //筛选菜单
        filterMenu : function ( data ) {
            var result = [];
            data.forEach(function (item,index) {
                if( item.menuLev == 1 ) {
                    item.subMenu = [];
                    for( var i = 0, len = data.length; i < len; i ++ ) {
                        if( Boolean( data[i].menuId ) && data[i].menuId == item.id ) {
                            item.subMenu.push( data[i] );
                        }
                    }
                    result.push( item );
                }
            })
            return result;
        } ,
        //全选
        checkAll : function ( evt ) {
            var $ = layui.jquery,
                layer = layui.layer;
            var first = $(".checkAll");
            var inputs = first.parents("table").find("input[type=checkbox]");

            inputs.each(function (index,item) {
                item.checked = first.get(0).checked;
            })
            this.checkGroupLen = first.get(0).checked ? this.powerList.length : 0;
        } ,
        //选组
        checkGroup : function ( evt ) {
            var $ = layui.jquery;
            var tar = evt.target.nodeName.toLowerCase() == "input" ? $( evt.target ) : $( evt.target ).find("input[type=checkbox]");
            var inputs = tar.parents("th").next().find("input[type=checkbox]");
            var first = $(".checkAll");

            inputs.each(function (index,item) {
                item.checked = tar.get(0).checked;
            })
            if( tar.get(0).checked ) {
                tar.attr("listen" , inputs.length );
                this.checkGroupLen ++;
                if( this.checkGroupLen == this.powerList.length ) {
                    first.get(0).checked = true;
                }
            } else {
                tar.attr("listen" , 0 );
                this.checkGroupLen --;
                first.get(0).checked = false;
            }
        } ,
        //单选
        check : function ( evt ) {
            var $ = layui.jquery;
            var tar = evt.target.nodeName.toLowerCase() == "input" ? $( evt.target ) : $( evt.target ).find("input[type=checkbox]");
            var first = $(".checkAll");
            var inputs = tar.parent().parent().find("input[type=checkbox]");
            var parent = tar.parent().parent().prev().find("input[type=checkbox]");

            if( tar.get(0).checked ) {
                parent.attr("listen" , Number( parent.attr("listen") ) + 1 );
                if( parent.attr("listen") == inputs.length ) {
                    parent.get(0).checked = true;
                    this.checkGroupLen ++;
                    if( this.checkGroupLen == this.powerList.length ) {
                        first.get(0).checked = true;
                    }
                }
            } else {
                parent.attr("listen" , Number( parent.attr("listen") ) - 1 );
                parent.get(0).checked = false;
                this.checkGroupLen --;
            }
        } ,
        //提交数据
        submit : function () {
            var $ = layui.jquery,
                that = this,
                layer = layui.layer;
            var form = layui.form;

            form.on("submit(menu)",function ( data ) {
                var inputs = $(".box-table").find("input[type=checkbox]");
                var params = that.params;
                var url;

                if( that.isUpdate ) {
                    delete params.sellerId;
                    params.id = that.currGroup.id;
                    url = URL.updatePowerGroup;
                } else {
                    delete params.id;
                    params.sellerId = JSON.parse( sessionStorage.getItem("userInfo") ).sellerId;
                    url = URL.addPowerGroup;
                }


                inputs.each(function (index,item) {
                    if( index != 0 ) {
                        if( item.checked ) {
                            var o = {
                                menuId : item.value ,
                                menuName : item.getAttribute("menuname")
                            }
                            params.useSellerRoleGroupList.push( o );
                        }
                    }
                })
                that.loading2= true;

                http.Post( url , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.add = false;
                                that.getPowerGroup();
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                    that.loading2 = false;
                })
            })
        } ,
        //删除组
        delGroup : function ( item ) {
            var layer = layui.layer,
                that = this;

            layer.confirm("确认删除吗?",{ icon : 3 , title : "提示" } , function ( index ) {
                that.loading = true;
                http.Get( URL.delPowerGroup , item.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.getPowerGroup();
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })
            })
        } ,
        //编辑权限组
        edit : function ( item ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;

            that.add = true;
            that.isUpdate = true;
            that.params.groupName = item.groupName;
            that.currGroup = item;
            http.Get( URL.queryPower , item.id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            var inputs = $(".box-table").find("input[type=checkbox]");

                            result.forEach(function (item,index) {
                                inputs.each(function (key,val) {
                                    if( val.value == item.menuId ) {
                                        val.checked = true;
                                    }
                                })
                            })
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        }
    }
})