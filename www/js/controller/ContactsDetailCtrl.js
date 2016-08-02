/**
 * Created by airwen on 16/5/28.
 */
//联系人详情
Tailorpus.controller('ContactsDetailCtrl',function($scope,$stateParams,DataService,$ionicHistory,$window){
  //获取地址列表
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  $scope.num = $stateParams.num
  //$scope.contactDetail = obj.contactsInfo[$scope.num]
  console.log(JSON.stringify($scope.num))

  //$scope.headImg = $scope.contactDetail.headImg
  //$scope.name = $scope.contactDetail.name

  //function getAdd(){
  //  var addArray = $scope.contactDetail.baseInfo.address
  //  console.log(JSON.stringify(addArray))
  //  for (var i = 0;i<addArray.length;i++){
  //    if (addArray[i].isDefault=='1'){
  //      return addArray[i]
  //    }
  //  }
  //  return addArray[0]
  //}
  //$scope.address = getAdd()


  $scope.callPhone=function(){
    $window.location.href="'tel:"+$scope.num.phone+"'";
  }

})
