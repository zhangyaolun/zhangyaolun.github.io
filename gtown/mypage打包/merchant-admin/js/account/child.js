var URL = http.urls.account;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "权限组" , linker : "./index.html" } ,
            { text : "子账号" , linker : "javascript:void(0)" } ,
            { text : "操作日志" , linker : "./operate_log.html" }
        ] ,
        params : {
            username:"",
            password:"",
            sellerId:"",
            groupId:"",
            subaccount : 1
        } ,
        loading : false ,
        groupList : [] ,
        accountList : [] ,                      //子账号集合
        currAccount : {} ,                      //当前编辑的帐号
        add : false ,
        edit : false ,                          //编辑入口
    } ,
    mounted : function () {
        var form = layui.form;
        var that = this;

        this.getPowerGroup();
        form.on("select(account)",function ( data ) {
            var val = data.elem.value;
            that.params.groupId = val;
        })
        this.submit();

    } ,
    methods : {
        toAdd : function ( item ) {
            var form = layui.form;
            var $ = layui.jquery;
            var opts = $(".accountGroup option");

            this.add = true;

            if( item ) {
                this.edit = true;
                this.currAccount = item;
                this.params.username = item.username;
                this.params.groupId = item.groupId;
                opts.each(function (index,opt) {
                    if( opt.value == item.groupId ) {
                        opt.selected = true;
                    }
                })
            } else {
                this.edit = false;
                this.params.username = "";
                this.params.groupId = "";
               // opts[0].selected = true;
            }


            var t = setTimeout(function () {
                form.render();
                clearTimeout( t );
            });
        } ,
        editBack : function () {
            this.add = false;
            this.custom = false;
        } ,
        //查询权限组
        getPowerGroup : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;


            this.loading = true;
            http.Get( URL.powerGroup , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.groupList = result;
                                var acc = $(".accountGroup");
                                var str = "<option></option>";
                                result.forEach(function (item,index) {
                                    str += "<option value=\""+ item.id +"\">"+ item.groupName +"</option>";
                                })
                                acc.html( str );


                                that.queryAccount( result );
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
        //查询子账号
        queryAccount : function ( list ) {
            var layer = layui.layer,
                that = this;

            this.loading = true;
            http.Get( URL.querycChAccount , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                result.forEach(function (item,index) {
                                    list.forEach(function (val,key) {
                                        if( item.groupId == val.id ) {
                                            item.gName = val.groupName;
                                        }
                                    })
                                })
                                that.accountList = result;
                            } else {
                                that.accountList = [];
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
        //删除子账号
        delAcc : function ( item ) {
            var layer = layui.layer,
                that = this;
            
            layer.confirm("确认删除吗?",{ icon : 3 , title : "提示" },function (index) {
                that.loading = true;
                http.Get( URL.delAccount , item.id ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.queryAccount( that.groupList );
                                layer.close( index );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch (e) {
                        console.error("ERROR : " , e );
                    }
                    that.loading = false;
                })
            })
        } ,
        //提交数据
        submit : function () {
            var form = layui.form;
            var layer = layui.layer,
                that = this;
            var url;

            form.on("submit(newAccount)",function () {
                var params;
                if( that.edit ) {
                    params = {
                        id : that.currAccount.id ,
                        groupId : that.params.groupId
                    }
                    url = URL.editAccount;
                } else {
                    params = that.params;
                    params.sellerId = JSON.parse( sessionStorage.getItem("userInfo") ).sellerId;
                    url = URL.addAccount;
                }
                http.Post( url , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                that.add = false;
                                that.edit = false;
                                that.queryAccount( that.groupList );
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })

            })
        }
    }
})