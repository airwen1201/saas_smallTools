/**
 * Created by cld on 2016/5/12.
 */

//我的
Tailorpus.controller('MyCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };

  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

if(obj.compInfo){
   $scope.nickName = obj.compInfo.shortName
  console.log(obj.phone&&obj.compInfo)
}else{
  $scope.nickName = ''
}
  $scope.phone = obj.phone

  if(obj.baseInfo){
    $scope.userCalled = obj.baseInfo.name;
    //用户头像
     if(obj.baseInfo.headImg){
         $scope.headImg = obj.baseInfo.headImg;
     }
    //用户性别
    $scope.sex = obj.baseInfo.sex;
    ////用户手机号
    $scope.userPhone = obj.phone;
    //用户收货地址
    $scope.address = getFirstAdd(obj.baseInfo.address);
  }
  else{
    var baseInfo = {
      "headImg": "",
      "name": "",
      "sex": "",
      "address": []
    }
    obj.baseInfo = baseInfo;window.localStorage.setItem("tailorUser",JSON.stringify(obj));
  }
    //基本信息
    $scope.toBasicInfo = function(){
        window.location.href="#/BasicInfo";
    }

    //企业信息
    $scope.toCompanyInfo = function(){
        window.location.href="#/CompanyInfo";
    }

    //通讯录
    $scope.toContacts = function(){
        window.location.href="#/Contacts";
    }

    //系统设置
    $scope.toSystemSettings = function(){
        window.location.href="#/SystemSettings";
    }

    //意见反馈
    $scope.toFeedBack = function(){
        window.location.href="#/FeedBack";
    }
  $scope.updateData = function () {
    obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    $scope.headImg = obj.baseInfo.headImg;
  };
  $scope.updateData();         //函数调用
  $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新
});
