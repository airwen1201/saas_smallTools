/**
 * Created by cld on 2016/5/12.
 */
//库存列表控制器
Tailorpus.controller('StorageCtrl', ['$scope','$state','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService','CommService',
  function($scope,$state,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService,CommService) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    //页嘛
    var page = 1;

    //库存列表
    $scope.storageList  = {};

    //添加库存
    $scope.toAddStorage = function(){
      window.location.href = "#/AddStorage";
    }


    //跳转到详情页面
    $scope.toStorageDetail = function(stockId){
      //window.location.href = "#/StorageDetail";
      $state.go("StorageDetail",{'stockId': stockId});
    }

    //获取库存列表
    var getStorageList  = function(vipId,page){

       var promise = DataService.getStocksList(vipId,page);

       promise.then(function (data) {
          //具体操作
         console.log(JSON.stringify(data));
         $scope.storageList = data.list;
       }, function (data) {
       //alert(JSON.stringify(data));
           $cordovaToast.showLongBottom(data.message)
       });

    }

    getStorageList(obj.vipId,page);


    //转换string To date
    $scope.stringToDate = function(date){
     var str =  date.replace(/-/g,"/");
      var newDate = new Date(str);

      return newDate;
    }
    
    //实现左划删除功能
    $scope.deleteStoEvent =function (index) {
      DataService.modifyStocks().delete({stockId: $scope.storageList[index].stockId}, {}, function(data) {
        // alert("成功");
        $cordovaToast.showLongBottom("删除成功！");
        $scope.storageList.splice(index,1);
      },function(data) {
        $cordovaToast.showLongBottom(data.message);
        console.log(data.message)
      });
    }
    //实现返回刷新界面
    $scope.updateData = function () {
      getStorageList(obj.vipId,page);
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新


    $scope.doRefresh = function(){
      console.log('刷新！')
      getStorageList(obj.vipId,page);
      console.log(angular.toJson($scope.storageList))
      $scope.$broadcast('scroll.refreshComplete');
    }
    //$scope.loadMore = function(){
    //  var arr = new Array();
    //  for (var i = 0;i< Chats.all().length;i++){
    //    if (i==$scope.num){
    //      $scope.num=$scope.num+1
    //      break
    //    }
    //    arr.push(Chats.all()[i])
    //  }
    //  $scope.$broadcast('scroll.infiniteScrollComplete');
    //  $scope.chats = arr
    //}

      //图片地址处理 imgProcess
      $scope.imgUrlProcess = function(imgUrl,width,height,quality){
          return CommService.imgProcess(imgUrl,width,height,quality);
      }

}]);
