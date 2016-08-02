/**
 * Created by airwen on 16/6/1.
 */
//商品图片
Tailorpus.controller('StorageImagesCtrl', function($scope,$stateParams) {
  $scope.images = $stateParams.images
  //console.log(angular.toJson($scope.images))
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
});
