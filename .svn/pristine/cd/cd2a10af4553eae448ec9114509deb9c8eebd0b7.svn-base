/**
 * Created by admin111 on 16/7/5.
 */
Tailorpus.controller('ImageViewCtrl', function($scope,$stateParams) {
    $scope.images = $stateParams.imageList
    console.log(angular.toJson($scope.images))
    $scope.rows = $scope.images.length%3===0?$scope.images.length/3:(parseInt($scope.images.length/3)+1)
    $scope.hang = []
    console.log($scope.rows)
    for (var i = 0;i<$scope.rows;i++){
        $scope.hang.push('1')
    }
    console.log($scope.hang)
    $scope.getImgUrl = function (index,x) {
        if($scope.images[index*3+x]){
            return true
        }else{
            return false
        }
    }

    $scope.bigImage = false;    //初始默认大图是隐藏的
    $scope.hideBigImage = function () {
        $scope.bigImage = false;
    };
    $scope.showBigImage = function (index) {  //传递一个参数（图片的URl）
        $scope.Url = $scope.images[index];                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
        $scope.bigImage = true;                 //显示大图
    };

});
