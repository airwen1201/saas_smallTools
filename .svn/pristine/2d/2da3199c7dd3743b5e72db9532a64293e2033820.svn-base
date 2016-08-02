/**
 * Created by cld on 2016/5/17.
 */
//企业信息
Tailorpus.controller('CompanyInfoCtrl', function($scope,$state) {
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    console.log(angular.toJson(obj));

    if(obj.compInfo){
      //公司名称
      $scope.comName = obj.compInfo.name;
      //公司简称
      $scope.shortName = obj.compInfo.shortName;
      //公司电话
      $scope.tel = obj.compInfo.tel;
      //生产类型
      $scope.productionType = obj.compInfo.productionType;
      //相关照片
      $scope.imageArray = obj.compInfo.img;
    }else {
       var compInfo={
         "name": "",
         "shortName": "",
         "tel": "",
         "productionType": "",
         "img": []
       };

      obj.compInfo = compInfo;

      window.localStorage.setItem("tailorUser",JSON.stringify(obj));
    }



  $scope.imageArr = [0,1,2]

  $scope.EditCompany = function(){
    $state.go('EditCompany')
  }

  $scope.toEditCompanyShortName = function(){
    $state.go('EditCompanyShortName')
  }

  $scope.toEditCompanyTel = function(){
    $state.go('EditCompanyTel')
  }

  $scope.toEditCompanyType = function(){
    $state.go('EditCompanyType')
  }
    $scope.companyInfo = function(){
        window.location.href = "#/CompanyPhoto";
    }
  $scope.imgshow = obj.compInfo.img.length>0
  $scope.updateData = function () {
    obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    $scope.comName = obj.compInfo.name;
    //公司简称
    $scope.shortName = obj.compInfo.shortName;
    //公司电话
    $scope.tel = obj.compInfo.tel;
    //生产类型
    $scope.productionType = obj.compInfo.productionType;
    //相关照片
    $scope.imageArray = obj.compInfo.img;
  };
  $scope.updateData();         //函数调用
  $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新
});
