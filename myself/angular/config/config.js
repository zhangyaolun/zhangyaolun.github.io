//路由配置
app.config(['$stateProvider', '$urlRouterProvider','$controllerProvider','$compileProvider','$provide','$filterProvider',
    function($stateProvider, $urlRouterProvider,$controllerProvider,$compileProvider,$provide,$filterProvider) {
        //以下是新加入的懒加载用
        app.controllerProvider = $controllerProvider;
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('dashboard', {
                url:'/dashboard',
                templateUrl: '../View/dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/dashboard/dashboardCtrl.js',
                            '../Module/dashboard/dashboardService.js'
                        ]);
                    }]
                }
            })
            .state('crowdList', {
                url:'/crowdList',
                templateUrl: '../View/crowd/list.html',
                controller: 'crowdCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/crowd/crowdCtrl.js',
                            '../Module/crowd/crowdService.js',
                            '../Resources/js/jquery.datatables.js',
                            '../Module/utils/datatablesUtil.js'
                        ]);
                    }]
                }
            })
            .state('activityList', {
                url:'/activityList',
                templateUrl: '../View/activity/list.html',
                controller: 'activityListCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/activity/activityCtrl.js',
                            '../Module/activity/activityService.js',
                            '../Resources/js/jquery.datatables.js',
                            '../Module/utils/datatablesUtil.js',
                            '../Resources/js/sweetalert2.js'
                        ]);
                    }]
                }
            })
            // 公众号消息添加
            .state('msgAdd', {
                url:'/msgAdd?:type',
                // params:{"type":null},
                templateUrl: '../View/msg/msgAdd.html',
                controller: 'msgAddCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/msg/msgAdd/msgAddCtrl.js',
                            '../Module/msg/msgAdd/msgAddService.js',
                            '../Resources/js/sweetalert2.js'

                        ]);
                    }]
                }
            })
            //公众号消息编辑
            .state('msgEdit', {
                url:'/msgEdit',
                templateUrl: '../View/msg/msgEdit.html',
                controller: 'msgEditCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/msg/msgEdit/msgEditCtrl.js',
                            '../Module/msg/msgEdit/msgEditService.js',
                            '../Module/utils/Util.js',
                            '../Resources/js/sweetalert2.js'

                        ]);
                    }]
                }
            })
            //公众号消息列表
            .state('msgList', {
                url:'/msgList?:type',
                // params:{"type":null},
                templateUrl: '../View/msg/msgList.html',
                controller: 'msgListCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Resources/js/jquery.datatables.js',
                            '../Module/msg/msgList/msgListCtrl.js',
                            '../Module/msg/msgList/msgListService.js',
                            '../Module/utils/datatablesUtil.js',
                            '../Resources/js/sweetalert2.js'
                        ]);
                    }]
                }
            })
            //小程序消息模板 我的模板
            .state('myMsgTemplatesList', {
                url:'/myMsgTemplatesList',
                templateUrl: '../View/msgTemplates/myMsgTemplatesList.html',
                controller: 'myMsgTemplatesListCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Resources/js/jquery.datatables.js',
                            '../Resources/js/sweetalert2.js',
                            '../Module/msgTemplates/myMsgTemplatesList/myMsgTemplatesListCtrl.js',
                            '../Module/msgTemplates/myMsgTemplatesList/myMsgTemplatesListService.js',
                            '../Module/utils/datatablesUtil.js',
                            '../Module/utils/alert.js'

                        ]);
                    }]
                }
            })
            //小程序消息模板 模板库
            .state('msgTemplatesList', {
                url:'/msgTemplatesList',
                templateUrl: '../View/msgTemplates/msgTemplatesList.html',
                controller: 'msgTemplatesListCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Resources/js/jquery.datatables.js',
                            '../Module/msgTemplates/msgTemplatesList/msgTemplatesListCtrl.js',
                            '../Module/msgTemplates/msgTemplatesList/msgTemplatesListService.js',
                            '../Module/utils/datatablesUtil.js'
                        ]);
                    }]
                }
            })
            //小程序消息模板 模板库 新建模板
            .state('msgTemplateAdd', {
                url:'/msgTemplateAdd',
                templateUrl: '../View/msgTemplates/msgTemplateAdd.html',
                controller: 'msgTemplateAddCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/msgTemplates/msgTemplateAdd/msgTemplatesAddCtrl.js',
                            '../Module/msgTemplates/msgTemplateAdd/msgTemplatesAddService.js',
                            '../Module/utils/Util.js',
                            '../Resources/js/sweetalert2.js'
                        ]);
                    }]
                }
            })
            //推送小程序消息 推送历史
            .state('pushMsgManage', {
                url:'/pushMsgManage',
                templateUrl: '../View/pushMsg/pushMsgManage.html',
                controller: 'pushMsgManageCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Resources/js/jquery.datatables.js',
                            '../Module/pushMsg/pushMsgManage/pushMsgManageCtrl.js',
                            '../Module/pushMsg/pushMsgManage/pushMsgManageService.js',
                            '../Module/utils/datatablesUtil.js',
                            '../Resources/js/sweetalert2.js',
                            '../Module/utils/alert.js'
                        ]);
                    }]
                }
            })
            //推送小程序消息 新建消息
            .state('pushMsgAdd', {
                url:'/pushMsgAdd',
                templateUrl: '../View/pushMsg/pushMsgAdd.html',
                controller: 'pushMsgAddCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Resources/js/jquery.select-bootstrap.js',
                            '../Module/pushMsg/pushMsgAdd/pushMsgAddCtrl.js',
                            '../Module/pushMsg/pushMsgAdd/pushMsgAddService.js',
                            '../Module/utils/Util.js',
                            '../Resources/js/sweetalert2.js'
                        ]);
                    }]
                }
            })

            //卡券列表
            .state('cardVoucherList', {
                url:'/cardVoucherList',
                templateUrl: '../View/cardVoucher/list.html',
                controller: 'cardVoucherListCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/cardVoucher/cardVoucherList/cardVoucherListCtrl.js',
                            '../Module/cardVoucher/cardVoucherList/cardVoucherListService.js',
                            '../Resources/js/sweetalert2.js'
                        ]);
                    }]
                }
            })

            //卡券创建
            .state('cardVoucherCreate', {
                url:'/cardVoucherCreate',
                templateUrl: '../View/cardVoucher/create.html',
                controller: 'cardVoucherCreateCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/cardVoucher/cardVoucherCreate/cardVoucherCreateCtrl.js',
                            '../Module/cardVoucher/cardVoucherCreate/cardVoucherCreateService.js',
                            '../Resources/js/dateDouble/jquery.min.js',
                            '../Resources/js/dateDouble/dateRange.js',
                            '../Resources/js/sweetalert2.js',
                            '../Module/utils/strCutUtil.js'
                        ]);
                    }]
                }
            })

            //卡券编辑
            .state('cardVoucherEdit', {
                url:'/cardVoucherEdit',
                templateUrl: '../View/cardVoucher/edit.html',
                controller: 'cardVoucherEditCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/cardVoucher/cardVoucherEdit/cardVoucherEditCtrl.js',
                            '../Module/cardVoucher/cardVoucherEdit/cardVoucherEditService.js',
                            '../Resources/js/dateDouble/jquery.min.js',
                            '../Resources/js/dateDouble/dateRange.js',
                            '../Module/utils/strCutUtil.js'
                        ]);
                    }]
                }
            })

            //卡券详情
            .state('cardVoucherDetail', {
                url:'/cardVoucherDetail',
                templateUrl: '../View/cardVoucher/detail.html',
                controller: 'cardVoucherDetailCtrl',
                //懒加载js文件
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            '../Module/cardVoucher/cardVoucherDetail/cardVoucherDetailCtrl.js',
                            '../Module/cardVoucher/cardVoucherDetail/cardVoucherDetailService.js',
                        ]);
                    }]
                }
            })

    }]);