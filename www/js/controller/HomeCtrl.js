/**
 * Created by cld on 2016/5/12.
 */
//首页控制器
Tailorpus.controller('HomeCtrl',["$scope","$timeout","$state",function($scope,$timeout,$state) {
    //获取设备宽高
    $scope.height = window.innerHeight * 0.7;
    $scope.width = window.innerWidth;

    //跳转到登录
    $scope.toLogin = function(){
        window.location.href = "#/login";
    }

    //跳转到注册
    $scope.toRegister = function(){
        window.location.href = "#/register";
    }

    //判断是否已经登录，若已登录直接跳转到dash页面
    $timeout(function() {
           // alert(window.localStorage.getItem("tailorUser"));
          if(!window.localStorage.getItem("tailorUser")){
              console.log("还未登录！");
          }else{
              $state.go("tab.dash");
          }
        },
        10);


}]);
