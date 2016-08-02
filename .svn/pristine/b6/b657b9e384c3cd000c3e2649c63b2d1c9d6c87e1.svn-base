/**
 * Created by airwen on 16/5/30.
 */
//添加联系人
Tailorpus.controller('AddContactCtrl', ['$scope','$cordovaToast','$ionicHistory','DataService',function($scope,$cordovaToast,$ionicHistory,DataService) {

  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
  $scope.contact = {}
  //提交
  $scope.doSubmit  = function(){
    if(/^(13[0-9]|14[0-9]|15[012356789]|17[678]|18[0-9]|)\d{8}$/i.test($scope.contact.tel)&& $scope.contact.name!=undefined&& $scope.contact.address!=undefined) {
      var json = {
        name: $scope.contact.name,
        phone: $scope.contact.tel,
        address: $scope.contact.address
      };

      //alert(JSON.stringify(json));

      //console.log(angular.toJson(json));
      console.log(json);

      var promise = DataService.addContact(obj.vipId, json);
      promise.then(function (data) {
        //具体操作
        console.log(JSON.stringify(data));
        ////存储修改后的json数据
        //obj.contactsInfo.push(json);
        window.localStorage.setItem("tailorUser", JSON.stringify(obj));
        $ionicHistory.goBack();
      }, function (data) {
        //alert(JSON.stringify(data));
        $cordovaToast.showLongBottom(data.message)
      });
    }
    else if($scope.contact.name==undefined||$scope.contact.address==undefined){
        $scope.messerr=true;
      }
    else {
      $scope.phoneerr=true;
    }
    }
}]);
