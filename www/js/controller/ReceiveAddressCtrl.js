/**
 * Created by airwen on 16/5/17.
 */
//收货地址列表
Tailorpus.controller('ReceiveAddressCtrl', ['$scope', '$rootScope','$state','$cordovaToast','$ionicPopup','DataService',function($scope,$rootScope,$state,$cordovaToast,$ionicPopup,DataService) {

    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
   // console.log(JSON.stringify(obj))
    $scope.addArray = obj.baseInfo.address;

    //编辑地址
    $scope.editReceive = function(index){
        // window.location.href = "#/tab/EditReceive";
        $state.go("EditAddress",{'index': index});
    }

  $scope.showConfirm = function(index) {
    var confirmPopup = $ionicPopup.confirm({
      title: '提示信息',
      template: '您确定要删除该地址吗？删除的数据将无法恢复！',
      cancelText: '取消',
      okText: '确定'
    });
    confirmPopup.then(function(res) {
      if(res) {
        delAddress(index)
      } else {
        console.log('You are not sure');
      }
    });
  };

    var delAddressOnline = function(){
        var json = {
            "address":obj.baseInfo.address
        };
        DataService.modifyUserInfo().update({vipId:obj.vipId},json,function(data){
            // alert("成功");
            //存储修改后的json数据
            window.localStorage.setItem("tailorUser",JSON.stringify(obj));
            obj = JSON.parse(window.localStorage.getItem("tailorUser"));
            //$ionicHistory.goBack();
        },function(data){
            console.log(JSON.stringify(data));
        });
    }

    //删除地址
    console.log(JSON.stringify($scope.addArray));
    var delAddress = function(index){
      for(var i=0;i<$scope.addArray.length;i++){
          if(index==i){
             // $scope.addArray.remove(i);
             // removeAddress($scope.addArray,index);
              removeAddress( obj.baseInfo.address,index);
              window.localStorage.setItem("tailorUser",JSON.stringify(obj));
              obj = JSON.parse(window.localStorage.getItem("tailorUser"));
              delAddressOnline()
              break
          }
      }
         console.log(JSON.stringify($scope.addArray));
    }

    var removeAddress = function(address,index){
        console.log(JSON.stringify(address))
        if(index<address.length){
            for(var i=0;i<address.length;i++){
                if(i!=index){
                    address[i] = address[i];
                }else{
                    address[i]=address[i+1];
                }
            }
            address.length=address.length-1;
        }
    }

    //添加新增地址
    $scope.addBtnClick = function(){
        window.location.href = "#/AddAddress";
    }

    //排序收获地址
    $scope.reloadAddress = function(){
        for (var i = 0;i < $scope.addArray.length;i++){
            if (i==0)
                continue
            if ($scope.addArray[i].isDefault=='1'){
                $scope.addArray.unshift($scope.addArray[i])
                $scope.addArray.splice(i+1,1)
                break
            }
        }
        console.log(angular.toJson($scope.addArray))
    }

    $scope.reloadAddress()
    //实现返回刷新界面
    $scope.updateData = function () {
         obj = JSON.parse(window.localStorage.getItem("tailorUser"));
        // console.log(JSON.stringify(obj))
        $scope.addArray = obj.baseInfo.address;
        $scope.reloadAddress()
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

}]);
