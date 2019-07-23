Vue.component("region" , {
    props : ["getZone"] ,
    data : function () {
        return {
            data : []
        };
    } ,

    methods : {
        //查询售卖区域
        areaQuery : function () {
            var layer = layui.layer,
                $ = layui.jquery;
            var that = this;

            http.Get( http.urls.logistics.areaQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.data = result;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
    } ,
    mounted : function () {
        this.areaQuery();
    } ,
    updated : function () {

    } ,
    template : "<div id=\"region\"><table class=\"layui-table\" lay-skin=\"nob\">\n" +
                "        <thead>\n" +
                "            <tr>\n" +
                "                <th>模版名称</th>\n" +
                "                <th>售卖区域</th>\n" +
                "                <th>操作</th>\n" +
                "            </tr>\n" +
                "        </thead>\n" +
                "        <tbody>\n" +
                "            <tr v-for=\"item in data\">\n" +
                "                <td>{{ item.name }}</td>\n" +
                "                <td>{{ item.zoneName }}</td>\n" +
                "                <td><button type=\"button\" class=\"layui-btn layui-btn-xs layui-btn-normal\" @click=\"getZone( item )\">选择</button></td>\n" +
                "            </tr>\n" +
                "        </tbody>\n" +
                "    </table></div>"
})
