/**
 * Created by cld on 2016/5/12.
 */
//账户控制器
Tailorpus.controller('AccountCtrl', function($scope,DataService,$cordovaToast) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    $scope.xianjin = 0;
    $scope.xianjinClick = function(){
        if ($scope.xianjin == 0){
            $scope.xianjin = 1;
        }else {
            $scope.xianjin = 0;
        }
    }

    $scope.test = function(){
        window.location.href = "#/SaleRecord";
    }

    $scope.toCash = function(){
        window.location.href = "#/CashList";
    }
    $scope.toStock = function(){
        window.location.href = "#/StockList";
    }
    $scope.toReceivable = function(){
        window.location.href = "#/ReceiveList";
    }
    $scope.toPayable = function(){
        window.location.href = "#/PayList";
    }

    //获取应收列表
    var getAccountList = function(vipId) {
        var promise = DataService.getAccountList(vipId);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.accountInfo = data;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }


    //实现返回刷新界面
    $scope.updateData = function () {
        getAccountList(obj.vipId);
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

});
