var URL = http.urls.goods;
var ue = null,ue2 = null;
var content = new Vue({
    el : "#content" ,
    data : {
        navData : [
            { text : "已上架的商品" , linker : "./index.html" } ,
            { text : "仓库中的商品" , linker : "./storehouse.html" } ,
            { text : "新增商品" , linker : "javascript:void(0)" } ,

            // { text : "商品规格" , linker : "./spec.html" } ,
            { text : "图片空间" , linker : "./pic_room.html" } ,
        ] ,
        treeObj : {} ,                      //zTree对象
        tempName : "" ,                     //运费模版名称
        defPicGroupId : "" ,                //默认图片分组id
        specChecked : 0 ,
        //specNames : ["尺码","颜色"] ,                     //规格组合
        specNames : [] ,
        temArr : [] ,                         //规格组合
        specOriginNames : [] ,              //规格组合原始数据
        warnArr : {} ,                       //预警比例值
        groupChecked : 0 ,
        //goodId : "" ,                       //商品id
        newSpec : false ,                   //添加规格值
        areaName : "" ,                     //售卖区域名称
        specData : {} ,                     //商品规格选中列表
        limitNumber : false ,               //限购
       // shopGroupNum : 1 ,                  //店铺分类数量
        shopGroupObj : {} ,                 //店铺分组
        params : {
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
        //    shopId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
       //     groupId : "" ,                  //商品分类ID
            categoryId : "" ,               //类目ID
            barCode : "" ,                  //国条码
            categoryLev : "" ,             //品类等级
            brandsId : "" ,                 //商品属性ID
            name : "" ,                     //商品标题
            description : "" ,              //副标题
            price : "" ,                    //商品价格
            originPrice : "" ,              //市场价格
            costPrice : "" ,                //成本价格
            instalmentPrice : "" ,          //分期价格
            stagingNum : "" ,               //分期
            //commission : "" ,               //费率
            stock : "" ,                    //库存
            earlyWarningValue : "" ,      //预警值
            fictitious : false ,           //是否为虚拟商品
            fictitiousType : "1" ,           //虚拟商品类型
        //    productNumber : "" ,           //虚拟商品编号
        //    productDateValidity : "" ,   //商品有效期截止
        //    supportRefunds : 1 ,            //过期退款0否 1是
            sellerNo : "" ,                 //上家货号
            mainPic : "" ,                  //主图
            context : "" ,                  //商品描述
            area : "" ,                     //售卖区域id
            freightTemplateId : "" ,            //运费模版id
            commodityWeight : "" ,          //商品重量
            //limitNumber : 0 ,              //限购
            shopGroupId : "" ,              //店铺分组id
            commodityReleaseStatus : 3 , //发布状态1.立即发布2.定时发布 3.放入仓库
        //    commodityReleaseTime : "" ,   //定时发布时间
        //    recommend : 0 ,               //是否推荐 1推荐  0不推荐
            afterSale : "" ,               //售后服务
            productSku : [] ,                //
            productSpu :[] ,
            productSpuAttr : [] ,
            minPrice : "" ,                 //最小价格
            maxPrice : ""                   //最大价格
        } ,
        region : false ,                    //售卖区域弹窗
        picSpace : false ,                  //图片空间弹窗
        picSpace2 : false ,                 //上传商品图片空间弹窗
        picSpace3 : false ,                 //编辑器图片空间弹窗
        picSpace4 : false ,                 //售后服务图片空间
        brandList : [] ,                    //品牌列表
        specs : [] ,                        //商品规格
        genres : [] ,                       //店铺分类
        step : 0,                           //创建商品步骤
        list : [] ,
        marks : [] ,
        cols : [] ,                             //类目选择
        colStep : 0 ,
        col2 : 0 ,
        col3 : 0 ,
        col4 : 0 ,
        colOk : false
    } ,


    mounted : function () {
        var that = this;
        var form = layui.form;
        var $ = layui.jquery;
        var layer = layui.layer;

        this.queryAllClass();

        bus.$on("uploadSuccess",function ( data ) {
            //console.log( data )
            that.picSpace = false;
            that.params.mainPic = data.picAddress;
        });
        bus.$on("picspace",function () {
            that.picSpace3 = true;
            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function ( index ) {
                        that.picSpace3 = false;
                        layer.close( index );
                    } ,
                    cancel : function () {
                        that.picSpace3 = false;
                    }
                })
                clearTimeout( t );
            });
        });
        bus.$on("picspace2",function () {
            that.picSpace4 = true;
            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function ( index ) {
                        that.picSpace4 = false;
                        layer.close( index );
                    } ,
                    cancel : function () {
                        that.picSpace4 = false;
                    }
                })
                clearTimeout( t );
            });
        });

        for( var i = 1; i <= 5; i++ ) {
            this.uploadPic( $("#img" + i ) );
        }
    } ,
    methods : {
        //上传图片
        uploadPic : function ( el ) {
            var upload = layui.upload;
            var that = this;

            upload.render({
                elem : el ,
                url : URL.picUpload ,
                data : {
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                    picGroupId : that.defPicGroupId
                } ,
                done : function ( res ) {
                    el.parents("td").find(".upload-img").attr("src" , res.result.picAddress );
                } ,
                error : function ( err ) {

                }
            })
        } ,
        //预警值查询
        getWarnScale : function () {
            var layer = layui.layer,
                that = this;
            http.Get( URL.queryWarn ).done(function (data) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.warnArr = data.result;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("error = " , e );
                }
            })
        } ,
        getPicFromSpace : function () {
            var layer = layui.layer,
                that = this;
            this.picSpace2 = true;

            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function ( index ) {
                        //传递事件
                        //bus.$emit("repGroup");
                        that.picSpace2 = false;
                        layer.close( index );
                    } ,
                    cancel : function ( index , el ) {
                        bus.$emit("close");
                        that.picSpace2 = false;
                    }
                })
                clearTimeout( t );
            })
        } ,
        //获取全部类目
        queryAllClass : function () {
            var that = this,
                layer = layui.layer;

            http.Get( URL.classQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.length ) {
                                //that.queryClass( result );
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
                                            // evt.stopPropagation ? evt.stopPropagation() : event.cancelable = true;
                                            // if( !data.hasOwnProperty("children") ) {
                                            //     $("#zTree").hide();
                                            //
                                            //     that.treePaths.push( data.getPath() );
                                            //     that.currPath = data.getPath()[data.getPath().length - 1];
                                            //
                                            // }

                                        }
                                    }
                                };

                                that.treeObj = $.fn.zTree.init($("#zTree"), setting, result );

                                // that.treeObj.getNodes().forEach(function (item,index) {
                                //     if( item.lev == "0001" ) {
                                //         that.cols.push( item  );
                                //     }
                                // });

                                //console.log( a123 )
                                that.cols = that.treeObj.getNodes();

                            } else {
                                layer.msg( "未查询到类目信息" );
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取品牌信息
        brandQuery : function ( id , sid , lev  ){
            var that = this,
                $ = layui.jquery,
                form = layui.form,
                layer = layui.layer;

            http.Get( URL.brandQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            var str = "<option></option>";
                            result.forEach(function (item,index) {
                                str += "<option value=\""+ item.id +"\">"+ item.name +"</option>";
                            })
                            $(".brandList").html( str );

                            form.render("select");
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error( "REQUEST ERROR " , e );
                }
            })
        } ,
        //图片空间
        getPics : function () {
            var layer = layui.layer;
            var that = this;
            this.picSpace = true;

            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function ( index ) {
                        that.picSpace = false;
                        layer.close( index );
                    } ,
                    cancel : function () {
                        that.picSpace = false;
                    }
                })
                clearTimeout( t );
            });
        } ,
        //售卖区域
        getRegion : function () {
            var that = this;
            var layer = layui.layer;
            this.region = true;
            var t = setTimeout(function () {

                layer.open({
                    type : 1 ,
                    title : "选择售卖区域" ,
                    area : ["60%","400px"] ,
                    content : layui.jquery("#region") ,
                    yes : function ( index ) {
                        that.region = false;
                        layer.close( index );
                    } ,
                    cancel : function () {
                        that.region = false;
                    }
                })
                clearTimeout( t );
            })
        } ,
        //店铺分类
        queryGener : function () {
            var layer = layui.layer,
                form = layui.form,
                that = this ,
                obj = new Object();
            var $ = layui.jquery;

            this.loading = true;
            this.genres.length = 0;
            var sellerId = JSON.parse( sessionStorage.getItem("userInfo") ).sellerId;
            http.Get( http.urls.shop.genreQuery , sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( data.result );
                            if( result instanceof Array && result.length ) {
                                result.forEach(function (item,index) {
                                    if( item.pid == 0 ) {
                                        if( !item.checked ) {
                                            item.checked = false;
                                        }
                                        obj[item.lev] = item;
                                        obj[item.lev]["child"] = [];
                                    }
                                });
                                result.forEach(function (item,index) {
                                    for( var attr in obj ) {
                                        if( item.pid == obj[attr].id ) {
                                            if( !item.checked ) {
                                                item.checked = false;
                                            }
                                            obj[attr]["child"].push( item );
                                        }
                                    }
                                });
                                var str = "<option value=''>请选择</option>";
                                for( var item in obj ) {
                                    str += "<option data-lev=\"1\" value=\""+ obj[item].id +"\">"+ obj[item].name +"</option>";
                                    for( var j = 0; j < obj[item].child.length; j ++ ) {
                                        str += "<option data-lev=\"2\" value=\""+ obj[item].child[j].id +"\">&nbsp;&nbsp;&nbsp;&nbsp;"+ obj[item].child[j].name +"</option>";
                                    }
                                }
                                $(".genres1").html( str );
                                var t = setTimeout(function () {
                                    form.render("select");
                                    clearTimeout( t );
                                });
                                //that.parent1 = that.genres[0].id;
                                that.shopGroupObj = obj;
                            } else {
                                that.genres = [];
                            }
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
        //选择商品分类
        nextCol : function ( evt , idx , step , item ) {
            var $ = layui.jquery;
            this.colStep = step;
            $(".menu" + step).next().find("li").removeClass("active");
            switch( step ) {
                case 1 :
                    this.col2 = idx;
                    break;
                case 2 :
                    this.col3 = idx;
                    break;
                case 3 :
                    this.col4 = idx;
                    break;
                default :
            }
            $( evt.target ).addClass("active").siblings().removeClass("active");

            // if( this.marks[step - 1] ) {
            //     this.marks.splice( step - 1 , 1 , item );
            // } else {
            //     this.marks.push( item );
            // }

            if( item.hasOwnProperty("children") && item.children.length ) {
                this.colOk = false;
            } else {
                //console.log( item.getPath() )
                this.marks = item.getPath();
                this.colOk = true;
            }
        } ,
        //查询商品规格
        specQuery : function ( id ) {
            var layer = layui.layer,
                that = this;
            http.Get( URL.specQueryAll , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.specNames = result;
                                var count = 0;
                                that.specNames[0].count = 0;
                                for( var i = 1; i < that.specNames.length; i ++ ) {
                                    count += that.specNames[Math.max(0,i - 1)].subSpecificationList.length;
                                    that.specNames[i].count = count;
                                }
                                //that.specOriginNames = result;
                                console.log( that.specNames )
                            } else {
                                that.specNames = [];
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e);
                }
            })
        } ,
        //规格选择
        specChange : function (evt,idx) {
            var that = this;
            var target = evt.target;

            //console.log( that.specData  )
            if( target.checked ) {
                var val = $( target ).parent().find("span").text();
                if( typeof that.specData[idx] == "undefined" ) {
                    that.specData[idx] = new Array();
                }
                if( typeof that.specNames[idx].checkNum === "undefined" ) {
                    that.specNames[idx].checkNum = 0;
                }
                that.specNames[idx].checkNum ++;
                that.specData[idx].push( val +":"+ $(target).data("idx") );

                that.specNames[idx].show = true;
            } else {
                var val = $( target ).parent().find("span").text();
                if( that.specData[idx].length <= 1 ) {
                    that.specData[idx] = new Array();
                } else {
                    that.specData[idx].forEach(function ( item, index ) {
                        if( item.substring(0 , item.indexOf(":")) == val ) {
                            that.specData[idx].splice( index , 1 );
                        }
                    });
                };

                that.specNames[idx].checkNum --;
                if( that.specNames[idx].checkNum <= 0 ) {
                    that.specNames[idx].show = false;
                }
            }
            //that.specOriginNames = that.specNames;
            var tem = [];
            that.temArr = [];

            for( var attr in that.specData ) {
                if( that.specData[attr].length ) {
                    tem.push( that.specData[attr] );
                }
            }

            var dataArr = that.transformData( tem );

            if( dataArr ) {
                dataArr.forEach(function ( item, index ) {
                    var arr = item.split("_");
                    that.temArr.push( arr );
                });
            }
        } ,

       //数据交叉组合
       transformData : function (){
            var heads = arguments[0][0];
            for( var i = 1, len=arguments[0].length; i < len; i++ ){
                if( arguments[0][i].length ){
                    heads = this.addNewType( heads ,arguments[0][i] );
                }
            }
            return heads;
        } ,
        addNewType : function ( heads , choices ){
            var result=[];
            var that = this;

            for(var i=0,len=heads.length;i<len;i++){
                for(var j=0,lenj=choices.length;j<lenj;j++){
                    result.push(heads[i]+'_'+choices[j]);
                }
            }

            return result;
        },
        //数据交叉组合  END

        //控制预警值不大于库存值
        warnMax : function ( evt ) {
            var $ = layui.jquery;
            var target = $( evt.target );
            var index = target.parents("tr").index();
            var warnLine = $(".warnLine").eq(index);

            var str = "三级预警:" + Math.floor( target.val() * this.warnArr.earlyWarningLev3 / 100 ) + "<br />二级预警:" + Math.floor( target.val() * this.warnArr.earlyWarningLev2 / 100 ) + "<br />一级预警:" + Math.floor( target.val() * this.warnArr.earlyWarningLev1 / 100 );

            warnLine.html( str );
            this.minPrice();
        } ,
        //运费模版
        tempQuery : function (id) {
            var layer = layui.layer;
            var that = this;
            http.Get( http.urls.logistics.tempQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            result.forEach(function ( item, index ) {
                                if( item.templateStatus == 0 ) {
                                    that.tempName = item.templateName;
                                    that.params.freightTemplateId = item.id;
                                }
                            })

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询图片分组
        picGroup : function ( id ) {
            var layer = layui.layer;
            var that = this;
            http.Get( URL.picGroupQuery , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result instanceof Array ) {
                                result.forEach(function (item,index) {
                                    if( item.picGroupName == "未分组" ) {
                                        that.defPicGroupId = item.picGroupId;
                                    }
                                })
                            } else {
                                that.defPicGroupId = result.picGroupId;
                            }

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取图片
        getImg : function ( data ) {
            var src = data.src;
            this.params.mainPic = src;
        } ,
        //上传商品图片
        getGoodPics : function ( data ) {
            var $ = layui.jquery;
            var uploadImg = $(".upload-img");
            var src = data.src;

            f:for( var i = 0, len = uploadImg.length; i < len; i ++ ) {
                if( !Boolean( uploadImg[i].getAttribute("src") ) ) {
                    uploadImg[i].setAttribute("src" , src );
                    break f;
                }
            }
        } ,
        //插入编辑器图片
        getUePic : function ( data ) {
            ue.execCommand("insertimage",{
                src : data.src ,
                width : "100%" ,
            })
        } ,
        //插入编辑器图片
        getUe2Pic : function ( data ) {
            ue2.execCommand("insertimage",{
                src : data.src ,
                width : "100%" ,
            })
        } ,
        //设置主图设置
        setMainPic : function ( event ) {
            var $ = layui.jquery;
            var target = $( event.target );
            var uploadImg = $(".upload-img");


            uploadImg.each(function (index,elem) {
                elem.dataset.main = 0;
            })
            $(".set-main").text("设置主图");
            if( target.parents("td").find(".upload-img")[0].getAttribute("src") != "" ) {
                $(".mainPic").hide();
                target.parents("td").find(".upload-img").attr("data-main", 1 );
                target.parents("td").find(".mainPic").show().find("button").text("默认主图")
            }

        } ,
        //取消主图设置
        delMainPic : function ( event ) {
            var $ = layui.jquery;
            var target = $( event.target );
            if( target.parents("td").find(".upload-img")[0].getAttribute("data-main") != 1 ) {
                target.parents("td").find(".upload-img").attr("data-main", 0 );
                //target.parents("td").find(".mainPic").show().find("button").text("设置主图")
            }
        } ,
        //显示主图设置
        showConfig : function ( evt ) {
            var $ = layui.jquery;
            var target = $( event.target );

            target.parents("td").find(".mainPic").show();
        } ,
        //隐藏主图设置
        hideConfig : function (evt) {
            var $ = layui.jquery;
            var target = $( event.target );
            var isMain = target.parents("td").find(".upload-img")[0].dataset.main;

            if( isMain != 1 ) {
                target.parents("td").find(".mainPic").hide();
            }
        } ,
        //获取售卖区域
        getZone : function ( data ) {
            var layer = layui.layer;
            this.areaName = data.name;
            this.params.area = data.id;

            layer.closeAll();
            this.region = false;
        } ,
        //计算商品最低价
        minPrice : function () {
            var $ = layui.jquery;
            var that = this;
            var attrs = $(".pic");
            var oPics = $(".o-pic");
            var sellerNo = $(".seller-no");
            var warns = $(".early");
            var diffArr = [];

            attrs.each(function (index,item) {
                var o = {
                    price : item.value ,
                    oPrice : oPics[index].value ,
                    sellerNo : sellerNo[index].value ,
                    earlyWarningValue : warns.size() > 0 ? warns[index].value : ""
                };
                diffArr.push( o );
            });
            var min = diffArr.sort(function ( a , b ) {
                return parseFloat( a.price ) - parseFloat( b.price );
            });
            //console.log( diffArr )


            this.params.price = min[0].price;
            this.params.originPrice = min[0].oPrice;
            this.params.sellerNo = min[0].sellerNo;
            this.params.earlyWarningValue = min[0].earlyWarningValue || "";
        } ,
        //库存最大值
        maxStock : function ( evt ) {
            var $ = layui.jquery;
            var stocks = $(".spec_attr").find(".stock");
            var target = evt.target;
            var afterEarly = $(".early").eq( $( target ).parents("tr").index() );
            var warnLine = $(".warnLine").eq( $( target ).parents("tr").index() );
            var max = 0;

            var str = "三级预警:" + Math.max(0,Math.floor( $( target ).val() * this.warnArr.earlyWarningLev3 / 100 )) + "<br />二级预警:" + Math.max(0,Math.floor( $( target ).val() * this.warnArr.earlyWarningLev2 / 100 )) + "<br />一级预警:" + Math.max(0,Math.floor( $( target ).val() * this.warnArr.earlyWarningLev1 / 100 ));

            warnLine.html( str );
            afterEarly.val( $( target ).val() );

            stocks.each(function (index,item) {
                max += Number( item.value );
            });
            this.params.stock = max;
            this.minPrice();
        } ,
        //下一步
        nextStep : function ( step ) {
            var $ = layui.jquery;
            var layer = layui.layer;
            var subPics,sort,imgs;
            switch( step ) {
                case 1 :
                    var item = this.marks[this.marks.length - 1];
                    if( this.colOk ) {
                        this.setp2();
                        var id = item.id;
                        this.params.categoryId = id;
                        //this.params.fictitious = item.isNoVirtual;
                        this.params.categoryLev = item.lev;


                        this.brandQuery( id , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , item.lev );
                        this.getWarnScale();
                        this.specQuery( item.id );
                        this.queryGener();
                        this.tempQuery( JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                        this.picGroup( JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );

                        this.submit( step );
                        this.step = step;
                    }
                    break;
                case 2 :
                    subPics = $(".subPic");
                    sort = subPics.find("input[type=text]");
                    imgs = subPics.find("img");

                    imgs.eq(0).attr("src" , this.params.mainPic );

                    break;
                case 3 :
                    subPics = $(".subPic");
                    sort = subPics.find("input[type=text]");
                    imgs = subPics.find("img");

                    var params = {
                        id : this.goodId ,
                        mainPic : this.params.mainPic ,
                        picsList : []
                    }


                    var sortArr = [];

                    for( var i = 0,len = sort.length; i < len; i ++  ) {
                        if( imgs[i].getAttribute("src") != "" ) {
                            if( sort[i].value == "" ) {
                                layer.msg("请输入排第"+ (i + 1) +"个的序值");
                                return;
                            } else {
                                sortArr.push({ num : sort[i].value , src : imgs[i].getAttribute("src") });
                            }
                        }
                    }
                    var newArr = sortArr.sort(function ( a , b ) {
                        return a.num - b.num;
                    })
                    imgs.each(function (idx,item) {
                        if( item.dataset.main == 1 ) {
                            params.mainPic = item.getAttribute("src");
                        }
                    });
                    newArr.forEach(function (item,index) {
                        if( item.src != params.mainPic ) {
                            params.picsList.push( item.src );
                        }
                    });
                    http.Post( URL.goodPics , params ).done(function ( data ) {
                        try{
                            switch( data.httpCode ) {
                                case 200 :
                                    location.href = "./index.html";
                                    break;
                                default :
                                    layer.msg( data.msg );
                            }
                        } catch ( e ) {
                            console.error("ERROR ： " , e );
                        }
                    })
                    break;
            };
            console.log( this.marks )
        } ,
        //第二步
        setp2 : function () {
            var upload = layui.upload;
            var form = layui.form;
            var layer = layui.layer;
            var $ = layui.jquery;
            var laydate = layui.laydate;
            var element = layui.element;
            var that = this;

            var t = setTimeout(function () {
                form.render();
                element.render("breadcrumb");

                var loadidx;
                //执行实例
                var uploadInst = upload.render({
                    elem: '#test1' ,                   //绑定元素
                    url: URL.picUpload ,               //上传接口
                    //bindAction : ".next-btn" ,
                    auto : true ,
                    data : {
                        sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                        picGroupId : that.defPicGroupId
                    } ,
                    before : function () {
                        loadidx = layer.load(2);
                    } ,
                    done: function(res){ //上传完毕回调
                        var localImg = $(".localimg");

                        try{
                            var result = JSON.parse( JSON.stringify( res.result ) );
                            that.params.mainPic = result.picAddress;
                            localImg.find("img").attr("src" , result.picAddress);
                        } catch ( e ) {
                            console.error("ERROR : " , e);
                        }
                        layer.close( loadidx );
                        //layer.msg( res.data );
                    },
                    error: function( err ){   //请求异常回调
                        layer.msg( err.data );
                        layer.close( loadidx );
                    }
                });


                ue = UE.getEditor("editor",{
                    toolbars : [
                        ["bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","insertunorderedlist","insertunorderedlist","emotion","link","removeformat","rowspacingtop","rowspacingbottom","lineheight","paragraph","fontsize","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","picspace"] ,
                        ["insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols"]
                    ]
                });
                ue2 = UE.getEditor("editor2",{
                    toolbars : [
                        ["bold","italic","underline","forecolor","backcolor","justifyleft","justifycenter","justifyright","insertunorderedlist","insertunorderedlist","emotion","link","removeformat","rowspacingtop","rowspacingbottom","lineheight","paragraph","fontsize","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","picspace2"] ,
                        ["insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols"]
                    ]
                });
                clearTimeout( t );

                //选择品牌
                form.on("select(brand)",function ( data ) {
                    that.params.brandsId = data.elem.value;
                });

                //选择虚拟商品类型
                form.on("select(productType)",function ( data ) {
                    that.params.fictitiousType = data.elem.value;
                });

                form.on("radio(statu)",function ( data ) {
                    that.params.commodityReleaseTime = "";
                    that.params.commodityReleaseStatus = data.elem.value;
                });
                form.on("radio(dum)",function ( data ) {
                    that.params.fictitious = Boolean( Number( data.elem.value ) );
                    if( that.params.fictitious ) {
                        that.specNames = [{ name : "默认" , show : true , subSpecificationList : [{ name : "默认" }] }];
                        that.temArr = [["默认:0"]];
                        that.params.stock = "9999";

                        setTimeout(function () {
                            $(".spec_attr .stock").val( "9999" );
                        });
                    } else {

                        that.specNames = that.specOriginNames;
                        that.specData = {};
                        that.temArr = [];
                        that.params.stock = "";
                        for( var idx in  that.specNames ) {
                            that.specNames[idx].checkNum = 0;
                        }
                        setTimeout(function () {
                            $(".checkboxs").each(function (key , val) {
                                val.checked = false;
                            });
                        });
                    }
                });
                // form.on("radio(share)",function ( data ) {
                //     that.params.recommend = parseInt( data.elem.value );
                // })
                // form.on("radio(limit)",function ( data ) {
                //     if( data.elem.value == 1 ) {
                //         that.limitNumber = true;
                //     } else {
                //         that.limitNumber = false;
                //     }
                // })
                // form.on("radio(refund)",function ( data ) {
                //     that.params.supportRefunds = data.elem.value;
                // });

                laydate.render({
                    elem: '#date1' , //指定元素
                    type : "datetime" ,
                    done : function (value, date, endDate) {
                        that.params.commodityReleaseTime = value;
                    } ,
                });
                // laydate.render({
                //     elem : "#limitDate" ,
                //     type : "datetime" ,
                //     done : function (value, date, endDate) {
                //         that.params.productDateValidity = value;
                //     }
                // });
            })
        } ,
        /*
        *
        * */
        maxWarnStock : function () {
            this.params.earlyWarningValue = this.params.stock;
        } ,
        //提交数据
        submit : function ( step ) {
            var layer = layui.layer;
            var $ = layui.jquery;
            var that = this;
            var form = layui.form;

            form.on("submit(create)",function ( data ) {
                var params = that.params;
                var config = $(".specConfig tbody").find("tr");
                var names = $(".specNames");

                if( params.mainPic == "" ) {
                    layer.alert("请上传商品主图");
                    return false;
                }
                if( params.stock == "" ) {
                    layer.alert("请输入库存");
                    window.scrollTo(0,$(".kucun").offset().top - $(".kucun").height());
                    return;
                }

                params.productSku.length = 0;
                params.productSpuAttr.length = 0;
                params.productSpu.length = 0;

                if( config.length == 0 ) {
                    var o = {
                        originalPrice : params.originPrice * 100 ,
                        price : params.price * 100 ,
                        stock : params.stock ,
                        earlyWarningValue : params.earlyWarningValue ,
                        sellerNo : params.sellerNo ,
                        spuAttrNumber : [0] ,
                        sort : 0
                    }
                    params.productSku.push( o );
                    params.productSku.forEach(function (item,idx) {
                        var o = {
                            description : "默认" ,
                            spuNumber : 0 ,
                            skuNumber : 0 ,
                            sort : 0
                        }
                        params.productSpuAttr.push( o );
                    });
                    params.productSpu.push({
                        titile : "默认" ,
                        spuNumber : 0 ,
                        sort : 0
                    });
                } else {
                    for( var i = 0; i < config.length; i ++ ) {
                        var elem = config[i];
                        $(elem).find(".o-pic").css("border-color","#ddd");
                        $(elem).find(".pic").css("border-color","#ddd");
                        $(elem).find(".stock").css("border-color","#ddd");
                        $(elem).find(".seller-no").css("border-color","#ddd");
                        $(elem).find(".early").css("border-color","#ddd");

                        if( $(elem).find(".seller-no").val() == "" ) {
                            layer.tips("请填写货号",$(elem).find(".seller-no"));
                            $(elem).find(".seller-no").css("border-color","red");
                            window.scrollTo( 0 , $(elem).find(".seller-no").eq(0).offset().top - 60 );
                            return;
                        };
                        if( $(elem).find(".o-pic").val() == "" ) {
                            layer.tips("请填写市场价",$(elem).find(".o-pic"));
                            $(elem).find(".o-pic").css("border-color","red");
                            window.scrollTo( 0 , $(elem).find(".o-pic").eq(0).offset().top - 60 );
                            return;
                        };
                        if( $(elem).find(".pic").val() == "" ) {
                            layer.tips("请填写价格",$(elem).find(".pic"));
                            $(elem).find(".pic").css("border-color","red");
                            window.scrollTo( 0 , $(elem).find(".pic").eq(0).offset().top - 60 );
                            return;
                        };
                        if( $(elem).find(".stock").val() == "" ) {
                            layer.tips("请填写库存",$(elem).find(".stock"));
                            $(elem).find(".stock").css("border-color","red");
                            window.scrollTo( 0 , $(elem).find(".stock").eq(0).offset().top - 60 );
                            return;
                        };
                        if( $(elem).find(".early").val() == "" ) {
                            layer.tips("请填写预警值",$(elem).find(".early"));
                            $(elem).find(".early").css("border-color","red");
                            window.scrollTo( 0 , $(elem).find(".early").eq(0).offset().top - 60 );
                            return;
                        };
                        var o = {
                            originalPrice : $(elem).find(".o-pic").val() * 100 ,
                            price : $(elem).find(".pic").val() * 100 ,
                            stock : $(elem).find(".stock").val() ,
                            earlyWarningValue : $(elem).find(".early").val() ,
                            sellerNo : $(elem).find(".seller-no").val() ,
                            spuAttrNumber : [] ,
                            sort : i
                        }


                        $( elem ).find(".specs").each(function ( key , val ) {
                            o.spuAttrNumber.push( $( val ).data( "idx") );
                        });
                        params.productSku.push( o );
                    };
                    that.specNames.forEach(function (item,index) {
                        if( item.checkNum && item.checkNum > 0 ) {
                            var o3 = {
                                titile : item.name ,
                                spuNumber : index ,
                                sort : index
                            }
                            params.productSpu.push( o3 );
                        }
                    });
                    // $(".specGroup").each(function ( idx , elem ) {
                    //     var o3 = {
                    //         titile : $(".specNames").eq( idx ).text().replace(/\s+/,"").replace(/：$/,"") ,
                    //         spuNumber : $( elem ).parent().data("idx") ,
                    //         sort : $( elem ).parent().data("idx")
                    //     }
                    //     params.productSpu.push( o3 );
                    // });


                    $(".checkboxs").each(function (idx,elem) {
                        if( elem.checked ) {
                            var o2 = {
                                description : $( elem ).parent().find("span").text(),
                                spuNumber : $( elem ).parents("tr").data("idx") ,
                                skuNumber : $( elem ).data("idx") ,
                                sort : $( elem ).parents("tr").data("idx")
                            }
                            params.productSpuAttr.push( o2 );
                        }
                    });
                }

                //价格区间
                var priceStack = params.productSku.sort(function (a,b) {
                    return parseFloat( a.price ) - parseFloat( b.price );
                });
                params.minPrice = priceStack[0].price;
                params.maxPrice = priceStack[priceStack.length - 1].price;


                if( Boolean( params.commodityReleaseTime ) ) {
                    params.commodityReleaseTime = new Date( params.commodityReleaseTime ).getTime();
                }
                if( Boolean( params.productDateValidity ) ) {
                    params.productDateValidity = new Date( params.productDateValidity ).getTime();
                }
                params.context = ue.getContent();
                params.afterSale = ue2.getContent();

                var p = JSON.parse( JSON.stringify( params ) );
                p.price *= 100;
                p.originPrice *= 100;
               // p.commission = parseInt( ( p.commission * 100 ).toFixed(2) );
                if( Boolean( p.costPrice ) ) {
                    p.costPrice *= 100;
                }
                if( Boolean( p.instalmentPrice ) ) {
                    p.instalmentPrice *= 100;
                }
                //重量g为单位
                if( Boolean( p.commodityWeight ) ) {
                    p.commodityWeight *= 1000;
                }

                console.log( JSON.stringify( p ) )

                    //规格参数
                    // var sdata = {
                    //     name : "" ,
                    //     attrList : [] ,
                    //     categoryId : that.params.categoryId
                    // }
                    //
                    // for( var attr in that.specData ) {
                    //     that.specData[attr].forEach(function (item,index) {
                    //         sdata.attrList.push({ name : item.split(":")[0] , sorting : ( index + 1 ) });
                    //     })
                    // }
                    // if( sdata.attrList.length ) {
                    //     //新增规格
                    //     http.Post( URL.specAdd , sdata ).done(function ( data ) {
                    //         try{
                    //             switch( data.httpCode ) {
                    //                 case 200 :
                    //                     that.insertProduct( p );
                    //                     break;
                    //                 default :
                    //                     layer.msg( data.msg );
                    //             }
                    //         } catch ( e ) {
                    //             console.error("ERROR : " , e );
                    //         }
                    //     })
                    // } else {

                //创建商品
                that.insertProduct( p );

                    //}

                return false;
            });
        } ,
        //新增商品
        insertProduct : function ( params ) {
            var layer = layui.layer,
                that = this;

            http.Post( URL.goodsAdd , params ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.step += 1;
                            that.goodId = data.result.id;
                            that.nextStep( that.step );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR :" , e );
                }
            })
        } ,
        backStep : function ( step ) {
            this.step = step;
        }
    }
})

