/**
 * Created by GY on 2016/6/2.
 */
Tailorpus.controller('MaterialPriceCtrl', function($scope,$rootScope,$stateParams,$ionicHistory,DataService,$cordovaToast) {
  $scope.backDesign=function () {
    window.location.href="#/AddDesign"

  }

  $scope.numIndex = $stateParams.numIndex
  $scope.state = $stateParams.state
  if (!$rootScope.designMaterials[$scope.numIndex].unitConsumption&&($rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id])){

    $scope.materialPrice = {
      unitConsumption:$rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id].unitConsumption,
      taxRate:$rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id].taxRate==''?0:parseInt($rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id].taxRate),

      price:$rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id].price,
      customText:($rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id].hasTax=='Y')?true:false

    }
  }else {
    $scope.materialPrice = {
      unitConsumption:$rootScope.designMaterials[$scope.numIndex].unitConsumption,
      taxRate:$rootScope.designMaterials[$scope.numIndex].taxRate==''?0:parseInt($rootScope.designMaterials[$scope.numIndex].taxRate),

      price:$rootScope.designMaterials[$scope.numIndex].price,
      customText:($rootScope.designMaterials[$scope.numIndex].hasTax=='Y')?true:false

    }
  }

  //$scope.materialPrice.cost=$scope.materialPrice.price*(1+$scope.materialPrice.taxRate/100)

  //$scope.materialPrice.cost=$scope.materialPrice.price*(1-$scope.materialPrice.taxRate/100)
  console.log(angular.toJson($rootScope.designMaterials[$scope.numIndex]))
  $scope.taxMaterialPrice = function (i) {
    //console.log(angular.toJson($rootScope.designMaterials[$scope.numIndex]))
    if ($scope.materialPrice.taxRate==null||isNaN($scope.materialPrice.taxRate)==true||$scope.materialPrice.taxRate==undefined||$scope.materialPrice.price==null||$scope.materialPrice.price==''||$scope.materialPrice.price==undefined){
      return ' '
    }else {
      console.log($scope.materialPrice.taxRate+'  '+$scope.materialPrice.price)
      return ($scope.materialPrice.price*(1+$scope.materialPrice.taxRate/100)).toFixed(2);
    }

  }
  $scope.toSubmit = function (){
    if($scope.materialPrice.unitConsumption=='') {
      $scope.materialPrice.unitConsumption =0
    }
    $rootScope.designMaterials[$scope.numIndex].unitConsumption = $scope.materialPrice.unitConsumption

    $rootScope.designMaterials[$scope.numIndex].price=$scope.materialPrice.price
    $rootScope.designMaterials[$scope.numIndex].hasTax=$scope.materialPrice.customText==false?'N':'Y'
    if ($rootScope.designMaterials[$scope.numIndex].hasTax=='Y'){
      $rootScope.designMaterials[$scope.numIndex].taxRate=$scope.materialPrice.taxRate
      $rootScope.designMaterials[$scope.numIndex].cost=$rootScope.designMaterials[$scope.numIndex].price * (1 + $rootScope.designMaterials[$scope.numIndex].taxRate / 100)

    }else {
      $rootScope.designMaterials[$scope.numIndex].taxRate=0
      $rootScope.designMaterials[$scope.numIndex].cost=$rootScope.designMaterials[$scope.numIndex].price

    }


    var param = {
      id : $rootScope.designMaterials[$scope.numIndex].id,
      unitConsumption:$rootScope.designMaterials[$scope.numIndex].unitConsumption,
      price:$rootScope.designMaterials[$scope.numIndex].price,
      hasTax:$rootScope.designMaterials[$scope.numIndex].hasTax
    }
    if ($rootScope.designMaterials[$scope.numIndex].hasTax=='Y'){
      param.taxRate=$rootScope.designMaterials[$scope.numIndex].taxRate
      param.cost=$scope.materialPrice.taxRate==''?$scope.materialPrice.price:$scope.materialPrice.price*(1+$scope.materialPrice.taxRate/100)
    }else {
      param.cost=$scope.materialPrice.price
    }
    $rootScope.tempRes[$rootScope.designMaterials[$scope.numIndex].id] = param

    console.log(angular.toJson($rootScope.tempRes))
    //return
    if ($scope.state != 1){
      var promise = DataService.modifyDesignMaterial(angular.toJson(param));
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $scope.offerList = data.list;
        //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
        $ionicHistory.goBack();
        $cordovaToast.showLongBottom('提交成功');
      }, function (data) {
        $cordovaToast.showLongBottom(data.message);
      });
    }else {
      $cordovaToast.showLongBottom('提交成功');
      $ionicHistory.goBack();
    }


  //  console.log(angular.toJson(json));
  //  var promise = DataService.modifyDesignMaterial(angular.toJson(json));
  //  promise.then(function (data) {
  //    //具体操作
  //    console.log(angular.toJson(data));
  //
  //    //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
  //    //$scope.isSubmit = '0'
  //    $ionicHistory.goBack();
  //  }, function (data) {
  //    //alert(JSON.stringify(data));
  //    //$scope.isSubmit = '0'
  //    $cordovaToast.showLongBottom(data.message)
  //  });
  }


});
