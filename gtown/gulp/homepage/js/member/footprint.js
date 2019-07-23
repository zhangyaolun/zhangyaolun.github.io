new Vue({
    el: '#list',
    data: {
        oBackTopFixed: false,
        preLoading: true,
        itemList: [],//商品信息
        page: 1,//页数
        count:10,//条数
        norecordShow:false
    },
    filters: {
        pricef: function (value) {
            return value?'¥'+(parseInt(value)/100).toFixed(2):'0.00';
        },
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        commentJs.kefuLogo('kefu_logo');
        var _this = this;
        setTimeout(function () {
            _this.oData(_this.page,_this.count);
        }, 10);

        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        oData: function (page , count) {//请求数据
            var _this = this;
            var callback = function (data) {
                var _list =  JSON.parse(JSON.stringify(data.result.list));
                if(page == 1){
                    _this.itemList = [];
                }
                if(_list.length>0){
                    $('body').removeClass('bgf');
                    _this.norecordShow = true;
                    if(_this.itemList.length == 0){
                       var  _iList = items(_list);
                        _iList.forEach(function (m, n) {
                            _this.itemList.push(m);
                        })
                    }else{
                        var  _oList = items(_list);
                        _oList.forEach(function (m, n) {
                            _this.itemList.push(m);
                        })
                        _this.itemList.forEach(function (v, k) {
                            if(_this.itemList[k+1] && v.dateStr == _this.itemList[k+1].dateStr){
                                _this.itemList[k+1].olist.forEach(function (m, n) {
                                    v.olist.push(m);
                                })
                                _this.itemList.splice(k+1, 1)
                            }
                        })
                    }
                    function items(_list) {
                        var _a = '';
                        var _attr = [],_a = [],_itemList = [];
                        _list.forEach(function (v, k) {
                            _a = v.dateStr.split('-');
                            _t = _a[0]+'年'+_a[1]+'月'+_a[2]+'日';
                            v.odateStr = _t;
                            _attr.push(_t);
                        })
                        _attr = commentJs.arrayTemp(_attr);
                        _attr.forEach(function (v, k) {
                            var _o = {dateStr:v,olist:[]};
                            _list.forEach(function (m, n) {
                                if(v == m.odateStr){
                                    m.isCollected?m.collectedImg='../../images/yishoucang@2x.png':m.collectedImg='../../images/shou@2x.png';
                                    if(m.productPageDto){
                                        m.disabledInputTitle = '';
                                        if(m.productPageDto.status == 'DownShelf'){
                                            m.disabledInputTitle = '已下架';
                                        }
                                        var _id = '';
                                        m.productPageDto.spuList.forEach(function (a,b) {
                                            a.spuAttrList.forEach(function (q,w) {
                                                if(w== 0){
                                                    _id+=q.id+','
                                                }
                                            })
                                        })
                                        _id = '['+_id.substring(0,_id.length-1)+']';
                                        m.setSkuId = '';
                                        m.setStock = 0;
                                        m.productPageDto.skuList.forEach(function (s,d) {
                                            if(s.skuCombination == _id){
                                                m.setSkuId = s.id;
                                                m.setStock = s.stock;
                                            }
                                        });
                                        if(m.setStock == 0){
                                            m.disabledInputTitle = '无货';
                                        }
                                        _o.olist.push(m)
                                    }
                                }
                            })
                            _itemList.push(_o);
                        })
                        return _itemList;
                    }
                }else{
                    $('body').addClass('bgf');
                    if(page == 1){
                        _this.norecordShow = false;
                    }
                }
                _this.preLoading = false;
            }
            o.footprintSeach( page, count, callback);
        },
        footClick: function (aid,status) {
            if(status == 'OnShelf') {
                window.location.href = "../product/product_detail.html?goods_id=" + aid;
            }else{
                window.location.href = './shopLower.html';
            }
        },
        footprintdel: function () {//清空
            var _this = this;
            var suc = function (data) {
                _this.itemList = [];
                _this.page = 1;
                commentJs.toastTitle('已清空','');
                $('body').addClass('bgf');
                _this.norecordShow = false;
            }
            o.footprintdelete(suc);
        },
        addCart: function (i,k) {//加入购物车
            var _this = this,_id='',skuId="";
            if(_this.itemList[i].olist[k].productPageDto.status == 'DownShelf')return;
            skuId = _this.itemList[i].olist[k].setSkuId;
            if(skuId == '' || _this.itemList[i].olist[k].setStock == 0)return;
            var sucs = function (data) {
                var _addFalg = true;
                data.result.forEach(function (v,p) {
                    v.cargoList.forEach(function (n,m) {
                        if(n.skuId == skuId){
                            if(n.count >= n.sku.stock || n.count >= 256){
                                _addFalg = false;
                                return;
                            }
                        }
                    })
                })
                if(_addFalg){
                    var shopcarsuc= function (data) {
                        commentJs.shopcarAll();
                        commentJs.toastTitle('加入购物车成功','');
                    }
                    o.shopcarAdd(skuId,1,shopcarsuc)
                }else{
                    commentJs.toastTitle('数量超出范围','forbidden');
                }
            }
            o.shopcarAll(sucs);
        },
        favorateFun: function (i,k) {//收藏
            var _this = this;
            var shopSave={
                "collectType": "1",
                 "collectId": _this.itemList[i].olist[k].linkId
            }
            if(_this.itemList[i].olist[k].productPageDto.status == 'DownShelf')return;
            if(!_this.itemList[i].olist[k].isCollected){
                var sucs = function (data) {
                    _this.itemList[i].olist[k].isCollected = true;
                    _this.itemList[i].olist[k].collectedImg='../../images/yishoucang@2x.png';
                    commentJs.toastTitle('收藏成功','');
                }
                o.collectionSave(shopSave,sucs);
            }else{
                var suc = function (data) {
                    _this.itemList[i].olist[k].isCollected = false;
                    _this.itemList[i].olist[k].collectedImg='../../images/shou@2x.png';
                    commentJs.toastTitle('已取消收藏','');
                }
                o.collectionDelete(shopSave,suc);
            }
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop > 100 ? _this.oBackTopFixed = true : _this.oBackTopFixed = false;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                _this.oData(_this.page,_this.count);
            }
        },
    }


})
