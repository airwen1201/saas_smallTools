Tailorpus.controller('DesignCtrl',['$scope','$state','$stateParams','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService','$http','$ionicSlideBoxDelegate',
  function($scope,$state,$stateParams,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService,$http,$ionicSlideBoxDelegate) {

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
    $scope.toMallChoice=function(Did){
      $scope.MallList = []
      console.log(Did)


      //var execb = function (Did) {
      //  getDesignList(Did);
      //  var json = {
      //    id:$scope.designList[Did].id
      //    //id:Did
      //  }
      //  console.log(angular.toJson(json));
      //  getDesignDetail(json,Did)
      //};
      //execb();

      console.log($scope.designList[Did].id);
      // getDesignList(Did)
      //$scope.updateData(Did);
      var json = {
        id:$scope.designList[Did].id
        //id:$scope.designList[$scope.designList.length-1].id
        //id:Did
      }
      console.log(angular.toJson(json));
      getDesignDetail(json,Did)
    }

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
        //console.log(angular.toJson(data));
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
    var Did;
    var getDesignList = function (Did){
      console.log(Did)
      var json = {
        vipId:obj.vipId
      }
      //console.log(angular.toJson(json));
      var promise = DataService.getDesignList(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));

        $scope.designList = data.list

        //console.log(item.id);
        //var execc = function (Did) {
          //getDesignList(Did);

          // var json = {
          //   id:$scope.designList[Did].id
          //   //id:$scope.designList[$scope.designList.length-1].id
          //   //id:Did
          // }
          // console.log(angular.toJson(json));
          // getDesignDetail(json,Did)

        //};
        //execc(Did);
        //getDesignDetail(Did)
        //getMallList()
        //window.localStorage.setItem("designName",JSON.stringify(data));
        //var arr = [];
        //$rootScope.arrList = arr;
        //$scope.designList.forEach(function (item) {
        //  arr.push(item.name);
        //});
        //console.log($scope.arrList[0])
        //console.log(angular.toJson($scope.arrList[0]))

        //console.log(angular.toJson($scope.designList.name));
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
    //getDesignList()

    //192.168.0.217:8080 192.168.0.14:8080
    //$http.get("http://192.168.0.217:8080/search_api.htm?keyword='棉'")
    //$http.post("http://192.168.0.14:8080/search_api.htm?keyword='棉'")
    //  .success(function(response) {
    //    $scope.names = response.records;
    //    console.log(angular.toJson(response));
    //  });

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
    var Did = 0;
    $scope.updateData = function () {
      var b = 222222;
      console.log(b);
      //var Did = 0;
      //var execc = function (Did) {
      //  getDesignList(Did);
      //  var json = {
      //    id:$scope.designList[$scope.designList.length-1].id
      //    //id:Did
      //  }
      //  console.log(angular.toJson(json));
      //  getDesignDetail(json,Did)
      //};
      //execc();
      //$scope.toMallChoice(Did);
      getDesignList(Did)
      console.log(Did);
    };
    //$scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

    ////图片轮播start
    ////点击改变字体颜色；显示/隐藏商品的信息；
    //$scope.onClick1 =  false ;
    //$scope.onClick2 =  true ;
    //$scope.show1 =  true ;
    //$scope.shown1 = function() {
    //  $scope.show1 =  true ;
    //  $scope.show2 =  false ;
    //  $scope.onClick1 =  false ;
    //  $scope.onClick2 =  true ;
    //  //document.getElementById("color1").style.color="indianred";
    //  //document.getElementById("color2").style.color="black";
    //  //$scope.show1 = !$scope.show1;
    //}
    //$scope.shown2 = function() {
    //  $scope.show1 =  false ;
    //  $scope.show2 =  true ;
    //  $scope.onClick1 =  true ;
    //  $scope.onClick2 =  false ;
    //  //document.getElementById("color1").style.color="black";
    //  //document.getElementById("color2").style.color="indianred";
    //}

   /* $scope.clickChangeColor = function() {
      $scope.onClick =  true ;
    }*/
    //$scope.myActiveSlide = 0;
    //$scope.myActiveSlide2 = 0;

    ////加载数据商城排行榜
    //$scope.MallList = []
    ////$rootScope.materialType=[]
    //var getMallList = function (){
    //  //$rootScope.arrName = JSON.parse(window.localStorage.getItem("designName")).name;
    //  console.log($scope.designList[0].name)
    //  var json = {
    //    //vipId:obj.vipId
    //    keyword:$scope.designList[0].name
    //
    //  }
    //  console.log(angular.toJson(json));
    //  var promise = DataService.getMallList(angular.toJson(json));
    //  promise.then(function (data) {
    //    //具体操作
    //    console.log('++++++++++++++++++'+data);
    //    $scope.MallList = data.list
    //    $ionicSlideBoxDelegate.$getByHandle().update();
    //    $ionicSlideBoxDelegate.$getByHandle().loop(true);
    //    //console.log(angular.toJson(data));
    //    //console.log(angular.toJson(data.list));
    //    console.log(angular.toJson($scope.MallList));
    //    //console.log($scope.MallList.length)st));
    //    //console.log($scope.MallList.length)
    //
    //    setRows();
    //    //$rootScope.qcKey = JSON.parse(window.localStorage.getItem("getKey")).materialType;
    //    //console.log($rootScope.qcKey)
    //    //$scope.rows = [];
    //    ////$scope.lines = $scope.MallList.length%3===0?$scope.MallList.length/3:(parseInt($scope.MallList.length/3)+1)
    //    ////console.log($scope.lines)
    //    //for(var i = 0;i<$scope.MallList.length/3;i++){
    //    //  $scope.rows.push(i);
    //    //}
    //    //console.log($scope.rows)
    //    //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
    //    //$scope.isSubmit = '0'
    //    //$ionicHistory.goBack();
    //  }, function (data) {
    //    //alert(JSON.stringify(data));
    //    //$scope.isSubmit = '0'
    //    console.log(data.message);
    //    $cordovaToast.showLongBottom(data.message)
    //  });
    //}
    ////getDesignList()
    ////getMallList()
    //
    //$scope.rows = [];
    //var setRows = function(){
    //  if($scope.MallList.length==0)
    //    return
    //  for(var i = 0;i<($scope.MallList.length%3==0?$scope.MallList.length/3:($scope.MallList.length/3+1));i++){
    //    $scope.rows.push(i);
    //  }
    //  //console.log(angular.toJson($scope.rows)+'    '+$scope.MallList.length);
    //}
    //
    ////$scope.demomainurl = 'http://192.168.0.14:8080/';
    //$scope.demomainurl = 'http://www.cfpu.com/goods_';
    //$scope.demomainimg = 'http://www.cfpu.com/';
    //
    ////$scope.toDesignDetail = function(id){
    ////  alert("1111")
    ////  window.location.href =$scope.demomainurl+id+".htm";
    ////}
    //
    ////$scope.rows = [];
    ////var setRows = function(){
    ////  for(var i = 0;i<$scope.MallList.length/3;i++){
    ////    $scope.rows.push(i);
    ////  }
    ////}
    ////setRows();
    //
    //   //图片轮播end

    //款式页面获取款式详情的信息 start
    //var designId = $scope.designList[0].id

    $scope.designDetailData = {}

    var getDesignDetail = function (json,Did){
      //$scope.designDetailData = {}
      //var json = {
      //  id:$scope.designList[Did].id
      //  //id:Did
      //}
      //console.log(angular.toJson(json));
      var promise = DataService.getDesignDetail(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $scope.designDetailData = data
        $scope.designDetailData.designMaterials = angular.fromJson($scope.designDetailData.designMaterials)
        //var dd = angular.fromJson(data.designMaterials)
        console.log(angular.toJson($scope.designDetailData.designMaterials.length));
        console.log(angular.toJson($scope.designDetailData.designMaterials[0]));

        console.log(angular.toJson($scope.designDetailData.designMaterials[0].name));
        // console.log(angular.toJson($scope.designDetailData.designMaterials[1].name));
        // console.log(angular.toJson($scope.designDetailData.designMaterials[2].name));
        console.log($scope.designDetailData.designMaterials[0].name);
        //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
        //$scope.isSubmit = '0'
        //$ionicHistory.goBack();
        $scope.designDetailName=[]
          // $scope.designDetailData.designMaterials[0].name,
          // $scope.designDetailData.designMaterials[1].name,
          // $scope.designDetailData.designMaterials[2].name
        // if (index<$scope.designDetailData.designMaterials.length) {

          $scope.designDetailData.designMaterials.forEach(function (item) {
            $scope.designDetailName.push(item.name);
          });
        console.log($scope.designDetailName+' '+$scope.designDetailName.length)
        //$scope.jsonList = [];
        //var index = 1;
        //index<$scope.designDetailName.length;

        var exec = function () {
          //$scope.MallArr = []
          $scope.MallList = []
          var json = {
            keyword: $scope.designDetailName[0]
          }
          console.log(json)
          getMallList(json,0)
        };
         exec();

        //getMallList({
        //    keyword: $scope.designDetailName[index]
        //},index)


        //$scope.MallList.forEach(function (item) {
        //    $scope.jsonList.push(item);
        //});
        //console.log($scope.jsonList)
      }, function (data) {
        //alert(JSON.stringify(data));
        //$scope.isSubmit = '0'
        $cordovaToast.showLongBottom(data.message)
      });
    }
    //getDesignDetail()

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

    //$scope.myActiveSlide = 0;
    //$scope.myActiveSlide2 = 0;

    //getMallList({
    //    keyword: $scope.designDetailName[index]
    //},++index)
//加载数据商城排行榜

    //$scope.MallArr = []
    //$scope.MallList = []
    var getMallList = function (json,index){
      $scope.MallArr = []

      //var json = {
      //  //vipId:obj.vipId
      //  keyword:$scope.designDetailName[index]
      //
      //}
      //console.log(angular.toJson(json));
      var promise = DataService.getMallList(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log('++++++++++++++++++'+data);

        $scope.MallArr = data.list
        //console.log(angular.toJson($scope.MallArr));
        //console.log($scope.MallArr.length)
        console.log(angular.toJson($scope.MallArr));
        console.log($scope.designDetailName+' '+$scope.designDetailName.length)
        if (index<$scope.designDetailName.length){

          $scope.MallArr.forEach(function (item) {
            $scope.MallList.push(item);
          });

          getMallList({
            keyword: $scope.designDetailName[index+1]
          },++index)

        }

        $ionicSlideBoxDelegate.$getByHandle().update();
        $ionicSlideBoxDelegate.$getByHandle().loop(true);
        //console.log(angular.toJson(data));
        //console.log(angular.toJson(data.list));
        console.log(angular.toJson($scope.MallList));
        //console.log(angular.toJson($scope.MallList[0]));
        //console.log(angular.toJson($scope.MallList[1]));
        console.log($scope.MallList.length)

        setRows();
        console.log($scope.rows.length);
        //$scope.MallList.forEach(function (item) {
        //    $scope.jsonList.push(item);
        //});
        //console.log($scope.jsonList)
      }, function (data) {
        //alert(JSON.stringify(data));
        //$scope.isSubmit = '0'
        console.log(data.message);
        $cordovaToast.showLongBottom(data.message)
      });
    }
    //getMallList()

    var setRows = function(){
      $scope.rows = [];
      for(var i = 0;i<$scope.MallList.length/3;i++){
        $scope.rows.push(i);
      }
    }
    //$scope.demomainurl = 'http://www.cfpu.com/goods_';
    $scope.demomainurl = 'http://www.cfpu.com/wap/goods.htm?id='
    $scope.demomainimg = 'http://www.cfpu.com/';

    //图片轮播end
    //款式页面获取款式详情的信息 end

    //跳转页面
    $scope.toDesignDetail = function(id){
      alert("1111")
      window.location.href =$scope.demomainurl+id+".htm";
    }
    //$scope.toDesignDetail = function ($scope,$state) {
    //  $state.go('toDesignDetail')
    //}

  }]);

