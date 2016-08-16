Tailorpus.controller('DesignCtrl',['$scope','$state','$rootScope','$cordovaToast','$ionicHistory','$ionicPopup','DataService','$http','$ionicSlideBoxDelegate',
  function($scope,$state,$rootScope,$cordovaToast,$ionicHistory,$ionicPopup,DataService,$http,$ionicSlideBoxDelegate) {

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
    $scope.updateData = function () {
      getDesignList()
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新

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
    //$scope.photos = ['img/design.png','img/stock.png','img/cfp_gray.png','img/calculator.png',
    //  'img/cash.png','img/concern_gary.png','img/concern_red.png','img/home_logo.png',
    //  'img/ionic.png','img/ic_default.png','img/calendar.png','img/baojia.png']
    //
    //加载数据商城排行榜
    $scope.MallList = []
    var getMallList = function (){
      var json = {
        //vipId:obj.vipId
        keyword:'面料'

      }
      console.log(angular.toJson(json));
      var promise = DataService.getMallList(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log('++++++++++++++++++'+data);
        $scope.MallList = data.list
        $ionicSlideBoxDelegate.$getByHandle().update();
        $ionicSlideBoxDelegate.$getByHandle().loop(true);
        //console.log(angular.toJson(data));
        //console.log(angular.toJson(data.list));
        console.log(angular.toJson($scope.MallList));
        console.log($scope.MallList.length)

        setRows();

        //$scope.rows = [];
        ////$scope.lines = $scope.MallList.length%3===0?$scope.MallList.length/3:(parseInt($scope.MallList.length/3)+1)
        ////console.log($scope.lines)
        //for(var i = 0;i<$scope.MallList.length/3;i++){
        //  $scope.rows.push(i);
        //}
        //console.log($scope.rows)
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
    getMallList()

    $scope.rows = [];
    var setRows = function(){
      for(var i = 0;i<$scope.MallList.length/3;i++){
        $scope.rows.push(i);
      }
    }

    //$scope.demomainurl = 'http://192.168.0.14:8080/';
    $scope.demomainurl = 'http://www.cfpu.com/goods_';
    $scope.demomainimg = 'http://www.cfpu.com/';

    //var json = {
    //  img:"img/design.png",
    //  font:"混纺织面料",
    //  price:"18.8",
    //  url:"www.baidu.com"
    //}

    //$scope.photos =[
    //  {
    //    img:"img/cash.png",
    //    font:"混纺织面料1",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/stock.png",
    //    font:"混纺织面料2",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/cfp_gray.png",
    //    font:"混纺织面料3",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/calculator.png",
    //    font:"混纺织面料4",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/cash.png",
    //    font:"混纺织面料5",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/concern_gary.png",
    //    font:"混纺织面料6",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/concern_red.png",
    //    font:"混纺织面料7",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/cfp_red.png",
    //    font:"混纺织面料8",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/ionic.png",
    //    font:"混纺织面料9",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/ic_default.png",
    //    font:"混纺织面料10",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/calendar.png",
    //    font:"混纺织面料11",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  },
    //  {
    //    img:"img/baojia.png",
    //    font:"混纺织面料12",
    //    price:"18.8",
    //    url:"http://www.baidu.com"
    //  }
    //]
    //$scope.photos =[
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 1,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/08/08/6f232022-1190-44b9-b88b-972886e05395.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 200,
    //    "vo_title": "<font color='red'>面料</font>验货",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 11,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/08/11/8869a39c-e855-4f7d-bf20-68860d58712a.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 12000,
    //    "vo_title": "<font color='red'>面料</font>验货",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 4,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/08/08/b266a9ab-8bfc-41dd-bddc-d494c03e8752.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 99,
    //    "vo_title": "<font color='red'>面料</font>验货测试商品",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 6,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/08/09/84572cc0-4d98-418b-a8ac-6da48659d406.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 480,
    //    "vo_title": "<font color='red'>面料</font>验货服务",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 17,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/07/20/a2b4843e-5c57-4d19-8c8e-2f08cff2d9a0.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 14500,
    //    "vo_title": "专业定制，人棉提花布",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 7
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 15,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/07/19/83fcdf4e-18a5-427c-b15e-b1dba52b288b.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 12,
    //    "vo_title": "全棉色织府绸格子布",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 14,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/07/19/fa377c8e-5936-4bda-846b-50dc02417bed.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 18,
    //    "vo_title": "全棉提花布40*20 174*76",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  },
    //  {
    //    "vo_add_time": 0,
    //    "vo_cost_price": 0,
    //    "vo_f_sale_type": 0,
    //    "vo_goods_cod": 0,
    //    "vo_goods_collect": 0,
    //    "vo_goods_evas": 0,
    //    "vo_goods_inventory": 0,
    //    "vo_goods_salenum": 0,
    //    "vo_goods_type": 0,
    //    "vo_id": 16,
    //    "vo_main_photo_url": "upload/system/self_goods/2016/07/19/1b70d086-b79e-4ee1-9464-d1cc9eeefa19.jpg_middle.jpg",
    //    "vo_photos_url": "[]",
    //    "vo_seller_id": "",
    //    "vo_store_price": 2.8,
    //    "vo_title": "210T涤丝纺",
    //    "vo_well_evaluate": 0,
    //    "vo_whether_active": 0
    //  }
    //]

    //$scope.rows = [];
    //var setRows = function(){
    //  for(var i = 0;i<$scope.MallList.length/3;i++){
    //    $scope.rows.push(i);
    //  }
    //}
    //setRows();

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

