Tailorpus.controller('DesignDetailCtrl',['$scope','$state','$stateParams','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService',
  function($scope,$state,$stateParams,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService) {

     $scope.goStyleRecords=function(){
          window.location.href="#/StyleRecords"
     };
    $scope.toMaterialDetail=function(i){
        $state.go('MaterialDetail',{'materialDetailItem':$scope.designDetailData.designMaterials[i]})
      //window.location.href="#/MaterialDetail"
    };

      $scope.lastTime = $stateParams.lastTime
      $scope.lastName = $stateParams.lastName
      $scope.lastPrice = $stateParams.lastPrice
      var designId = $stateParams.designId
      $scope.designDetailData = {}

      var getDesignDetail = function (){
          var json = {
              id:designId
          }
          console.log(angular.toJson(json));
          var promise = DataService.getDesignDetail(angular.toJson(json));
          promise.then(function (data) {
              //具体操作
              console.log(angular.toJson(data));
              $scope.designDetailData = data
              $scope.designDetailData.designMaterials = angular.fromJson($scope.designDetailData.designMaterials)
            //var dd = angular.fromJson(data.designMaterials)
             console.log(angular.toJson($scope.designDetailData));
              //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
              //$scope.isSubmit = '0'
              //$ionicHistory.goBack();
          }, function (data) {
              //alert(JSON.stringify(data));
              //$scope.isSubmit = '0'
              $cordovaToast.showLongBottom(data.message)
          });
      }
      getDesignDetail()

      $scope.getImageRealUrl = function (u){
          return angular.fromJson(u)
      }

      $scope.toImagesShow = function(){
          $state.go('ImageView',{'imageList':angular.fromJson($scope.designDetailData.img)})
      }

      $scope.timeSlicer = function(){
          if(!$scope.lastTime)
              return '--/--'
          //console.log(angular.toJson($scope.offerList))
          var array = $scope.lastTime.toString().split(" ")
          var arr1 = array[0].split("-")
          return  arr1[1]+"/"+arr1[2];
      }

}]);
