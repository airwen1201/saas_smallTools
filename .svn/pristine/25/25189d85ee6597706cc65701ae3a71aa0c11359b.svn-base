/**
 * Created by GY on 2016/6/8.
 */
Tailorpus.controller('DesignMallCtrl',['$scope','$rootScope','$state','$stateParams', function($scope,$rootScope,$state,$stateParams) {
  var isFirstPage = $stateParams.isFirstPage;
  //isFirstPage null
  $scope.comeBack=function(){
    if(isFirstPage=="isFirstPage")
      $rootScope.goBack();
    else
      window.location.href="#/MaterialTypeTag";
    $stateParams.isFirstPage=null;
  };
  $scope.toGooddetail=function(){
    window.location.href="#/GoodDetail"
  };
  $scope.toMateriallist=function(){
    window.location.href="#/MaterialTypeList"
  };
}]);
