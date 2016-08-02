/**
 * Created by airwen on 16/5/24.
 */
//出库
Tailorpus.controller('OutputViewCtrl', function($scope, $stateParams, $state, $rootScope, $cordovaToast, DataService,$ionicHistory) {

  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.showMoreValue = 1;
  $scope.picShowValue = 1;
  $scope.unitPrice={};
  $scope.skuIndex = 0;
  $scope.to={}
  var stockInId = $stateParams.stockInId;

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
  $scope.sizeCount = [];

  $scope.noChangeColor = true

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

  $rootScope.contactName='';
  $rootScope.contactDefaultAddress = '';
  $scope.toContact = function() {
    $state.go('OutputContacts');
  }

  //转换string To date
  $scope.stringToDate = function(date) {
    var str = date;
    var newDate = new Date(str);
    return newDate;
  }

  var getStockInDetail = function() {
    var promise = DataService.getStockInDetail(stockInId);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      $scope.stockIn = data;
      $scope.unitPrice.price = parseFloat($scope.stockIn.price) ;
      //$scope.y = $scope.stockIn.sku[$scope.colorChange].sizelist[0].size
      $scope.outputCount = initOutputArray();
      //$scope.getListNum($scope.colorChange)
      //console.log($scope.outputCount)
      console.log($scope.comListLength)
      console.log(JSON.stringify($scope.outputCount));
    }, function (data) {
      $cordovaToast.showLongBottom(data.message)
    });
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


  //获取入库详情
  getStockInDetail();


  $scope.setInputValue = function (i){
    if (parseInt($scope.outputCount[getListNum(skuIndex)+i].num)<0){
      $scope.outputCount[getListNum(skuIndex)+i].num = 0
    }else if ($scope.outputCount[getListNum(skuIndex)+i].num>10){
      $scope.outputCount[getListNum(skuIndex)+i].num = 10
    }
    //console.log($scope.outputCount[getListNum(skuIndex)+i].num+'111')
  }

  $scope.isSubmit = '0'
  $scope.sqAddress={}
  //提交
  $scope.outputSubmit = function(){
    $scope.isSubmit = '1'
    if($rootScope.contactName==''||$scope.orderCount==0){
      $cordovaToast.showLongBottom('请完善信息后再进行出库操作！');
      console.log('请完善信息后再进行出库操作!')
      return false;
    }
    getJson()
    //$rootScope.contactName = $scope.contactsList[i].vipId;
    //$rootScope.contactVIP = $scope.contactsList[i].baseInfo.name;
    var JsonTo = {
      vipId:$rootScope.contactVIP,
      name:$rootScope.contactName,
      address:$scope.sqAddress.addr,
      phone:$rootScope.contactPhone
    }
    var json ={
      stockId :$scope.stockIn.stockId,
      sku:$scope.outputCount,
      number:$scope.orderCount,
      total:$scope.orderCount * $scope.unitPrice.price,
      price:$scope.unitPrice.price,
    /*  from:$scope.stockIn.from.vipId,*/
      from:obj.vipId,
      to:JsonTo
    };
    //alert(JSON.stringify(json));
    console.log(angular.toJson(json));
    var promise = DataService.stockOut(stockInId,json);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      ////存储修改后的json数据
      //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      $scope.isSubmit = '0'
      $ionicHistory.goBack();
    }, function (data) {
      //alert(JSON.stringify(data));
      $scope.isSubmit = '0'
      console.log(JSON.stringify(data));
      $cordovaToast.showLongBottom(data.message)
    });
  }

  function getJson(){
    console.log(JSON.stringify($scope.outputCount))
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
    //console.log(JSON.stringify($scope.outputCount))
    return count
  }
  //正则验证
  $scope.reg = function (x) {
    if (x===undefined) {//替换非数字字符
      x = 0;
      console.log(typeof (x))
    }else if(x===null){
      x = x
      console.log(x)
      console.log(typeof (x))
    }
    return x
  }
});
