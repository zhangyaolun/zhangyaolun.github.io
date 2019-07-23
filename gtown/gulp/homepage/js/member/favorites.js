new Vue({
    el: '#app',
    data: {
        preLoading:true,
        itemList:[],//商品列表
        sellerList:[],//店铺列表
        listShow:true,//是否有数据
        odatas:{
            "curFalg":1,
        },
        priceFalg:true,//商品与店铺切换价格不显示
        page:1,
        count:10,
    },
    filters: {
        currency: function (value) {
            return value?'¥'+(parseInt(value)/100).toFixed(2):'0.00';
        },
    },
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        commentJs.toastLoading('加载中...');
        setTimeout(function () {
            _this.oListData();
        }, 10);
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        DownShelfClick: function (id,status) {//商品下架处理跳转
            if(status == 'OnShelf'){
                window.location.href = '../product/product_detail.html?goods_id='+id;
            }else{
                window.location.href = './shopLower.html';
            }
        },
        oListData:function(){//主菜单列表
            var _this = this;
            var suc = function (data){
                if(_this.page == 1){_this.itemList = [];}
                if(_this.odatas.curFalg == 1){
                    if(data.result.list.length == 0 && _this.itemList.length == 0){
                        _this.listShow = false;
                        $('body').addClass('bgf');
                    }else {
                        $('body').removeClass('bgf');
                        data.result.list.forEach(function (v,k) {
                            if(v.product){
                                v.disabledInputTitle = '';

                                var _id = '';
                                v.product.spuList.forEach(function (a,b) {
                                    a.spuAttrList.forEach(function (q,w) {
                                        if(w== 0){
                                            _id+=q.id+','
                                        }
                                    })
                                })
                                _id = '['+_id.substring(0,_id.length-1)+']';
                                v.setSkuId = '';
                                v.setStock = 0;
                                v.product.skuList.forEach(function (s,d) {
                                    if(s.skuCombination == _id){
                                        v.setSkuId = s.id;
                                        v.setStock = s.stock;
                                    }
                                });
                                if(v.setStock == 0){
                                    v.disabledInputTitle = '无货';
                                }
                                if(v.product.status == 'DownShelf'){
                                    v.disabledInputTitle = '已下架';
                                }
                                _this.itemList.push(v);
                            }
                        })
                        _this.listShow = true;
                    }
                    if(_this.itemList.length == 0){
                        _this.listShow = false;
                        $('body').addClass('bgf');
                    }
                }
                _this.preLoading = false;

            }
            o.collectionList(_this.odatas.curFalg,_this.page,_this.count,suc);
        },
        delList:function(id,index){//删除
            var _this = this;
            _this.itemList.forEach(function (v,k) {
                if(v.product.id == id){
                    _this.preLoading = true;
                    var _num = 0;
                    var shopSave={
                        "collectType": _this.odatas.curFalg,
                        "collectId": id
                    }
                    var suc = function (data) {
                        _this.preLoading = false;
                        commentJs.toastTitle('已取消收藏','');
                        _this.itemList.splice(k,1);
                        _this.itemList.length == 0?_num = 0:_num=_this.itemList.length;
                        commentJs.shopCollNum();
                        _this.oList();
                    }
                    o.collectionDelete(shopSave,suc);
                }
            });
        },
        handleScroll: function () {//底部加载
            var _this = this;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                _this.oListData(_this.page,_this.count);
            }
        },
        oList: function () {//删除后检索数据是否为空处理za
            var _this = this;
            if(_this.itemList.length == 0){
                _this.listShow = false;
            }
        },
        footClick: function (aid,status) {
            if(status == 'OnShelf') {
                window.location.href = "../product/product_detail.html?goods_id=" + aid;
            }else{
                window.location.href = './shopLower.html';
            }
        },
    }
})
