/**
 * Created by GY on 2016/6/13.
 */
Tailorpus.controller('OtherCostCtrl', function($scope,$state,$rootScope,$ionicHistory,$stateParams) {
  var count=0;
  console.log(angular.toJson($rootScope.othercost))
  $scope.inputList=[];
  if($rootScope.sqOthercost.length==0){

    if($stateParams.otherdetail){
      $scope.totalList = $stateParams.otherdetail
      for (var i = 0;i<$scope.totalList.length-6;i++){
        count++
        $scope.inputList.push(count);
      }
      console.log($scope.totalList)
    } else {
      $rootScope.sqOthercost =[]
      $scope.totalList = [{
        title: '样品',
        worth: ''
      }, {
        title: '银行',
        worth: ''
      }, {
        title: '测试',
        worth: ''
      }, {
        title: '运货',
        worth: ''
      }, {
        title: 'QC',
        worth: ''
      }, {
        title: '佣金',
        worth: ''
      }]
    }
  }else{
    $scope.totalList=$rootScope.sqOthercost
    for (var i = 0;i<$scope.totalList.length-6;i++){
      count++
      $scope.inputList.push(count);
    }

  }


  $scope.toaddcost=function () {
    count++;
    $scope.inputList.push(count);
    $scope.totalList.push({
      title:'',
      worth:''
    })
  }

  $scope.deleteStoEvent =function (index) {
    $scope.inputList.splice(index,1);
  }

  $scope.doSubmit = function (){
    $rootScope.sqOthercost = $scope.totalList
    console.log(angular.toJson($rootScope.sqOthercost))
 $rootScope.othercost = $scope.totalList
    console.log($rootScope.othercost)
    $ionicHistory.goBack();
  }
});
