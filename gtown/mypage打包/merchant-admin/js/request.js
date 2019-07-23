var http = {
    origin : "http://10.27.247.37:8082" ,
    xml : null ,
    getCookie : function ( key ) {
        var reg = new RegExp("(^| )"+ key + "=([^;]*)(;|$)"),
            arr = document.cookie.match( reg );
        return arr ? atob( arr[2] ) : null;
    } ,
    requestGet : function ( method , url , data ) {
        var xml = new XMLHttpRequest();
        this.xml = xml;

        if( Boolean( data ) ) {
            if( data instanceof Array ) {
                var str = data.join("/");
                url += "/" + str;
            } else {
                url += "/" + data;
            }
        }

        xml.open( method , url , true );
        xml.timeout = 30000;
        xml.setRequestHeader("If-Modified-Since","0");
        xml.send();
        return this;
    } ,
    requestPost : function ( method , url , data ) {
        var xml = new XMLHttpRequest();
        var isFile = data instanceof FormData;
        this.xml = xml;

        xml.open( method , url , true );
        xml.timeout = 30000;
        if( !isFile ) {
            xml.setRequestHeader( "Content-type" , "application/json" );
        }

        xml.send( isFile ? data : JSON.stringify( data ) );

        return this;
    } ,
    Get : function ( url ) {
        var args = arguments,data = [];
        for( var i = 1; i < args.length; i ++ ) {
            if( args[i] != null && args[i] != undefined ) {
                if( Array.isArray( args[i] ) ) {
                    if( args[i].length ) {
                        data.push( args[i] );
                    } else {
                        data.push( JSON.stringify( args[i] ) );
                    }
                } else {
                    data.push( args[i] );
                }
            }
        }
        return this.requestGet( "GET" , url , data.join("/")  );
    } ,
    Delete : function ( url ) {
        var args = arguments,data = [];

        for( var i = 1; i < args.length; i ++ ) {
            if( args[i] != null && args[i] != undefined ) {
                if( Array.isArray( args[i] ) ) {
                    if( args[i].length ) {
                        data.push( args[i] );
                    } else {
                        data.push( JSON.stringify( args[i] ) );
                    }
                } else {
                    data.push( args[i] );
                }
            }
        }
        return this.requestGet( "DELETE" , url , data.join("/")  );
    } ,
    Post : function ( url , data ) {
        var args = arguments;
        for( var i = 2; i < args.length; i ++ ) {
            if( args[i] != undefined && args[i] != null ) {
                url += "/" + args[i];
            }
        }
        url = url.substr( 0, url.length );
        return this.requestPost( "POST" , url , data );
    } ,
    Put : function ( url , data  ) {
        return this.requestPost( "PUT" , url , data );
    } ,

    done : function ( fn ) {
        var xml = this.xml;
        var layer = layui.layer;
        xml.onload = function () {
            var data = JSON.parse( xml.responseText );
            if( data.hasOwnProperty("httpCode") ) {
                fn && fn( data );
            } else {
                if( http.getCookie("SESSION") == null ) {
                    fn && fn({ httpCode : 500 , msg : "登录已失效" });
                } else {
                    fn && fn({ httpCode : 500 , msg : "数据飞了" });
                }
            }
        }
        xml.ontimeout = function () {
            fn && fn( { code : xml.status  , msg : "请求超时!" , errStat : "timeout" } );
        }
        xml.onerror = function () {
            fn && fn( { code : xml.status  , msg : "请求出错，请重试" , errStat : "error" } );
        }
        xml.onabort = function () {
            fn && fn( { code : xml.status  , msg : "请求被取消" , errStat : "abort" } );
        }
    } ,

    urls : {
        //login : "/userLoginPc/loginPC" ,                    //登录
        login : "/userLoginPc/loginTK" ,
        logout : "/userLoginPc/signOut" ,                   //退出
        modifyPwd : "/userLoginPc/updatePassword" ,                                 //修改登录密码
        companyData : "/shopCompanyBaseInfo/insertShopCompanyBaseInfo" ,            //新增公司资质
        bankData : "/shopBankTaxInfo/insertShopBankTaxInfo" ,                   //新增财务资质
        shopInfo : "/shopManagementInfo/insertShopManagementInfo" ,             //新增店铺信息
        shopClass : "/shopManagementInfo/getSellerShopCategory" ,               //店铺类目
        shopLevel : "/shopManagementInfo/getSellerShopLev" ,                 //获取店铺等级
        getCompanyData : "/shopCompanyBaseInfo/selectShopCompanyBaseInfo" , //获取公司资质信息
        getBankData : "/shopBankTaxInfo/selectShopBankTaxInfo" ,             //获取财务资质信息
        getShopInfo : "/shopManagementInfo/selectShopManagementInfo" ,     //查询店铺经营信息
        uploadFile : "/pictureSpace/uploadimgToMerchantEntry" ,             //商户入驻上传图片
        submitVoucher : "/shopManagementInfo/submitPayVoucher" ,            //提交付款凭证


        shop : {
            genreQuery : "/category/select" ,                                       //查询条目
            genreDel   : "/category/delete" ,                                        //删除条目
            genreAdd : "/category/insert" ,                                          //添加条目
            genreUpdate : "/category/update" ,                                       //更新条目
            brandQuery : "/brandInfo/selectBrand" ,                                 //查询品牌申请
            addBrand : "/brandInfo/insertBrand" ,                                   //申请品牌
            delBrand :  "/brandInfo/deleteBrand" ,                                  //删除申请
            updateBrand : "/brandInfo/updateBrand" ,                               //更新申请
            searchByName : "/brandInfo/selectBrandByName" ,                       //按名称搜索
            manageClass : "/shopManagementInfo/selectBusinessCategory" ,        //查询经营类目
            addManageClass : "/shopManagementInfo/insertBusinessCategory" ,     //新增经营类目
            delManageClass : "/shopManagementInfo/deleteBusinessCategory" ,     //删除经营类目
            shopConfig : "/shopManagementInfo/shopInfoSetting" ,                  //店铺设置
            shopValid : "/shopManagementInfo/selectShopExpired" ,                 //查看店铺是否过期
            shopHome : "/shopManagementInfo/selectShopHomePage" ,                 //首页数据
            extendTime : "/shopManagementInfo/selectShopApplyRenew" ,            //查询店铺申请
            homeConfig : "/userSeller/queryMobileShopAllGroupAndDetailInfo" ,          //首页配置查询
        } ,
        logistics : {
            //zoneQuery : "/zoneTemplate/queryZoneInfo" ,         //查询地区列表
            zoneMore : "/zoneTemplate/queryZoneByLevel" ,                     //查询地区
            zoneStreet : "/zoneTemplate/queryZoneByZoneId" ,                  //查询街道
            //zoneQuery : "/city-area-street-controller" ,
            areaQuery : "/zoneTemplate/selectTemplate" ,       //查询售卖区域
            areaDel : "/zoneTemplate/delete" ,                  //删除售卖区域
            areaDetail : "/zoneTemplate/select" ,               //查询详细
            areaAdd : "/zoneTemplate/insert" ,                  //添加售卖区域模版
            areaUpdate : "/zoneTemplate/update" ,               //更新售卖区域
            //areaDetail : "/zoneTemplate/queryZoneInfo" ,          //查询详情
            orderQuery : "/orderInfo/getOrderInfo" ,         //查询订单状态
            importExcel : "/orderLogistics/importExcel" ,   //导入物流单

            orderDeliverFirst : "/orderLogistics/updateOrderInfo" ,     //发货设置第一步
            orderDeliverSecond : "/orderLogistics/updateSellerAddress" ,//发货设置第二步
            orderDeliverDelay : "/orderLogistics/updateDelayedDelivery" ,//延迟收货

            tempQuery : "/freightTemplate/getTemplate" ,        //运费模版查询
            tempDel : "/freightTemplate/delTemplate" ,          //运费模版删除
            tempAdd : "/freightTemplate/insertTemplate" ,       //运费模版新增
            tempUpdate : "/freightTemplate/updateTemplate" ,   //运费模版更新
            tempDetail : "/freightTemplate/getTemplateZone" , //查询运费模版明细

            delverQuery : "/addressSetting/selectTemplate" ,    //发货地址模版查询
            delverAdd : "/addressSetting/insertAddress" ,       //发货地址模版新增
            delverDel : "/addressSetting/delAddress" ,          //发货地址模版删除
            delverUpdateDef : "/addressSetting/updateDefaultAddress" , //更新默认地址
            delverUpdate : "/addressSetting/updateAddress" ,   //发货地址更新
            delverDetail : "/addressSetting/selectAddress" ,   //发货地址查询详细

            expressQuery : "/sellerSettingsLogistics/queryExpressInfo" ,      //快递公司查询
            expressUpdate : "/sellerSettingsLogistics/insertsellerSettingsLogistics" , //更新发货设置
            configQuery : "/sellerSettingsLogistics/selectSellerSettingsLogistics" , //查询发货设置

            logInfo : "/orderInfo/getLogisticsInfo"                                      //查询物流


        } ,
        goods : {
            picGroupQuery : "/pictureSpace/select" ,                 //图片空间分组查询
            picGroupDel : "/pictureSpace/delete" ,                   //图片空间分组删除
            picGroupAdd : "/pictureSpace/insert" ,                  //图片空间分组添加
            picGroupReName : "/pictureSpace/update" ,               //图片空间分组改名
            picQuery : "/pictureSpace/getPicBySellerId" ,           //查询图片
            picReName : "/pictureSpace/upDateImg" ,                  //修改图片名称，分组
            picDel : "/pictureSpace/delImgToOSS" ,                   //删除图片
            picUpload : "/pictureSpace/uploadimg" ,                  //上传图片
            goodPics : "/product/insertByIdPic" ,                   //上传商品图片
            goodsDownLine : "/product/downShelfProduct" ,             //批量商品下架
            goodsUpLine : "/product/productOnShelf" ,                  //批量商品上架



            classQuery : "/cateoryInfo/queryCategoryInfo" ,         //查询分类信息
            //brandQuery : "/brandInfo/getBrandInfo" ,                 //查询品牌信息
            brandQuery : "/brandInfo/getBrand" ,
            queryWarn : "/shopManagementInfo/selectWarning" ,   //预警值查询


            queryProduct : "/product/getProductInfo" ,               //查询商品列表

            goodsAdd : "/product/insert" ,                             //发布商品
            goodsUpdate : "/product/updateProductInfo" ,            //修改商品信息
            goodsDel : "/product/deleteProduct" ,                     //批量删除商品
            goodsQuery : "/product/selectProduct" ,                   //模糊查询商品
            queryById  : "/product/selectProductById" ,               //根据ID查询商品

            specQuery : "/categorySku/getCategorySku" ,              //商品规格查询
            specQueryAll : "/categorySku/querySpecificationsByCategoryId" ,//根据分类id查询规格
            specDel : "/categorySku/delCategorySku" ,                 //删除规格
            specAdd : "/categorySku/inserCategorySku" ,               //新增规格
        } ,
        promotion : {
            collageQuery : "/sellerActivity/selectActivity" ,       //查询拼团
            collageAdd : "/sellerActivity/insertActivity" ,         //新增拼团
            collageDel : "/sellerActivity/deleteActivity" ,         //删除拼团
            selectBySku : "/product/getProductInfoBySku"
        } ,
        account : {
            powerGroup : "/sellerRoleGroup/getSellerRoleGroup/" ,           //查询权限组
            queryPower : "/sellerRoleGroup/getSellerRoleGroupById" ,        //查询权限组权限
            menuList : "/sellerMenu/selectSellerMenu" ,                        //查询所有菜单
            addPowerGroup : "/sellerRoleGroup/insertSellerRoleGroup" ,      //新增组
            delPowerGroup : "/sellerRoleGroup/deleteSellerRoleGroupById" ,//删除组
            updatePowerGroup : "/sellerRoleGroup/updateSellerRoleGroup" , //更新组
            querycChAccount : "/sellerUserInfo/getSellerUser" ,             //查询子账号
            addAccount : "/sellerUserInfo/insertSellerUser" ,               //新增子账号
            delAccount : "/sellerUserInfo/delSellerUser" ,                  //删除子账号
            editAccount : "/sellerUserInfo/updateSellerUser" ,              //编辑子账号
            queryLogs : "/sellerUserRequestLog/selectUserRequestLog" ,      //查询操作日志
        } ,
        custom_service : {
            orderRefund : "/orderInfo/orderRefund" ,                                        //退货管理
            orderRefundSelect : "/orderInfo/selectOrderRefund" ,                          //查询退货管理
        }


    }
}
