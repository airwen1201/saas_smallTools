/**
 * Created by airwen on 16/5/24.
 */
//库存详情控制器
Tailorpus.controller('StorageDetailCtrl',['$scope', '$rootScope','$stateParams', '$ionicHistory','$cordovaToast','DataService','$state','CommService',
  function($scope,$rootScope,$stateParams,$ionicHistory,$cordovaToast,DataService,$state,CommService) {


    //获取stockId
    var stockId = $stateParams.stockId;

    $scope.showMoreValue = 1;
    $scope.picShowValue = 1;
    $scope.picShow = function(index) {
      if (index == 1) {
        $scope.picShowValue = 1;
      } else if (index == 2) {
        $scope.picShowValue = 2;
      } else if (index == 3) {
        $scope.picShowValue = 3;
      }
    }
    $scope.price = 0;

    $scope.getCreateTime = function(i){
      var array = $scope.stock.stockIn[i].createTime.toString().split(" ")
      var arr1 = array[0].split("-")
      var arr2 = array[1].split(":")
      return arr1[1]+"/"+arr1[2]+" "+arr2[0]+":"+arr2[1]
    }
    /**
     * 出库记录
     */
    $scope.getCreateOutTime = function(i){
      var array = $scope.stock.stockOut[i].createTime.toString().split(" ")
      var arr1 = array[0].split("-")
      var arr2 = array[1].split(":")
      return arr1[1]+"/"+arr1[2]+" "+arr2[0]+":"+arr2[1]
    }
    /**
     * 出库记录
     * @param stockInId 入库ID
     */
    $scope.toOutputRecord = function(stockInId){
      $state.go('OutputRecord',
        {
          'stockInId' : stockInId
        }
      );
    }


    $scope.toCheckStock = function(stockInId){
      //window.location.href = "#/CheckStock";
      $state.go('CheckStock',{
        'price':$scope.price,
        'stockInId' : stockInId
      })
    }

    /**
     * 出库
     * @param stockInId 入库ID
     */
    $scope.toOutputView = function(stockInId) {
      $state.go('OutputView',
        {
          'stockInId' : stockInId
        }
      );
    }

    //删除库存
    $scope.delStock = function() {
      DataService.modifyStocks().delete({stockId:stockId}, {}, function(data) {
        // alert("成功");
        $cordovaToast.showLongBottom("删除成功！");
        $ionicHistory.goBack();
      },function(data) {
        $cordovaToast.showLongBottom(data.message);
      });
    }
    //获取库存详情
    var getStockDetail = function() {
      var promise = DataService.getStockDetail(stockId);
      promise.then(function (data) {
        //具体操作
        console.log(JSON.stringify(data));
        $scope.stock = data;
        $scope.price = data.price;
      }, function (data) {
        //alert(JSON.stringify(data));
        $cordovaToast.showLongBottom(data.message)
      });
    }
    //函数调用
    getStockDetail();

    //转换string To date
    $scope.stringToDate = function(date) {
      var str = date;
      var newDate = new Date(str);
      return newDate;
    }


    //跳转到商品图片
    $scope.toStorageImages = function(){
      $state.go('StorageImages',{'images':$scope.stock.img})
    }
    $scope.toStorageRecords = function(){
      $state.go('StorageRecords',{'StorageRecords':$scope.stock})
    }
    //图片地址处理
    $scope.imgUrlProcess = function(imgUrl,width,height,quality){
      return CommService.imgProcess(imgUrl,width,height,quality);
    }

    $scope.updateData = function () {
      getStockDetail();
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

    //跳转
    $scope.openInStorage = function () {
      console.log(angular.toJson($scope.stock))
      $state.go('InStorage',{'data':$scope.stock})
    }
  }

] );
