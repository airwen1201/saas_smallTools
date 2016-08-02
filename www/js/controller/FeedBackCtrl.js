/**
 * Created by cld on 2016/5/17.
 */
//意见反馈
Tailorpus.controller('FeedBackCtrl', function($scope,$stateParams,DataService,$rootScope,$cordovaToast) {
  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
  $scope.feedBack = {}
  $scope.doSubmit = function(){
    var json ={
      content:$scope.feedBack.content
    };

    //alert(JSON.stringify(json));

    console.log(angular.toJson(json));

    var promise = DataService.feedBack(obj.vipId,json);
    promise.then(function (data) {
      //具体操作
      //console.log(JSON.stringify(data));
      $cordovaToast.showLongBottom(data.message)
      ////存储修改后的json数据
      //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      $rootScope.toClose();
    }, function (data) {
      //alert(JSON.stringify(data));
      $cordovaToast.showLongBottom(data.message)
    });
  }
});
