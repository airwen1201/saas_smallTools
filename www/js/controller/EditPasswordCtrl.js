/**
 * Created by airwen on 16/5/28.
 */
//编辑性别
Tailorpus.controller('EditPasswordCtrl',function($scope,$stateParams,DataService,$ionicHistory){
  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.pwdInfo = {};



  //提交
  $scope.doSubmit  = function(){
    if($scope.pwdInfo.confirmPw!=undefined){
    if ($scope.pwdInfo.newPw != $scope.pwdInfo.confirmPw){
      return;
    }
    var json ={
      "password":hex_md5($scope.pwdInfo.newPw)

    };

    console.log(json);

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
else {
      $scope.pwderr=true;
    }
  }


})


