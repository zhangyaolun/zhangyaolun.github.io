new Vue({
    el: '#app',
    data: {
        goodsFalg:false,//无商品收藏
        storeFalg:false,//无店铺收藏
        headerList:['商品收藏','店铺收藏'],
        preLoading:true,
        itemList:[],//商品列表
        sellerList:[],//店铺列表
        listShow:true,//是否有数据
        odatas:{
            "curFalg":1,
        },
        headerFalg:0,//店铺商品切换显示
        priceFalg:true,//商品与店铺切换价格不显示
        page:1,
        count:10,
    },
    computed: {
    },
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        _this.odatas.curFalg = commentJs.getUrlKey('title');
        _this.odatas.curFalg==1?(_this.priceFalg=true,_this.headerFalg=0):(_this.priceFalg=false,_this.headerFalg=1);
        commentJs.downMenuSpot('favheader', 3);
        commentJs.toastLoading('加载中...');
        window.addEventListener('scroll', this.handleScroll);
        commentJs.appShowhide('app');
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },

    methods: {
        oListData:function(){//主菜单列表
            var _this = this;
            var suc = function (data){
                console.log(data)
                if(_this.page == 1){_this.itemList = [];}
                if(_this.odatas.curFalg == 1){
                    _this.storeFalg = false;
                    if(data.result.list.length == 0 && _this.itemList.length == 0){
                        _this.goodsFalg = true;
                        _this.listShow = false;
                    }else {
                        data.result.list.forEach(function (v,k) {
                            _this.itemList.push(v)
                        })
                        _this.goodsFalg = false;
                        _this.listShow = true;
                    }
                }else{
                    _this.goodsFalg = false;
                    if(data.result.list.length == 0 && _this.itemList.length == 0){
                        _this.storeFalg = true;
                        _this.listShow = false;
                    }else {
                        data.result.list.forEach(function (v,k) {
                            _this.itemList.push(v)
                        })
                        _this.storeFalg = false;
                        _this.listShow = true;
                    }
                }
                _this.preLoading = false;

            }
            o.collectionList(_this.odatas.curFalg,_this.page,_this.count,suc);
        },
        delList:function(id,index){//删除
            console.log('090')
            var _this = this;

            _this.itemList.forEach(function (v,k) {
                if(v.product.id == id){
                    _this.preLoading = true;
                    console.log(id)
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
                        console.log(_this.itemList.length)
                        console.log(_num)
                        commentJs.setCookie('shopCollNum',_num,1);
                        _this.oList();
                    }
                    o.collectionDelete(shopSave,suc);
                }
            });
        },
        headerTitle:function (index) {//商品与店铺查询切换
            var _this = this;
            index==0?(_this.priceFalg=true,_this.headerFalg=0,_this.odatas.curFalg=1):(_this.priceFalg=false,_this.headerFalg=1,_this.odatas.curFalg=2);
            _this.page=1;
            _this.oListData();
        },
        handleScroll: function () {//底部加载
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oListData(_this.page,_this.count);
            }
        },
        oList: function () {//删除后检索数据是否为空处理za
            var _this = this;
            if(_this.itemList.length == 0){
                _this.listShow = false;
                if(this.odatas.curFalg == 1){
                    _this.goodsFalg = true;
                    _this.storeFalg = false;
                }else{
                    _this.goodsFalg = false;
                    _this.storeFalg = true;
                }
            }
        },
    }
})