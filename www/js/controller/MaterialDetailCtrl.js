/**
 * Created by GY on 2016/6/3.
 */
Tailorpus.controller('MaterialDetailCtrl', function($scope,$state,$stateParams) {
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

  $scope.materialDetailItem = $stateParams.materialDetailItem
  console.log(angular.toJson($scope.materialDetailItem))
  //存储图片地址
  $scope.images_list = angular.fromJson($scope.materialDetailItem.img)
  //$scope.images_list = ["img/photo.png","img/photo.png","img/photo.png"]
  //属性
  $scope.property = angular.fromJson($scope.materialDetailItem.property)
  console.log(angular.toJson($scope.images_list)+' '+angular.toJson($scope.property))

  $scope.keyList = []
  for (var key in $scope.property){
    $scope.keyList.push(key)
  }
  console.log(angular.toJson($scope.keyList))

  //$scope.getImageRealUrl = function (){
  //  return angular.fromJson($scope.materialDetailItem.img)
  //}

  $scope.bigImage = false;    //初始默认大图是隐藏的
  $scope.hideBigImage = function () {
    $scope.bigImage = false;
  };
  $scope.showBigImage = function (index) {  //传递一个参数（图片的URl）

    $scope.Url = angular.fromJson($scope.materialDetailItem.img)[index];                   //$scope定义一个变量Url，这里会在大图出现后再次点击隐藏大图使用
   //console.log(index)
    $scope.bigImage = true;                 //显示大图
  };

});

