new Vue({
    el: '#aPp',
    data: {
        preLoading: true,
        listItem: [],//全部
        categoryItem: [],//一级分类
        categoryRgt: [],//二级分类
        categoryIndex: 0,//主菜单下标
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.staticSearch(1, 0);
        commentJs.toastLoading('分类数据读取中...');
        commentJs.headerFooter(1);
        var _this = this;
        setTimeout(function () {_this.oListData();}, 10);
    },
    methods: {
        categoryList: function (i) {//点击主菜单切换
            var _this = this;
            _this.categoryIndex = i;
            _this.categoryRgt = [];
            setTimeout(function () {_this.categoryRgt = _this.categoryItem[i].childer;},10)
        },
        oListData: function () {//菜单列表
            var _this = this;
            var suc = function (data) {
                var _result = data.result;
                 _this.listItem = _result;
                for(var i=0,m=_this.listItem.length;i<m;i++){
                    _this.listItem[i].childer = [];
                    if(!commentJs.checkNotEmpty(_result[i].pid) || _result[i].pid == 0){
                        _this.categoryItem.push(_result[i])
                    }
                }
                for(var is=0,im=_result.length;is<im;is++){
                    for(var io=0,mo=_this.categoryItem.length;io<mo;io++){
                        if(_result[is].pid == _this.categoryItem[io].id){
                            _this.categoryItem[io].childer.push(_result[is])
                            _this.categoryItem[io].childer[0].name = '090o9'
                        }
                    }
                }
                for(var iss=0,imm=_result.length;iss<imm;iss++){
                    for(var tw=0,tm=_this.categoryItem.length;tw<tm;tw++){
                        for(var ior=0,mor=_this.categoryItem[tw].childer.length;ior<mor;ior++){
                            if(_result[iss].pid == _this.categoryItem[tw].childer[ior].id){
                                _this.categoryItem[tw].childer[ior].childer.push(_result[iss])
                            }
                        }
                    }
                }
                _this.categoryRgt = _this.categoryItem[0].childer;
                _this.preLoading = false;
            }
            o.productCategorygetAll('123456789',suc);
        }
    }
})