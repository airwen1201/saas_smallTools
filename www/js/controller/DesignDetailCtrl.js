Tailorpus.controller('DesignDetailCtrl',['$scope','$state','$stateParams','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService','$ionicSlideBoxDelegate',
  function($scope,$state,$stateParams,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService,$ionicSlideBoxDelegate) {

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
              console.log(angular.toJson($scope.designDetailData.designMaterials));
              console.log($scope.designDetailData.designMaterials.length);

              console.log(angular.toJson($scope.designDetailData.designMaterials[0].name));
              console.log(angular.toJson($scope.designDetailData.designMaterials[1].name));
              console.log(angular.toJson($scope.designDetailData.designMaterials[2].name));
              console.log($scope.designDetailData.designMaterials[0].name);
              //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
              //$scope.isSubmit = '0'
              //$ionicHistory.goBack();
              $scope.designDetailName=[
                  $scope.designDetailData.designMaterials[0].name,
                  $scope.designDetailData.designMaterials[1].name,
                  $scope.designDetailData.designMaterials[2].name
              ]
              //$scope.jsonList = [];
              //var index = 1;
              //index<$scope.designDetailName.length;

              var exec = function () {
                  var json = {
                      keyword: $scope.designDetailName[0]
                  }
                  console.log(json)
                  getMallList(json,0)
              };
              exec();

              //getMallList({
              //    keyword: $scope.designDetailName[index]
              //},index)


              //$scope.MallList.forEach(function (item) {
              //    $scope.jsonList.push(item);
              //});
              //console.log($scope.jsonList)
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

      //图片轮播start
      //点击改变字体颜色；显示/隐藏商品的信息；
      $scope.onClick1 =  false ;
      $scope.onClick2 =  true ;
      $scope.show1 =  true ;
      $scope.shown1 = function() {
          $scope.show1 =  true ;
          $scope.show2 =  false ;
          $scope.onClick1 =  false ;
          $scope.onClick2 =  true ;
      }
      $scope.shown2 = function() {
          $scope.show1 =  false ;
          $scope.show2 =  true ;
          $scope.onClick1 =  true ;
          $scope.onClick2 =  false ;
      }

      //$scope.myActiveSlide = 0;
      //$scope.myActiveSlide2 = 0;

      //getMallList({
      //    keyword: $scope.designDetailName[index]
      //},++index)
//加载数据商城排行榜

      $scope.MallArr = []
      $scope.MallList = []
    var getMallList = function (json,index){
      //var json = {
      //  //vipId:obj.vipId
      //  keyword:$scope.designDetailName[index]
      //
      //}
      //console.log(angular.toJson(json));
      var promise = DataService.getMallList(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log('++++++++++++++++++'+data);
          $scope.MallArr = data.list
          //console.log(angular.toJson($scope.MallArr));
          //console.log($scope.MallArr.length)

          if (index<$scope.designDetailName.length){

              $scope.MallArr.forEach(function (item) {
                  $scope.MallList.push(item);
              });

              getMallList({
                  keyword: $scope.designDetailName[index]
              },++index)

          }

        $ionicSlideBoxDelegate.$getByHandle().update();
        $ionicSlideBoxDelegate.$getByHandle().loop(true);
        //console.log(angular.toJson(data));
        //console.log(angular.toJson(data.list));
        console.log(angular.toJson($scope.MallList));
          //console.log(angular.toJson($scope.MallList[0]));
          //console.log(angular.toJson($scope.MallList[1]));
        console.log($scope.MallList.length)

        setRows();
          console.log($scope.rows.length);
          //$scope.MallList.forEach(function (item) {
          //    $scope.jsonList.push(item);
          //});
          //console.log($scope.jsonList)
      }, function (data) {
        //alert(JSON.stringify(data));
        //$scope.isSubmit = '0'
        console.log(data.message);
        $cordovaToast.showLongBottom(data.message)
      });
    }
    //getMallList()


    var setRows = function(){
        $scope.rows = [];
      for(var i = 0;i<$scope.MallList.length/3;i++){
        $scope.rows.push(i);
      }
    }

    //$scope.demomainurl = 'http://www.cfpu.com/goods_';
      //移动端
     $scope.demomainurl = 'http://www.cfpu.com/wap/goods.htm?id='
    $scope.demomainimg = 'http://www.cfpu.com/';

      //图片轮播end
      //$scope.updateData = function () {
      //    getDesignDetail();
      //};
      ////$scope.updateData();         //函数调用
      //$scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新
}]);
