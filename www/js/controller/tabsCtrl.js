/**
 * Created by admin111 on 16/7/15.
 */
Tailorpus.controller('tabsCtrl', ['$scope','$rootScope','$state','$ionicHistory',function($scope,$rootScope,$state,$ionicHistory) {
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

    $scope.toDesign=function(){
        window.location.href = "#/Design";
    }
    $scope.toQuote=function(){
        window.location.href = "#/Quote";
    }

    $scope.toMy = function(){
        window.location.href="#/my";
    }

}]);
