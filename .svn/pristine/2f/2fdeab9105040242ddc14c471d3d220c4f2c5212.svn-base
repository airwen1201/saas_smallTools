/**
 * Created by airwen on 16/5/24.
 */
//新增库存
Tailorpus.controller('AddStorageCtrl', ['$scope','$rootScope','$cordovaImagePicker','$ionicActionSheet', '$cordovaCamera','$ionicPlatform','$cordovaFileTransfer','$ionicLoading','$cordovaToast','$ionicHistory','$ionicPopup','DataService',
  function($scope,$rootScope,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$ionicPlatform,$cordovaFileTransfer,$ionicLoading,$cordovaToast,$ionicHistory,$ionicPopup,DataService) {
   // $scope.images_list = ["img/adam.jpg","img/ben.png","img/perry.png","img/mike.png","img/max.png"];

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
        $scope.myColors.splice(index,1);
        ($scope.myColors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
      }


    };
    $scope.selectIndex=0;
    //颜色的选择切换
    $scope.seclectColor=function(index){
       $scope.selectedVal=index;
      $scope.selectIndex=index;
    };
    //删除颜色对应的尺寸
    $scope.deleteSize=function(index){
         $scope.mySizes.splice(index,1);

    };
    $scope.showAddPhoto=true;
    //存储图片地址
    $scope.images_list = ["img/photo.png"];
    //存储图片名字
    var imgNames = [];
    //存储颜色
    $scope.colors = [];
    //商品信息
    $scope.goodInfo  = {};
    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));


    //返回按钮
    $scope.goBack = function(){
         showConfirm();
    };

    var showConfirm= function () {
      $ionicPopup.show({
        template: '您确定退出编辑吗，填写的数据不会保留？',
        title: "提示信息",
        buttons: [{
          text: "<b>取消</b>",
          type: "button-positive"
        },
          {
            text: "确认",
            onTap: function(e) {
              $scope.images_list.splice(0, $scope.images_list.length);
              imgNames.splice(0,imgNames.length);
              $ionicHistory.backView() ? ($ionicHistory.goBack()) : (console.log("返回故障---"))
            }
          }]
      });
    };


    //添加照片
    $scope.addAttachment = function() {

      if($scope.images_list.length>20){
        $cordovaToast.showLongBottom("亲，最多只能上传20张照片~");
        return;
      }
      if($scope.showAddPhoto){
        $scope.images_list.splice(0,1);
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
          ($scope.images_list.length*90+($scope.images_list.length-1)*5-$scope.swiper[0].width>0)? $scope.showPicRow=true:$scope.showPicRow=false;
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
        $scope.images_list.push(imageURI);
        uploadPhoto(imageURI);
      }, function(err) {
        // error
      });
    };

    //相册选择照片
    var pickImage = function () {

      var options = {
        maximumImagesCount: 1,
        width: 480,
        height: 800,
        quality: 80
      };

      $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            $scope.images_list.push(results[0]);
            uploadPhoto(results[0]);
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
              console.log("SUCCESS: " + JSON.stringify(result.response));

              //存储图片名字
              imgNames.push(JSON.parse(result.response).message);

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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.myColors = [];
    $scope.mySizes = [];
    $scope.mySku = [];
    $scope.myRealModel = [];
    //添加颜色
    $scope.addColor  = function(){
        if($scope.goodInfo.color==null|| $scope.goodInfo.color==undefined||$scope.goodInfo.color==''){
            $cordovaToast.showShortBottom("请输入需要添加的颜色~");
            return;
        }else{
          for (var i = 0;i<$scope.myColors.length;i++){
            if ($scope.myColors[i]==$scope.goodInfo.color)
            {
              $cordovaToast.showShortBottom("已有该颜色~");
              return
            }

          }
          $scope.myColors.push($scope.goodInfo.color)
      //    var colorItem  = {
      //      "color": $scope.goodInfo.color,
      //      "sizelist": [],
      //    };
      //    $scope.colors.push(colorItem);
          $scope.myRealModel = initOutputArray();
          console.log(angular.toJson($scope.myRealModel));
          $scope.goodInfo.color = "";

          if($scope.myColors.length==1)
             $scope.selectedVal=0;
        }
      //
      //($scope.colors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
    };

    //添加尺码
    $scope.addSize = function(){
       if($scope.goodInfo.size==null||$scope.goodInfo.size==undefined||$scope.goodInfo.size==''){
         $cordovaToast.showShortBottom("请输入需要添加的尺码~");
         return;
       }else{
         for (var i = 0;i<$scope.mySizes.length;i++){
           if ($scope.mySizes[i]==$scope.goodInfo.size)
           {
             $cordovaToast.showShortBottom("已有该尺码~");
             return
           }
         }
         $scope.mySizes.push($scope.goodInfo.size)
         //var sizeItem  = {
         //  "size":$scope.goodInfo.size,
         //  "num":0
         //}
         //for(var i= 0;i<$scope.colors.length;i++){
         //  $scope.colors[i].sizelist.push(sizeItem);
         //}
         $scope.myRealModel = initOutputArray();
         console.log(angular.toJson($scope.mySizes));
         console.log(angular.toJson($scope.myRealModel));
         $scope.goodInfo.size = "";
       }
      //console.log($scope.colors);
    };

    //删除颜色
    $scope.delColor = function(index){
      $scope.myColors.splice(index,1);
      $scope.myRealModel = initOutputArray();
    };

    //删除尺码
    $scope.delSize = function(index){
      $scope.mySizes.splice(index,1);
      $scope.myRealModel = initOutputArray();
      //for(var i= 0;i<$scope.colors.length;i++){
      //  $scope.colors[i].sizelist.splice(index,1);
      //}
    };

    $scope.reg = function (x) {
      if (x===undefined) {//替换非数字字符
        x = 0;
        console.log(typeof (x))
      }else if(x===null){
        x = x
        console.log(x);
        console.log(typeof (x))
      }
      return x
    };

    var getAllNum = function (){
      var count = 0;
      for (var i = 0 ;i < $scope.myRealModel.length;i++){
        count = count+$scope.myRealModel[i].num
      }
      console.log(count);
      return count
    };

    $scope.isSubmit = '0'
    //提交
    $scope.doSubmit  = function(){

      $scope.isSubmit = '1'
      var num =$scope.goodInfo.price;
      num = num.toFixed(2);
      var json ={
        "vipId": obj.vipId,
        "sku": $scope.myRealModel,
        "name": $scope.goodInfo.name,
        "type": "服装",
        "number": getAllNum(),
        "img": imgNames,
        "price": num,
        "unit":"元",
        "description": $scope.goodInfo.desc
      };

      //alert(JSON.stringify(json));

      console.log(angular.toJson(json));

      var promise = DataService.addStocks(json);

      promise.then(function (data) {
        $cordovaToast.showLongBottom("订单提交成功！");
        $scope.goodInfo = {};
        $scope.images_list = [];
        imgNames = [];
        $scope.colors = [];
        $scope.isSubmit = '0'
        $ionicHistory.goBack();
      }, function (data) {
        $scope.isSubmit = '0'
        //alert(JSON.stringify(data));
        $cordovaToast.showLongBottom(data.message)
      });
    };

    $scope.getCountForModel = function(i){
      //console.log($scope.mySizes.length*i)
      return $scope.mySizes.length*i
    };
    //初始化列表
    var initOutputArray = function(){
      var arr = [];
      for(var i = 0;i<$scope.myColors.length;i++){
        for(var j = 0 ;j<$scope.mySizes.length;j++){
          arr.push({
            color:$scope.myColors[i],
            size:$scope.mySizes[j],
            num:0
          })
        }
      }
      return arr
    }

}]);
