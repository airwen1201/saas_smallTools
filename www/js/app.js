// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var Tailorpus = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','jcs-autoValidate','ionicLazyLoad','ngIOS9UIWebViewPatch','ngCordova','onezone-datepicker'])

.run(['$ionicPlatform','$ionicPopup','$location', '$timeout', '$ionicHistory', '$rootScope','$state','$cordovaToast','$ionicLoading','validator',
            function($ionicPlatform,$ionicPopup,$location, $timeout, $ionicHistory,$rootScope,$state,$cordovaToast,$ionicLoading,validator) {
      $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });

      //双击退出
      $ionicPlatform.registerBackButtonAction(function (e) {
        //判断处于哪个页面时双击退出
        e.preventDefault();
       // alert($ionicHistory.backView());
        var showConfirm= function(){
              $ionicPopup.show({
                  template: '你确定要退出应用吗?',
                  title: "提示信息",
                  buttons: [{
                      text: "<b>取消</b>",
                      type: "button-positive"
                  },
                      {
                          text: "退出",
                          onTap: function(e) {
                              ionic.Platform.exitApp();
                          }
                      }]
              });
          };


          if ($location.path() == "/tab/dash"||$location.path() == "/tab/community"||$location.path() == "/tab/chats"||$location.path() == "/tab/my"||$location.path()=="/login") {
              if ($rootScope.backButtonPressedOnceToExit) {
                  showConfirm();
              } else {
                $rootScope.backButtonPressedOnceToExit = true;
                setTimeout(function () {
                  $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
              }
        } else  if($location.path() == "/Account"||$location.path() == "/AskPrice"||$location.path() == "/Order"||$location.path() == "/Storage"){
              window.location.href ="#/tab/dash";
          }else if($location.path() == "/BasicInfo"||$location.path() == "/CompanyInfo"||$location.path() == "/Contacts"||$location.path() == "/SystemSettings"||$location.path() == "/FeedBack"){
              window.location.href ="#/tab/my";
          } else if ($ionicHistory.backView()) {
               $ionicHistory.goBack();
        } else {
          $rootScope.backButtonPressedOnceToExit = true;
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
        return false;
      }, 101);

        //关闭当前页
        $rootScope.toClose = function() {
            //alert( $ionicHistory.current);
            $ionicHistory.backView() ? ($rootScope.isBack = !0, $ionicHistory.goBack()) : (console.log("返回故障---"), $state.go("tabs.dash"))
        }

        //返回按钮
        $rootScope.goBack = function(){
            if($location.path() == "/Account"||$location.path() == "/Quote"||$location.path() == "/AskPrice"||$location.path() == "/Order"||$location.path() == "/Storage"||$location.path() == "/AfterService"||$location.path() == "/Mall"||$location.path() == "/DesignMall"||$location.path() == "/ReleaseSelect"||$location.path() == "/Design"){
                window.location.href ="#/tab/dash";
            }else if($location.path() == "/BasicInfo"||$location.path() == "/CompanyInfo"||$location.path() == "/Contacts"||$location.path() == "/SystemSettings"||$location.path() == "/FeedBack"){
                window.location.href ="#/tab/my";
            }
        }

        // 显示加载提示
        $rootScope.showMsg = function () {
            $ionicLoading.show({
                template: '正在加载...',  // 提示字符
                delay: 0,               // 延迟加载
                duration: 5000          // 超时时间,自动隐藏
            });
        };

        // 文件上传
        $rootScope.uploadMsg = function () {
            $ionicLoading.show({
                template: '上传中，请稍等...',  // 提示字符
                delay: 0,               // 延迟加载
                duration: 5000          // 超时时间,自动隐藏
            });
        };

        // 隐藏加载提示
        $rootScope.hideMsg = function () {
            $ionicLoading.hide();
        };


    }])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {

      //解决android客户端tab在顶部问题
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('bottom');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');

      //设置视图缓存数量
     // $ionicConfigProvider.views.maxCache(5),

      // 支持跨越访问
      //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

      //设置鉴权
      //$httpProvider.defaults.headers.common['authorization'] = 'Y2ZwMTIz';



  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      //首页
      .state("home", {
          url: "/home",
          templateUrl: "templates/home.html",
          controller: "HomeCtrl"
      })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    //abstract: true,
    templateUrl: 'templates/tabs.html',
        controller:'tabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
          cache: false
      }
    }
  })

    .state('tab.community', {
      url: '/community',
      views: {
        'tab-community': {
          templateUrl: 'templates/tab-community.html',
          controller: 'CommunityCtrl',
            cache: false
        }
      }
    })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl',
            cache: false
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

      //我
  .state('my', {
    url: '/my',
      templateUrl: 'templates/tab-my.html',
      controller: 'MyCtrl'

  })

      //发布选择
  .state("ReleaseSelect", {
      url: "/ReleaseSelect",
      templateUrl: 'templates/ReleaseSelect.html',
      controller: 'ReleaseSelectCtrl'
  })

   //发布订单
  .state("ReleaseOrder", {
      url: "/ReleaseOrder",
      templateUrl: 'templates/ReleaseOrder.html',
      controller: 'ReleaseOrderCtrl'
  })

      //询价
      .state("AskPrice", {
          url: "/AskPrice",
          templateUrl: 'templates/AskPrice.html',
          controller: 'AskPriceCtrl'

      })

      //订单
    .state("Order", {
      url: "/Order",
      templateUrl: 'templates/Order.html',
      controller: 'OrderCtrl'
    })

      //库存
      .state("Storage", {
          url: "/Storage",
          templateUrl: 'templates/Storage.html',
          controller: 'StorageCtrl'

      })

      //账户
      .state("Account", {
          url: "/Account",
          templateUrl: 'templates/Account.html',
          controller: 'AccountCtrl'

      })

      //售后服务
      .state("AfterService", {
          url: "/AfterService",
          templateUrl: 'templates/AfterService.html',
          controller: 'AfterServiceCtrl'
      })

      //登录
      .state("login", {
          url: "/login",
          templateUrl: "templates/login.html",
          controller: "LoginCtrl"
      })

      .state("register", {
          url: "/register",
          templateUrl: "templates/register.html",
          controller: "RegisterCtrl"
      })

      //商城
      .state("Mall", {
          url: "/Mall",
          templateUrl: "templates/Mall.html",
          controller: "MallCtrl"
      })


      //订单详情
      .state("OrderDetail", {
          url: "/OrderDetail",

          templateUrl: "templates/OrderDetail.html",
          controller: "OrderDetailCtrl"
      })
       //完善个人资料
      .state("CompleteInfo", {
          url: "/CompleteInfo",
          templateUrl: "templates/CompleteInfo.html",
          controller: "CompleteInfoCtrl",
          params: {'vipId': null}
      })

      //数量
      .state("ReleaseCount", {
          url: "/ReleaseCount",
                  templateUrl: 'templates/ReleaseCount.html',
                  controller: 'ReleaseCountCtrl'
      })



      //基本信息
      .state("BasicInfo", {
          url: "/BasicInfo",
                  templateUrl: 'templates/BasicInfo.html',
                  controller: 'BasicInfoCtrl'
      })

      //企业信息
      .state("CompanyInfo", {
          url: "/CompanyInfo",
                  templateUrl: 'templates/CompanyInfo.html',
                  controller: 'CompanyInfoCtrl'
      })

      //通讯录
      .state("Contacts", {
          url: "/Contacts",

                  templateUrl: 'templates/Contacts.html',
                  controller: 'ContactsCtrl'

      })

      //系统设置
      .state("SystemSettings", {
          url: "/SystemSettings",
                  templateUrl: 'templates/SystemSettings.html',
                  controller: 'SystemSettingsCtrl'
      })

      //意见反馈
      .state("FeedBack", {
          url: "/FeedBack",
                  templateUrl: 'templates/FeedBack.html',
                  controller: 'FeedBackCtrl'
      })

      .state("CurrentDetail", {
          url: "/CurrentDetail",
          templateUrl: "templates/CurrentDetail.html",
          controller: "CurrentDetailCtrl"
      })

      //收货地址
      .state("ReceiveAddress", {
          url: "/ReceiveAddress",
                  templateUrl: 'templates/ReceiveAddress.html',
                  controller: 'ReceiveAddressCtrl'
      })


      //编辑地址
      .state("EditAddress",{
          url:"/EditAddress",
          params: {'index': null},
          templateUrl: 'templates/EditAddress.html',
          controller: 'EditAddressCtrl'

      })

      //添加地址
      .state("AddAddress", {
          url: "/AddAddress",
          params: {'index': null},
                  templateUrl: 'templates/AddAddress.html',
                  controller: 'AddAddressCtrl'
      })

      //相关图片
      .state("CompanyPhoto", {
          url: "/CompanyPhoto",
          params: {'index': null},
          templateUrl: 'templates/CompanyPhoto.html',
          controller: 'CompanyPhotoCtrl'
      })

      //现金列表
      .state("CashList", {
          url: "/CashList",
          templateUrl: 'templates/CashList.html',
          controller: 'CashListCtrl'
      })

      //库存列表
      .state("StockList", {
          url: "/StockList",
          templateUrl: 'templates/StockList.html',
          controller: 'StockListCtrl'
      })

      //应收列表
      .state("ReceiveList", {
          url: "/ReceiveList",
                  templateUrl: 'templates/ReceiveList.html',
                  controller: 'ReceiveListCtrl'
      })

      //应付列表
      .state("PayList", {
          url: "/PayList",
          templateUrl: 'templates/PayList.html',
          controller: 'PayListCtrl'
      })

      //账户详情列表
      .state("AccountDetailList", {
          url: "/AccountDetailList",
          params:{'vip2':null,'whos':null},
          templateUrl: 'templates/AccountDetailList.html',
          controller: 'AccountDetailListCtrl'
      })

      //账户详情
      .state("AccountDetail", {
          url: "/AccountDetail",
          params:{'stockOutId':null,'name':null,'img':null,'date':null,'company':null,'status':null,'label':null},
          templateUrl: 'templates/AccountDetail.html',
          controller: 'AccountDetailCtrl'

      })

      //我要付款
      .state("IPay", {
          url: "/IPay",
          templateUrl: 'templates/IPay.html',
          controller: 'IPayCtrl'
      })

      //在线支付
      .state("OnlinePay", {
          url: "/OnlinePay",
          templateUrl: 'templates/OnlinePay.html',
          controller: 'OnLinePayCtrl'
      })

      //线下支付
      .state("OffLinePay", {
          url: "/OffLinePay",
          templateUrl: 'templates/OffLinePay.html',
          controller: 'OffLinePayCtrl'
      })

      //应收详情
      .state("ReceivableDetail", {
          url: "/ReceivableDetail",
          templateUrl: 'templates/ReceivableDetail.html',
          controller: 'ReceivableDetailCtrl'

      })

      //销售记录
      .state("SaleRecord", {
          url: "/SaleRecord",
          templateUrl: 'templates/SaleRecord.html',
          controller: 'SaleRecordCtrl'

      })

    .state("OrderInfo", {
      url: "/OrderInfo",
      params:{'customerId':null,'orderId':null,'status':null},
          templateUrl: 'templates/OrderInfo.html',
          controller: 'OrderInfoCtrl'


    })

    .state("OutputDetail", {
      url: "/OutputDetail",

          templateUrl: 'templates/OutputDetail.html',
          controller: 'OutputDetailCtrl'

    })

    .state("LogisticsInfo", {
      url: "/LogisticsInfo",
          templateUrl: 'templates/LogisticsInfo.html',
      params:{
        'orderId':null,
        'to':null
      },
          controller: 'LogisticsInfoCtrl'
    })

    .state("StorageDetail", {
      url: "/StorageDetail",
          params: {'stockId': null},
          templateUrl: 'templates/StorageDetail.html',
          controller: 'StorageDetailCtrl'
    })
    .state("AddStorage", {
      url: "/AddStorage",

          templateUrl: 'templates/AddStorage.html',
          controller: 'AddStorageCtrl'

    })

  .state("OutputRecord", {
    url: "/OutputRecord",
    params:{
      'stockInId' : null
    },
    templateUrl: 'templates/OutputRecord.html',
    controller: 'OutputRecordCtrl'
  })
  .state("CheckStock", {
    url: "/CheckStock",
    params:{'price':null,'stockInId' : null},
    templateUrl: 'templates/CheckStock.html',
    controller: 'CheckStockCtrl'
  })

  .state("OutputView", {
    url: "/OutputView",
    params:{
      'stockInId' : null
    },
    templateUrl: 'templates/OutputView.html',
    controller: 'OutputViewCtrl'
  })
    .state('EditName',{
      url:"/EditName",
      templateUrl:"templates/EditName.html",
      params:{'originName':null},
      controller:'EditNameCtrl'
    })

    .state('OutputContacts',{
    url:'/OutputContacts',
      templateUrl:'templates/OutputContacts.html',
      controller:'OutputContactsCtrl'
  })

    .state('EditSex',{
      url:'/EditSex',
      params:{'originSex':null},
      templateUrl:'templates/EditSex.html',
      controller:'EditSexCtrl'
    })
    .state('EditPassword',{
      url:'/EditPassword',
      templateUrl:'templates/EditPassword.html',
      controller:'EditPasswordCtrl'
    })
    .state('EditCompany',{
      url:'/EditCompany',
      templateUrl:'templates/EditCompany.html',
      controller:'EditCompanyCtrl'
    })
    .state('ContactsDetail',{
      url:'/ContactsDetail',
      params:{'num':null},
      templateUrl:'templates/ContactsDetail.html',
      controller:'ContactsDetailCtrl'
    })
    .state('EditCompanyShortName',{
      url:'/EditCompanyShortName',
      templateUrl:'templates/EditCompanyShortName.html',
      controller:'EditCompanyShortNameCtrl'
    })
    .state('EditCompanyTel',{
      url:'/EditCompanyTel',
      templateUrl:'templates/EditCompanyTel.html',
      controller:'EditCompanyTelCtrl'
    })
    .state('EditCompanyType',{
      url:'/EditCompanyType',
      templateUrl:'templates/EditCompanyType.html',
      controller:'EditCompanyTypeCtrl'
    })
    .state('AddContact',{
      url:'/AddContact',
      templateUrl:'templates/AddContact.html',
      controller:'AddContactCtrl'
    })
    .state('StorageImages',{
      url:'/StorageImages',
      params:{'images':null},
      templateUrl:'templates/StorageImages.html',
      controller:'StorageImagesCtrl'
    })
    .state('AddMaterial',{
      url:'/AddMaterial',
      params:{'images':null},
      templateUrl:'templates/AddMaterial.html',
      controller:'AddMaterialCtrl'
    })
    .state('StyleRecords',{
      url:'/StyleRecords',
      params:{'images':null},
      templateUrl:'templates/StyleRecords.html',
      controller:'StyleRecordsCtrl'
    })
    //add by chen
    .state('Design', {
      url: '/Design',
      templateUrl:'templates/Design.html',
      controller:'DesignCtrl'
    })
    .state('DesignDetail', {
      url: '/DesignDetail',
        params:{'designId':null,'lastTime':null,'lastPrice':null,'lastName':null},
      templateUrl:'templates/DesignDetail.html',
      controller:'DesignDetailCtrl'
    })
    .state('AddDesign', {
      url: '/AddDesign',
      templateUrl:'templates/AddDesign.html',
      controller:'AddDesignCtrl'
    })
    .state('MaterialPrice', {
      url: '/MaterialPrice',
        params:{'numIndex':null,'state':null},
      templateUrl:'templates/MaterialPrice.html',
      controller:'MaterialPriceCtrl'
    })
    .state('MaterialTypeTag', {
      url: '/MaterialTypeTag',
      params:{'designId':null},
      templateUrl:'templates/MaterialTypeTag.html',
      controller:'MaterialTypeTagCtrl'
    })
    .state('MaterialDetail', {
      url: '/MaterialDetail',
        params:{'materialDetailItem':null},
      templateUrl:'templates/MaterialDetail.html',
      controller:'MaterialDetailCtrl'
    })
    .state('MaterialTypeList', {
      url: '/MaterialTypeList',
      templateUrl:'templates/MaterialTypeList.html',
      controller:'MaterialTypeListCtrl'
    })
    .state('GoodDetail', {
      url: '/GoodDetail',
      templateUrl:'templates/GoodDetail.html',
      controller:'GoodDetailCtrl'
    })
  //商城详情
      .state('GoodInfo',{
          url:'/GoodInfo',
          templateUrl:'templates/GoodInfo.html',
          controller:'GoodInfoCtrl'
      })
    .state('DesignMall',{
      url:'/DesignMall',
      templateUrl:'templates/DesignMall.html',
      controller:'DesignMallCtrl',
      params:{'isFirstPage':null}
    })
    .state('StoreInfo',{
      url:'/StoreInfo',
      templateUrl:'templates/StoreInfo.html',
      controller:'StoreInfoCtrl'
    })
