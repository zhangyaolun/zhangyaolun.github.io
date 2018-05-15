new Vue({
    el: '#app',
    data: {
        user_home: true,//账号信息
        user_portrait: false,//头像上传
        user_security: false,//账户安全
        colorIndex: 0,//nav下标
        itemList: ['账号信息', '头像照片', '账户安全'],//nav
        userName: 'v10088',//用户名
        realName: '',//真实姓名
        userIntro: [{'name': '登录账号：', 'title': 'v10088'}, {'name': '绑定邮箱：', 'title': ''}, {'name': '手机号码：','title': ''}, {'name': '上次登录：', 'title': '2018-04-13 16:55:48'}, {'name': 'IP地址：', 'title': '47.100.30.157'},],//账号信息
        emailfalg: false,//绑定邮箱显示
        phonefalg: false,//修改手机显示
    },
    computed: {},
    mounted: function () {
        FastClick.attach(document.body);
        commentJs.downMenuSpot('favheader', 5);
        commentJs.appShowhide('app');
        commentJs.datetimePicker();
        commentJs.cityScs();
    },

    methods: {
        oListData: function () {//主菜单列表

        },
        itemClick: function (index) {//点击选择tab
            this.user_home = false;
            this.user_portrait = false;
            this.user_security = false;
            this.emailfalg = false;
            this.phonefalg = false;
            if (index == 1) {
                this.user_portrait = true;
            } else if (index == 2) {
                this.user_security = true;
            } else {
                this.user_home = true;
            }
            this.colorIndex = index;
        },
        itemssEmail: function () {//点击绑定邮箱
            this.emailfalg = true;
            this.user_security = false;
            this.phonefalg = false;
        },
        itemssPhone: function () {//点击修改手机
            this.phonefalg = true;
            this.emailfalg = false;
            this.user_security = false;
        }
    }


})