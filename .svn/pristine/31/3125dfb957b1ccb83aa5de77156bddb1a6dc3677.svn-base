/**
 * Created by hs on 2016/6/16.
 */
Tailorpus.controller('StorageRecordsCtrl', function($scope,$stateParams,$filter,DataService) {
    $scope.data = $stateParams.StorageRecords
    $scope.time = $scope.data.trackList.createTime
    var stockId = $scope.data.stockId

  $scope.getListTime = function(t){
    //console.log(t)
    var array = t.toString().split(" ")
    console.log(array)
    var arr = array[0].split("-");
    var arr1 = array[1].split(":");
    return arr[1]+"/"+arr[2]+" "+arr1[0]+":"+arr1[1]
  }
  var getStockDetail = function() {
    var promise = DataService.getStockDetail(stockId);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      $scope.data = data;
    }, function (data) {
      //alert(JSON.stringify(data));
      $cordovaToast.showLongBottom(data.message)
    });
  }

  $scope.doRefresh = function(){
    console.log('刷新！')
    getStockDetail();
    console.log(angular.toJson($scope.storageList))
    $scope.$broadcast('scroll.refreshComplete');
  }
})
Tailorpus.filter('reverse', function() {
  return function(items) {
    if (!angular.isArray(items)) {
      return false;
    }else {
      return items.slice().reverse();
    }
  };
});
