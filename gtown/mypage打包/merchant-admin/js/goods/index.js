var URL = http.urls.goods;
var ue = null,ue2 = null;
var content = new Vue({
    el : "#content" ,
    data : {
        currTab : 0 ,
        navData : [
            { text : "已上架的商品" , linker : "javascript:void(0)" } ,
            { text : "仓库中的商品" , linker : "./storehouse.html" } ,
            { text : "新增商品" , linker : "./publish.html" } ,

            // { text : "商品规格" , linker : "./spec.html" } ,
            { text : "图片空间" , linker : "./pic_room.html" } ,
        ] ,
        treeObj : {} ,                      //zTree对象
        skuListDelArr : [] ,                //准备删除的sku集合
        spuAttrDelArr : [] ,                //准备删除的spu集合
        loading : false ,
        currPage : 1 ,                                  //当前页
        limit : 10 ,                                    //每页数据
        specNames : [] ,
        warnArr : {} ,                       //预警比例值
        approvalType : 1 ,                  //商品状态
        defPicGroupId : "" ,
    //    goodId : "" ,                       //商品id
        limitNumber : false ,               //限购
        classPath : [] ,                    //类目选择路径
        updateTab : 0 ,                     //更新信息或者图片 0 信息  1图片
        checkNum : 0 ,                      //复选框选择数量
        currGroup : {} ,                    //当前图片分组
        picSpace : false ,
        picSpace2 : false ,                //商品详情图片空间弹窗
        picSpace4 : false ,                //售后服务图片空间弹窗
        specs : { attr : [] } ,                        //商品规格
        groupChecked : 0 ,
        temArr : [] ,
        region : false ,
        specData : {} ,
        areaName : "" ,
        tempName : "" ,
        params : {
            sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
            //     groupId : "" ,                  //商品分类ID
            categoryId : "" ,               //类目ID
            categoryLev : "" ,             //品类等级
            brandsId : "" ,                 //商品属性ID
            name : "" ,                     //商品标题
            description : "" ,              //副标题
            price : "" ,                    //商品价格
            originPrice : "" ,              //市场价格
            costPrice : "" ,                //成本价格
            instalmentPrice : "" ,          //分期价格
            stagingNum : "" ,               //分期
            commission : "" ,               //费率
            stock : "" ,                    //库存
            earlyWarningValue : "" ,      //预警值
            fictitious : false ,          //是否为虚拟商品
            productNumber : "" ,           //虚拟商品编号
            productDateValidity : "" ,   //商品有效期截止
            supportRefunds : 1 ,         //过期退款0否 1是
            sellerNo : "" ,                 //商家货号
            mainPic : "" ,                  //主图
            context : "" ,                  //商品描述
            area : "" ,                     //售卖区域id
            freightTemplateId : "" ,            //运费模版id
            commodityWeight : "" ,          //商品重量
            //limitNumber : "0" ,              //限购
            shopGroupId : "" ,              //店铺分组id
            commodityReleaseStatus : 3 , //发布状态1.立即发布2.定时发布 3.放入仓库
            //commodityReleaseTime : "" ,   //定时发布时间
            //recommend : "0" ,              //是否推荐
            afterSale : "" ,               //售后服务
            productSku : [] ,                //
            productSpu : {
                titile : ""
            } ,
            picList : [] ,
            productSpuAttr : [] ,
            minPrice : "" ,
            maxPrice : ""
        } ,
        edit : false ,
        big : false ,
        checkAll : false ,
        list : [] ,
        name : "" ,                     //商品名称
        sellerNo : "" ,                //商家货号

    } ,
    updated : function() {
       // console.log( this.specNames )
    } ,
    mounted : function () {
        var form = layui.form;
        var element = layui.element;
        var that = this;
        var $ = layui.jquery;
        var layer = layui.layer;

        var isEdit = utils.getHashCode("edit");
        var id = utils.getHashCode("id");
        if( isEdit ) {
            this.goodId = id;
            this.edit = true;
            this.queryById( id );
            this.queryGroup();
            this.currTab = 1;
            this.navData[0].linker = "./index.html";
        };

        // bus.$on("uploadSuccess",function ( data ) {
        //     that.picSpace = false;
        //     that.params.mainPic = data.picAddress;
        // });
        bus.$on("picspace",function () {
            that.picSpace2 = true;
            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择图片" ,
                    area : ["60%","500px"] ,
                    content : layui.jquery("#pic_room") ,
                    btn : ["确定"] ,
                    yes : function ( index ) {
                        that.picSpace2 = false;
                        layer.close( index );
                    } ,
                    cancel : function () {
                        that.picSpace2 = false;
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

        this.queryClass();

        element.on("tab(tab)",function ( data ) {
            var id = data.elem.context.getAttribute("lay-id");
            var imgs = $(".upload-img");

            that.updateTab = id;
            imgs.each(function ( key , val ) {
                if( val.getAttribute("src") == that.params.mainPic ) {
                    $( val ).attr("data-main",1).prev().show().find("button").text("默认主图");
                }
            });
        });
        //查询商品
        element.on("tab(select)",function ( data ) {
            //console.log( this.getAttribute("lay-id") )
            var id = this.getAttribute("lay-id");
            that.approvalType = id;
            that.edit = false;
            that.queryProduct();



        });

        form.on("radio(statu)",function ( data ) {
            that.params.commodityReleaseTime = "";
            that.params.commodityReleaseStatus = data.elem.value;
        })
        form.on("radio(dum)",function ( data ) {
            that.params.fictitious = Boolean( data.elem.value );
        });
        //选择虚拟商品类型
        form.on("select(productType)",function ( data ) {
            that.params.fictitiousType = data.elem.value;
        });
        form.on("radio(share)",function ( data ) {
            if( data.elem.value == 1 ) {
                that.params.recommend = true;
            } else {
                that.params.recommend = false;
            }
        })
        form.on("radio(limit)",function ( data ) {
            if( data.elem.value == 1 ) {
                that.limitNumber = true;
            } else {
                that.limitNumber = false;
            }
        });

        //上传图片
        var loadidx;
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#test1' ,                   //绑定元素
            url: URL.picUpload ,               //上传接口
            //bindAction : ".next-btn" ,
            auto : true ,
            data : {
                sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                picGroupId : that.currGroup.id
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

        for( var i = 1; i <= 5; i++ ) {
            this.uploadPic( $("#img" + i ) );
        }
    } ,
    methods : {
        //查询分组
        queryGroup : function () {
            var layer = layui.layer,
                that = this;
            http.Get( http.urls.goods.picGroupQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                result.forEach(function ( item ,index ) {
                                    if( item.picGroupName == "未分组" ) {
                                        that.currGroup = item;
                                    }
                                })
                            }
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR :" , e );
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
                            var early = $(".early");
                            var warnLine = $(".warnLine");


                            early.each(function ( key , val ) {
                                var str = "三级预警:" + Math.floor( $( val ).val() * that.warnArr.earlyWarningLev3 / 100 ) + "<br />二级预警:" + Math.floor( $( val ).val() * that.warnArr.earlyWarningLev2 / 100 ) + "<br />一级预警:" + Math.floor( $( val ).val() * that.warnArr.earlyWarningLev1 / 100 );
                                warnLine.eq( key ).html( str );
                            });
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("error = " , e );
                }
            })
        } ,
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
        //上传图片实例
        uploadPic : function ( el ) {
            var upload = layui.upload;
            var that = this;
            upload.render({
                elem : el ,
                url : URL.picUpload ,
                data : {
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                    picGroupId : that.currGroup.id
                } ,
                done : function ( res ) {
                    el.parents("td").find(".upload-img").attr("src" , res.result.picAddress );
                } ,
                error : function ( err ) {

                }
            })
        } ,
        toEdit : function ( item ) {
            this.edit = true;
            this.queryById( item.id );
        }  ,
        back : function () {
            if( this.currTab == 1 ) {
                location.href = "./index.html";
            }
            this.edit = false;
        } ,
        //根据id查询商品
        queryById : function ( id ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var form = layui.form;
            var laydate = layui.laydate;

            http.Get( URL.queryById , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            result.price /= 100;
                            result.originPrice /= 100;
                            result.commission = ( result.commission / 100 );
                            if( Boolean( result.costPrice ) ) {
                                result.costPrice /= 100;
                            }
                            if( Boolean( result.instalmentPrice ) ) {
                                result.instalmentPrice /= 100;
                            }
                            //商品重量为g
                            if( Boolean( result.commodityWeight ) ) {
                                result.commodityWeight /= 1000;
                            }



                            that.params = result;
                            that.brandQuery( result.categoryId , result.brandsId , result.categoryLev );
                            that.getAreaList( result.area );
                            that.tempQuery( JSON.parse( sessionStorage.getItem("userInfo") ).sellerId );
                            that.classQuery( result.categoryId );


                            if( Boolean( result.pics ) ) {
                                that.picList = result.pics.replace(/\[|\]/g,"").split(",");
                            } else {
                                that.picList = [];
                            }

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


                            //商品详情描述
                            ue.ready(function () {
                                ue.setContent( result.context );
                            });
                            //售后服务
                            ue2.ready(function () {
                                ue2.setContent( result.afterSale );
                            });

                            var t = setTimeout(function () {
                                if( result.fictitious ) {
                                    $("[name=dum]")[0].checked = true;
                                };
                                if( result.fictitiousType == 2 ) {
                                    $(".productType option")[1].selected = true;
                                }

                                form.render();
                                clearTimeout( t );
                            });

                            var imgs = $(".upload-img");
                            imgs.eq(0).parents("td").find("input[type=text]").val( 1 );
                            that.picList.forEach(function (item,index) {
                                imgs.eq(index + 1).attr('src',item).parents("td").find("input[type=text]").val( index + 2 );
                            });

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
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
        //获取类目分类
        classQuery : function ( id ) {
            var layer = layui.layer,
                that = this;
            var element = layui.element;

            http.Get( URL.classQuery ).done(function ( data ) {
                try{
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
                                        },
                                        key: {
                                            name: "name"
                                        }
                                    },
                                    callback: {
                                        onClick: function (evt, obj, data) {

                                        }
                                    }
                                };

                                that.treeObj = $.fn.zTree.init($("#zTree"), setting, result);

                                that.classPath = that.treeObj.getNodeByParam("id", id).getPath();
                                that.specQuery( that.classPath[that.classPath.length - 1].id , that.params.productSpuAttr , that.params.productSku );

                                var t = setTimeout(function () {
                                    element.render("breadcrumb");
                                    clearTimeout(t);
                                })
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
        brandQuery : function ( id , diffId , lev ) {
            var that = this,
                $ = layui.jquery,
                form = layui.form,
                layer = layui.layer;

            http.Get( URL.brandQuery ).done(function ( data ) {
                try {
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            var str = "<option>请选择</option>";
                            result.forEach(function (item,index) {
                                if( item.id == diffId ) {
                                    str += "<option value=\""+ item.id +"\" selected>"+ item.name +"</option>";
                                } else {
                                    str += "<option value=\""+ item.id +"\">"+ item.name +"</option>";
                                }
                            });
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
        //查询商品规格
        specQuery : function ( id , specs ,skuList ) {
            var layer = layui.layer,
                $ = layui.jquery ,
                that = this;

            http.Get( URL.specQueryAll , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            that.specNames = result;

                            var count = 0;
                            that.specNames[0].count = 0;
                            for( var i = 1; i < that.specNames.length; i ++ ) {
                                count += that.specNames[Math.max(0,i - 1)].subSpecificationList.length;
                                that.specNames[i].count = count;
                            }

                            skuList.forEach(function ( listVal , key ) {
                                listVal.originalPrice = (listVal.originalPrice / 100).toFixed(2);
                                listVal.price = (listVal.price / 100).toFixed(2);
                            });
                            if( that.params.fictitious ) {
                                if( that.params.productSku[0] ) {
                                    that.params.productSku[0].skuNames = [{
                                        n : "0_默认:默认" ,
                                        sort : 0 ,
                                        spuSort : 0
                                    }];
                                }
                                that.specNames = [{ name : "默认" , checkNum : 1 , show : true , subSpecificationList : [{ name : "默认" }] }];
                                //that.temArr = [["默认:0"]];
                                that.params.stock = "9999";

                                var t = setTimeout(function () {
                                    $(".checkboxs").get(0).checked = true;
                                    clearTimeout( t );
                                });
                            } else {
                                var t = setTimeout(function () {

                                    var ipts = $(".checkboxs");
                                    specs.forEach(function (item,index) {
                                        var bol = true;
                                        ipts.each(function ( idx , val ) {
                                            var text = $( val ).next().text();
                                            var dataIdx = $(val).parents("tr").data("idx");

                                            if( text == item.description ) {

                                                val.setAttribute("data-id" , item.id );
                                                val.setAttribute("data-groupid" , item.groupId );

                                                if( typeof that.specData[dataIdx] == "undefined" ) {
                                                    that.specData[dataIdx] = new Array();
                                                }
                                                if( typeof that.specNames[dataIdx].checkNum === "undefined" ) {
                                                    that.specNames[dataIdx].checkNum = 0;
                                                };


                                                /*
                                                *  这里解决vue数据更新dom不渲染bug
                                                * */
                                                //that.specNames[dataIdx].checkNum ++;
                                                //that.specNames[dataIdx].show = true;
                                                that.$set(that.specNames[dataIdx],"checkNum",that.specNames[dataIdx].checkNum + 1);
                                                that.$set(that.specNames[dataIdx],"show", true );

                                                that.specData[dataIdx].push( val.getAttribute("data-idx") + "_" + $(".specNames").eq(dataIdx).text() +":"+ text );



                                                /* spu关联sku
                                                *
                                                *   通过spu的id找到复选框的索引值
                                                *   提交数据所用
                                                *   索引值前端定义
                                                * */
                                                that.params.productSku.forEach(function ( listVal , key ) {
                                                    //console.log( listVal )
                                                    if( listVal.skuCombination.indexOf( val.getAttribute("data-id") ) > -1 ) {
                                                        listVal.pId = val.getAttribute("data-idx");
                                                        listVal.sortId = dataIdx;
                                                    };

                                                    listVal.skuNames = [];
                                                    var vList = listVal.skuCombinationDescription.replace(/\s{1,}$/,"").split(" ");


                                                    //console.log( $(".specNames").size() )
                                                    vList.forEach(function ( v , k ) {
                                                        var obj = null;
                                                        $(".specNames").each(function ( n , m ) {
                                                            //console.log( m )
                                                            if( v.split(":")[0] == $( m ).text() ) {
                                                                obj = { n : v  , sort : listVal.pId  , spuSort : n };
                                                            }
                                                        })

                                                        listVal.skuNames.push( obj );
                                                    });
                                                    //console.log( that.specNames )
                                                    listVal.skuNames.forEach(function ( name , nameIdx ) {
                                                        that.specNames.forEach(function ( sub , subIdx ) {
                                                            sub.subSpecificationList.forEach(function ( child , childKey ) {
                                                                if( child.name == name.n.split(":")[1] ) {

                                                                    //console.log( that.specNames[nameIdx].count + subIdx )
                                                                    name.n = that.specNames[nameIdx].count + subIdx + "_" + name.n;
                                                                    name.sort = that.specNames[nameIdx].count + subIdx;
                                                                }
                                                            })
                                                            //console.log( sub.name , name.n.split(":")[1] )

                                                        })
                                                    });
                                                });
                                                setTimeout(function () {
                                                    val.checked = true;
                                                },50)
                                            }
                                        });
                                    });


                                    //匹配spuid 平台id与商户id不一样
                                    that.specNames.forEach(function ( item ) {
                                        that.params.productSpu.forEach(function ( val ) {
                                            if( val.titile == item.name ) {
                                                item.setId = val.id;
                                            }
                                        })
                                    });
                                    clearTimeout( t );
                                    //查询预警比例
                                    that.getWarnScale();
                                });
                            };
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e);
                }
            })
        } ,
        //查询售卖区域
        getAreaList : function ( diffId ) {
            var layer = layui.layer,
                that = this;

            http.Get( http.urls.logistics.areaQuery , JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            result.forEach(function (item,index) {
                                if( item.id == diffId ) {
                                    that.areaName = item.name;
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
        //计算商品最低价
        minPrice : function () {
            var $ = layui.jquery;
            var attrs = $(".pic");
            var oPics = $(".o-pic");
            var diffArr = [];

            this.params.productSku.forEach(function ( item , index ) {
                var o = {
                    price : item.price ,
                    oPrice : item.originalPrice ,
                    sellerNo : item.sellerNo ,
                    earlyWarningValue : item.earlyWarningValue ? item.earlyWarningValue : ""
                };
                diffArr.push( o );
            });

            //if( diffArr.length ) {
            try{
                var min = diffArr.sort(function (a, b) {
                    return parseFloat(a.price) - parseFloat(b.price);
                });
                this.params.price = min[0].price;
                this.params.originPrice = min[0].oPrice;
                this.params.sellerNo = min[0].sellerNo;
                this.params.earlyWarningValue = min[0].earlyWarningValue || "";
            } catch  ( e ) {
                this.params.price = "";
                this.params.originPrice = "";
                this.params.sellerNo = "";
                this.params.earlyWarningValue = "";
            }
        } ,
        //库存最大值
        maxStock : function ( evt , idx , attr ) {
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
            this.params.productSku[idx][attr] = $( target ).val();
            this.params.stock = max;
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
                            });

                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //查询商品列表
        queryProduct : function () {
            var layer = layui.layer,
                laypage = layui.laypage ,
                that = this;

            this.loading = true;
            http.Get( URL.queryProduct , this.currPage , this.limit, JSON.parse( sessionStorage.getItem("userInfo") ).sellerId , this.approvalType ,"OnShelf" ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( result.hasOwnProperty("list") && result.list instanceof Array && result.list.length ) {
                                var t = $.fn.zTree.getZTreeObj("zTree");
                                result.list.forEach(function (item,index) {
                                    item.createTime = new Date( item.createTime ).format("yyyy-MM-dd");
                                    item.price = ( item.price / 100 ).toFixed(2);
                                    var path = t.getNodeByParam("id" , item.categoryId , null );
                                    if( Boolean( path ) ) {
                                        item.classPath = path.getPath();
                                    }
                                })
                                that.list = result.list;
                            } else {
                                that.list = [];
                            }

                            var t = setTimeout(function () {
                                var checkboxInputs = $(".list-input");

                                checkboxInputs.each(function ( key , val ) {
                                    val.checked = false;
                                });
                                clearTimeout( t );
                            },30);

                            laypage.render({
                                elem: "paging",
                                count: Math.max( result.total,1 ) ,
                                limit : that.limit ,
                                curr : result.pageNum ,
                                jump : function ( obj , first ) {
                                    if( !first ) {
                                        if( obj.curr != that.currPage ) {
                                            that.currPage = obj.curr;
                                            that.queryProduct( that.currPage );
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
                } finally {
                    that.loading = false;
                }

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
                    approvalType : that.approvalType ,
                    sellerId : JSON.parse( sessionStorage.getItem("userInfo") ).sellerId ,
                    status : "OnShelf"
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
                            if( result.hasOwnProperty("list") && result.list instanceof Array && result.list.length ) {
                                var t = $.fn.zTree.getZTreeObj("zTree");
                                result.list.forEach(function (item,index) {
                                    item.createTime = new Date( item.createTime ).format("yyyy-MM-dd");
                                    item.price = ( item.price / 100 ).toFixed(2);
                                    var path = t.getNodeByParam("id" , item.categoryId , null );
                                    if( Boolean( path ) ) {
                                        item.classPath = path.getPath();
                                    }
                                })
                                that.list = result.list;
                            } else {
                                that.list = [];
                            }

                            var t = setTimeout(function () {
                                var checkboxInputs = $(".layui-tab-item input[type=checkbox]");
                                checkboxInputs.each(function ( key , val ) {
                                    val.checked = false;
                                });
                                clearTimeout( t );
                            });

                            laypage.render({
                                elem: "paging",
                                count: Math.max( result.total , 1 ) ,
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
        //刷新
        refresh : function () {
            this.search();
        } ,
        //商品下架
        goodsDownLine : function ( item ) {
            var layer = layui.layer,
                that = this;
            var params = {
                listId : []
            };
            if( item ) {
                params.listId.push( item.id  );
            } else {
                var gTr = $(".goodsTr");

                gTr.each(function ( idx , tr ) {
                    var input = $( tr ).find("input[type=checkbox]");
                    if( input.get(0).checked ) {
                        params.listId.push( input.val() );
                    }
                })
            };
            if( !params.listId.length ) {
                layer.msg("请选择要下架的商品");
                return;
            }

            if( params.listId.length > 0 ) {
                layer.confirm("确认下架商品？",{ title : "提示" , icon : 3 } , function ( idx ) {
                    that.loading = true;
                    http.Post( URL.goodsDownLine , params ).done(function ( data ) {
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
            }
        } ,
        /*
        * */
        maxWarnStock : function () {
            this.params.earlyWarningValue = this.params.stock;
        } ,
        //更新商品信息
        updateGood : function () {
            var params = this.params;
            var layer = layui.layer;
            var $ = layui.jquery;
            var that = this;

            //更新信息
            if( this.updateTab == 0 ) {
                if( params.brandsId == "" ) {
                    layer.alert("请选择商品属性");
                    window.scrollTo(0,$(".attr").offset().top - $(".attr").height());
                    return;
                }
                if( params.name == "" ) {
                    layer.alert("请输入商品名称");
                    window.scrollTo(0,$(".name").offset().top - $(".name").height());
                    return;
                }
                if( params.price == "" ) {
                    layer.alert("请输入商品价格");
                    window.scrollTo(0,$(".price").offset().top - $(".price").height());
                    return;
                }
                if( params.originPrice == "" ) {
                    layer.alert("请输入市场价格");
                    window.scrollTo(0,$(".originPrice").offset().top - $(".originPrice").height());
                    return;
                }

                // if( params.costPrice == "" ) {
                //     layer.alert("请输入成本价格");
                //     window.scrollTo(0,$(".costPrice").offset().top - $(".costPrice").height());
                //     return;
                // }

                if( params.stock == "" ) {
                    layer.alert("请输入库存");
                    window.scrollTo(0,$(".kucun").offset().top - $(".kucun").height());
                    return;
                }
                // if( params.earlyWarningValue == "" ) {
                //     layer.alert("请输入库存预警值");
                //     window.scrollTo(0,$(".yujingzhi").offset().top - $(".yujingzhi").height());
                //     return;
                // }


                //params.productSku.length = 0;
                //params.productSpuAttr.length = 0;
                //params.productSpu.length = 0;

                var config = $(".specConfig tbody").find("tr");
                var skuParams = [],spuAttrParams = [];
                var spuid = params.productSpu[0].id;

                params.productSpu.length = 0;
                if( config.length == 0 ) {
                    var o = {
                        originalPrice : params.originPrice * 100 ,
                        price : params.price * 100 ,
                        stock : params.stock ,
                        earlyWarningValue : params.earlyWarningValue ,
                        sellerNo : params.sellerNo ,
                        spuAttrNumber : [0] ,
                        sort : 0 ,
                        id : params.productSku[0].id
                    };
                    skuParams.push( o );
                    skuParams.forEach(function (item,idx) {
                        var o = {
                            description : "默认" ,
                            spuNumber : 0 ,
                            skuNumber : 0 ,
                            id : params.productSpuAttr[0].id ,
                            groupId : params.productSpuAttr[0].groupId
                        }
                        spuAttrParams.push( o );
                        //params.productSpuAttr.push( o );
                    });
                    //params.productSku.push( o );
                    // params.productSku.forEach(function (item,idx) {
                    //     var o = {
                    //         description : "默认" ,
                    //         spuNumber : 0 ,
                    //         skuNumber : 0
                    //     }
                    //     params.productSpuAttr.push( o );
                    // });
                    params.productSpu = [{
                        titile : "默认" ,
                        spuNumber : 0 ,
                        id : spuid
                    }];
                /*
                * 多规格添加数据
                * 循环添加
                * 关联关系对应
                * 前端设定
                * */
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
                        };
                        if( elem.getAttribute("data-id") ) o.id = elem.getAttribute("data-id");

                        $( elem ).find(".specs").each(function ( key , val ) {
                            //console.log( val )
                            o.spuAttrNumber.push( $( val ).data( "idx") );
                        });

                        skuParams.push( o );
                        //console.log(that.setNewArr( that.skuListDelArr )  )

                        //params.productSku.push( o );
                    };
                    //console.log( that.specNames )
                    that.specNames.forEach(function (item,index) {
                        if( item.checkNum && item.checkNum > 0 ) {
                            var o3 = {
                                titile : item.name ,
                                spuNumber : index ,
                                sort : index
                            }
                            if( item.setId ) o3.id = item.setId;
                            params.productSpu.push( o3 );
                        } else {
                            params.productSpu.push({ id : item.setId });
                        }
                    });

                    $(".checkboxs").each(function (idx,elem) {
                        if( elem.checked ) {
                            var o2 = {
                                description : $( elem ).parent().find("span").text(),
                                spuNumber : $( elem ).parents("tr").data("idx") ,
                                skuNumber : $( elem ).data("idx") ,
                                sort : $( elem ).parents("tr").data("idx") ,
                                //tId : idx
                            }

                            if( elem.getAttribute("data-id") ) o2.id = elem.getAttribute("data-id");
                            if( elem.getAttribute("data-groupid") ) o2.groupId = elem.getAttribute("data-groupid");
                            spuAttrParams.push( o2 );

                            //params.productSpuAttr.push( o2 );
                        }
                    });
                    skuParams = skuParams.concat( that.setNewArr( that.skuListDelArr ) );
                    spuAttrParams = spuAttrParams.concat( that.setNewArr( that.spuAttrDelArr ) );

                    // for( var j = 0; j < skuParams.length; j ++ ) {
                    //     oSkuFilter[skuParams[j].id ? skuParams[j].id : skuParams[j].sort] = skuParams[j];
                    // }
                    // for( var i = 0; i < params.productSku.length; i ++ ) {
                    //     if( !oSkuFilter[params.productSku[i].id] ) {
                    //         oSkuFilter[params.productSku[i].id] = { id : params.productSku[i].id };
                    //     }
                    // };
                    // for( var attr in oSkuFilter ) {
                    //     aSkuFilter.push( oSkuFilter[attr] );
                    // };
                    //价格区间
                    var priceStack = params.productSku.sort(function (a,b) {
                        return parseFloat( a.price ) - parseFloat( b.price );
                    });
                    params.minPrice = parseFloat( priceStack[0].price * 100 );
                    params.maxPrice = parseFloat( priceStack[priceStack.length - 1].price * 100 );
                }



                params.commodityReleaseTime = new Date( params.commodityReleaseTime ).getTime();
                params.context = ue.getContent();
                params.afterSale = ue2.getContent();

                var copyParams = JSON.parse( JSON.stringify( params ) );
                copyParams.price *= 100;
                copyParams.originPrice *= 100;
                copyParams.costPrice *= 100;
                copyParams.productSku = skuParams;
                copyParams.productSpuAttr = spuAttrParams;

                //console.log( copyParams )
                var loadIdx = layer.load(2,{ shade : 0.3 });
                http.Post( URL.goodsUpdate , copyParams ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                layer.close( loadIdx );
                                location.href = "./index.html";
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR :" , e );
                    }
                })
            //更新图片
            } else {
                var subPics = $(".subPic");
                var sort = subPics.find("input[type=text]");
                var imgs = subPics.find("img");
                var params = {
                    id : this.goodId ,
                    mainPic : "" ,
                    picsList : []
                }

                var sortArr = [];

                for( var i = 0,len = sort.length; i < len; i ++  ) {
                    if( sort[i].value == "" && imgs[i].getAttribute("src") != "" ) {
                        layer.msg("请输入排第"+ (i + 1) +"个的序值");
                        return;
                    } else {

                        sortArr.push({ num : sort[i].value , src : imgs[i].getAttribute("src") });
                    }
                }
                var newArr = sortArr.sort(function ( a , b ) {
                    return a.num > b.num;
                })
                imgs.each(function (idx,item) {
                    if( item.dataset.main == 1 ) {
                        params.mainPic = item.getAttribute("src");
                    }
                })
                newArr.forEach(function (item,index) {
                    if( item.src != params.mainPic ) {
                        params.picsList.push( item.src );
                    }
                })

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
            }
        } ,
        /*
        *   数组去重
        *   用于编辑规格删除id
        * */
        setNewArr : function ( arr ) {
            var obj = {},newArr = [];
            arr.forEach(function ( item ,index ) {
                if( !obj[item.id] ) {
                    obj[item.id] = item;
                };
            })
            for( var attr in obj ) {
                newArr.push( obj[attr] );
            }
            return newArr;
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
        //设置主图设置
        setMainPic : function ( event ) {
            var $ = layui.jquery;
            var target = $( event.target );
            var uploadImg = $(".upload-img");


            uploadImg.each(function (index,elem) {
                elem.dataset.main = 0;
            })
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

            target.parents("td").find(".upload-img").attr("data-main", 0 );
            target.parents("td").find(".mainPic").show().find("button").text("设置主图")

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
        /*
        * 规格选择
        * 各种关联数据,数据交叉全在这里
        * evt  evevt对象
        * idx  spu所在索引
        * n    spu所在对象
        * sub  子规格所在对象
        * next 子规格所在索引
        * */
        specChange : function ( evt , idx , n , sub , next ) {
            var that = this;
            var target = evt.target;
            //debugger;
            if( target.checked ) {
                if( that.params.productSku.length == 1 && that.params.productSku[0].skuCombinationDescription == '默认:默认 ' ) {
                    that.params.productSku.shift();
                }
                if( typeof that.specData[idx] == "undefined" ) {
                    if( that.params.productSku.length ) {
                        that.params.productSku.forEach(function ( item , index ) {
                            var o = {
                                n : next + "_" + n.name + ":" + sub.name ,
                                sort : next ,
                                spuSort : idx
                            };
                            /*
                            *   解决有规格列表时没选规格
                            * */
                            if( typeof item.skuNames == "undefined" ) {
                                item.skuNames = [];
                            }
                            item.skuNames.push( o );
                            item.skuNames = item.skuNames.sort(function ( a, b ) {
                                return parseFloat( a.spuSort ) - parseFloat( b.spuSort );
                            });
                        });
                        this.params.productSku.push( new Object() );
                        this.params.productSku.pop();

                    } else {
                        var o = {
                            skuNames : [{
                                n : next + "_" + n.name + ":" + sub.name ,
                                sort : next ,
                                spuSort : idx
                            }]
                        }
                        this.params.productSku.push( o );
                    }
                    this.$set( this.specData , idx , [] );

                    console.log("这一步是规格组合逻辑");
                } else {
                    var name = n.name + ":" + sub.name;
                    for( var attr in that.specData ) {
                        if( attr == idx ) {
                            if( Object.getOwnPropertyNames( that.specData ).length - 1 < 2 ) {
                                var obj = {
                                    skuNames : [{ n : next + "_" + name , sort : next , spuSort : idx }] ,
                                    sellerNo : "" ,
                                    originalPrice : "" ,
                                    price : "" ,
                                    stock : "" ,
                                    earlyWarningValue : "" ,
                                    sortId : idx ,
                                    pId : next
                                };
                                that.params.productSku.push( obj );

                                console.log("当前选中的spu规格并且单规格");
                            } else {
                                var obj = null,testArr = [];
                                that.specNames.forEach(function () {
                                    testArr.push([null]);
                                });
                                for( var z in that.specData ) {
                                    if( z == idx ) {
                                        testArr.splice( z , 1 ,[next +"_"+ n.name + ":" + sub.name] );
                                        continue;
                                    }
                                    testArr.splice( z , 1 , that.specData[z] );
                                };
                                var testArr = that.transformData( testArr );

                                for( var i = 0; i < testArr.length; i ++ ) {
                                    var obj = {
                                        skuNames : [] ,
                                        sellerNo : "" ,
                                        originalPrice : "" ,
                                        price : "" ,
                                        stock : "" ,
                                        earlyWarningValue : "" ,
                                        sortId : idx ,
                                        pId : next
                                    }
                                    var l = testArr[i].split(" ");
                                    l.forEach(function ( v , lk ) {
                                        if( v != 'null' ) {
                                            var skuNamesN = {
                                                n : v ,
                                                sort : v.split("_")[0] ,
                                                spuSort : lk
                                            };
                                            obj.skuNames.push( skuNamesN );
                                        }
                                    });
                                    that.params.productSku.push( obj );
                                }
                                //console.log( that.params.productSku )
                                console.log("当前选中的spu规格并且多规格");
                            }


                        } else {
                            var obj = null;
                            setTimeout(function () {
                                if( that.specData[idx].length <= 1 ) {
                                    for( var i = 0; i < that.specData[attr].length; i ++ ) {
                                        obj = {
                                            skuNames : [] ,
                                            sellerNo : "" ,
                                            originalPrice : "" ,
                                            price : "" ,
                                            stock : "" ,
                                            earlyWarningValue : "" ,
                                            sortId : idx ,
                                            pId : next
                                        };
                                        obj.skuNames.push({
                                            n : that.specData[attr][i] ,
                                            sort : that.specData[attr][i].split("_")[0] ,
                                            spuSort : attr
                                        });
                                        obj.skuNames.push({
                                            n : name ,
                                            sort : next ,
                                            spuSort : idx
                                        });
                                        obj.skuNames = obj.skuNames.sort(function ( a, b ) {
                                            return parseFloat( a.spuSort ) - parseFloat( b.spuSort );
                                        });
                                        that.params.productSku.push( obj );
                                    }
                                    console.info("匹配其他规格");
                                }
                            })
                        }
                    }
                    //console.log("这一步是规格组合或者添加新的规格组合逻辑")
                }
                if( typeof that.specNames[idx].checkNum === "undefined" ) {
                    that.specNames[idx].checkNum = 0;
                }
                that.specNames[idx].checkNum ++;
                that.specData[idx].push( next + "_" + n.name + ":" + sub.name );
                that.specNames[idx].show = true;
            } else {
                var name = n.name + ":" + sub.name;
                //console.log( that.specData[idx] )
                that.specData[idx].forEach(function ( item, index ) {
                    if( item.split("_")[1] == name ) {

                        if(that.specData[idx].length <= 1 ) {
                            that.specData[idx] = [];
                        } else {
                            that.specData[idx].splice( index , 1 );
                        }
                    }
                });
                that.specNames[idx].checkNum --;
                if( that.specNames[idx].checkNum <= 0 ) {
                    that.specNames[idx].show = false;
                }
                if( that.specData[idx].length == 0 ) {
                    delete that.specData[idx];
                }

                if( !that.specNames[idx].show ) {
                    for( var k = 0; k < that.params.productSku.length; k ++ ) {
                        for( var m = 0; m < that.params.productSku[k].skuNames.length; m ++ ) {
                            if( that.params.productSku[k].skuNames[m].n.indexOf( name ) > -1 ) {
                                var obj = null;
                                if( that.params.productSku.length <= 1 && that.params.productSku[k].skuNames.length <= 1 ) {
                                    obj = that.params.productSku[0];
                                    that.params.productSku = [];
                                    break;
                                } else {
                                    obj = that.params.productSku[k].skuNames.splice( m ,1 )[0];
                                }
                                if( obj.id ) {
                                    that.skuListDelArr.push({ id : obj.id });
                                };
                                m --;
                                k = 0;
                            }
                        }
                    };
                    that.params.productSku.push({});
                    that.params.productSku.pop();
                    console.log( that.params.productSku );
                    console.info("这时候只有单规格了")
                } else {
                    console.info("这时候多规格，删除取消的规格");
                    for( var k = 0; k < that.params.productSku.length; k ++ ) {
                        if( that.params.productSku[k].hasOwnProperty("skuNames") ) {
                            for( var m = 0; m < that.params.productSku[k].skuNames.length; m ++ ) {
                                if( that.params.productSku[k].skuNames[m].n.indexOf( name ) > -1 ) {
                                    var obj = null;
                                    if( that.params.productSku.length <= 1 ) {

                                        obj = that.params.productSku[0];
                                        that.params.productSku = [];
                                    } else {

                                        obj = that.params.productSku.splice( k ,1 )[0];
                                    }
                                    if( obj.id ) {
                                        that.skuListDelArr.push({ id : obj.id });
                                    };
                                    k = 0;
                                    m --;
                                }
                            }
                        }
                    };
                }
                if( target.getAttribute("data-id") ) {
                    console.log("预删除id" , target.getAttribute("data-id") )
                    that.spuAttrDelArr.push({ id : target.getAttribute("data-id") });
                }
                /*
                *  计算最小价格
                *  每次删除一条sku要重新计算
                * */
                this.minPrice();
                /*
                *  计算最大库存价格
                *  每次删除一条sku要重新计算
                * */
                var count = 0;
                that.params.productSku.forEach(function ( item ) {
                    count += item.stock;
                });
                that.params.stock = count;
            }
            //console.log( that.params.productSku )

        } ,
        /*
        * 数据组合
        * */
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
                    result.push( heads[i] +' '+choices[j] );
                }
            }

            return result;
        },

        //获取图片
        getImg : function ( data ) {
            var src = data.src;
            this.params.mainPic = src;
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
        //筛选父级
        filterParent : function ( data , pid ) {
            var that = this;
            data.forEach(function ( item ,index ) {
                if( item.id == pid ) {
                    that.classPath.unshift( item );

                    that.filterParent( data , item.pid );
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
                    cancel : function () {
                        that.picSpace = false;
                    }
                })
                clearTimeout( t );
            });
        } ,
        //前后加%号
        fullSymbol : function ( str ) {
            return "%" + str + "%";
        } ,
        getLocal : function () {
            var layer = layui.layer;
            var that = this;

            layer.open({
                type : 1 ,
                title : "选择图片" ,
                area : ["60%","500px"] ,
                content : layui.jquery("#pic_room") ,
                cancel : function () {
                    bus.$emit("close");
                }
            })
        } ,
        getRegion : function () {
            this.region = true;
            var layer = layui.layer;
            var t = setTimeout(function () {
                layer.open({
                    type : 1 ,
                    title : "选择售卖区域" ,
                    area : ["60%","400px"] ,
                    content : layui.jquery("#region") ,
                    // cancel : function () {
                    //     bus.$emit("close");
                    // }
                })
                clearTimeout( t );
            })

        } ,
        showBig : function ( evt ) {
            var target = $( evt.target ).parents("td").find(".big-img");

            target.toggle();
        } ,
        //全选
        getAllGoods : function ( evt ) {
            var $ = layui.jquery;
            var target = $( evt.target );
            var inputs = target.parents(".layui-tab-item").find("input[type=checkbox]");

            this.checkNum = target.get(0).checked ? inputs.length - 2 : 0;
            inputs.each(function ( index , item ) {
                item.checked = target.get(0).checked;
            })
        } ,

        //单选
        check : function ( evt ) {
            var $ = layui.jquery;
            var target = $( evt.target );
            var inputs = target.parents(".layui-tab-item").find("input[type=checkbox]");
            var first = $(".first").get(0);
            var last = $(".last").get(0);

            if( target.get(0).checked ) {
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
    } ,
});

