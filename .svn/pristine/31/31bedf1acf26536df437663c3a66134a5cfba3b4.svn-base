/**
 * Created by airwen on 16/5/19.
 */
Tailorpus.controller('CompanyPhotoCtrl', ['$scope','$cordovaImagePicker','$ionicActionSheet', '$cordovaImagePicker','$cordovaCamera','$ionicPlatform','$cordovaFileTransfer','$rootScope','DataService','$ionicHistory','$cordovaToast',
  function($scope,$cordovaImagePicker,$ionicActionSheet,$cordovaImagePicker,$cordovaCamera,$ionicPlatform,$cordovaFileTransfer,$rootScope,DataService,$ionicHistory,$cordovaToast) {

    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    console.log(obj);
    //相关照片
    if(obj.compInfo.img == undefined||obj.compInfo.img == null){
      $scope.imageArray=["img/photo.png"];
    }else {
      $scope.imageArray=obj.compInfo.img;

    }
      var imgNames=[]
    $scope.addAttachment = function() {
      if($scope.imageArray.length<20) {
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
      }else{
        $cordovaToast.showLongBottom("图片已经够多了(＞﹏＜)，不可以超过20张哦！");
      }
  }
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

      // $scope.imageSrc= imageURI;
     /* alert(angular.toJson(imgNames));*/
      imgNames.push(imageURI);
     /* alert(angular.toJson(imgNames));*/
      uploadPhoto(imageURI);
     /* alert("已经调用上传方法");*/
    }, function(err) {
      $cordovaToast.showLongBottom("上传失败"+err);
      // error
    });
  }


  //image picker origin version
  var pickImage = function () {

    var options = {
      maximumImagesCount: 2,
      width: 5000,
      height: 5000,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options).then
    (function(results) {
        for (var i = 0; i < results.length; i++) {

          // console.log('Image URI: ' + results[i]);
          imgNames.push(results[i]);
          uploadPhoto(results[i]);
        }

      }, function (error) {
        /*$cordovaToast.showLongBottom("上传失败"+error);*/
        $cordovaToast.showLongBottom('Error: ' + error);
          // alert(angular.toJson(error))
      }/*{
        maximumImagesCount: 10,
        width: 800
      }*/
    );

  }
    //Copy from addStorageCtrl
/*    var pickImage = function () {

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

    }*/
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
      }else  {
        //显示提示
        $rootScope.uploadMsg();

        $cordovaFileTransfer.upload(url, img, options)
          .then(function (result) {
            // Success!
            if($scope.imageArray.length==20)
            {return}
            console.log("SUCCESS: " + JSON.stringify(result.response));
            //存储图片在服务器中的绝对地址
            $scope.imageArray.push(JSON.parse(result.response).message);
            $rootScope.hideMsg();
            /*alert('上传成功！')*/
            $cordovaToast.showLongBottom("图片上传成功！");
          }, function (err) {
            $rootScope.hideMsg();
            $cordovaToast.showLongBottom("图片上传失败！");
            // alert('上传失败！')
            //alert("SUCCESS: " + JSON.stringify(err))
          }, function (progress) {
            // constant progress updates
          });
      }
    }

    $scope.originCompany = {
      name : obj.compInfo.name,
      shortName : obj.compInfo.name,
      tel : obj.compInfo.tel,
      productionType : obj.compInfo.productionType,
      img : $scope.imageArray
    }
    //提交
    $scope.doSubmit  = function(){
      // if($scope.imageArray.length<=20) {
        var json = {
          "compInfo": $scope.originCompany
        };
        /*alert(angular.toJson(json))*/
        console.log(angular.toJson(json));
        DataService.modifyUserInfo().update({vipId: obj.vipId}, json, function (data) {
          $cordovaToast.showLongBottom("保存成功");
          //存储修改后的json数据
          window.localStorage.setItem("tailorUser", JSON.stringify(obj));
          console.log(JSON.stringify(data));
          $ionicHistory.goBack();
        }, function (data) {
          console.log(JSON.stringify(data));
        });
      // }else{
      //   $cordovaToast.showLongBottom("图片已经够多了(＞﹏＜)，不可以超过20张哦！");
      // }
    }
    $scope.bigImage = false;    //初始默认大图是隐藏的
    $scope.hideBigImage = function () {
      $scope.bigImage = false;
    };
    $scope.showBigImage = function (index) {  //传递一个参数（图片的URl）
      $scope.Url = $scope.imageArray[index];                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
      $scope.bigImage = true;                 //显示大图
    };
    $scope.deleteThis=function(index,type){
      if(type=="pic"){
        $scope.imageArray.splice(index,1);
        ($scope.imageArray.length*90+($scope.imageArray.length-1)*5-$scope.swiper[0].width>0)? $scope.showPicRow=true:$scope.showPicRow=false;
      }else{
        $scope.colors.splice(index,1);
        ($scope.colors.length*60-$scope.swiper[0].width>0)? $scope.showColorRow=true:$scope.showColorRow=false;
      }
    };
}]);
