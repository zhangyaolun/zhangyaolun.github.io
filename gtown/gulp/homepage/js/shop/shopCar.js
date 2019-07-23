new Vue({
    el: '#app',
    data: {
        /*商品状态(下架:DownShelf,违规:BreakRule,上架:OnShelf)*/
        headerEdit: true,
        headerTitle: '编辑',//头部编辑与完成切换
        JSeditShowTitle: true,//店铺的编辑与完成切换
        JSeditShowhide: false,//店铺的编辑与完成功能
        checkAll_checked: false,//全选
        preLoading: true,
        mainEmpty: true,//是否为空购物车
        JSlistShow: true,
        subTitle: 0,//去付款与删除切换显示
        subShow: true,//总金额显示
        JSeditShow: -1,//店铺的编辑与完成功能下标
        dialogWrapper: false,//删除弹框
        //allmoney: 0,//总金额
        shopList: [],//商品信息
        addCheckNum: [],//选中商品数量
        addCheckPrice: [],//选中商品价格
        addCheckId: [],//选中商品id
        delChecked:[],//单个删除商品id
        delMoreChecked:[],//多个删除商品id
        _thisAttr:[],//更新购物车提交数据
        _thisTrue:{
            "count":0,
            "id":'',
            "selected":false,
            "skuId":''
        },//更新购物车单个数据
    },
    computed: {
        allmoney:function () {
            var _this = this;
            var oPrice = 0;
            if(_this.addCheckPrice){
                _this.addCheckPrice.forEach(function (v, k) {
                    oPrice += v*parseInt(_this.addCheckNum[k])
                })
            }
            return oPrice?(parseInt(oPrice)/100).toFixed(2)+'元':'0.00';
        }
    },
    watch:{
        shopList:{
            handler: function (val, oldVal){

            },
            deep:true
        },
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('购物车数据读取中...');
        commentJs.headerFooter(3);
        var _this = this;
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },
    filters: {
        currency: function (value) {
            return value?(parseInt(value)/100).toFixed(2):'0.00';
        },
        subTitleCurrency: function (value) {
            return '去结算(' + value + ')';
        }
    },
    methods: {
        inputblur:function (items,k,i) {//框子失去焦点
            var _this = this;
            var thisAttr = [];
            var _falg = false;
            var thisTrue = {"count":'',"id":'',"selected":false,"skuId":''};
            if(!( /^[1-9]\d*$/.test(items.count))){
                items.count = 1;
                thisTrue.count = 1;
                thisTrue.id = items.id;
                thisTrue.selected = items.selected;
                thisTrue.skuId = items.skuId;
                thisAttr.push(thisTrue);
                var sucs = function (data) {
                    _this.allcheckedInput();
                    _this.addproductNum();
                    _this.shopCarNum();
                }
                o.shopcarUpCargo(thisAttr, sucs);
            }
        },
        inputChange:function (items, newindex, oldindex) {//输入框子
            var _this = this;
            var thisAttr = [];
            var _falg = false;
            var thisTrue = {"count":'',"id":'',"selected":false,"skuId":''};
            if(!( /^[1-9]\d*$/.test(items.count))){
                if(items.count){
                    items.count = items.count.substring(0,items.count.length-1);
                }else{
                    _falg = true;
                }
            }else{
                if(items.count > items.sku.stock || items.count>256){
                    if(items.sku.stock>256){
                        items.count = 256;
                    }else{
                        items.count = items.sku.stock;
                    }
                    commentJs.toastTitle('数量超出范围','forbidden');
                }
            }
            thisTrue.count = items.count?items.count:'';
            thisTrue.id = items.id;
            thisTrue.selected = items.selected;
            thisTrue.skuId = items.skuId;
            thisAttr.push(thisTrue);
            if(!_falg){
                var sucs = function (data) {
                    _this.allcheckedInput();
                    _this.addproductNum();
                    _this.shopCarNum();
                }
                o.shopcarUpCargo(thisAttr, sucs);
            }
        },
        oListData: function () { //主菜单列表
            var _this = this;
            var suc = function (data) {
                if(data.result.length != 0){
                    $('body').removeClass('bgf');
                    _this.mainEmpty = true;
                    _this.headerEdit = true;
                    var _res = data.result;
                    _res.forEach(function (v, k) {
                        var _falg = true,_status = true,_num=0;

                        v.cargoList.forEach(function (m, n) {
                            m.oldcount = m.count;
                            /*检查库存*/    /*商品状态(下架:DownShelf,违规:BreakRule,上架:OnShelf)*/
                            if(m.sku.stock == 0 || m.sku.stock == null || m.sku.stock == 'null' || m.product.status == 'DownShelf'){
                                m.disabledInput = true;
                                m.disabledInputTitle = '无货';
                                if(m.selected){
                                    var _a = [],_b={"count":1,"id":m.id,"selected":false,"skuId":m.skuId};
                                    var sucsCargos = function () {};
                                    _a.push(_b);
                                    o.shopcarUpCargo(_a, sucsCargos);
                                }
                                m.selected= false;
                            }else{
                                m.disabledInput = false;
                            }
                            if(m.product.status == 'DownShelf'){
                                m.disabledInputTitle = '下架';
                                if(m.selected){
                                    var _a = [],_b={"count":1,"id":m.id,"selected":false,"skuId":m.skuId};
                                    var sucsCargos = function () {};
                                    _a.push(_b);
                                    o.shopcarUpCargo(_a, sucsCargos);
                                }
                                m.selected= false;
                            }
                            if(!m.disabledInput){
                                _num=1;
                                if (!m.selected) {_falg = false;return;}
                            }
                        })
                        if(_num == 1){
                            v.seller.selected = _falg;
                        }
                    })
                    _this.shopList = JSON.parse(JSON.stringify(_res));
                    _this.addproductNum();
                    _this.allcheckedInput();
                }else{
                    $('body').addClass('bgf');
                    _this.mainEmpty = false;
                    _this.headerEdit = false;
                }
                _this.preLoading = false;
            }
            o.shopcarAll(suc);
        },
        JSedit: function (i) {//点击各店铺编辑
            var _this = this;
            _this.JSlistShow = !_this.JSlistShow;
            _this.JSeditShow = i;
            var htmlTitle = $('.nctouch-cart-container .JS-edit').eq(i).html();
            $('.nctouch-cart-container .JS-edit').html('编辑');
            htmlTitle == '编辑' ? $('.nctouch-cart-container .JS-edit').eq(i).html('完成') : ($('.nctouch-cart-container .JS-edit').eq(i).html('编辑'), _this.JSeditShow = -1);
            if(htmlTitle == '完成'){
                _this.shopList[i].cargoList.forEach(function (m, n) {
                    if(!( /^[1-9]\d*$/.test(m.count))){
                        if(m.count){m.count = m.count.substring(0,m.count.length-1);}
                        if(!m.count){m.count=m.oldcount;}
                    }
                })
            }
        },
        reduceChang: function (items, newindex, oldindex) {
            var _this = this;
            if (items.count < 2) return;
            items.count--;
            var oData = _this.shopList[oldindex].cargoList;
            items.oldcount = items.count;
            var _thisTrue = {
                "count":items.count,
                "id":items.id,
                "selected":true,
                "skuId":items.skuId
            },_count=[];
            items.selected = true;
            _count.push(_thisTrue);
            if(oData[newindex].selected){
                var sucs = function (data) {
                    _this.checkedInput(oldindex);
                }
                o.shopcarUpCargo(_count, sucs);
            }else{
                _this.changList(newindex, oldindex);
                _this.addproductNum()
            }
        },
        plusChang: function (items, newindex, oldindex) {
            var _this = this;
            var oData = _this.shopList[oldindex].cargoList;
            items.count++;
            if(items.count > items.sku.stock || items.count > 256 ){
                if(items.sku.stock>=256){
                    items.count = 256;
                    items.oldcount = 256;
                }else{
                    items.count = items.sku.stock;
                    items.oldcount = items.count;
                }
                commentJs.toastTitle('数量超出范围','forbidden');
                return;
            }
            items.selected = true;
            items.oldcount = items.count;
            var _thisTrue = {
                "count":items.count,
                "id":items.id,
                "selected":true,
                "skuId":items.skuId
            },_count=[];
            _count.push(_thisTrue);
            if(oData[newindex].selected){
                var sucs = function (data) {
                    _this.checkedInput(oldindex);
                }
                o.shopcarUpCargo(_count, sucs);
            }else{
                _this.changList(newindex, oldindex);
                _this.addproductNum();
            }
        },
        changChecke: function (index) { //主店铺选中
            var _this = this;
            _this.shopList[index].seller.selected = !_this.shopList[index].seller.selected;
            _this._thisAttr = [];
            _this.preLoading = true;
            commentJs.toastLoading('更新中...');
            for (var i = 0, m = _this.shopList[index].cargoList.length; i < m; i++) {
                if(!_this.shopList[index].cargoList[i].disabledInput){
                    if(_this.shopList[index].seller.selected){
                        _this._thisTrue = {
                            "count":_this.shopList[index].cargoList[i].count,
                            "id":_this.shopList[index].cargoList[i].id,
                            "selected":true,
                            "skuId":_this.shopList[index].cargoList[i].skuId
                        };
                    }else{
                        _this._thisTrue = {
                            "count":_this.shopList[index].cargoList[i].count,
                            "id":_this.shopList[index].cargoList[i].id,
                            "selected":false,
                            "skuId":_this.shopList[index].cargoList[i].skuId
                        };
                    }
                    _this._thisAttr.push(_this._thisTrue);
                }
            }
            var sucs = function (data) {
                for (var s = 0, z = _this.shopList[index].cargoList.length; s < z; s++) {
                    _this.shopList[index].seller.selected ? !_this.shopList[index].cargoList[s].disabledInput?_this.shopList[index].cargoList[s].selected = true:_this.shopList[index].cargoList[s].selected = false : _this.shopList[index].cargoList[s].selected = false;
                }
                _this.preLoading = false;
                _this.allcheckedInput();
                _this.addproductNum();
            }
            o.shopcarUpCargo(_this._thisAttr, sucs);
        },
        changList: function (newindex, oldindex) { //店铺下的商品选中
            var _this = this;
            var oData = _this.shopList[oldindex].cargoList;
            if(oData[newindex].disabledInput){return;}
            var sucs = function (data) {
                oData[newindex].selected = !oData[newindex].selected;
                _this.checkedInput(oldindex);
                _this.preLoading = false;
            }
            _this.shopcarUp(newindex, oldindex,sucs);
        },
        checkAll: function () { //全选
            var _this = this;
            _this.checkAll_checked = !_this.checkAll_checked;
            _this._thisAttr = [];
            _this.preLoading = true;
            commentJs.toastLoading('更新中...');
            for (var i = 0, m = _this.shopList.length; i < m; i++) {
                _this.checkAll_checked ? _this.shopList[i].seller.selected = true : _this.shopList[i].seller.selected = false;
                for (var j = 0, n = _this.shopList[i].cargoList.length; j < n; j++) {
                    if(!_this.shopList[i].cargoList[j].disabledInput) {
                        if (_this.checkAll_checked) {
                            _this._thisTrue = {
                                "count": _this.shopList[i].cargoList[j].count,
                                "id": _this.shopList[i].cargoList[j].id,
                                "selected": true,
                                "skuId": _this.shopList[i].cargoList[j].skuId
                            };
                        } else {
                            _this._thisTrue = {
                                "count": _this.shopList[i].cargoList[j].count,
                                "id": _this.shopList[i].cargoList[j].id,
                                "selected": false,
                                "skuId": _this.shopList[i].cargoList[j].skuId
                            };
                        }
                        _this._thisAttr.push(_this._thisTrue);
                    }
                }
            }
            var sucs = function (data) {
                for (var i = 0, m = _this.shopList.length; i < m; i++) {
                    _this.checkAll_checked ? _this.shopList[i].seller.selected = true : _this.shopList[i].seller.selected = false;
                    for (var j = 0, n = _this.shopList[i].cargoList.length; j < n; j++) {
                        _this.checkAll_checked ? !_this.shopList[i].cargoList[j].disabledInput?_this.shopList[i].cargoList[j].selected = true:_this.shopList[i].cargoList[j].selected = false  : _this.shopList[i].cargoList[j].selected = false;
                    }
                }
                _this.preLoading = false;
                _this.allcheckedInput();
                _this.addproductNum();
            }
            o.shopcarUpCargo(_this._thisAttr, sucs);
            _this.allcheckedInput();
            _this.addproductNum();
        },
        checkedInput: function (oldindex) { //点击单个检验选中
            var numm = true;
            var _this = this;
            for (var i = 0, m = _this.shopList[oldindex].cargoList.length; i < m; i++) {
                if(!_this.shopList[oldindex].cargoList[i].disabledInput){
                    if (!_this.shopList[oldindex].cargoList[i].selected) numm = false;
                }
            }
            !numm ? _this.shopList[oldindex].seller.selected = false : _this.shopList[oldindex].seller.selected = true
            _this.allcheckedInput();
            _this.addproductNum();
        },
        allcheckedInput: function () { //点击单个检验全部选中
            var numm = true,_num=0;
            var _this = this;
            for (var i = 0, m = _this.shopList.length; i < m; i++) {
                for (var j = 0, n = _this.shopList[i].cargoList.length; j < n; j++) {
                    if(!_this.shopList[i].cargoList[j].disabledInput){
                        _num=1;
                        if (!_this.shopList[i].cargoList[j].selected) numm = false;
                    }
                }
            }
            if(_num == 1){
                numm ? _this.checkAll_checked = true : _this.checkAll_checked = false;
            }
        },
        addproductId: function () { //查询选中
            this.addCheckId = [];
            this.addCheckNum = [];
            this.addCheckPrice = [];
            this.delMoreChecked = [];
            var vm = this;
            vm.shopList.forEach(function (v, k) {
                v.cargoList.forEach(function (m, n) {
                    if (m.selected) {
                        vm.addCheckId.push(m.skuId);
                        vm.delMoreChecked.push(m.id);
                        vm.addCheckPrice.push(m.price);
                        vm.addCheckNum.push(m.count);
                    }
                })
            })
        },
        addproductNum: function () { //查询选中商品数量
            var vm = this;
            vm.subTitle = 0;
            vm.addproductId();
            vm.addCheckNum.forEach(function (v, k) {
                vm.subTitle = parseInt(vm.subTitle) + parseInt(v);
            })
        },
        headerClick: function () {//头部编辑&完成
            var _this = this;
            if (_this.headerTitle == '编辑') {
                _this.headerTitle = '完成';
                _this.JSeditShowTitle = false;
                _this.JSeditShowhide = true;
                _this.subShow = false;
            } else {
                _this.headerTitle = '编辑';
                _this.JSeditShowTitle = true;
                _this.JSeditShowhide = false;
                _this.JSeditShow = -1;
                _this.subShow = true;
                $('.nctouch-cart-container .JS-edit').html('编辑');
                _this.addproductNum();
            }
        },
        dialogWrapperClick: function (id) {//单个删除点击
            console.log(id)
            this.dialogWrapper = true;
            this.delChecked = [];
            this.delChecked.push(id);
        },
        btnCancel: function () {//删除取消
            this.dialogWrapper = false;
        },
        btnTrue: function () {//删除确定
            var vm = this;
            if(vm.delChecked.length>0){//单个点击删除
                var suc = function (data) {
                    vm.shopList.forEach(function (v, k) {
                        v.cargoList.forEach(function (n, m) {
                            if(n.id == vm.delChecked[0]){
                                v.cargoList.splice(m, 1);
                            }
                        })
                    })
                    vm.delChecked = [];
                    commentJs.toastTitle('删除成功','');
                    vm.dialogWrapper = false;
                    vm.shopCarSeller();
                    vm.shopCarNum();
                }
                o.shopcardel(vm.delChecked,suc);
            }else{//多个删除
                var suc = function (data) {
                    vm.delMoreChecked.forEach(function (a, b) {
                        vm.shopList.forEach(function (v, k) {
                            v.cargoList.forEach(function (n, m) {
                                if(n.id == a){
                                    v.cargoList.splice(m, 1);
                                }
                            })
                        })
                    })
                    commentJs.toastTitle('删除成功','');
                    vm.shopCarSeller();
                    vm.dialogWrapper = false;
                    vm.shopCarNum();
                }
                o.shopcardel(vm.delMoreChecked,suc);
            }
            vm.allcheckedInput();
            vm.addproductNum();
        },
        btnMoreDel: function () {//多选删除
            this.dialogWrapper = true;
        },
        payMent: function () {//去付款
            if (this.subTitle == 0) {
                commentJs.toastTitle('请选择商品','forbidden');
                return;
            }
            sessionStorage.setItem('orderNum',1);
            window.location.href = 'shopOrder.html?subType=Carog';
        },
        shopcarUp: function (newindex, oldindex,sucs) {//更新购物车
            var _this = this;
            var oData = _this.shopList[oldindex].cargoList;
            _this._thisAttr = [];
            _this._thisTrue = {
                "count":oData[newindex].count,
                "id":oData[newindex].id,
                "selected":!oData[newindex].selected,
                "skuId":oData[newindex].skuId
            };
            _this._thisAttr.push(_this._thisTrue);
            _this.preLoading = true;
            commentJs.toastLoading('更新中...');
            o.shopcarUpCargo(_this._thisAttr, sucs);
        },
        shopCarNum: function () {//购物车数量
            var _this = this;
            var _num = 0;
            for (var i = 0, m = _this.shopList.length; i < m; i++) {
                for (var j = 0, n = _this.shopList[i].cargoList.length; j < n; j++) {
                    _num += parseInt( _this.shopList[i].cargoList[j].count)
                }
            }
            commentJs.setCookie('shopNum',_num,1);
        },
        shopCarSeller: function () {//删除检测店铺下是否无商品
            var _this = this;
            console.log(_this.shopList.length)
            for (var i = 0, m = _this.shopList.length; i < m; i++) {
                if(_this.shopList[i] && _this.shopList[i].cargoList.length == 0){
                    _this.shopList.splice(i, 1);
                }
            }
            if(_this.shopList.length == 0){
                _this.mainEmpty = false;
                _this.headerEdit = false;
            }
        },
        DownShelfClick: function (id,status) {//商品下架处理跳转
            if(status == 'OnShelf'){
                window.location.href = '../product/product_detail.html?goods_id='+id;
            }else{
                window.location.href = '../member/shopLower.html';
            }
        },
    }
})
