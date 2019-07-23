var content = new Vue({
    el : "#content" ,
    data : {
        userInfo : JSON.parse( sessionStorage.getItem("userInfo") ) ,
        shopLevel : [] ,                    //店铺等级数据
        shopData : {                        //店铺信息
            shopLevelData : {}
        } ,
        homeData : {}
    } ,
    mounted : function () {
        //this.getShopLevel();
        //this.getShopInfo( this.userInfo.sellerId );
        this.getShopHomeData();
    } ,
    methods : {
        //获取店铺等级
        getShopLevel : function () {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var form = layui.form;

            http.Get( http.urls.shopLevel ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.shopLevel = result;


                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询店铺信息
        getShopInfo : function ( id  ) {
            var layer = layui.layer,
                that = this;
            var form = layui.form;

            http.Get( http.urls.getShopInfo , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.shopLevel.forEach(function (item,index) {
                                if( item.id == result.shopLevelId ) {
                                    result.shopLevelData = item;
                                }
                            })

                            that.shopData = result;

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch (e) {
                    console.error('ERROR : ' , e );
                }
            })
        } ,
        //店铺首页
        getShopHomeData : function () {
            var that = this,
                layer = layui.layer;

            http.Get( http.urls.shop.shopHome ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = data.result;
                            result.salesRankings = Array.isArray( result.salesRankings ) ? result.salesRankings : [];
                            that.homeData = result;
                            console.log( that.homeData )
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