var URL = http.urls.account;

var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "权限组" , linker : "./index.html" } ,
            { text : "子账号" , linker : "./child.html" } ,
            { text : "操作日志" , linker : "javascript:void(0)" }
        ] ,
        list : [] ,
        limit : 10 ,
        currPage : 1 ,
        params : {
            equalFields :{
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId
            },
            greaterOrEqualFields : {
                createTime : "" ,                       //开始日期
            } ,
            lessOrEqualFields : {
                createTime : "" ,                       //结束日期
            } ,
            like : {
                logContent : "" ,                       //日志内容
                username : ""
            } ,

        } ,
        loading : false
    } ,
    mounted : function () {
        var laydate = layui.laydate;
        var that = this;


        laydate.render({
            elem : "#begin" ,
            type : "datetime" ,
            done : function ( value, date, endDate ) {
                that.params.greaterOrEqualFields.createTime = value;
            }
        })
        laydate.render({
            elem : "#end" ,
            type : "datetime" ,
            done : function ( value, date, endDate ) {
                that.params.lessOrEqualFields.createTime = value;
            }
        })

        this.getLogs( this.params );
    } ,
    methods : {
        //查询操作日志
        getLogs : function ( params ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var laypage = layui.laypage;



            var p = JSON.parse( JSON.stringify( params ) );

            if( $(".username").val() != "" ) {
                p.like.username = this.toSymbol( $(".username").val() );
            }
            if( p.like.logContent != "" ) {
                p.like.logContent = this.toSymbol( p.like.logContent );
            }

            that.loading = true;
            http.Post( URL.queryLogs , p , that.currPage , that.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.hasOwnProperty("list") && result.list.length ) {
                                result.list.forEach(function (item,index) {
                                    item.createTime = new Date( item.createTime ).format("yyyy-MM-dd hh:mm:ss");
                                })
                                that.list = result.list;
                            } else {
                                that.list = [];
                            }

                            laypage.render({
                                elem : "paging" ,
                                count : Math.max( 1, result.total ),
                                limit : that.limit ,
                                curr : result.pageNum ,
                                last : true ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.getLogs( that.params );
                                        }
                                    }
                                }
                            })
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
        //搜索
        search : function () {
            this.getLogs( this.params );
        } ,
        //加%号
        toSymbol : function ( str ) {
            return "%" + str + "%";
        }
    } ,
})