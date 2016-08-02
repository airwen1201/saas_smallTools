/**
 * Created by cld on 2016/5/21.
 */

Tailorpus.controller('StockListCtrl', function($scope,$state, Chats,DataService,$cordovaToast) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    $scope.toDetailList  = function(i){
        //window.location.href = '#/AccountDetailList';
      var stockId
      if($scope.stockOutInList[i].type=='0'){
        stockId = $scope.stockOutInList[i].stockOutId
      }else if($scope.stockOutInList[i].type=='1'){
        stockId = $scope.stockOutInList[i].stockInId
      }else if($scope.stockOutInList[i].type=='2'){
        stockId = $scope.stockOutInList[i].stockId
      }
        $state.go('AccountStockDetail',{
            'stockType':$scope.stockOutInList[i].type,
            'stockId':stockId,
            'proNme':$scope.stockOutInList[i].name,
            'createTime':$scope.stockOutInList[i]
        })
    }

    $scope.getStockType = function (e){
        if (e=='0'){
            return '出库'
        }else if(e=='1'){
            return '入库'
        }else if(e=='2'){
            return '删库'
        }else{
          return ''
        }
    }

    //获取应付列表
    var getStockOutInDetail = function(vipId) {
        var promise = DataService.getStockOutInDetail(vipId);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.stockOutInList = data.stock;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getStockOutInDetail(obj.vipId);
});

