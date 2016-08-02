/**
 * Created by cld on 2016/5/21.
 */

Tailorpus.controller('ReceiveListCtrl', function($scope,DataService,$cordovaToast,$state) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.test = function(i){
      //window.location.href = "#/ReceivableDetail";
      $state.go('AccountDetailList2',{'vip2':$scope.receivableList[i].to.vipId,'whos':$scope.receivableList[i].to.name})
  }

    $scope.getListTime = function(t){
        var array = t.toString().split(" ")
        var arr = array[0].split("-")
        return arr[1]+"/"+arr[2]
    }

    //获取应收列表
    var getReceivableList = function(vipId) {
        var promise = DataService.getReceivableList(vipId);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.receivableList = data.list;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getReceivableList(obj.vipId);
});
