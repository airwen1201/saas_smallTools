/**
 * Created by cld on 2016/5/17.
 */
//通讯录控制器
Tailorpus.controller('ContactsCtrl', function($scope,$state,DataService) {

    //获取登录存储的数据
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

    //联系人列表
  var getContactList = function (){
      var promise = DataService.getContactList(obj.vipId);
      promise.then(function (data) {
        $scope.contactsList = data.list
        if($scope.contactsList.length>0){
          $scope.noContact = false;
        }else{
          $scope.noContact = true;
        }
        //具体操作
        console.log(JSON.stringify(data));
      }, function (data) {
        //alert(JSON.stringify(data));
        $cordovaToast.showLongBottom(data.message)
      });

  }
  getContactList()

  //实现页面跳转回来刷新
    $scope.updateData = function () {
      //obj = JSON.parse(window.localStorage.getItem("tailorUser"));
      ////console.log(angular.toJson(obj))
      //$scope.contactsList = obj.contactsInfo
      getContactList()
      //console.log(obj.contactsInfo)
      //console.log(JSON.stringify( $scope.contactsList));

    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

    //console.log(JSON.stringify($scope.contactsList));
    $scope.toContactsDetail = function (e){
      $state.go('ContactsDetail',{num:$scope.contactsList[e]})
      //window.location.href = "#/ContactsDetail";
    }

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

  $scope.toAddContact = function(){
    $state.go('AddContact')
  }


});
