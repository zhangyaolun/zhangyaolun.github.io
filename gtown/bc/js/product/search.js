new Vue({
    el: '#app',
    data: {
        message: '-00000',
        goodsClass: false,
        goodsValue: '宝贝',
        goodsWrite: false,
        inputVal: '',
        hotSeach: ['茶杯', '衣服', '美食', '电脑', '电视']
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.appShowhide('app');
    },
    watch: {
        inputVal: function (curVal, oldVal) {
            curVal.length > 0 ? this.goodsWrite = true : this.goodsWrite = false;
        }
    },
    methods: {
        goodsChange: function () {//宝贝&店铺显示隐藏
            this.goodsClass = !this.goodsClass;
        },
        goodsList: function (val) {//宝贝&店铺选择
            this.goodsValue = val;
            this.goodsClass = !this.goodsClass;
        },
        goodsinputDel: function () {//删除搜索
            this.inputVal = '';
        },
        goodsHotList: function (val) {//点击热搜
            window.location.href = 'product_item.html?title=' + val;
        },
        goodsSearch: function () {//点击搜索
            this.goodsValue == '宝贝' ? window.location.href = 'product_item.html?title=' + this.inputVal : window.location.href = 'search.html?title=' + this.inputVal;
        }
    }


})