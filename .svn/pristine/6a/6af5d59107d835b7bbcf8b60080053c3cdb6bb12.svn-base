/**
 * Created by airwen on 16/5/24.
 */
Tailorpus.controller('CheckStockCtrl', function($scope,$stateParams,DataService) {

  //var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
  //console.log(angular.toJson(obj));
  $scope.unitPrice = 10;
  $scope.skuIndex = 0;
  $scope.to={}
  var stockInId = $stateParams.stockInId

  $scope.showMoreValue=1;
  $scope.picShowValue=1;
  $scope.price = $stateParams.price
  $scope.picShow = function(index){
    if(index==1){
      $scope.picShowValue=1;
    }else if(index==2){
      $scope.picShowValue=2;
    }else if(index==3){
      $scope.picShowValue=3;
    }
  }

  //转换string To date
  $scope.stringToDate = function(date) {
    var str = date;
    var newDate = new Date(str);
    return newDate;
  }

  //初始化列表
  var initOutputArray = function(){
    var arr = []
    for(var i = 0;i<$scope.stockIn.sku.length;i++){
      for(var j = 0 ;j<$scope.stockIn.sku[i].sizelist.length;j++){
        arr.push({
          color:$scope.stockIn.sku[i].color,
          size:$scope.stockIn.sku[i].sizelist[j].size,
          num:0
        })
      }
    }
    return arr
  }
  $scope.outputCount = [];

  //获取当前页面数据
  var getStockInDetail = function() {
    var promise = DataService.getStockInDetail(stockInId);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      $scope.stockIn = data;
      $scope.outputCount = initOutputArray();
      //console.log($scope.outputCount)
      //console.log($scope.comListLength)
      //console.log(JSON.stringify($scope.outputCount));
    }, function (data) {
      $cordovaToast.showLongBottom(data.message)
    });
  }

  getStockInDetail()

  $scope.picShow = function(index) {
    $scope.colorChange = index-1
    $scope.picShowValue = index;
    $scope.skuIndex = index - 1;
  }

  //默认颜色
  $scope.x = '全色'
  $scope.y = '全码'
  $scope.colorChange = 0
  $scope.sizeChange = -1
  //选择颜色
  $scope.changeColor = function(x){
    var colorList = $scope.stockIn.sku
    for (var i = 0;i< colorList.length;i++){
      if (colorList[i].color==x){
        $scope.noChangeColor = false

        //console.log($scope.colorChange)
        $scope.picShow(i+1)
        return
      }
    }
    //$scope.colorChange = 0
    $scope.noChangeColor = true
  }

  //选择尺码
  $scope.changeSize = function(y){
    var sizeList = $scope.stockIn.sku[$scope.colorChange].sizelist
    console.log(JSON.stringify(sizeList))
    for (var i = 0;i< sizeList.length;i++){
      if (sizeList[i].size==y){
        $scope.sizeChange = i
        //console.log($scope.colorChange)
        //console.log($scope.sizeChange)
        return
      }
    }
    $scope.sizeChange = -1
  }

  //获取出库数量
  $scope.getOrderCount = function (){
    var count = 0
    for(var i = 0;i<$scope.outputCount.length;i++){
      count = count + $scope.outputCount[i].num
    }
    console.log(count)
    return count
  }

  $scope.orderCount = 0

  $scope.numChange = function () {

    $scope.orderCount = $scope.getOrderCount()
    //console.log(JSON.stringify($scope.outputCount))
  }

  //提交
  $scope.outputSubmit = function(){
    var json ={
      sku:$scope.outputCount,
      price:$stateParams.price,
      number:$scope.orderCount,
      total:$scope.orderCount*$scope.unitPrice,
      from:$scope.stockIn.from.vipId,
      to:$scope.stockIn.from.vipId
    };
    //alert(JSON.stringify(json));
    console.log(angular.toJson(json));
    var promise = DataService.stockOut(stockInId,json);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      ////存储修改后的json数据
      //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      $ionicHistory.goBack();
    }, function (data) {
      $cordovaToast.showLongBottom(data.message)
    });
  }

  $scope.comListLength = 0;
  //获取当前元素在整个数组中的位置
  $scope.getListNum = function(x){
    var count = 0
    for (var i =0;i<x;i++){
      //$scope.comListLength = $scope.comListLength+$scope.stockIn.sku[i].sizelist.length
      count = count+$scope.stockIn.sku[i].sizelist.length
      //console.log(JSON.stringify($scope.stockIn.sku))
      //console.log($scope.stockIn.sku[i].sizelist.length)
    }
    console.log(JSON.stringify($scope.outputCount))
    return count
  }
});
