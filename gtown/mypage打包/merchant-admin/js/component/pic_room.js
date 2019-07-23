Vue.component("pic-room" , {
    props : ["getImg","master"] ,
    data : function () {
       return {
           local : false ,              //是否上传图片
           picRow : 0 ,                 //循环行
           picCol : 5 ,                 //循环列
           pic : {} ,                   //数据
           curr : {} ,
           loading : false ,
           limit : 10 ,                 //
           currPage : 1 ,
           imgsId : [] ,                //批量修改分组id
           imgsAlias : []   ,            //批量修改分组名称
           group : []
       };
    } ,
    methods : {
        localPic : function () {
            this.local = true;
            this.localUploadPic();
        } ,
        //查询分组
        queryGroup : function () {
            var layer = layui.layer,
                that = this;
            http.Get( http.urls.goods.picGroupQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            setTimeout(function () {
                                that.group = result;
                                that.curr = that.group[0];
                                that.queryPic( 1 , result[0].picGroupId );
                            },10)

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR :" , e );
                }
            })
        } ,
        //选择图片
        select : function ( evt ) {
            var $ = layui.jquery,
                tar = $( evt.target );
            var id = tar.data("id") ,
                alias = tar.data("alias");

            if( tar.hasClass("checked") ) {
                tar.removeClass("checked");
                for( var i = 0; i <  this.imgsId.length; i ++ ) {
                    if( this.imgsId[i] == id ) {
                        this.imgsId.splice( i , 1 );
                        this.imgsAlias.splice(  i , 1  );
                    }
                }
            } else {
                tar.addClass("checked");
                this.imgsId.push( id );
                this.imgsAlias.push( Base64.encode( alias ) );

                if( this.getImg ) {
                    this.getImg( tar[0] );
                }

            }
          //  console.log(22222)
        } ,
        //拉取图片
        queryPic : function ( currPage , gid ) {
            var layer = layui.layer,
                laypage = layui.laypage,
                that = this;

            var data = {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                picGroupId : gid
            }
            this.loading = true;
            http.Post( http.urls.goods.picQuery , data , currPage , that.limit ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.pic = result;

                            that.picRow = Math.ceil( result.list.length / 5 );

                            laypage.render({
                                elem : "pic_paging" ,
                                count : Math.max( 1, result.total ),
                                limit : that.limit ,
                                curr : result.pageNum ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.queryPic( that.currPage ,that.curr.picGroupId  );
                                        }
                                    }
                                }
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
        //本地上传图片
        localUploadPic : function () {
            //console.log( "上传本地图片" )
            if( this.local ) {
                var that = this;
                var t = setTimeout(function () {
                    var upload = layui.upload,
                        layer = layui.layer,
                        $ = layui.jquery;

                    var uploadInst = upload.render({
                        elem: "#local_upload" ,                 //绑定元素
                        url: http.urls.goods.picUpload ,        //上传接口,
                        auto : false ,
                        bindAction : ".layui-layer-btn0",
                        choose : function ( obj ) {
                            var file = obj.pushFile();
                            var localImg = $(".localimg");

                            obj.preview(function(index, file, result) {
                                if( localImg.children().length != 0 ) {
                                    localImg.find("img").attr("src" , result);
                                } else {
                                    var img = new Image();
                                    img.src = result;
                                    localImg.append( img );
                                }
                            })
                        } ,
                        data : {
                            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                            picGroupId : that.curr.picGroupId
                        } ,
                        done: function( res ){                    //上传完毕回调

                            bus.$emit("uploadSuccess", res.result );

                            layer.msg("上传成功");
                            //that.getImg( res );
                        },
                        error: function( err ){                   //请求异常回调
                            layer.msg("上传失败");
                        }
                    });
                });
            }
        }
    } ,
    mounted : function () {
        var that = this,
            element = layui.element,
            $ = layui.jquery,
            layer = layui.layer;

        element.on("tab(t1)",function ( elem ) {
            console.log( that.group , elem )
            var gid = that.group[elem.index].picGroupId;
            that.curr = that.group[elem.index];
            that.queryPic( 1 , gid );
        });

        console.log( this.curr )

        bus.$on("close",function () {
            that.local = false;
        })
        bus.$on("repGroup",function () {
            http.Get( http.urls.goods.picReName, that.imgsId , that.curr.picGroupId , that.imgsAlias ).done(function (data) {
                try {
                    switch (data.httpCode) {
                        case 200 :
                            //that.queryPic( that.currPage , );
                            //if( that.master == 1 ) {
                                bus.$emit("uploadSuccess");
                            //}
                            break;
                        default :
                            layer.msg(data.msg);
                    }
                } catch (e) {
                    console.error("ERROR: ", e);
                }
            })
        })

        this.queryGroup();

    } ,
    updated : function () {
        //console.log( 1 )
    },
    beforeDestroy : function () {

    } ,
    template : "<div id=\"pic_room\"><div v-if=\"!local\">" +
                "   <div class=\"layui-tab layui-tab-card\" lay-filter=\"t1\" :class=\"{ 'filter' : loading }\">\n" +
                "        <ul class=\"layui-tab-title\">\n" +
                "            <li v-for=\"(g,idx) in group\" v-bind:class=\"{ 'layui-this' : idx == 0 }\" :data-gid=\"g.picGroupId\">{{ g.picGroupName }}</li>\n" +
                "        </ul>\n" +
                "        <div class=\"layui-tab-content\">\n" +
                "            <div v-for=\"(g,idx) in group\" class=\"layui-tab-item\" :class=\"{ 'layui-show' : idx == 0 }\">\n" +
                "                <table class=\"layui-table\" lay-skin=\"nob\" v-if=\"pic.list && pic.list.length > 0\">\n" +
                "                    <tbody>\n" +
                "                        <tr v-for=\"(row,idx1) in picRow\">\n" +
                "                            <td v-for=\"(col,idx2) in 5\" v-show=\"pic.list[idx1 * 5 + idx2]\">\n" +
                "                                <div class=\"img-box\">\n" +
                "                                    <div class=\"relavite\"><img :src=\"pic.list[idx1 * 5 + idx2] && pic.list[idx1 * 5 + idx2].picAddress\" @click=\"select($event)\" :data-id=\"pic.list[idx1 * 5 + idx2] && pic.list[idx1 * 5 + idx2].id\" :data-alias=\"pic.list[idx1 * 5 + idx2] && pic.list[idx1 * 5 + idx2].picAlias\" /></div>\n" +
                "                                </div>\n" +
                "                            </td>\n" +
                "                        </tr>\n" +
                "                    </tbody>\n" +
                "                </table>\n" +
                "                <app-loading v-if=\"loading\"></app-loading>\n" +
                "                <app-error v-if=\"pic.list && pic.list.length == 0 && !loading\"></app-error>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <button v-if='master == 1' v-on:click='localPic' class=\"layui-btn layui-btn-sm\">上传图片</button>\n" +
                "    <div id=\"pic_paging\"></div>\n" +
                "</div>" +
                "<form class=\"layui-form\" v-else=\"local\">" +
                // "               <div class=\"layui-form-item\">\n" +
                // "                   <label class=\"layui-form-label\">网络图片：</label>\n" +
                // "                   <div class=\"layui-input-block\">\n" +
                // "                       <input type=\"text\" placeholder=\"请输入网络图片地址\" autocomplete=\"off\" class=\"layui-input\">\n" +
                // "                       <button type=\"button\" class=\"layui-btn\" v-bind:style=\"{ marginTop : '5px' }\">提取</button>" +
                // "                   </div>\n" +
                // "               </div>" +
                "               <div class=\"layui-form-item\">\n" +
                "                   <label class=\"layui-form-label\">本地图片：</label>\n" +
                "                   <div class=\"layui-input-block localimg\">\n" +
                "                       <img src='' />\n" +
                "                   </div>\n" +
                "                   <div class=\"layui-input-block\">\n" +
                "                       <button type=\"button\" class=\"layui-btn\" id=\"local_upload\">" +
                "                           <i class=\"layui-icon\">&#xe67c;</i>上传图片" +
                "                        </button>" +
                "                       <p>支持jpg、gif、png、jpeg、bmp五种格式, 大小不超过2 MB</p>" +
                "                   </div>\n" +
                "               </div>" +
                "       <button v-if=\"!local\" type=\"button\" class=\"layui-btn\" v-bind:style=\"{ display : 'block' , margin : '50px auto 0' , padding : '0px 60px' }\">确认</button>\n"+
                "</form></div>"

})
