/**
 * Created by airwen on 16/5/27.
 */

//编辑姓名
Tailorpus.controller('EditNameCtrl', function($scope,$stateParams,DataService,$ionicHistory) {


  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  // $scope.originName = obj.baseInfo.name
  $scope.origin = {}
  $scope.origin.name = $stateParams.originName;
  $scope.origin.sex = $stateParams.sex;
  //提交
  $scope.doSubmit  = function(){

    var basic = {
      "headImg" : obj.baseInfo.headImg,
        "name" : $scope.origin.name,
        "sex" : obj.baseInfo.sex,
        "address" : obj.baseInfo.address
    }
    var json ={
      "baseInfo":basic

    };

    console.log(angular.toJson(json));

    console.log(obj);
    DataService.modifyUserInfo().update({vipId:obj.vipId},json,function(data){
      // alert("成功");
      //存储修改后的json数据
      obj.baseInfo.name=basic.name;
      window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      console.log(JSON.stringify(data));
      $ionicHistory.goBack();
    },function(data){
      console.log(JSON.stringify(data));
    });


    /*var promise = DataService.modifyUserInfo(json);

    promise.then(function (data) {
      $cordovaToast.showLongBottom("修改成功成功！")
    }, function (data) {
      //alert(JSON.stringify(data));
      $cordovaToast.showLongBottom(data.message)
    });*/

  }

});
