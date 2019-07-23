new Vue({
    el: '#app',
    data: {
        oBackTopFixed: false,
        preLoading:true,
        address_list:false,
        defaultsImg:'../../images/weixuanzhong@2x.png',
        product: [],
        page: 1,
        count: 10,
        dialogWrapper:false,
        delData:{id:'',i:''}
    },
    computed: {},
    filters: {
        currency: function (value) {
            value==1?this.defaultsImg='../../images/xuanzhong@2x.png':this.defaultsImg='../../images/weixuanzhong@2x.png';
            return value==1?'默认地址':'';
        }
    },
    created:function () {
        FastClick.attach(document.body);
        commentJs.homeHader('地址管理','../member/member.html');
        commentJs.toastLoading('加载中...');
        commentJs.BackToTop('fix-block-r');
        var _this = this;
        setTimeout(function () {
            _this.oListData();
        }, 10);
        window.addEventListener('scroll', _this.handleScroll);
    },
    mounted: function () {
        commentJs.kefuLogo('kefu_logo');
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
                }
            }
            o.useBuyerAddress(_this.page, _this.count, suc);
        },
        oBackTop: function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        btnMoreDel: function () {
            this.dialogWrapper = true;
        },
        handleScroll: function () {
            var _this = this;
            if (($(window).height() + $(document).scrollTop()) == $(document).height()) {
                _this.page++;
                _this.oListData();
            }
        },
        btnTrue: function () {
            var _this = this;
            var suc = function (data) {
                commentJs.toastTitle('删除成功','');
                _this.dialogWrapper = false;
                _this.product.splice(_this.delData.i, 1);
            }
            o.useDelAddress(_this.delData.id, suc);
        },
        btnCancel: function () {
            this.dialogWrapper = false;
        },
        deladdress: function (id,i) {
            var _this = this;
            _this.delData.id = id;
            _this.delData.i = i;
            _this.dialogWrapper = true;
            return;
            var suc = function (data) {
                commentJs.toastTitle('删除成功','');
                _this.product.splice(i, 1);
            }
            o.useDelAddress(id, suc);
        },
        oModAdress: function (i) {
            var _this = this;
            sessionStorage.setItem('mapTitle',JSON.stringify(_this.product[i]));
            window.location.href = 'map_new.html?title=1';
        },
    }


})
