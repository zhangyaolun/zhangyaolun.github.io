new Vue({
    el: '#app',
    data: {
        type:'',
        detailContent: '',
        preLoading:true
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        var _this = this;
        _this.type = commentJs.getUrlKey('type');
        commentJs.toastLoading('加载中...');
        if(!_this.type){commentJs.homeHader('');return;}
        commentJs.homeHader('');
        commentJs.kefuLogo('kefu_logo');
        setTimeout(function () {_this.getInfo();},10);
    },

    methods: {
        getInfo: function ()  {
            var _this = this;
            var sucNew = function (data) {
                if(data.result && data.result.length>0){
                    data.result.forEach(function (v,k) {
                        if(v.isOpen){
                            if( _this.type == 22 || _this.type == 12 ){
                                var oid = commentJs.getUrlKey('oid');
                                if(v.id == oid){
                                    _this.detailContent = v.detailContent;
                                    $('.header-title h1').html(v.title);
                                }
                            }else {
                                _this.detailContent = v.detailContent;
                                if(_this.type == 21 || _this.type == 23){
                                    $('.header-title h1').html(v.title);
                                }
                                return;
                            }
                        }
                    })
                }
                _this.preLoading = false;
            }
            o.homeNews(_this.type,sucNew);
        },
    }


})