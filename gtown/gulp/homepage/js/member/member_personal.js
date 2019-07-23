new Vue({
    el: '#app',
    data: {
        map:'上海市 杨浦区',
        MapNew_falg: true,//昵称
        MapNew_fa: false,//昵称后退
        mailbox_falg: true,//昵称
        mailbox_fa: false,//昵称后退
        mailbox:'',
        submitColor:false,
        submitColors:false ,
        genderVal:'',
        queryData:{
            id:'',
            nickname: '',//用户名
            birthday:'',//生日
            address:'',//所在地区
            telephone:'',//手机号
            constellation:'',//星座
            gender:'',//性别
            email:'',//邮箱
            logo:'',//头像
        },
    },
    filters: {
        genderfilters: function (value) {//1男2女
            return value?value==1?'男':'女':'';
        },
        addressf:function (value) {//地址
            return value?value.split('|')[0]:'';
        }
    },
    watch:{
        queryData:{
            handler: function (val, oldVal){
                var _this = this;
                (val.userName != '')?_this.submitColor = true:_this.submitColor = false;
                (val.email != '')?_this.submitColors = true:_this.submitColors = false;
            },
            deep:true
        },
    },
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.homeHader('个人信息','./member.html');
        commentJs.kefuLogo('kefu_logo');
        this.oListData();
    },

    methods: {
        oListData: function () {//主菜单列表
            var _this = this;
            var suc = function (data) {
                var _res = data.result;
                var _data = [];
                _this.queryData.id = _res.id;
                _this.queryData.nickname = _res.nickname;
                _this.queryData.telephone = _res.telephone;
                _this.queryData.gender = _res.gender;
                _this.queryData.birthday = _res.birthday;
                _this.queryData.constellation = _res.constellation;
                _this.queryData.email = _res.email;
                _this.queryData.address = _res.address;
                _this.queryData.logo = _res.logo;
                _this.queryData.gender==1?_this.genderVal = '男':_this.genderVal = '女';
                _data.push(_this.queryData.birthday);
                _this.perClick(_data);
                _this.preLoading = false;
            }
            o.userSettingQuery(suc);
        },
        modSet:function () {//修改
            var _this = this;
            var suc = function (data) {
                sessionStorage.setItem('userName',_this.queryData.nickname,1);
                commentJs.toastTitle('修改成功','');
            }
            o.userSettingModify(_this.queryData,suc);
        },
        fileImg:function () {//头像
            window.location.href = './usercenter.html';
        },
        mailboxs: function () {//邮箱
            this.mailbox_falg = false;
            this.mailbox_fa = true;
        },
        mailboxBack: function () {//邮箱后退
            this.mailbox_falg = true;
        },
        mailbox_click:function () {//邮箱点击
            this.modSet();
            this.mailbox_falg = true;
        },
        MapNew: function () {//昵称
            this.MapNew_falg = false;
            this.MapNew_fa = true;
        },
        MapNewBack: function () {//昵称后退
            this.MapNew_falg = true;
        },
        submit_click:function () {//昵称点击
            this.modSet();
            this.MapNew_falg = true;
        },
        MapCityClick: function () {//地址城市选择
            var _this = this;
            commentJs.areaSelected({
                success: function (data) {
                    var _a = data.area_info+'|'+data.area_all_id;
                    if(_this.queryData.address != _a){
                        _this.queryData.address = data.area_info+'|'+data.area_all_id;
                        _this.modSet();
                    }
                }
            });
        },
        perClick: function (_data) {
            var _this = this;
            $("#sex").select({
                title: "选择性别",
                autoClose:true,
                items: ["男", "女"],
                onClose: function(d) {
                    if(_this.genderVal != d.data.values){
                        _this.genderVal = d.data.values;
                        d.data.values=='男'?_this.queryData.gender = 1:_this.queryData.gender = 2;
                        _this.modSet();
                    }
                }
            });
            $("#constellation").select({
                title: "选择星座",
                autoClose:true,
                items: ["水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座","狮子座", "处女座", "天秤座", "天蝎座", "射手座", "摩羯座"],
                onClose: function(d) {
                    if(_this.queryData.constellation != d.data.values){
                        _this.queryData.constellation = d.data.values;
                        _this.modSet();
                    }
                }
            });
            $("#data").calendar({
                value: _data,
                dateFormat: 'yyyy-mm-dd',
                onClose: function(d) {
                    if(_this.queryData.birthday != d.params.input[0].value){
                        _this.queryData.birthday = d.params.input[0].value;
                        _this.modSet();
                    }
                }
            });
        },
    }
})