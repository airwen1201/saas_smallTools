/**
 * Created by GY on 2016/6/12.
 */
Tailorpus.controller('QuoteDetailCtrl', function($scope,$stateParams,$state,DataService) {
  console.log($stateParams.detail.id)
  $scope.abstract = $stateParams.detail
  // $scope.quoteList =[]
  $scope.timeslicer = function () {
    if(!$scope.abstract.time)
      return '--/--'
    //console.log(angular.toJson($scope.offerList))
    var array = $scope.abstract.time.toString().split(" ")
    var arr1 = array[0].split("-")
    return  arr1[1]+"/"+arr1[2];
  }

$scope.quoteList ={};
  var getOfferDetail = function(id) {
    param={
      id :id
    }
    var promise = DataService.getOfferDetail(angular.toJson(param));
    promise.then(function (data) {
      //具体操作
      console.log(angular.toJson(data));
      $scope.offerDetail = data;
      if($scope.offerDetail){
        $scope.quoteList.currencytype = $scope.offerDetail.currency;
        if($scope.quoteList.currencytype=="USD"){
          $scope.currencytype=1
        }else {
          $scope.currencytype=2
        }
        $scope.quoteList.exchangeRate = parseFloat($scope.offerDetail.exchangeRate);
        $scope.quoteList.hasTax = $scope.offerDetail.hasTax;
        $scope.quoteList.materialPrice = parseFloat($scope.offerDetail.materialPrice);
        $scope.quoteList.number = $scope.offerDetail.number;
        $scope.quoteList.others = $scope.offerDetail.others;
        $scope.quoteList.othersDetail = $scope.offerDetail.othersDetail;
        $scope.quoteList.price = parseFloat($scope.offerDetail.price);
        $scope.quoteList.profitRate = $scope.offerDetail.profitRate;
        $scope.quoteList.profitTotal = $scope.offerDetail.profitTotal
        $scope.quoteList.taxPrice = $scope.offerDetail.taxPrice;
        $scope.quoteList.taxRate = parseFloat($scope.offerDetail.taxRate);
        $scope.actualworkersPay = $scope.offerDetail.workersPay
        $scope.quoteList.workersPay = parseFloat($scope.offerDetail.workersPayTaxPrice);
        $scope.quoteList.wokerpayTax =  $scope.offerDetail.workersPayHasTax;
        $scope.quoteList.workerpayTaxRate= parseFloat($scope.offerDetail.workersPayTaxRate)
        $scope.jsonOtherDetail = JSON.parse($scope.quoteList.othersDetail)
        // $scope.quoteList= $scope.jsonOtherDetail


      }
      //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
      //$ionicHistory.goBack();
    }, function (data) {
      $cordovaToast.showLongBottom(data.message);
    });
  }
  getOfferDetail($scope.abstract.id)

  $scope.toquoterecord=function(){
    window.location.href="#/QuoteRecord"
  };


  //获取图片地址
  $scope.getTitleImage = function (arr){
    var images = angular.fromJson(arr)
    //images = angular.fromJson(images)
    //console.log(angular.toJson(images))
    return images
  }
});
