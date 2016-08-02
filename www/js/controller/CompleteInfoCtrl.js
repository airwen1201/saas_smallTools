/**
 * Created by cld on 2016/5/12.
 */

//完善个人资料
Tailorpus.controller('CompleteInfoCtrl',['$scope', '$rootScope','$state','$cordovaToast','$stateParams','DataService',function($scope,$rootScope,$state,$cordovaToast,$stateParams,DataService) {

    //用户信息
    $scope.userInfo = {};

    //用户id
    $scope.vipId = $stateParams.vipId;

    //跳转到dash页面
    $scope.toTabs = function(){
        window.location.href = "#/tab/dash";
    }


    //完善个人资料
    $scope.completeInfo = function(){

        var userInfo = {
            "name": $scope.userInfo.name,
            "password":hex_md5($scope.userInfo.password)
        };

        //alert($rootScope.vipId);

      //  UpdateService.update({vipId:$rootScope.vipId},userInfo);

        DataService.completeInfo().update({vipId:$scope.vipId},userInfo,function(data){
           // alert("成功");
            $cordovaToast.showLongBottom("注册成功！");
            $state.go("tab.dash");
        },function(data){
            $cordovaToast.showLongBottom(data.message);
        });

    }
}]);
