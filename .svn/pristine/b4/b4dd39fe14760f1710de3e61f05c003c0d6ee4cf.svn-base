/**
 * Created by airwen on 16/6/13.
 */
Tailorpus.controller('AccountStockDetailCtrl', function($scope,$stateParams,DataService,$cordovaToast) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    $scope.stockType = $stateParams.stockType
    $scope.stockId = $stateParams.stockId
    $scope.proNme = $stateParams.proNme
    console.log($scope.stockType+' '+$scope.stockId)
    //出库时间
    $scope.getListTime = function(t){
        if (!t)
        return
        var array = t.toString().split(" ")
        var arr = array[0].split("-")
        return arr[1]+"/"+arr[2]+" "
    }

    //获得付款状态
    $scope.setPayState = function(e){
        if (e=='0'){
            return "未付款"
        }else if (e =='1'){
            return "已付款"
        }else if (e == '2'){
            return "确认付款"
        }else {
            return ""
        }
    }

    //获得出入库
    $scope.showOutIn = function(){
        if ($scope.stockType == '0'){
            return '出库'
        }else if($scope.stockType == '1'){
            return '入库'
        }else if($scope.stockType == '2'){
          return '删库'
        }else{
            return ''
        }
    }

    //获取出库详情
    var getStocksDetail = function(stockId) {
        var promise
      console.log(stockId)
        if ($scope.stockType == '0'){
            promise = DataService.getStockOutsDetail(stockId);
        }else if($scope.stockType == '1'){
            promise = DataService.getStockInDetail(stockId);
        }else if($scope.stockType == '2'){
          promise = DataService.getStockDetail(stockId);
        }else {
            $cordovaToast.showLongBottom('stockType err');
        }
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.stocksDetail = data;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getStocksDetail($scope.stockId);

});
