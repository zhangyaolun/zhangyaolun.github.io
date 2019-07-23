var content = new Vue({
    el : "#content" ,
    data : {
        zone : [] ,                                                     //全部地区列表
        citys : [] ,                                                    //全部市区
        areas : [] ,                                                    //区
        streets : [] ,                                                  //街道
        city : false ,                                                //市列表
        county : false ,                                              //区县列表
        street : false ,                                    //街道
        shopClass : [] ,                                    //店铺分类
        shopLevel : [] ,                                    //店铺等级
        treeData : [] ,                                     //经营类目
        currPath : {} ,                                     //选中的类目
        currGroup : {} ,                                    //默认图片分组
        treePaths : [] ,                                    //
        city2 : false ,
        county2 : false ,
        street2 : false ,
        city3 : false ,
        county3 : false ,
        userInfo : {} ,                                     //用户信息
        step : 0 ,                                          //入驻步骤
        payStatus : false ,
        step4data : {
            shopClassName : "" ,                          //店铺类目名称
            chargeStandard : "" ,                          //收费标准
            deposit : "" ,
            price : "" ,
            mount : "" ,
            shopOpenYear : ""
        } ,
        shopParams : {
            sellerUsername: "",                                     //商家账号
            shopName:"",                                            //店铺名称
            shopLevelId:"",                                          //点铺等级
            shopOpenYear:"",                                      //开店时长
            shouldPayAmount:"",                                    //应付总额
            shopCategoryId : "" ,                                   //分类id
            useShopCategoryApplyDtoList:[                         //经营类目
               /* {
                shopkeeperUsername: JSON.psrse( sessionStorage.getItem("userInfo") ).username,                        //商家账号
                shopName:"",                                          //店铺名称
                commissionProportion:"1",                           //分佣比例
                openState: 0 ,                                          //0表示未启用，1表示启用
                categoryId:"",   //类目id
                categoryName:""                                      //分类名称
            }*/
            ]
        } ,
        voucherParams : {
            payVoucher : "" ,
            payVoucherRemark : "" ,
            id :  ""
        } ,
        bankParams : {
            bankAccountName :"",                           //银行开户名
            companyBankAccountNumber:"",             //公司银行账号
            bankAccountBranchName:"",                       //开户银行支行名称
            bankBranchLineNumber:"",                   //开户银行支行号码
            bankAccountZoneProvince:"",                      //开户银行支行所在省
            bankAccountZoneCity:"",                          //开户银行支行所在市
            bankAccountZoneArea:"",                          //开户银行支行所在
            bankAccountLicensePicture:"",            //开户银行许可证电子版
            taxpayerProof:""                           //一般纳税人证

        },
        companyParams : {
            companyName:"",                                   //公司名称
            companyZoneProvince:"",                            //公司所在省
            companyZoneCity:"",                                   //公司所在市
            companyZoneArea:"",                                 //公司所在区县
            companyZoneStreet : "" ,                        //公司所在街道
            companyAddress:"",                             //详细地址
            companyTel:"",                                 //公司电话
            staffTotal:"",                                            //员工人数
            registeredCapital:"",                                   //注册资金
            linkmanName:"",                                  //联系人姓名
            linkmanTel:"",                                  //联系人号码
            email:"",                                 //联系人邮箱

            isAllInOne: 0,                                             //是否多证合一
            businessLicenseNumber:"",              //营业执照号码
            businessLicenseZoneProvince:"",                    //营业执照所在省
            businessLicenseZoneCity:"",                        //营业执照所在市
            businessLicenseZoneArea:"",                        //营业执照所在区县
            businessLicenseZoneStreet : "" ,                   //营业执照所在街道
            businessLicenseBeginTime:"",              //营业执照有效开始日期
            businessLicenseEndTime:"",                 //营业执照有效结束日期
            businessLicensePicture:"",         //营业执照电子版

            organizationCode:"",                                //组织机构代码
            organizationCodePic:"",             //组织机构代码证电子版
            taxpayerIdentificationNumber:"",            //纳税人识别号
            taxRegistrationCertificateNumber:"",  //税务登记证号
            taxRegistrationCertificateNumberPic:""  //组织机构代码证电子版
        }
    } ,
    mounted : function () {
        var form = layui.form;
        this.queryZone( 1 );

        //自定义验证规则
        form.verify({
            prov : function ( val ) {
                if( val == "" ) {
                    return "请选择公司所在省";
                }
            } ,
            city : function (val) {
                if( val == "" ) {
                    return "请选择公司所在市/区";
                }
            } ,
            county : function (val) {
                if( val == "" ) {
                    return "请选择公司所在区/县";
                }
            } ,
            street : function ( val ) {
                if( val == "" ) {
                    return "请选择公司所在街道";
                }
            } ,
            licenseProv : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在省";
                }
            } ,
            licenseCity : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在市/区";
                }
            } ,
            licenseCcounty : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在区/县";
                }
            } ,
            licenseStreet : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在街道";
                }
            } ,
            bankProv : function ( val ) {
                if( val == "" ) {
                    return "请选择公司所在省";
                }
            } ,
            bankCity : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在市/区";
                }
            } ,
            bankCcounty : function ( val ) {
                if( val == "" ) {
                    return "请输入营业执照所在区/县";
                }
            } ,
            taxpayer : function ( val ) {
                if( val == "" ) {
                    return "请输入纳税人识别号";
                } else {
                    if( !new RegExp("^[A-Za-z0-9]{6,20}$").test( val ) ) {
                        return "请输入正确的纳税人识别号";
                    }
                }
            }
        });

        this.step1Linkage();

        this.submitCompanyData();
        //this.getShopClass();
        //this.getShopLevel();

    } ,
    methods : {
        init : function () {
            var userInfo = sessionStorage.getItem("userInfo");
            if( userInfo != null ) {
                this.userInfo = JSON.parse( userInfo );
                this.payStatus = this.userInfo.payStatus;
                if( !this.userInfo.payStatus && Boolean( this.userInfo.companyBaseInfoId ) && Boolean( this.userInfo.bankTaxInfoId ) && Boolean( this.userInfo.shopManagementInfoId ) ) {
                    this.step = 4;
                } else if( !this.userInfo.shopManagementInfoApprovalState && Boolean( this.userInfo.shopManagementInfoId ) ) {
                    this.step = 3;
                } else if( !this.userInfo.bankTaxInfoApprovalState && Boolean( this.userInfo.bankTaxInfoId ) ) {
                    this.step = 2;
                } else if( !this.userInfo.companyBaseInfoApprovalState && Boolean( this.userInfo.companyBaseInfoId ) ) {
                    this.step = 1;

                } else {
                    this.step = 0;
                }
                this.next(this.step );
            } else {
                location.href = location.origin + "/modules/login.html";
            }
        } ,
        //初始化下拉框
        initSelect : function ( oriAttr , select ) {
            var form = layui.form;
            var $ = layui.jquery;
            var that = this;


            var prov = $( select );
            var opts = prov.find("option");

            opts.each(function (index,item) {
                if( $( item ).text() == oriAttr ) {
                    prov.get(0).selectedIndex = index;
                }
            })

            var t = setTimeout(function () {
                form.render();
                clearTimeout( t );
            })
            return prov.val();
        } ,
        //获取公司资质信息
        getCompanyData : function ( id ) {
            var layer = layui.layer,
                that = this;
            var $ = layui.jquery;
            var form = layui.form;

            http.Get( http.urls.getCompanyData , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse(JSON.stringify(data.result));
                            var comCitys = [], citys = [];

                            result.businessLicenseBeginTime = new Date(result.businessLicenseBeginTime).format("yyyy-MM-dd");
                            result.businessLicenseEndTime = new Date(result.businessLicenseEndTime).format("yyyy-MM-dd");
                            //公司所在地
                            if ( result.hasOwnProperty("companyZoneProvince") ) {
                                var provId = that.initSelect( result["companyZoneProvince"], ".prov" );
                                var cityArr = that.likeZone( provId , that.citys );
                                var cityId = "",areaId = "";
                                if( cityArr ) {
                                    that.city = true;
                                    that.fullData( cityArr , ".city" );
                                    cityId = that.initSelect( result["companyZoneCity"] , ".city"  );

                                    var countyArr = that.likeZone( cityId , that.areas );
                                    if( countyArr ) {
                                        that.county = true;
                                        that.fullData( countyArr , ".county" );
                                        areaId = that.initSelect( result["companyZoneArea"] , ".county"  );

                                        if( result.hasOwnProperty("companyZoneStreet") ) {
                                            that.queryStreet( areaId , ".street" , "street" ,function ( streets ) {
                                                that.initSelect( result["companyZoneStreet"] , ".street"  );
                                            });
                                        }
                                    }
                                }
                            }
                            //营业执照所在地
                            if ( result.hasOwnProperty("businessLicenseZoneProvince") ) {
                                var provId = that.initSelect( result["businessLicenseZoneProvince"], ".licenseProv" );
                                var cityArr = that.likeZone( provId , that.citys );
                                var cityId = "",areaId = "";
                                if( cityArr ) {
                                    that.city2 = true;
                                    that.fullData( cityArr , ".licenseCity" );
                                    cityId = that.initSelect( result["businessLicenseZoneCity"] , ".licenseCity"  );

                                    var countyArr = that.likeZone( cityId , that.areas );
                                    if( countyArr ) {
                                        that.county2 = true;
                                        that.fullData( countyArr , ".licenseCcounty" );
                                        areaId = that.initSelect( result["businessLicenseZoneArea"] , ".licenseCcounty"  );

                                        if( result.hasOwnProperty("businessLicenseZoneStreet") ) {
                                            that.queryStreet( areaId , ".licenseStreet" , "street2" ,function ( streets ) {
                                                that.initSelect( result["businessLicenseZoneStreet"] , ".licenseStreet"  );
                                            });
                                        }
                                    }
                                }
                            }

                            //是否多证合一
                            var opt = $(".one").find("input[type=radio]");
                            if( result.isAllInOne == 1 ) {
                                opt[0].checked = true;
                            } else {
                                opt[1].checked = true;
                            }


                            var t = setTimeout(function () {
                                that.uploadData( "#up2" , "organizationCodePic" );
                                that.uploadData( "#up3" , "taxRegistrationCertificateNumberPic" );
                                clearTimeout( t );
                                form.render();
                            });
                            that.companyParams = result;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //获取财务资质信息
        getBankData : function ( id ) {
            var layer = layui.layer,
                that = this;

            http.Get( http.urls.getBankData , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            var citys = [];

                            if( result.hasOwnProperty("bankAccountZoneProvince") ) {
                                var provId = that.initSelect(  result["bankAccountZoneProvince"] , ".bankProv" );
                                var cityArr = that.likeZone( provId , that.citys );
                                var cityId = "",areaId = "";
                                if( cityArr ) {
                                    that.city3 = true;
                                    that.fullData( cityArr , ".bankCity" );
                                    cityId = that.initSelect( result["bankAccountZoneCity"] , ".bankCity"  );

                                    var countyArr = that.likeZone( cityId , that.areas );
                                    if( countyArr ) {
                                        that.county3 = true;
                                        that.fullData( countyArr , ".bankCcounty" );
                                        areaId = that.initSelect( result["bankAccountZoneArea"] , ".bankCcounty"  );

                                    }
                                }
                            }

                            that.bankParams = result;
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
        getShopInfo : function ( id ) {
            var layer = layui.layer,
                that = this;
            var form = layui.form;

            http.Get( http.urls.getShopInfo , id ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            if( that.step == 3 ) {
                                var level = $(".level").find("option");
                                var longTime = $(".durative").find("option");
                                var shopClass = $(".shopClass").find("option");

                                level.each(function (index,item) {
                                    if( item.value == result.shopLevelId ) {
                                        item.selected = true;
                                    }
                                })
                                longTime.each(function (index,item) {
                                    if( item.value == result.shopOpenYear ) {
                                        item.selected = true;
                                    }
                                })
                                shopClass.each(function (index,item) {
                                    if( item.value == result.shopCategoryId ) {
                                        item.selected = true;
                                    }
                                });

                                http.Get( http.urls.shop.manageClass , id ).done(function ( res ) {
                                    that.treePaths = [];
                                    try{
                                        var treeObj = $.fn.zTree.getZTreeObj("zTree");
                                        res.result.forEach(function ( val, key ) {
                                            var node = treeObj.getNodeByParam("id" , val.categoryId , null );

                                            if( Boolean( node ) ) {
                                                var a = node.getPath();
                                                a.id = val.id;
                                                that.treePaths.push( a );
                                            }
                                        })
                                    } catch ( e ) {

                                    }
                                })

                                // if( result.hasOwnProperty("useShopCategoryApplyDtoList") ) {
                                //     var treeObj = $.fn.zTree.getZTreeObj("zTree");
                                //     result.useShopCategoryApplyDtoList.forEach(function ( item, index ) {
                                //         var node = treeObj.getNodeByParam("id" , item.categoryId , null );
                                //
                                //         if( Boolean( node ) ) {
                                //             var a = node.getPath();
                                //             a.id = item.id;
                                //             that.treePaths.push( a );
                                //         }
                                //     })
                                // }
                                // console.log( that.treePaths )
                                that.shopParams =  result;

                                var t = setTimeout(function () {
                                    form.render("select");
                                    clearTimeout( t );
                                })
                            } else {
                                var info = that.step4data;
                                that.shopClass.forEach(function (item,index) {
                                    if( item.id == result.shopCategoryId ) {
                                        info.shopClassName = item.name;
                                        info.deposit = ( item.deposit / 100 ).toFixed(2);
                                    }
                                })
                                that.shopLevel.forEach(function (item,index) {
                                    if( item.id == result.shopLevelId ) {
                                        info.price = ( item.chargeStandard / 100 ).toFixed(2);
                                    }
                                })
                                info.shopOpenYear = result.shopOpenYear;
                                info.mount = ( result.shopOpenYear * info.price ).toFixed(2);
                                //console.log( that.shopClass )
                            }


                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch (e) {
                    console.error('ERROR : ' , e );
                }
            })
        } ,
        //第一步表单渲染
        step1Linkage : function () {
            var form = layui.form;
            var that = this;
            var $ = layui.jquery;
            var laydate = layui.laydate;

            laydate.render({
                elem : "#begin" ,
                type : "date" ,
                done : function ( val ) {
                    that.companyParams.businessLicenseBeginTime = val;
                }
            })
            laydate.render({
                elem : "#end" ,
                type : "date" ,
                done : function ( val ) {
                    that.companyParams.businessLicenseEndTime = val;
                }
            })

            /* =======================  公司所在地下拉框  ========================= */
            //省下拉框
            form.on("select(prov)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.companyZoneProvince = text;
                that.city = false;
                that.county = false;
                that.street = false;
                if( id != "" ) {
                    if( that.citys.length == 0 ) {
                        that.queryZone( 2 , id , ".city" , "city" );
                    } else {
                        var arr = that.likeZone( id , that.citys );
                        if( arr ) {
                            that.city = true;
                            that.fullData( arr ,".city" );
                        }
                    }
                }
            })
            //市下拉框
            form.on("select(city)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.companyZoneCity = text;
                that.county = false;
                that.street = false;
                if( id != "" ) {
                    if( that.areas.length == 0 ) {
                        that.queryZone( 3 , id , ".county" , "county" );
                    } else {
                        var arr = that.likeZone( id , that.areas );
                        if( arr ) {
                            that.county = true;
                            that.fullData( arr ,".county" );
                        }
                    }

                }
            })
            //区县下拉框
            form.on("select(county)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.companyZoneArea = text;
                that.street = false;
                if( id != "" ) {
                    if( that.streets.length == 0 ) {
                        that.queryStreet( id , ".street" , "street" );
                    } else {
                        var arr = that.likeZone( id , that.streets );
                        if( arr ) {
                            that.street = true;
                            that.fullData( arr ,".street" );
                        }
                    }
                }
            });
            //街道下拉框
            form.on("select(street)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.companyZoneStreet = text;
            });
            /* =======================  公司所在地下拉框 end ========================= */



            /* =======================  营业执照所在地下拉框  ========================= */
            //省下拉框
            form.on("select(licenseProv)",function ( data ) {

                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.businessLicenseZoneProvince = text;
                that.city2 = false;
                that.county2 = false;
                that.street2 = false;
                if( id != "" ) {
                    if( that.citys.length == 0 ) {
                        that.queryZone( 2 , id , ".licenseCity" , "city2" );
                    } else {
                        var arr = that.likeZone( id , that.citys );
                        if( arr ) {
                            that.city2 = true;
                            that.fullData( arr ,".licenseCity" );
                        }
                    }
                }
            })
            //市下拉框
            form.on("select(licenseCity)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.businessLicenseZoneCity = text;
                that.county2 = false;
                that.street2 = false;
                if( id != "" ) {
                    if( that.areas.length == 0 ) {
                        that.queryZone( 3 , id , ".licenseCcounty" , "county2");
                    } else {
                        var arr = that.likeZone( id , that.areas );
                        if( arr ) {
                            that.county2 = true;
                            that.fullData( arr ,".licenseCcounty" );
                        }
                    }
                }
            })
            //区县下拉框
            form.on("select(licenseCcounty)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.businessLicenseZoneArea = text;
                that.street2 = false;
                if( id != "" ) {
                    if( that.streets.length == 0 ) {
                        that.queryStreet( id , ".licenseStreet" , "street2");
                    } else {
                        var arr = that.likeZone( id , that.streets );
                        if( arr ) {
                            that.street2 = true;
                            that.fullData( arr ,".licenseStreet" );
                        }
                    }
                }
            });
            //街道下拉框
            form.on("select(licenseStreet)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.companyParams.businessLicenseZoneStreet = text;
            });
            /* =======================  营业执照所在地下拉框 end  ========================= */


            //是否多证合一
            form.on("radio(merge)",function ( data ) {
                var val = data.elem.value;
                if( val == 0 ) {
                    var t = setTimeout(function () {
                        that.uploadData( "#up2" , "organizationCodePic" );
                        that.uploadData( "#up3" , "taxRegistrationCertificateNumberPic" );
                        clearTimeout( t );
                    })

                }
                that.companyParams.isAllInOne = val;
            })
            form.render();
        } ,
        //筛选地区关联
        likeZone : function ( zoneId , data ) {
            var temp = [];
            data.forEach(function (item,index) {
                if( item.parentId == zoneId ) {
                    temp.push( item );
                }
            })
            if( temp.length > 0 ) {
                return temp;
            } else {
                return false;
            }

        } ,
        //第二步
        step2Linkage : function () {
            var form = layui.form;
            var that = this,
                $ = layui.jquery;
            //省下拉框
            form.on("select(bankProv)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.bankParams.bankAccountZoneProvince = text;
                that.city3 = false;
                that.county3 = false;
                if( id !== "" ) {
                    var arr = that.likeZone( id , that.citys );
                    if( arr ) {
                        that.city3 = true;
                        that.fullData( arr , ".bankCity" );
                    }
                }
            })
            //市下拉框
            form.on("select(bankCity)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.bankParams.bankAccountZoneCity = text;
                that.county3 = false;
                if( id !== "" ) {
                    var arr = that.likeZone( id , that.areas );
                    if( arr ) {
                        that.county3 = true;
                        that.fullData( arr , ".bankCcounty" );
                    }
                }
            })
            //区县下拉框
            form.on("select(bankCcounty)",function ( data ) {
                var index = data.elem.selectedIndex;
                var text = $( data.elem.options[index] ).text();
                var id = data.elem.value;

                that.bankParams.bankAccountZoneArea = text;
            });
        } ,
        //第三步
        step3Linkage : function () {
            var form = layui.form;
            var that = this;
            var $ = layui.jquery;

            form.on('select(level)',function ( data ) {
                var elem = data.elem;
                var idx = elem.selectedIndex;
                var opts = elem.options;
                // that.shopParams.shopType = opts[idx].getAttribute("free");
                // that.shopParams.shopOpenDeposit = opts[idx].getAttribute("freenum");


                that.shopParams.shouldPayAmount = opts[idx].getAttribute("data-mount") * 100;
                that.shopParams.shopLevelId = data.elem.value;

            })
            form.on("select(longTime)",function ( data ) {
                that.shopParams.shopOpenYear = data.elem.value;
            })
            form.on("select(shopClass)",function ( data ) {
                that.shopParams.shopCategoryId = data.elem.value;
            })
        } ,
        //获取店铺类目
        getShopClass : function () {
            var layer = layui.layer,
                that = this;
            var form = layui.form;
            var $ = layui.jquery;

            http.Get( http.urls.shopClass ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.shopClass = result;
                            var str = "<option></option>";
                            if( result.length ) {
                                result.forEach(function ( item ,idx ) {
                                    str += "<option value='"+ item.id +"'>"+ ( item.name || '测试' + idx ) +"</option>";
                                })
                            }
                            $(".shopClass").html( str );
                            if( Boolean( that.userInfo.shopManagementInfoId ) ) {
                                that.getShopInfo( that.userInfo.shopManagementInfoId );
                            }
                            var t = setTimeout(function () {
                                form.render("select");
                                clearTimeout( t );
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
        //获取经营类目
        managementClass : function () {
            var layer = layui.layer,
                that = this;

            http.Get( http.urls.goods.classQuery ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.treeData = result;

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
                                        evt.stopPropagation ? evt.stopPropagation() : event.cancelable = true;
                                        if( !data.hasOwnProperty("children") ) {
                                            $("#zTree").hide();

                                            that.treePaths.push( data.getPath() );
                                            that.currPath = data.getPath()[data.getPath().length - 1];

                                        }

                                    }
                                }
                            };

                            var t = $.fn.zTree.init($("#zTree"), setting, that.treeData );
                            that.getShopLevel();
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //调出树结构
        getTree : function ( evt ) {
            if( $("#zTree").css("display") == "block" && $( evt.target )[0].className == "treeBox" ) {
                $("#zTree").hide();
            } else {
                $("#zTree").show();
            }
        } ,
        //删除类目
        delPath : function ( key  , id ) {
            var layer = layui.layer;
            var that = this;

            layer.confirm("确认删除吗？",{ title : "提示" , icon : 3 },function ( index ) {
                that.treePaths.splice( key , 1 , id );
                if( !that.treePaths.length ) {
                    that.currPath = {};
                }
                layer.close( index );
            })
            console.log( that.treePaths )

        } ,
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
                            var str = "<option value=''></option>";
                            result.forEach(function (item,index) {
                                var freeNum = ( item.chargeStandard / 100 ).toFixed(2);
                                str += "<option value='"+ item.id +"' data-mount='"+ freeNum +"'>"+ item.name +" ("+ freeNum +"元) "+"</option>";
                            })
                            $(".level").html( str );
                            that.shopLevel = result;
                            that.getShopClass();

                            var t = setTimeout(function () {
                                form.render("select");
                                clearTimeout( t );
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
        //查询地区
        queryZone : function ( lev ) {
            var layer = layui.layer;
            var that = this;

            http.Get( http.urls.logistics.zoneMore , lev ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );

                            that.filterZoneTemplate( result , lev  );
                            if( lev != 3 ) {
                                that.queryZone( ++lev  )
                            }

                            // if( typeof cb === "function" ) {
                            //     cb( result );
                            // }

                            break;
                        default :
                            layer.msg( data.msg );

                    }
                } catch ( e ) {
                    console.error("ERROR: " , e );
                }
            })
        } ,
        //筛选地区
        filterZoneTemplate : function ( data , lev  ) {
            var that = this;

            switch( lev ) {
                case 1 :
                    this.zone = this.zone.concat( data );

                    break;
                case 2 :
                    this.citys = this.citys.concat( data );

                    break;
                case 3 :
                    this.areas = this.areas.concat( data );
                    this.init();
                    break;
                default :
                    // this.streets = this.streets.concat( data );
                    //
                    // data.forEach(function (item,index) {
                    //     if( item.parentId == id ) {
                    //         temp.push( item );
                    //     }
                    // })
            }
        } ,
        next : function ( step , cb ) {
            var $ = layui.jquery,
                layer = layui.layer;
            var form = layui.form;

            switch( step ) {
                case 1 :
                    if( !$(".agree-input").get(0).checked ) {
                        layer.msg("请先同意入驻协议");
                        return;
                    }
                    if( this.userInfo.companyBaseInfoId ) {
                        this.getCompanyData( this.userInfo.companyBaseInfoId )
                    }

                    this.fullData( this.zone , ".prov" );
                    this.fullData( this.zone , ".licenseProv" );
                    this.uploadData( "#up1" , "businessLicensePicture" );
                    this.uploadData( "#up2" , "organizationCodePic" );
                    this.uploadData( "#up3" , "taxRegistrationCertificateNumberPic" );

                    break;
                case 2 :
                    if( Boolean( this.userInfo.bankTaxInfoId ) ) {
                        this.getBankData( this.userInfo.bankTaxInfoId );
                    }
                    this.submitBankData();
                    this.fullData( this.zone , ".bankProv" );
                    this.step2Linkage();
                    this.uploadData( "#up4" , "bankAccountLicensePicture" );
                    this.uploadData( "#up5" , "taxpayerProof" );
                    break;
                case 3 :
                    this.step3Linkage();
                    this.managementClass();
                    this.submitShopData();
                    break;
                case 4 :
                    this.getShopLevel();
                    this.uploadData( "#up6" , "payVoucher" );
                    break;
                default :
            }
            console.log( step )
            this.step  = step;
        } ,
        //查询街道地址
        queryStreet : function ( code , elem , attr , cb ) {
            var that = this;
            var layer = layui.layer;

            http.Get( http.urls.logistics.zoneStreet , code ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            var result = JSON.parse( JSON.stringify( data.result ) );
                            if( result.length ) {
                                that.fullData( result , elem );
                                that[attr] = true;
                            } else {
                                that[attr] = false;
                            }
                            cb && cb( result );
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {
                    console.error("ERROR : " , e );
                }
            })
        } ,
        //上传文件
        uploadData : function ( el , attr ) {
            var $ = layui.jquery;
            //var upload = layui.upload;
            var layer = layui.layer;
            var that = this,loadidx,uploadInst,fileEl = $(el);

            fileEl.change(function () {
                var file = this.files[0];
                var formData = new FormData();
                formData.append( "sellerId" , that.userInfo.sellerId );
                formData.append( "picGroupId" , that.currGroup.id );
                formData.append("file" , file );
                loadidx = layer.load(2);
                http.Post( http.urls.uploadFile , formData ).done(function ( data ) {
                    var result = JSON.parse( JSON.stringify( data.result ) );
                    if( el == "#up4" || el == "#up5" ) {
                        that.bankParams[attr] = result;
                    } else if ( el == "#up6" ) {
                        that.voucherParams[attr] = result;
                    } else {
                        that.companyParams[attr] = result;
                    }
                    layer.close( loadidx );
                });
            });
            // uploadInst = upload.render({
            //     elem : el ,
            //     url : http.urls.uploadFile ,
            //     auto : true ,
            //     // data : {
            //     //     sellerId : that.userInfo.sellerId  ,
            //     //     picGroupId : that.currGroup.id
            //     // } ,
            //     size : 1024 ,
            //     choose : function () {
            //         console.log("选择完文件");
            //     } ,
            //     before : function () {
            //         loadidx = layer.load(2);
            //     } ,
            //     done : function ( res ) {
            //         var result = JSON.parse( JSON.stringify( res.result ) );
            //         if( el == "#up4" || el == "#up5" ) {
            //             that.bankParams[attr] = result;
            //         } else if ( el == "#up6" ) {
            //             that.voucherParams[attr] = result;
            //         } else {
            //             that.companyParams[attr] = result;
            //         }
            //         layer.close( loadidx );
            //     } ,
            //     error : function ( err ) {
            //         layer.msg("上传失败");
            //         layer.close( loadidx );
            //     }
            // });





            //uploadInst.upload();
            //console.log( el , attr )
        } ,
        //提交公司信息
        submitCompanyData : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;

            var form = layui.form;


            form.on("submit(company)",function ( data ) {
                var params = that.companyParams;

                if( params.businessLicensePicture == "" ) {
                    layer.msg("请上传营业执照电子版",{ icon : 5 });
                    return;
                }
                if( params.isAllInOne == 0 ) {
                    if( params.organizationCodePic == "" ) {
                        layer.msg("请上传组织机构代码证电子版",{ icon : 5 });
                        return;
                    }
                    if( params.taxRegistrationCertificateNumberPic == "" ) {
                        layer.msg("请上传组织机构代码证电子版",{ icon : 5 });
                        return;
                    }
                }


                http.Post( http.urls.companyData , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                var result = JSON.parse( JSON.stringify( data.result ) );
                                if( result.hasOwnProperty("id") ) {
                                    params.id = result.id;
                                }
                                that.next(2);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })

                return false;
            })
        } ,
        //提交财务信息
        submitBankData : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;

            var form = layui.form;

            form.on("submit(bank)",function ( data ) {
                var params = that.bankParams;
                if( params.bankAccountLicensePicture == "" ) {
                    layer.msg("请上传开户银行许可证电子版",{ icon : 5 });
                    return;
                }
                if( params.taxpayerProof == "" ) {
                    layer.msg("请上传一般纳税人证",{ icon : 5 });
                    return;
                }


                http.Post( http.urls.bankData , params ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                var result = JSON.parse( JSON.stringify( data.result ) );
                                if( result.hasOwnProperty("id") ) {
                                    params.id = result.id;
                                }
                                that.next(3);
                                break;
                            default :
                                layer.msg( data.msg );
                        }
                    } catch ( e ) {
                        console.error("ERROR : " , e );
                    }
                })

                return false;
            })
        } ,
        //提交店铺信息
        submitShopData : function () {
            var layer = layui.layer,
                $ = layui.jquery,
                that = this;

            var form = layui.form;
            form.on("submit(shop)",function ( data ) {
                 var params = that.shopParams,p;
                 params.useShopCategoryApplyDtoList = [];
                 params.sellerUsername = that.userInfo.account;
                 that.treePaths.forEach(function (item,index) {
                     var o;
                     if( item instanceof Array ) {
                         o = {
                             id : item.id ,
                             shopkeeperUsername : that.userInfo.account ,
                             shopName : params.shopName ,
                             categoryLev : item[item.length - 1].lev ,
                             commissionProportion : item[item.length - 1].commissionRatio ,
                             openState : 0 ,
                             categoryId : item[item.length - 1].id ,
                             categoryName : item[item.length - 1].name
                         }
                     } else {
                         o = {
                             id : item
                         };
                     }
                     params.useShopCategoryApplyDtoList.push( o );
                 })

                if( Boolean( params.id ) ) {
                    p = {
                        id : params.id ,
                        sellerUsername: params.sellerUsername ,
                        shopName:params.shopName ,                                            //店铺名称
                        shopLevelId: params.shopLevelId ,                                          //点铺等级
                        shopOpenYear: params.shopOpenYear,                                      //开店时长
                        shouldPayAmount: params.shouldPayAmount ,                                    //保证金
                        shopCategoryId : params.shopCategoryId ,
                        useShopCategoryApplyDtoList:JSON.parse( JSON.stringify( params.useShopCategoryApplyDtoList ) )
                    }
                } else {
                    p = params;
                }

                 //console.log( JSON.stringify( p ) )
                http.Post( http.urls.shopInfo , p ).done(function ( data ) {
                    try{
                        switch( data.httpCode ) {
                            case 200 :
                                var result = JSON.parse( JSON.stringify( data.result ) );
                                if( result.hasOwnProperty("id") ) {
                                    params.id = result.id;
                                }
                                that.next( 4 );
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
        //提交付款凭证
        submitVoucher : function () {
            var that = this,
                layer = layui.layer;

            this.voucherParams.id = this.userInfo.shopManagementInfoId;
            http.Post( http.urls.submitVoucher , that.voucherParams ).done(function ( data ) {
                try{
                    switch( data.httpCode ) {
                        case 200 :
                            that.payStatus = true;
                            break;
                        default :
                            layer.msg( data.msg );
                    }
                } catch ( e ) {

                }
            })
            console.log( that.voucherParams )
        } ,
        //填充数据
        fullData : function ( data , elem ) {
            var $ = layui.jquery;
            var el = $( elem );
            var form = layui.form;

            var str = "<option></option>";
            for( var i = 0, len = data.length; i < len; i ++ ) {
                str += "<option value=\""+ data[i].zoneId +"\">"+ data[i].name +"</option>";
            }
            el.html( str );

            var t = setTimeout(function () {
                form.render("select");
                clearTimeout( t );
            })
        } ,
        //返回上级
        getBack : function () {
            this.step --;
            this.next( this.step );
        } ,


    }
});
