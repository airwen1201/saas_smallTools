/**
 * Created by airwen on 16/5/24.
 */

//出库记录
Tailorpus.controller('OutputRecordCtrl',['$scope', '$rootScope', '$stateParams', '$ionicHistory','$cordovaToast', 'DataService', '$state',
  function($scope, $rootScope, $stateParams, $ionicHistory, $cordovaToast, DataService, $state) {
    //入库ID
    var stockInId = $stateParams.stockInId;
    //获取入库详情
    var getStockInDetail = function() {
      var promise = DataService.getStockInDetail(stockInId);
      promise.then(function (data) {
        //具体操作
        console.log(JSON.stringify(data));
        $scope.stockIn = data;
      }, function (data) {
        $cordovaToast.showLongBottom(data.message)
      });
    }

    //获取入库详情
    getStockInDetail();

    /**
     * 出库记录
     */
    $scope.getCreateOutTime = function(i){
      var array = $scope.stockIn.stockOut[i].createTime.toString().split(" ")
      var arr1 = array[0].split("-")
      var arr2 = array[1].split(":")
      return arr1[1]+"/"+arr1[2]+" "+arr2[0]+":"+arr2[1]
    }

  }

] );
