/**
 * Created by airwen on 16/5/28.
 */
//编辑联系电话
Tailorpus.controller('EditCompanyTelCtrl',function($scope,$stateParams,DataService,$ionicHistory){
  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.originCompany = {
    name : obj.compInfo.name,
    shortName : obj.compInfo.shortName,
    tel : obj.compInfo.tel,
    productionType : obj.compInfo.productionType,
    img : obj.compInfo.img
  }
  //提交
  $scope.doSubmit  = function(){

    var json ={
      "compInfo":$scope.originCompany

    };

    console.log(angular.toJson(json));
    obj.compInfo = $scope.originCompany
    DataService.modifyUserInfo().update({vipId:obj.vipId},json,function(data){
      // alert("成功");
      //存储修改后的json数据
      window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      console.log(JSON.stringify(data));
      $ionicHistory.goBack();
    },function(data){
      console.log(JSON.stringify(data));
    });
  }

})
