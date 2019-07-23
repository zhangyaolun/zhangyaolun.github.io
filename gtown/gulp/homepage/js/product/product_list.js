new Vue({
    el: '#app',
    data: {
        preLoading: true,
        topNavlist:[
            {name:'成人',image:'../../images/pl_a.png',selected:true},
            {name:'儿童',image:'../../images/pl_d.png',selected:false}
        ],
        listItem: [],//全部
        categoryItem: [],//一级分类
        categoryRgt: [],//二级分类
        categoryThree: [],//三级分类
        categoryIndex: 0,//主菜单下标
        categoryNavIndex: 0,//Nav主菜单下标
        bannerList:{},
        seachTitle:''
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.toastLoading('分类数据读取中...');
        commentJs.headerFooter(2);
        var _this = this;
        setTimeout(function () {_this.oListData();}, 10);
    },
    methods: {
        topNavlistc: function (i) {//tab
            var _this = this;
            if(_this.categoryNavIndex == i)return;
            _this.categoryRgt = [];
            _this.categoryThree = [];
            i == 1?_this.categoryNavIndex=1:_this.categoryNavIndex=0;
            _this.categoryRgt = _this.categoryItem[i].childer;
            _this.categoryThree = _this.categoryRgt[0]?_this.categoryRgt[0].childer:'';
            //_this.topNavlist.forEach(function (v,k) {k==i?v.selected = true:v.selected = false;})
            //_this.topNavlist[0].selected?_this.topNavlist[0].image = '../../images/pl_a.png':_this.topNavlist[0].image = '../../images/pl_b.png';
            //_this.topNavlist[1].selected?_this.topNavlist[1].image = '../../images/pl_c.png':_this.topNavlist[1].image = '../../images/pl_d.png';
        },
        categoryListThree: function (i) {//3及跳转
            window.location.href = 'product_item.html?cat_id=' + i;
        },
        categoryList: function (i) {//点击主菜单切换
            var _this = this;
            _this.categoryIndex = i;
            _this.categoryThree = [];
            setTimeout(function () {_this.categoryThree = _this.categoryRgt[i].childer;},10)

        },
        oListData: function () {//菜单列表
            var _this = this;
            var suc = function (data) {
                var _result = data.result;
                _this.listItem = _result;
                _this.categoryItem = [];
                _this.categoryRgt = [];
                _this.categoryThree = [];

                for(var i=0,m=_this.listItem.length;i<m;i++){
                    _result[i].childer = [];
                    _result[i].banner = '';
                    _result[i].otypehot = 0;
                    if(!_result[i].isHide && _this.categoryItem.length<2){
                        if((_result[i].pid == null || _result[i].pid == 0) && !_result[i].isRecommend){
                            _this.categoryItem.push(_result[i]);
                        }
                    }
                }
                for(var is=0,im=_result.length;is<im;is++){
                    for(var io=0,mo=_this.categoryItem.length;io<mo;io++){
                        if(_result[is].pid == _this.categoryItem[io].id && !_result[is].isHide){
                            _result[is].otypehot = 0;
                            _this.categoryItem[io].childer.push(_result[is]);
                        }
                    }
                }
                for(var iss=0,imm=_result.length;iss<imm;iss++){
                    for(var tw=0,tm=_this.categoryItem.length;tw<tm;tw++){
                        for(var ior=0,mor=_this.categoryItem[tw].childer.length;ior<mor;ior++){
                            if(_result[iss].pid == _this.categoryItem[tw].childer[ior].id && !_result[iss].isHide){
                                _this.categoryItem[tw].childer[ior].childer.push(_result[iss]);
                            }
                        }
                    }
                }
                console.log(_this.categoryRgt[0])

                _this.categoryRgt = _this.categoryItem[0].childer.length>0?_this.categoryItem[0].childer:'';
                _this.categoryThree = _this.categoryRgt?_this.categoryRgt[0].childer:'';
                _this.preLoading = false;
            }
            o.productCategorygetAll('admin',suc);
        }
    }
})
