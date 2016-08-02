/**
 * Created by GY on 2016/6/12.
 */
Tailorpus.controller('QuoteCtrl', ['$scope', '$state', '$rootScope', '$cordovaToast', '$ionicHistory', '$ionicPopup', 'DataService',
  function($scope, $state, $rootScope, $cordovaToast, $ionicHistory, $ionicPopup, DataService) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    $rootScope.sqOthercost =[]
    $scope.searchitem2 = '';
    $scope.toclear2 = function() {
        $scope.searchitem2 = '';
    }
    //提交搜索
    $scope.dosearch = function () {
      var param = {
        vipId : obj.vipId
      }
      var promise = DataService.getOfferList(angular.toJson(param),$scope.searchitem2);
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $scope.offerList = data.list;
        //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
        //$ionicHistory.goBack();
      }, function (data) {
        $cordovaToast.showLongBottom(data.message);
      });
    }
    $scope.goaddQuote = function(i) {
        $state.go('AddQuote',{'keyId':$scope.offerList[i].id,'materialPrice':$scope.offerList[i].designTotalPrice, 'taxPrice':$scope.offerList[i].taxPrice,
          'designName':$scope.offerList[i].designName,'designImg':$scope.offerList[i].designImg,'time':$scope.offerList[i].time,'hasTax':$scope.offerList[i].hasTax,
          "isoffered":$scope.offerList[i].isOffer})
        //window.location.href = "#/AddQuote"
    }

      $scope.getImageAdd = function(i){
          return $scope.offerList[i].designImg
      }
    //获取报价列表
    var getOfferList = function() {
        var param = {
            vipId : obj.vipId
        }
        var promise = DataService.getOfferList(angular.toJson(param));
        promise.then(function (data) {
            //具体操作
            console.log(angular.toJson(data));
            $scope.offerList = data.list;
            //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
            //$ionicHistory.goBack();
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }
    getOfferList();
    //获取图片地址
    $scope.getTitleImage = function (arr){
      var images = angular.fromJson(arr)
      //images = angular.fromJson(images)
      //console.log(angular.toJson(images))
      return images
    }
    $scope.timeslicer = function(i){
        if(!$scope.offerList[i].time)
        return '--/--'
        //console.log(angular.toJson($scope.offerList))
      var array = $scope.offerList[i].time.toString().split(" ")
      var arr1 = array[0].split("-")
      return  arr1[1]+"/"+arr1[2];
      console.log($scope.offerList[i].hasTax)
    }
    //前往报价详情页面
    $scope.goQuoteDetail = function(i) {
      // window.location.href = "#/QuoteDetail"
      console.log($scope.offerList[i].isOffer)
      if($scope.offerList[i].isOffer=='N'){
        $cordovaToast.showLongBottom('该款式尚无报价，请先报价！');
        return;
      }else {
        console.log(JSON.parse(angular.toJson($scope.offerList))[i])
        $state.go('QuoteDetail', {'detail': JSON.parse(angular.toJson($scope.offerList))[i]})
      }
    }
    //页面跳转刷新
    $scope.updateData = function () {
      getOfferList()
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新
}]);
