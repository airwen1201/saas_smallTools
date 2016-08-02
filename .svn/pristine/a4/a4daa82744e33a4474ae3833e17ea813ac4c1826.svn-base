/**
 * Created by airwen on 16/5/28.
 */
//编辑性别
Tailorpus.controller('EditSexCtrl',function($scope,$stateParams,DataService,$ionicHistory){
  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.originSex = $stateParams.originSex
  $scope.selected = $scope.originSex

  $scope.change = function(x){
    $scope.selected = x
  }

  //提交
  $scope.doSubmit  = function(){

    var basic = {
      "headImg" : obj.baseInfo.headImg,
      "name" : obj.baseInfo.name,
      "sex" : $scope.selected,
      "address" : obj.baseInfo.address
    }
    var json ={
      "baseInfo":basic

    };

    console.log(angular.toJson(json));

    DataService.modifyUserInfo().update({vipId:obj.vipId},json,function(data){
      // alert("成功");
      //存储修改后的json数据
      obj.baseInfo.sex=basic.sex;//更新obj中的性别字段
      window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      console.log(JSON.stringify(data));
      $ionicHistory.goBack();
    },function(data){
      console.log(JSON.stringify(data));
    });
  }

})
