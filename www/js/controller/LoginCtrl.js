/**
 * Created by cld on 2016/5/12.
 */
//登录控制器
Tailorpus.controller('LoginCtrl', ['$scope', '$rootScope','$state','$interval','$cordovaToast','$timeout','DataService', function($scope, $rootScope,$state,$interval,$cordovaToast,$timeout,DataService) {

    //判断是否已经登录，若已登录直接跳转到dash页面
    $timeout(function() {
            // alert(window.localStorage.getItem("tailorUser"));
            if(!window.localStorage.getItem("tailorUser")){
                console.log("还未登录！");
            }else{
                $state.go("tab.dash");
            }
        },
        1);
    var h=window.innerHeight+"px";
     $scope.getHeight={
        "height":h
      };
    $rootScope.loginInfo = {};

    //是否显示时间
    $scope.showTime = false;

    //跳转到dash页面
    $scope.toTabs = function(){
        window.location.href = "#/tab/dash";
    }


    //获取验证码
    $scope.time = 60;
    $scope.getVerifyCode = function() {
        setTimeout(function () {
                if($rootScope.loginInfo.phone){
                    $scope.showTime = true;
                    $interval(function() {
                        1 == $scope.time ? $scope.showTime = false : $scope.time--
                    },1000);
                    var promise = DataService.getVerifyCode($rootScope.loginInfo.phone);
                    promise.then(function (data) {
                        $cordovaToast.showLongBottom("验证码获取成功！")
                    }, function (data) {
                      //console.log(JSON.stringify(data))
                        $cordovaToast.showLongBottom(data.data.message)
                    });
                }
            },
            100);
    };

  //登录
  $scope.doLogin = function(){
    var promise = DataService.doLogin($rootScope.loginInfo.phone,$rootScope.loginInfo.verifyCode);
    // var promise = DataService.doLogin("13770519290","e10adc3949ba59abbe56e057f20f883e");
    promise.then(function (data) {
      //存储登录后的json数据
      window.localStorage.setItem("tailorUser",JSON.stringify(data));

      console.log(JSON.stringify(data));

      $cordovaToast.showLongBottom("登录成功！")
      //登录后跳转到dash页面
      $state.go("tab.dash");

    }, function (data) {
      //  $cordovaToast.showLongBottom(data.message);
      // alert(data);
      $cordovaToast.showLongBottom(data.data.message);
      // console.log(data.data.message);
      console.log(JSON.stringify(data));
    });
  };

}
]);
