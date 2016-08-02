/**
 * Created by cld on 2016/5/23.
 */
Tailorpus.controller('AccountDetailCtrl', function($scope,$stateParams,DataService,$cordovaToast) {

    $scope.doPay = function(){
        window.location.href = "#/IPay";
    }

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    $scope.stockOutId = $stateParams.stockOutId
    $scope.name = $stateParams.name
    $scope.img = $stateParams.img
    $scope.date = $stateParams.date
    $scope.company = $stateParams.company
    $scope.status = $stateParams.status
    $scope.label = $stateParams.label
    console.log($scope.name+' '+$scope.company)
    //出库时间
    $scope.getListTime = function(t){
        //console.log(t)
        var array = t.toString().split(" ")
        var arr = array[0].split("-")
        return arr[1]+"/"+arr[2]+" 出库"
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

    //获取出库详情
    var getStockOutsDetail = function(stockOutId) {
        var promise = DataService.getStockOutsDetail(stockOutId);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.stockOutsDetail = data;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getStockOutsDetail($scope.stockOutId);

});
