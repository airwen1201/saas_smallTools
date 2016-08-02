/**
 * Created by cld on 2016/5/12.
 */

//订单
Tailorpus.controller('OrderCtrl', ['$scope', '$rootScope', '$state', '$cordovaToast', 'DataService','CommService',
  function($scope, $rootScope, $state, $cordovaToast, DataService,CommService) {
    //订单状态
    //拣货中
    $rootScope.ORDER_STATUS_PICKING = "0";

    //已发货(待收货)
    $rootScope.ORDER_STATUS_LOGISTICS = "1";

    //完成
    $rootScope.ORDER_STATUS_END = "2";

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    //分页
    var page = 1;

    //默认买家
    var role = "B";
    $scope.role = role

    $scope.customerId = '1';
    $scope.openOrderInfo = function(x) {
      //window.location.href = "#/OrderInfo";
      console.log(angular.toJson($scope.orderList)+' '+x)
      $state.go('OrderInfo', {'customerId': $scope.customerId,'orderId':$scope.orderList[x].orderId,'status':$scope.orderList[x].status});
    }

    //转换string To date
    $scope.stringToDate = function(date) {
      var str =  date.replace(/-/g,"/");
      var newDate = new Date(str);
      return newDate;
    }

    $scope.chooseCustomer = function (role) {
      if(role=='B'){
        $scope.customerId = 1;
      }else if(role=='S'){
        $scope.customerId = 2;
      }
      $scope.role = role;
      getOrderList(obj.vipId, page, role);
    }

    //获取订单列表
    var getOrderList = function(vipId, page, role) {
      var promise = DataService.getOrderList(vipId, page, role);
      promise.then(function (data) {
        //具体操作
        console.log(JSON.stringify(data));
        $scope.orderList = data.list;
      }, function (data) {
        $cordovaToast.showLongBottom(data.message);
      });
    }

    getOrderList(obj.vipId, page, role);

    //图片地址处理
    $scope.imgUrlProcess = function(imgUrl,width,height,quality){
      return CommService.imgProcess(imgUrl,width,height,quality);
    }

    //实现返回刷新界面
    $scope.updateData = function () {
      getOrderList(obj.vipId, page, $scope.role);
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

    $scope.doRefresh = function(){
      console.log('刷新！')
      $scope.updateData()
      $scope.$broadcast('scroll.refreshComplete');
    }

}]);
