/**
 * Created by hs on 2016/6/13.
 */
Tailorpus.controller('InStorageCtrl', function($scope,$rootScope,$stateParams,$ionicHistory,$cordovaToast,DataService,$state,CommService) {

  $scope.stock = $stateParams.data;
  console.log(angular.toJson($scope.stock))

  //上传图片和添加颜色的删除函数
  //$scope.deleteThis=function(index,type){
  //  if(type=="pic"){
  //    $scope.images_list.splice(index,1);
  //    ($scope.images_list.length*90+($scope.images_list.length-1)*5-$scope.swiper[0].width>0)? $scope.showPicRow=true:$scope.showPicRow=false;
  //  }else{
  //    $scope.colors.splice(index,1);
  //    ($scope.colors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
  //  }
  //};
  $scope.selectIndex=0;
  //颜色的选择切换
  $scope.seclectColor=function(index){
    $scope.selectedVal=index;
    $scope.selectIndex=index;
  };
  //删除颜色对应的尺寸
  $scope.deleteSize=function(par_index,index){
    $scope.colors[par_index].sizelist.splice(index,1);
    $scope.inStock = initOutputArray();
  };
  $scope.showAddPhoto=true;
  //存储图片地址
  $scope.images_list = ["img/photo.png"];
  //存储图片名字
  var imgNames = [];
  //存储颜色
  $scope.colors = [];
  //商品信息
  $scope.goodInfo  = {};
  //用户信息
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  ////////////////////////////////////////////////////////////////////////////////////////////

  $scope.myColors = [];
  $scope.mySizes = [];
  $scope.mySku = [];
  $scope.myRealModel = [];
  //添加颜色
  $scope.addColor  = function(){
    if($scope.goodInfo.color==null|| $scope.goodInfo.color==undefined||$scope.goodInfo.color==''){
      $cordovaToast.showShortBottom("请输入需要添加的颜色~");
      return;
    }else{
      $scope.myColors.push($scope.goodInfo.color);
      //    var colorItem  = {
      //      "color": $scope.goodInfo.color,
      //      "sizelist": [],
      //    };
      //    $scope.colors.push(colorItem);
      $scope.myRealModel = initOutputArray();
      console.log(angular.toJson($scope.myRealModel));
      $scope.goodInfo.color = "";

      if($scope.myColors.length==1)
        $scope.selectedVal=0;
    }
    //
    //($scope.colors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
  };

  //添加尺码
  $scope.addSize = function(){
    if($scope.goodInfo.size==null||$scope.goodInfo.size==undefined||$scope.goodInfo.size==''){
      $cordovaToast.showShortBottom("请输入需要添加的尺码~");
      return;
    }else{
      $scope.mySizes.push($scope.goodInfo.size);
      //var sizeItem  = {
      //  "size":$scope.goodInfo.size,
      //  "num":0
      //}
      //for(var i= 0;i<$scope.colors.length;i++){
      //  $scope.colors[i].sizelist.push(sizeItem);
      //}
      $scope.myRealModel = initOutputArray();
      console.log(angular.toJson($scope.mySizes));
      console.log(angular.toJson($scope.myRealModel));
      $scope.goodInfo.size = "";
    }
    //console.log($scope.colors);
  };

  //删除颜色
  $scope.delColor = function(index){
    $scope.myColors.splice(index,1);
    $scope.myRealModel = initOutputArray();
  };

  //删除尺码
  $scope.delSize = function(index){
    $scope.mySizes.splice(index,1);
    $scope.myRealModel = initOutputArray();
    //for(var i= 0;i<$scope.colors.length;i++){
    //  $scope.colors[i].sizelist.splice(index,1);
    //}
  };

  //初始化列表
  var initOutputArray = function(){
    var arr = [];
    for(var i = 0;i<$scope.myColors.length;i++){
      for(var j = 0 ;j<$scope.mySizes.length;j++){
        arr.push({
          color:$scope.myColors[i],
          size:$scope.mySizes[j],
          num:0
        })
      }
    }
    console.log(angular.toJson(arr))
    return arr
  }

  var reSize = function (e,d){
    for (var j = 0 ; j<e.length;j++){
      if (e[j]==d)
        return '1'
    }
    return '0'
  }

  var getAllNum = function (){
    var count = 0;
    for (var i = 0 ;i < $scope.myRealModel.length;i++){
      count = count+$scope.myRealModel[i].num
    }
    console.log(count);
    return count
  };

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

  $scope.isSubmit = '0'
  //提交
  $scope.doSubmit  = function(){

    $scope.isSubmit = '1'
    var json ={
      sku:$scope.myRealModel,
      number:getAllNum(),
      vipId:$scope.stock.vipId
    };

    //console.log(JSON.stringify(json));

    console.log(angular.toJson(json));

    var promise = DataService.addStockIn($scope.stock.stockId,json);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      $scope.isSubmit = '0'
      $ionicHistory.goBack();
    }, function (data) {
      //alert(JSON.stringify(data));
      $scope.isSubmit = '0'
      $cordovaToast.showLongBottom(data.message)
    });
  }

  //获取当前元素在整个数组中的位置
  $scope.getListNum = function(x){
    var count = 0
    for (var i =0;i<x;i++){
      //$scope.comListLength = $scope.comListLength+$scope.stockIn.sku[i].sizelist.length
      count = count+$scope.colors[i].sizelist.length
      //console.log(JSON.stringify($scope.stockIn.sku))
      //console.log($scope.stockIn.sku[i].sizelist.length)
    }
    return count
  }
  $scope.getCountForModel = function(i){
    //console.log($scope.mySizes.length*i)
    return $scope.mySizes.length*i
  };
  //图片地址处理
  $scope.imgUrlProcess = function(imgUrl,width,height,quality){
    return CommService.imgProcess(imgUrl,width,height,quality);
  }
  //转换string To date
  $scope.stringToDate = function(date) {
    var str = date;
    var newDate = new Date(str);
    return newDate;
  }
});
