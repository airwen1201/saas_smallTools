/**
 * Created by airwen on 16/5/23.
 */
//订单Info
Tailorpus.controller('OrderInfoCtrl', function($scope, $state,$stateParams,$cordovaToast,DataService,$rootScope,DataService,$ionicHistory,CommService) {
  $scope.openOutput = function(){
    window.location.href = "#/OutputDetail";
  }
  $scope.LogisticsInfo = $rootScope.LogisticsInfo
  $scope.customerId = $stateParams.customerId;
  //mine
  $scope.orderId = $stateParams.orderId
  $scope.status = $stateParams.status
  console.log($scope.customerId+' '+$scope.orderId+' '+$scope.status)

  $scope.toEditReceive = function(){
    //window.location.href = "#/LogisticsInfo";
    $state.go('LogisticsInfo',{'orderId':$scope.orderId,'to':$scope.orderDetail.logistics})
  }
  //获取订单详情
  var getOrderDetail = function(orderId) {
    var promise = DataService.getOrderDetail(orderId);
    promise.then(function (data) {
      //具体操作
      $scope.orderDetail = data
      console.log(JSON.stringify(data));
    }, function (data) {
      $cordovaToast.showLongBottom(data.message);
    });
  }

  getOrderDetail($scope.orderId)
    //时间切割器
  $scope.getCreateTime = function(i){
    var array = i.toString().split(" ")
    var arr1 = array[0].split("-")
    return arr1[1]+"/"+arr1[2]+"出库"
  }

  $scope.isSubmit = '0'
  $scope.doSubmit = function(){
    if ($scope.isSubmit=='1')
    return
    $scope.isSubmit = '1'
    if($scope.status == 0) {
      var json = {
        "status":"1"
      };
      //console.log($scope.orderId + ' ' + angular.toJson(json));

      DataService.modifyOrder().update({orderId: $scope.orderId}, json, function (data) {
        // alert("成功");
        //存储修改后的json数据
        //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
        console.log(JSON.stringify(data));
        $scope.isSubmit = '1'
        $ionicHistory.goBack();
      }, function (data) {
        console.log(JSON.stringify(data));
        $scope.isSubmit = '1'
      });
    }
    else if ($scope.status == 1){
      var json = {
        status: '2'
      }
      console.log($scope.orderId + ' ' + angular.toJson(json))
      DataService.modifyOrderRe().update({orderId: $scope.orderId}, json, function (data) {
        // alert("成功");
        //存储修改后的json数据
        //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
        console.log(JSON.stringify(data));
        $scope.isSubmit = '1'
        $ionicHistory.goBack();
      }, function (data) {
        $scope.isSubmit = '1'
        console.log(JSON.stringify(data));
      });
    }
  }
    //返回刷新功能
  $scope.updateData = function () {
    getOrderDetail($scope.orderId)
    $scope.isSubmit = '0'
  };
  $scope.updateData();         //函数调用
  $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

  //图片地址处理
  $scope.imgUrlProcess = function(imgUrl,width,height,quality){
    return CommService.imgProcess(imgUrl,width,height,quality);
  }
  $scope.openOutStockDetail = function (index,customerId) {
    console.log(angular.toJson($scope.orderDetail.detail[index]))
    $state.go('OutStockDetail',{'detail':$scope.orderDetail.detail[index],'customerId':customerId,'status':$scope.status})
  }
});
