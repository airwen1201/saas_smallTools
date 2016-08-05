Tailorpus.controller('DesignDetailCtrl',['$scope','$state','$stateParams','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService',
  function($scope,$state,$stateParams,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService) {

     $scope.goStyleRecords=function(){
          window.location.href="#/StyleRecords"
     };
    $scope.toMaterialDetail=function(i){
        $state.go('MaterialDetail',{'materialDetailItem':$scope.designDetailData.designMaterials[i]})
      //window.location.href="#/MaterialDetail"
    };

      $scope.lastTime = $stateParams.lastTime
      $scope.lastName = $stateParams.lastName
      $scope.lastPrice = $stateParams.lastPrice
      var designId = $stateParams.designId
      $scope.designDetailData = {}

      var getDesignDetail = function (){
          var json = {
              id:designId
          }
          console.log(angular.toJson(json));
          var promise = DataService.getDesignDetail(angular.toJson(json));
          promise.then(function (data) {
              //具体操作
              console.log(angular.toJson(data));
              $scope.designDetailData = data
              $scope.designDetailData.designMaterials = angular.fromJson($scope.designDetailData.designMaterials)
            //var dd = angular.fromJson(data.designMaterials)
             console.log(angular.toJson($scope.designDetailData));
              //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
              //$scope.isSubmit = '0'
              //$ionicHistory.goBack();
          }, function (data) {
              //alert(JSON.stringify(data));
              //$scope.isSubmit = '0'
              $cordovaToast.showLongBottom(data.message)
          });
      }
      getDesignDetail()

      $scope.getImageRealUrl = function (u){
          return angular.fromJson(u)
      }

      $scope.toImagesShow = function(){
          $state.go('ImageView',{'imageList':angular.fromJson($scope.designDetailData.img)})
      }

      $scope.timeSlicer = function(){
          if(!$scope.lastTime)
              return '--/--'
          //console.log(angular.toJson($scope.offerList))
          var array = $scope.lastTime.toString().split(" ")
          var arr1 = array[0].split("-")
          return  arr1[1]+"/"+arr1[2];
      }

      //图片轮播start
      //点击改变字体颜色；显示/隐藏商品的信息；
      $scope.onClick1 =  false ;
      $scope.onClick2 =  true ;
      $scope.show1 =  true ;
      $scope.shown1 = function() {
          $scope.show1 =  true ;
          $scope.show2 =  false ;
          $scope.onClick1 =  false ;
          $scope.onClick2 =  true ;
      }
      $scope.shown2 = function() {
          $scope.show1 =  false ;
          $scope.show2 =  true ;
          $scope.onClick1 =  true ;
          $scope.onClick2 =  false ;
      }

      $scope.myActiveSlide = 1;
      $scope.myActiveSlide2 = 1;

      $scope.photos =[
          {
              img:"img/cash.png",
              font:"混纺织面料1",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/stock.png",
              font:"混纺织面料2",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_gray.png",
              font:"混纺织面料3",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/calculator.png",
              font:"混纺织面料4",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cash.png",
              font:"混纺织面料5",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/concern_gary.png",
              font:"混纺织面料6",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/concern_red.png",
              font:"混纺织面料7",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_red.png",
              font:"混纺织面料8",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/ionic.png",
              font:"混纺织面料9",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/ic_default.png",
              font:"混纺织面料10",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/calendar.png",
              font:"混纺织面料11",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/baojia.png",
              font:"混纺织面料12",
              price:"18.8",
              url:"http://www.baidu.com"
          }
      ]

      $scope.rows = [];
      var setRows = function(){
          for(var i = 0;i<$scope.photos.length/3;i++){
              $scope.rows.push(i);
          }
      }
      setRows();

      $scope.photos2 =[
          {
              img:"img/cfp_gray.png",
              font:"混纺织面料1",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_gray.png",
              font:"混纺织面料2",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_gray.png",
              font:"混纺织面料3",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/home_logo.png",
              font:"混纺织面料4",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/home_logo.png",
              font:"混纺织面料5",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/home_logo.png",
              font:"混纺织面料6",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_red.png",
              font:"混纺织面料7",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_red.png",
              font:"混纺织面料8",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/cfp_red.png",
              font:"混纺织面料9",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/baojia.png",
              font:"混纺织面料10",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/baojia.png",
              font:"混纺织面料11",
              price:"18.8",
              url:"http://www.baidu.com"
          },
          {
              img:"img/baojia.png",
              font:"混纺织面料12",
              price:"18.8",
              url:"http://www.baidu.com"
          }
      ]
      //图片轮播end

}]);
