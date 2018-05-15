new Vue({
    el: '#app',
    data: {
        oBackTopFixed: false,
        preLoading:false,
        address_list:false,
        product: [],
        page: 1,
        count: 10,
    },
    computed: {},
    filters: {
        currency: function (value) {
            return value==1?'默认地址':'';
        }
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader();
        commentJs.headerFooter(0);
        commentJs.appShowhide('app');
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        var _this = this;
        window.addEventListener('scroll', _this.handleScroll);
        setTimeout(function () {
            _this.oListData();
        }, 10);
    },

    methods: {
        oListData: function () {
            var _this = this;
            var suc = function (data) {
                if(_this.page == 1){_this.product = [];}
                _this.preLoading = false;
                if(data.result.list.length>0){
                    data.result.list.forEach(function (v, k) {
                        _this.product.push(v);
                    })
                    console.log(_this.product)
                }
            }
            o.useBuyerAddress(_this.page, _this.count, suc);
        },
        oBackTop: function () {//回到顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        handleScroll: function () {
            var _this = this;
            if (window.innerHeight + $(document).scrollTop() == document.body.scrollHeight) {
                _this.page++;
                _this.oListData();
            }
        },
        deladdress: function (id,i) {//地址删除
            var _this = this;
            var suc = function (data) {
                console.log(data)
                commentJs.toastTitle('删除成功','');
                _this.product.splice(i, 1);
            }
            o.useDelAddress(id, suc);
        },
        oModAdress: function (i) {//点击编辑
            var _this = this;
            window.location.href = 'map_new.html?title='+JSON.stringify(_this.product[i]);
        },
    }


})