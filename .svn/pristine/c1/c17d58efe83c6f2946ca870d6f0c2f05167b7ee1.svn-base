/**
 * Created by cld on 2016/5/21.
 */

Tailorpus.controller('PayListCtrl', function($scope,DataService,$cordovaToast,$state,$stateParams) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    $scope.toDetailList  = function(i){
        //window.location.href = '#/AccountDetailList';
        $state.go('AccountDetailList',{'vip2':$scope.payableListList[i].from.vipId,'whos':$scope.payableListList[i].from.name})
    }

    $scope.getListTime = function(t){
        var array = t.toString().split(" ")
        var arr = array[0].split("-")
        return arr[1]+"/"+arr[2]
    }

    //获取应付列表
    var getPayableList = function(vipId) {
        var promise = DataService.getPayableList(vipId);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.payableListList = data.list;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getPayableList(obj.vipId);

});
