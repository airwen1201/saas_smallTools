/**
 * Created by cld on 2016/5/12.
 */

//发布订单
Tailorpus.controller('ReleaseOrderCtrl', ['$scope','$cordovaImagePicker','$ionicActionSheet', '$cordovaCamera','$ionicPlatform','$cordovaFileTransfer',
    function($scope,$cordovaImagePicker,$ionicActionSheet,$cordovaCamera,$ionicPlatform,$cordovaFileTransfer) {

    $scope.images_list = [];

    // "添加附件"Event
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
            };

            $cordovaCamera.getPicture(options).then(function(imageURI) {
                alert(imageURI);
               // $scope.imageSrc= imageURI;
                $scope.images_list.push(imageURI);
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
                for (var i = 0; i < results.length; i++) {
                   // console.log('Image URI: ' + results[i]);
                    $scope.images_list.push(results[i]);
                }
            }, function (error) {
                console.log('Error: ' + error);
            }, {
                maximumImagesCount: 10,
                width: 800
            }
        );

    }


}]);
