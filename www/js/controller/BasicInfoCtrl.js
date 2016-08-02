/**
 * Created by cld on 2016/5/17.
 */
//基本信息
//Tailorpus.controller('BasicInfoCtrl',['$scope','$state',function($scope,$state) {
    Tailorpus.controller('BasicInfoCtrl', ['$scope', '$rootScope','$state','DataService','$cordovaImagePicker','$ionicActionSheet', '$cordovaCamera','$ionicPlatform','$cordovaFileTransfer','$cordovaToast',function($scope,$rootScope,$state,DataService,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$ionicPlatform,$cordovaFileTransfer,$cordovaToast) {


    $scope.receivePlace = function(){
        window.location.href = "#/ReceiveAddress";
    }


    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));

      if(obj.baseInfo){
        $scope.userCalled = obj.baseInfo.name;
        if(obj.baseInfo.headImg){
          //用户头像
          $scope.headImg = obj.baseInfo.headImg;
        }
        //用户性别
        $scope.sex = obj.baseInfo.sex;
        ////用户手机号
        $scope.userPhone = obj.phone;
        //用户收货地址
        $scope.address = getFirstAdd(obj.baseInfo.address);
      }
      else{
        var baseInfo = {
            "headImg": "",
            "name": "",
            "sex": "",
            "address": []
        }
        obj.baseInfo = baseInfo;window.localStorage.setItem("tailorUser",JSON.stringify(obj));
      }
    //用户姓名

      $scope.editAvatar = function(){
        $scope.addAttachment()
      }
      $scope.toEditName = function(){
        $state.go("EditName",{'originName':$scope.userCalled})
      }
      $scope.toEditSex = function(){
        $state.go("EditSex",{'originSex':$scope.sex})
      }
      $scope.toEditPassword = function(){
        $state.go("EditPassword")
      }

    //实现返回刷新界面
    $scope.updateData = function () {
        obj = JSON.parse(window.localStorage.getItem("tailorUser"));
        // console.log(JSON.stringify(obj))
        $scope.userCalled = obj.baseInfo.name;
        $scope.headImg = obj.baseInfo.headImg;
        $scope.sex = obj.baseInfo.sex;
        $scope.userPhone = obj.phone;
        $scope.address = getFirstAdd(obj.baseInfo.address);
    };
    $scope.updateData();         //函数调用
    $scope.$on('$stateChangeSuccess', $scope.updateData); //实现了刷新


      //启动拍照
      $scope.addAttachment = function() {
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
          // alert(imageURI);
          // $scope.imageSrc= imageURI;
          uploadPhoto(imageURI)
        }, function(err) {
          // error
        });
      }


      //image picker
      var pickImage = function () {

        var options = {
          maximumImagesCount: 1,
          width: 480,
          height: 800,
          quality: 80
        };

        window.imagePicker.getPictures(
          function(results) {
            uploadPhoto(results[0])
          }, function (error) {
            console.log('Error: ' + error);
          }, {
            maximumImagesCount: 1,
            width: 800
          }
        );
      }
      var doSubmit = function(){
        var basic = {
          "headImg" :$scope.headImg,
          "name" : $scope.userCalled,
          "sex" : $scope.sex,
          "address" :obj.baseInfo.address
        }
        var json ={
          "baseInfo":basic
        };
        DataService.modifyUserInfo().update({vipId:obj.vipId},json,function(data){
          //存储修改后的json数据
          obj.baseInfo.headImg=basic.headImg;
          window.localStorage.setItem("tailorUser",JSON.stringify(obj));
          // alert(JSON.stringify(data));
        },function(data){
          // alert(JSON.stringify(data));
        });
      }
      //设置鉴权
      var options = {
        headers: {
          "authorization": "Y2ZwMTIz"
        }
      };
      //图片上传地址
      var url = "http://192.168.0.12:4567/v1.0/file";

      //上传图片
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
              //存储图片在服务器中的绝对地址
              $scope.headImg = (JSON.parse(result.response).message);
              $rootScope.hideMsg();
              // alert('上传成功！')
              doSubmit();
              $cordovaToast.showLongBottom("图片上传成功！");
            }, function(err) {
              $rootScope.hideMsg();
              $cordovaToast.showLongBottom("图片上传失败！");
              // alert('上传失败！')
              //alert("SUCCESS: " + JSON.stringify(err))
            }, function (progress) {
              // constant progress updates
            });
        }
      }



}]);

var getFirstAdd =  function (arr){
    var addRe;
    for (var i=0;i<arr.length;i++)
    {
        if (arr[i].isDefault == "1")
        {
            addRe = arr[i].address;
            break;
        }
    }
    return addRe;
}
