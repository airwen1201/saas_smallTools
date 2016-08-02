/**
 * Created by cld on 2016/5/17.
 */
//系统设置
Tailorpus.controller('SystemSettingsCtrl', ['$scope','$rootScope','$state','$ionicHistory',function($scope,$rootScope,$state,$ionicHistory) {
    $scope.signOut = function(){
        //注销用户
        //$rootScope.loginInfo.phone =""
        //$rootScope.loginInfo.verifyCode=""
        $rootScope.loginInfo = {}
        window.localStorage.removeItem("tailorUser");
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $state.go("login");
    }
}]);
