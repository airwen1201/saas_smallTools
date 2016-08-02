/**
 * Created by cld on 2016/5/12.
 */
//注册控制器
Tailorpus.controller('RegisterCtrl', ['$scope', '$rootScope','$state','$interval','$cordovaToast','DataService',function($scope,$rootScope,$state,$interval,$cordovaToast,DataService) {

    //注册信息
    $scope.info = {};

    //是否显示时间
    $scope.showTime = false;


    //跳转到完善个人信息界面
    $scope.toCompleteInfo = function(){
        window.location.href = "#/CompleteInfo";
    }

    //获取验证码
    $scope.time = 60;
    $scope.getVerifyCode = function() {
        setTimeout(function () {
                if($scope.info.phone){
                    $scope.showTime = true;
                    $interval(function() {
                        1 == $scope.time ? $scope.showTime = false : $scope.time--
                    },1000);

                    var promise = DataService.getVerifyCode($scope.info.phone);

                    promise.then(function (data) {
                        $cordovaToast.showLongBottom(data.message)
                    }, function (data) {
                        $cordovaToast.showLongBottom(data.message)
                    });
                }
            },
            100);
    }

    //注册
    $scope.doRegister = function(){
        var promise = DataService.doRegister($scope.info);

        promise.then(function (data) {
            //$rootScope.vipId = data.vipId;
            //存储注册后的用户信息
            window.localStorage.setItem("tailorUser",data);
            //跳转到完善个人信息界面
            $state.go("CompleteInfo",{'vipId': data.vipId});
        }, function (data) {
            //alert(JSON.stringify(data));
            $cordovaToast.showLongBottom(data.message)
        });
    }

} ]);
