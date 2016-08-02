/**
 * Created by cld on 2016/5/12.
 */
//订单详情
Tailorpus.controller('OrderDetailCtrl', function($scope,CommService) {
    $scope.imgUrl = "http://www.pp3.cn/uploads/201509/2015091507.jpg";

    $scope.height = window.innerWidth / 1.4;

    $scope.width = window.innerWidth;

    $scope.picUrl = "http://www.deskcar.com/desktop/cartoon/china/2012317210314/17.jpg";

    $scope.showMoreValue = false;
    $scope.showMore = function(){
        $scope.showMoreValue = true;
    }

    $scope.picShowValue=1;
    $scope.picShow = function(index){
        if(index==1){
            $scope.picShowValue=1;
            $scope.picUrl = "http://www.deskcar.com/desktop/cartoon/china/2012317210314/17.jpg";
        }else if(index==2){
            $scope.picShowValue=2;
            $scope.picUrl = "http://www.pp3.cn/uploads/201509/2015091507.jpg";
        }else if(index==3){
            $scope.picShowValue=3;
            $scope.picUrl = "http://www.deskcar.com/desktop/cartoon/china/2012317210314/17.jpg";
        }
    }

    //图片地址处理
    $scope.imgUrlProcess = function(imgUrl,width,height,quality){
        return CommService.imgProcess(imgUrl,width,height,quality);
    }

});
