/**
 * Created by cld on 2016/5/12.
 */

Tailorpus.controller('DashCtrl',['$scope', '$rootScope','$state', function($scope,$rootScope,$state) {

    $scope.toAskPrice = function(){
        window.location.href = "#/AskPrice";
    }
    $scope.toOrder = function(){
        window.location.href = "#/Order";
    }
    $scope.toStorage = function(){
        window.location.href = "#/Storage";
    }
    $scope.toAccount = function(){
        window.location.href = "#/Account";
    }
    $scope.toAfterService = function(){
        window.location.href = "#/AfterService";
    }

    $scope.toMall = function(){
      //  window.location.href = "#/DesignMall";
       $state.go("DesignMall",{'isFirstPage':'isFirstPage'})
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