//报价
    .state('Quote',{
      url:'/Quote',
      templateUrl:'templates/Quote.html',
      controller:'QuoteCtrl'
    })
    .state('QuoteDetail',{
      url:'/QuoteDetail',
      params:{'detail':null},
      templateUrl:'templates/QuoteDetail.html',
      controller:'QuoteDetailCtrl'
    })
    .state('QuoteRecord',{
      url:'/QuoteRecord',
      templateUrl:'templates/QuoteRecord.html',
      controller:'QuoteRecordCtrl'
    })
    .state('AddQuote',{
      url:'/AddQuote',
      params:{'keyId':null,'materialPrice':null,'taxPrice':null,'designName':null,'designImg':null,'time':null,'hasTax':null,'isoffered':null},
      templateUrl:'templates/AddQuote.html',
      controller:'AddQuoteCtrl'
    })
    .state('StoreIndex',{
      url:'/StoreIndex',
      templateUrl:'templates/StoreIndex.html',
      controller:'StoreIndexCtrl'
    })
      .state('AccountDetailList2',{
          url:'/AccountDetailList',
          params:{'vip2':null,'whos':null},
          templateUrl:'templates/AccountDetailList2.html',
          controller:'AccountDetailList2Ctrl'
      })
    .state('InStorage',{
      url:'/InStorage',
        params:{'data':null},
      templateUrl:'templates/InStorage.html',
      controller:'InStorageCtrl'
    })

      .state('AccountStockDetail',{
          url:'/AccountStockDetail',
          params:{'stockType':null,'stockId':null,'proNme':null,'createTime':null},
          templateUrl:'templates/AccountStockDetail.html',
          controller:'AccountStockDetailCtrl'
      })

    .state('OtherCost',{
      url:'/OtherCost',
      params:{'otherdetail':null},
      templateUrl:'templates/OtherCost.html',
      controller:'OtherCostCtrl'
    })
    .state('OutStockDetail',{
      url:'/OutStockDetail',
      params:{'detail':null,'customerId':null,'status':null},
      templateUrl:'templates/OutStockDetail.html',
      controller:'OutStockDetailCtrl'
    })
    .state('StorageRecords',{
      url:'/StorageRecords',
      params:{'StorageRecords':null},
      templateUrl:'templates/StorageRecords.html',
      controller:'StorageRecordsCtrl'
    })
      .state('ModifyDesign',{
          url:'/ModifyDesign',
          params:{'designId':null},
          templateUrl:'templates/ModifyDesign.html',
          controller:'ModifyDesignCtrl'
      })
      .state('ModifyMaterialTypeTag',{
          url:'/ModifyMaterialTypeTag',
          params:{'numIndex':null,'designId':null,id:null},
          templateUrl:'templates/ModifyMaterialTypeTag.html',
          controller:'ModifyMaterialTypeTagCtrl'
      })
      .state('ImageView',{
          url:'/ImageView',
          params:{'imageList':null},
          templateUrl:'templates/ImageView.html',
          controller:'ImageViewCtrl'
      })
      .state('AddDesignState',{
          url:'/AddDesignState',
          params:{'state':null,'num':null},
          templateUrl:'templates/AddDesignState.html',
          controller:'AddDesignStateCtrl'
      })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}).run(["validator", "defaultErrorMessageResolver",
function(validator, defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
        errorMessages['phoneReq'] = "请输入手机号",
        errorMessages['pwdReq'] = "请输入密码",
        errorMessages['phoneError'] = "手机号输入错误",
        errorMessages['codeReq'] = "请输入验证码"
    })
}])
;

