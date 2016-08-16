Tailorpus.controller('AddDesignCtrl', function($scope,$rootScope,$state,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$ionicPlatform,$cordovaFileTransfer,$ionicLoading,$cordovaToast,$ionicHistory,$ionicPopup,DataService,$ionicSlideBoxDelegate) {
  $scope.addPrice=function(i){
    $state.go('MaterialPrice',{'numIndex':i,'state':1})
    //window.location.href="#/MaterialPrice"
  };
  $scope.addDesignState=function(){
    //window.location.href="#/MaterialTypeTag"
    $state.go('AddDesignState',{'state':1})
  };
  $scope.modifyDesignState=function(i){
    $state.go('AddDesignState',{'state':2,'num':i})
  }
  //图片,颜色的轮播
  $scope.swiper = new Swiper('.swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 'auto',
    spaceBetween: 5,
    freeMode: true,
    observer:true
  });
//上传图片和添加颜色的删除函数
  $scope.deleteThis=function(index,type){
    if(type=="pic"){
      $scope.images_list.splice(index,1);
      ($scope.images_list.length*90+($scope.images_list.length-1)*5-$scope.swiper[0].width>0)? $scope.showPicRow=true:$scope.showPicRow=false;
    }else{
      $scope.colors.splice(index,1);
      ($scope.colors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
    }
  };

  //存储图片地址
  $scope.images_list = [];
  $scope.goAddAddMaterial=function(){
     window.location.href="#/AddMaterial"
  };
  $scope.goDesign=function(){
    window.location.href="#/Design"
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $scope.showAddPhoto=true;
  //存储图片地址
  $scope.images_list = [];
  //存储图片名字
  var imgNames = [];
  //用户信息
  var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

  //添加照片
  $scope.addAttachment = function() {

    if($scope.images_list.length>=20){
      $cordovaToast.showLongBottom("最多上传20张照片");
      return;
    }
    if($scope.showAddPhoto){
      //$scope.images_list.splice(0,1);
      $scope.showAddPhoto=false;
    }

    $ionicActionSheet.show({
      buttons: [
        { text: '相机' },
        { text: '图库' }
      ],
      cancelText: '关闭',
      cancel: function() {
        return true;
      },
      buttonClicked: function(index) {

        switch (index){
          case 0:
            takePhoto();
            break;
          case 1:
            pickImage();
            break;
          default:
            break;
        }
        return true;
      }
    });
  };

  //拍照
  var takePhoto=function(){
    var options = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      correctOrientation:true,
      targetWidth: 640,
      targetHeight: 960
    };

    $cordovaCamera.getPicture(options).then(function(imageURI) {
      // alert(imageURI);
      // $scope.imageSrc= imageURI;
      //$scope.images_list.push(imageURI);
      uploadPhoto(imageURI);
    }, function(err) {
      // error
    });
  };

  //相册选择照片
  var pickImage = function () {

    var options = {
      maximumImagesCount: 20-$scope.images_list.length,
      width: 480,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            // console.log('Image URI: ' + results[i]);
            //$scope.images_list.push(results[i]);
            uploadPhoto(results[i]);
          }
        }, function (error) {
          // error getting photos
        });
  };

  //上传图片
  //设置鉴权
  var options = {
    headers: {
      "authorization": "Y2ZwMTIz"
    }
  };
  //图片上传地址
  var url = "http://192.168.0.12:4567/v1.0/file";

  var uploadPhoto = function(img){
    //判断是否有需要上传的图片
    if(img==null||img==undefined){
      $cordovaToast.showLongBottom("没有需要上传的图片");
      return;
    }else{
      //显示提示
      $rootScope.uploadMsg();
      $cordovaFileTransfer.upload(url, img, options)
          .then(function(result) {
            // Success!
            // alert("SUCCESS: " + JSON.stringify(result.response));
            //存储图片名字
            $scope.images_list.push(JSON.parse(result.response).message);
            $rootScope.hideMsg();
            $cordovaToast.showLongBottom("图片上传成功！");
          }, function(err) {
            $rootScope.hideMsg();
            $cordovaToast.showLongBottom("图片上传失败！");

            //alert("SUCCESS: " + JSON.stringify(err))
          }, function (progress) {
            // constant progress updates
          });
    }
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $scope.getRealPicUrl=function(i){
    console.log(angular.toJson($rootScope.designMaterials[i].img))
    return angular.fromJson($rootScope.designMaterials[i].img)
  }
  $scope.getImageUrl = function (url){
    console.log(angular.toJson(url))
    return JSON.stringify(url)
  }
//  $scope.designMaterials = []
  $rootScope.designMaterials = []

  $scope.design = {
    name:''
  }
  $scope.doSubmit = function() {
    if ($scope.design.name == '') {
      $cordovaToast.showLongBottom('请完善款式信息！')
    }else if($rootScope.designMaterials.length==0){
      $cordovaToast.showLongBottom('请添加款式材料！')
    }
    else {

      var json = {
        vipId: obj.vipId,
        name: $scope.design.name,
        img: angular.toJson($scope.images_list),
        //designMaterials:$rootScope.designMaterials
        designMaterials: angular.toJson($rootScope.designMaterials)
      }
      console.log(json)

      //var promise = DataService.addDesign(json);
      var promise = DataService.addDesign(angular.toJson(json));
      promise.then(function (data) {
        //具体操作
        console.log(angular.toJson(data));
        $rootScope.designMaterials = data.list
        //window.localStorage.setItem("tailorUser",JSON.stringify(obj));
        $scope.isSubmit = '0'
        $ionicHistory.goBack();
      }, function (data) {
        //alert(JSON.stringify(data));
        $scope.isSubmit = '0'
        $cordovaToast.showLongBottom(data.message)
      });
    }
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
      $ionicSlideBoxDelegate.update();
      $ionicSlideBoxDelegate.$getByHandle().loop(true);
      //$ionicSlideBoxDelegate.$getByHandle().next();
      //console.log(angular.toJson(data));
      //console.log(angular.toJson(data.list));
      console.log(angular.toJson($scope.MallList));
      console.log($scope.MallList.length)

      setRows();

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

  $scope.demomainurl = 'http://www.cfpu.com/goods_';
  $scope.demomainimg = 'http://www.cfpu.com/';

  //图片轮播end

});
