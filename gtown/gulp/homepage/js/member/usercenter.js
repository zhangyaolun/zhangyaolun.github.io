new Vue({
    el: '#app',
    data: {
        preLoading: true,
        user_portrait: false,//头像上传
        queryData:{
            id:'',
            logo:''
        },
    },
    computed: {},
    watch:{
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        commentJs.homeHader('头像照片');
        commentJs.kefuLogo('kefu_logo');
        commentJs.toastLoading('加载中...');
        setTimeout(function () {_this.oListData();}, 10);
    },

    methods: {
        oListData: function () {//主菜单列表
            var _this = this;
            var suc = function (data) {
                var _result = data.result;
                _this.queryData.id = _result.id;
                _this.queryData.logo = _result.logo;
                _this.preLoading = false;
            }
            o.userSettingQuery(suc);
        },
        itemImages: function () {//头像上传保存修改
            var _this = this;
            _this.queryData.logo = $('.upLogo').attr('src');
            if (!_this.queryData.logo) return;
            var suc = function (data) {
                if (data.result == 0) {
                    commentJs.toastToptip('修改失败', 'error');
                } else {
                    sessionStorage.setItem('logo',_this.queryData.logo);
                    commentJs.toastTitle('修改成功', '');
                    setTimeout(function () {
                        window.location.href = './member_personal.html';
                    },1000)
                }
            }
            o.userSettingModify(_this.queryData, suc);
        },

    }


})