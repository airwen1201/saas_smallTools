/**
 * Created by airwen on 16/5/19.
 */
Tailorpus.controller('AddAddressCtrl',['$scope', '$rootScope','$stateParams','$ionicHistory','DataService',function($scope,$rootScope,$stateParams,$ionicHistory,DataService) {

    //地址列表的index
    //var index = $stateParams.index;

    //获取地址列表
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    //console.log(JSON.stringify(obj))
    //$scope.addressList = obj.baseInfo.address;

    //初始化数据
    //var itemAddress = {};
    //for(var i=0;i<$scope.addressList.length;i++){
    //    if(index==i){
    //        itemAddress = $scope.addressList[i];
    //    }
    //}
    //console.log(JSON.stringify(itemAddress))
    $scope.addressInfo = {
        "name": '',
        "tel": '',
        "address": '',
        "isDefault": '0'
    };


    $scope.defaultAdd = function(){
        if ($scope.addressInfo.isDefault == '1'){
            $scope.addressInfo.isDefault = '0';
        }else {
            $scope.addressInfo.isDefault = '1';
        }
    }

    //console.log(itemAddress)
    //提交按钮
    $scope.doSubmit = function() {
      if ($scope.addressInfo.name != '' && $scope.addressInfo.name != null && $scope.addressInfo.name != undefined &&
        $scope.addressInfo.tel != '' && $scope.addressInfo.tel != null && $scope.addressInfo.tel != undefined &&
        $scope.addressInfo.address != '' && $scope.addressInfo.address != null && $scope.addressInfo.address != undefined) {
        //alert( JSON.stringify($scope.addressInfo));

        //修改本地json数据


        if ($scope.addressInfo.isDefault == '1') {
          for (var i = 0; i < obj.baseInfo.address.length; i++) {
            if (obj.baseInfo.address[i].isDefault == '1') {
              obj.baseInfo.address[i].isDefault = '0';
            }
          }
        }
        //obj.baseInfo.address[index].isDefault =  $scope.addressInfo.isDefault;
        obj.baseInfo.address.push($scope.addressInfo)
        //console.log(JSON.stringify(obj.baseInfo.address))
        //console.log($scope.addressInfo.isDefault)
        var json = {
          "address": obj.baseInfo.address
        };

        DataService.modifyUserInfo().update({vipId: obj.vipId}, json, function (data) {
          // alert("成功");
          //存储修改后的json数据
          window.localStorage.setItem("tailorUser", JSON.stringify(obj));
          $ionicHistory.goBack();
        }, function (data) {
          console.log(JSON.stringify(data));
        });

        //  console.log(JSON.stringify(JSON.parse(window.localStorage.getItem("tailorUser"))));
        // Replies.giveAReply($scope.reply);    //保存回复
        //返回上一页
      }else{
        $scope.adderr=true;
      }
    }
}]);
