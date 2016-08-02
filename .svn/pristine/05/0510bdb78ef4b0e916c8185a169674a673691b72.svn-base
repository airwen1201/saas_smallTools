/**
 * Created by airwen on 16/5/27.
 */
//通讯录控制器
Tailorpus.controller('OutputContactsCtrl', ['$scope', '$rootScope', '$cordovaToast', '$sce', '$ionicPopup', 'DataService', '$ionicHistory',
  function($scope, $rootScope, $cordovaToast, $sce, $ionicPopup, DataService, $ionicHistory) {

  //获取登录存储的数据
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  //联系人列表
  //$scope.contactsList = obj.contactsInfo
  //console.log(JSON.stringify( $scope.contactsList));


  //修改用户资料
  $scope.modifyUserInfo = function(){
    //  confirm 对话框
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });

  }

  //获取联系人列表
  var getContactList = function() {
    var promise = DataService.getContactList(obj.vipId);
    promise.then(function (data) {
      //具体操作
      console.log(JSON.stringify(data));
      $scope.contactsList = data.list;
      if ($scope.contactsList.length > 0) {
        $scope.noContact = false;
      } else {
        $scope.noContact = true;
      }

    }, function (data) {
      $cordovaToast.showLongBottom(data.message)
    });
  }

  getContactList();

  //已选择联系人返回
  $scope.choseContact = function (i)
  {
    $rootScope.contactName = $scope.contactsList[i].name;
    $rootScope.contactVIP = $scope.contactsList[i].vipId;
    $rootScope.contactPhone = $scope.contactsList[i].phone;
    $rootScope.contactDefaultAddress = $scope.contactsList[i].address
    //var addressList = $scope.contactsList[i].address;
    //var defaultAddress = "";
    //angular.forEach(addressList, function(data) {
    //  //默认收货地址
    //  if ("1" == data.isDefault)
    //  {
    //    defaultAddress = data.address;
    //  }
    //});
    //$rootScope.contactDefaultAddress = defaultAddress;
    $ionicHistory.goBack();
  }

}]);
