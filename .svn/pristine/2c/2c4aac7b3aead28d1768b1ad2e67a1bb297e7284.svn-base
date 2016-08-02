/**
 * Created by hs on 2016/6/13.
 */
Tailorpus.controller('OutStockDetailCtrl', function($scope, $state,$stateParams,$cordovaToast,DataService,$rootScope,DataService,$ionicHistory,CommService) {

  $scope.detail = $stateParams.detail;
  $scope.customerId = $stateParams.customerId;
  $scope.status = $stateParams.status;
  $scope.selectColor=[];
  console.log(angular.toJson($scope.detail))
  //转化时间格式
  $scope.getListTime = function(){
    /*console.log(t)*/
    var array = $scope.StockOutsDetail.createTime.toString().split(" ")
    var arr = array[0].split("-")
    $scope.outStockTime = arr[1]+"/"+arr[2]+" 出库"
  }
//获得出库详情
  var getStockOutsDetail = function (stockOutId) {
    var promise = DataService.getStockOutsDetail(stockOutId);
    promise.then(function (data) {
      //具体操作
      $scope.StockOutsDetail = data
      console.log(023);
      console.log(JSON.stringify(data));
      console.log(134);
      $scope.displayName = ($scope.customerId==1)?$scope.StockOutsDetail.from.name:$scope.StockOutsDetail.to.name;
      $scope.getListTime();
      $scope.number =  $scope.StockOutsDetail.number +'件'
      $scope.sizelist = $scope.StockOutsDetail.sku[0].sizelist;
      $scope.selectColor[0]=true;
      console.log($scope.sizelist)
    }, function (data) {
      $cordovaToast.showLongBottom(data.message);
    });
  }
  getStockOutsDetail($scope.detail.stockOutId);
/*  for(var i=0;i<$scope.StockOutsDetail.sku.length;i++){
    if(i==0)
      return{"color":"red"}
    else{
      return{"color":"#000"}
    }
  }*/
  $scope.imgUrlProcess = function(imgUrl,width,height,quality){
    return CommService.imgProcess(imgUrl,width,height,quality);
  }

  //$scope.selectColor[0]=true;
  $scope.colorChange = function (index) {

    $scope.sizelist = $scope.StockOutsDetail.sku[index].sizelist;
    for(var i=0;i<$scope.StockOutsDetail.sku.length;i++){
      console.log(22222);
      if(i==index)
        $scope.selectColor[i]=true;
      else{
        $scope.selectColor[i]=false;
      }
    }
  };
  $scope.getColor=function(index){
    console.log(22222+"---"+typeof $scope.StockOutsDetail.sku);
    console.log($scope.StockOutsDetail.sku.length);

  };
  //初始化第一个颜色
 // $scope.getColor(0);
});
