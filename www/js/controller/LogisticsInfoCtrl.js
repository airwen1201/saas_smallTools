/**
 * Created by airwen on 16/5/23.
 */
//订单Info
Tailorpus.controller('LogisticsInfoCtrl', function($scope,$stateParams,DataService,$ionicHistory,$rootScope,$filter) {
  //用户信息
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
  console.log(angular.toJson(obj))
  $scope.deliveryTypeinJason = {}
  $scope.orderId = $stateParams.orderId
  $scope.toInfo = $stateParams.to
  //选择的收货方式
  $scope.deliveryType = 1;
   $scope.deliveryTypeinJason.type = '物流';
  //选择哪一种收货方式的事件
  $scope.chooseDelivery = function(x){
    $scope.deliveryType = x;
   if(x==1){
     $scope.deliveryTypeinJason.type='物流'
   }else if(x==2){
     $scope.deliveryTypeinJason.type='送货上门'
   }else if(x==3){
     $scope.deliveryTypeinJason.type='自提'
   }
    console.log($scope.deliveryTypeinJason.type)
  }
  var currentDate = new Date();
  if(!$scope.toInfo.deliveryTime) {
    var date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getUTCDate());
  }else {
    var date = new Date($scope.toInfo.deliveryTime)
  }
  $scope.date = date;
  $scope.onezoneDatepicker = {
    date: date, // MANDATORY
    mondayFirst: false,
    months: ["一月 ", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
    startDate:  new Date(1989, 1, 26),
    endDate:  new Date(2024, 12, 26),
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: false,
    disableDaysOfWeek: false,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: false,
    callback: function(value){
      $scope.tempLogistics.deliveryTime =$filter('date')(value,'yyyy-MM-dd');
      console.log($scope.tempLogistics.deliveryTime)
    }
  }

  $scope.tempLogistics={
    phone : $scope.toInfo.phone,
    name : $scope.toInfo.name,
    address : $scope.toInfo.address,
    deliveryTime :  $scope.toInfo.deliveryTime,
    logisticsNo : $scope.toInfo.logisticsNo,
    logisticsName : $scope.toInfo.logisticsName
  }
  //提交
  $scope.doSubmit= function () {
    $scope.Logistics={
      type : $scope.deliveryTypeinJason.type,
      vipId : $scope.toInfo.vipId,
      phone : $scope.tempLogistics.phone,
      name : $scope.tempLogistics.name,
      address : $scope.tempLogistics.address,
      deliveryTime : $scope.tempLogistics.deliveryTime,
      logisticsNo : $scope.tempLogistics.logisticsNo,
      logisticsName : $scope.tempLogistics.logisticsName
    }
    if(($scope.deliveryTypeinJason.type=='物流')&&(!$scope.Logistics.logisticsNo||!$scope.Logistics.logisticsName)){
      alert('请完善物流信息和物流公司！')
      console.log('请完善物流信息和物流公司！')
      return false;
    }
    var json = {
      logistics : $scope.Logistics
    }
    console.log(angular.toJson($scope.Logistics))
    DataService.logistics().update({orderId:$scope.orderId},$scope.Logistics,function(data){
      // alert("成功");
      //存储修改后的json数据
      console.log(JSON.stringify(data));
      $rootScope.LogisticsInfo = $scope.Logistics
      $ionicHistory.goBack();
    },function(data){
      console.log(JSON.stringify(data));
    });
  }
  $scope.showDatepicker = function () {
    $scope.onezoneDatepicker.showDatepicker = !$scope.onezoneDatepicker.showDatepicker;
  };
});
