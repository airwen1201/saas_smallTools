Tailorpus.controller('DesignCtrl',['$scope','$state','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService',
  function($scope,$state,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService) {

    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    var o = 1;
    $scope.goDesignDetail=function(i,e){
      //window.location.href="#/DesignDetail"

      $state.go('DesignDetail',{'designId':$scope.designList[i].id,'lastName':$scope.designList[i].lastName,'lastPrice':$scope.designList[i].totalPrice,'lastTime':$scope.designList[i].createTime})
    };
    $scope.addMoreDesign=function(){
      //$state.go('ModifyDesign',{'designId':$scope.designList[i].id})
      window.location.href="#/AddDesign"
    };
    $scope.modifyDesign=function(i,e){

      $state.go('ModifyDesign',{'designId':$scope.designList[i].id})
    }

    //$scope.getIndex=function(){
    //  window.location.href="#/Index.html"
    //};

    $scope.searchitem='';
    $scope.toclear = function () {
      $scope.searchitem='';
      //console.log(1111);
    }
    $scope.dosearch = function () {
      var param = {
        vipId : obj.vipId
      }
      var promise = DataService.getDesignList(angular.toJson(param),$scope.searchitem);
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $scope.designList = data.list;
        //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
        //$ionicHistory.goBack();
      }, function (data) {
        $cordovaToast.showLongBottom(data.message);
      });
    }
    $scope.designList = []

    $scope.getRealPicUrl = function (i){
      if (!$scope.designList[i].img)
        return
      return angular.toJson($scope.designList[i].img)
    }

    $scope.getTitleImage = function (arr){
      var images = angular.fromJson(arr)
      //images = angular.fromJson(images)
      //console.log(angular.toJson(images))
      return images
    }

    var getDesignList = function (){
      var json = {
        vipId:obj.vipId
      }
      console.log(angular.toJson(json));
      var promise = DataService.getDesignList(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $scope.designList = data.list
        //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
        //$scope.isSubmit = '0'
        //$ionicHistory.goBack();
      }, function (data) {
        //alert(JSON.stringify(data));
        //$scope.isSubmit = '0'
        console.log(data.message);
        $cordovaToast.showLongBottom(data.message)
      });
    }
    getDesignList()
    //删除款式
    $scope.deleteDesign = function (i) {
      var param = {
        id : $scope.designList[i].id
      }
      var promise = DataService.deleteDesign(angular.toJson(param));
      promise.then(function (data) {
        //具体操作
        $scope.designList.splice(i,1);
        //$scope.newImageAdd = angular.fromJson($scope.offerList.designImg)
        //$ionicHistory.goBack();
      }, function (data) {
        $cordovaToast.showLongBottom(data.message);
      });

    }

    $scope.timeSlicer = function(i){
      if(!$scope.designList[i].createTime)
        return '--/--'
      //console.log(angular.toJson($scope.offerList))
      var array = $scope.designList[i].createTime.toString().split(" ")
      var arr1 = array[0].split("-")
      return  arr1[1]+"/"+arr1[2];
    }

    //实现页面跳转回来刷新
    $scope.updateData = function () {
      getDesignList()
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新


    $scope.onClick1 =  false ;
    $scope.onClick2 =  true ;
    $scope.show1 =  true ;
    $scope.shown1 = function() {
      $scope.show1 =  true ;
      $scope.show2 =  false ;
      $scope.onClick1 =  false ;
      $scope.onClick2 =  true ;
      //document.getElementById("color1").style.color="indianred";
      //document.getElementById("color2").style.color="black";
      //$scope.show1 = !$scope.show1;
    }
    $scope.shown2 = function() {
      $scope.show1 =  false ;
      $scope.show2 =  true ;
      $scope.onClick1 =  true ;
      $scope.onClick2 =  false ;
      //document.getElementById("color1").style.color="black";
      //document.getElementById("color2").style.color="indianred";
    }

   /* $scope.clickChangeColor = function() {
      $scope.onClick =  true ;
    }*/
    $scope.myActiveSlide = 1;
    $scope.myActiveSlide2 = 1;
    $scope.b = [['img/design.png','img/stock.png','img/cfp_gray.png','img/calculator.png'],
      ['img/cash.png','img/concern_gray.png','img/concern_red.png','img/contact_default.png'],
      ['img/ic_add.png','img/ic_default.png','img/ionic.png','img/logo.png']];
    $scope.photos = ['img/design.png','img/stock.png','img/cfp_gray.png','img/calculator.png',
      'img/cash.png','img/concern_gary.png','img/concern_red.png','img/home_logo.png',
      'img/ionic.png','img/ic_default.png','img/calendar.png','img/baojia.png']
    $scope.photos2 = ['img/cfp_gray.png','img/cfp_gray.png','img/cfp_gray.png','img/home_logo.png',
        'img/home_logo.png','img/home_logo.png','img/cfp_red.png','img/cfp_red.png',
        'img/cfp_red.png','img/baojia.png','img/baojia.png','img/baojia.png']

    $scope.rows = [];
    var setRows = function(){
      for(var i = 0;i<$scope.photos.length/3;i++){
        $scope.rows.push(i);
      }
    }
    setRows();

  }]);

