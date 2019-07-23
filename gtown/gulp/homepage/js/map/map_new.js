new Vue({
    el: '#app',
    data: {
        mapTitleHead:'新增收货地址',
        submitDate:{
            'receiverName':'',
            'telephone':'',
            'aliasName':'',
            'province':'',
            'city':'',
            'area':'',
            'address':'',
            'defaults':false,
        },
        submitColor:false,
        oTitle:''
    },
    computed: {
        mapAddress:function () {
            var _this = this;
            if(_this.submitDate.province!=''){
                return _this.submitDate.province+' '+_this.submitDate.city+' '+_this.submitDate.area;
            }
        }
    },
    mounted: function () {
        var _this = this;
        FastClick.attach(document.body);
        _this.oTitle = commentJs.getUrlKey('title') || '';
        if(_this.oTitle){
            _this.mapTitleHead = '编辑收货地址';
            var _oTitleAttr = JSON.parse(sessionStorage.getItem('mapTitle'));
            _this.submitDate.receiverName = _oTitleAttr.receiverName;
            _this.submitDate.telephone = _oTitleAttr.telephone;
            _this.submitDate.aliasName = _oTitleAttr.aliasName;
            _this.submitDate.province = _oTitleAttr.province;
            _this.submitDate.city = _oTitleAttr.city;
            _this.submitDate.area = _oTitleAttr.area;
            _this.submitDate.address = _oTitleAttr.address;
            _this.submitDate.defaults = _oTitleAttr.defaults;
            _this.submitDate.id = _oTitleAttr.id;
        }
        _this.perClick();
    },
    watch:{
        submitDate:{
            handler: function (val, oldVal){
                var _this = this;
                (val.receiverName != '' && val.telephone != '' && val.province != '' && val.city != ''&& val.area != ''&& val.address != '')?_this.submitColor = true:_this.submitColor = false;
            },
            deep:true
        }
    },
    methods: {
        MapCityClick: function (){
            var _this = this;
            commentJs.areaSelected({
                success : function(data){
                    area_info = data.area_info;
                    _this.submitDate.province = data.area_id_1;
                    _this.submitDate.city = data.area_id_2;
                    _this.submitDate.area = data.area_id_3;
                    $('#varea_info').val(data.area_info);
                }
            });
        },
        default_click: function (){
            this.submitDate.defaults = !this.submitDate.defaults;
        },
        submit_click: function (){
            var _this = this;
            if(_this.submitColor){
                var phone = _this.submitDate.telephone;
                if(!commentJs.checkPhone(phone) && !commentJs.checkFixedPhone(phone)){
                    commentJs.toastTitle('手机号输入有误','forbidden');
                    return;
                }
                var suc = function (data) {
                    if(data.result.list.length == 0){
                        _this.submitDate.defaults = true;
                        _this.submit_suc();
                    }else{
                        if(_this.oTitle){
                            _this.submit_Mod();
                        }else{
                            _this.submit_suc();
                        }
                    }
                }
                o.useBuyerAddress(1,10,suc);
            }
        },
        submit_suc:function () {
            var _this = this;
            var suc = function (data) {
                window.location.href = "./map_list.html"
            }
            o.useAddAddress(_this.submitDate,suc);
        },
        submit_Mod:function () {
            var _this = this;
            var suc = function (data) {
                window.location.href = "./map_list.html"
            }
            o.useModAddress(_this.submitDate,suc);
        },
        perClick: function () {
            var _this = this;
            $("#sex").select({
                title: "选择标签",
                autoClose:true,
                items: ["无","家", "学校", "公司"],
                onClose: function(d) {
                    if(d.data.values == "无"){
                        _this.submitDate.aliasName = '';
                    }else{
                        _this.submitDate.aliasName = d.data.values;
                    }
                }
            });
        },
    }
})
