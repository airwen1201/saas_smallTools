/**
 * Created by Heshuo on 2016/6/2.
 */

Tailorpus.controller('AddMaterialCtrl', function($scope,$state) {

    $scope.addMaterialPrice=function(){
      window.location.href="#/MaterialPrice"
    }
  $scope.openMaterialTypeTag=function () {
    window.location.href="#/MaterialTypeTag"
  }
  $scope.openGoodDetail = function () {
    $state.go('GoodDetail');
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
  $scope.images_list = ["img/photo.png"];
  $scope.goAddAddMaterial=function(){
    window.location.href="#/AddMaterial"
  }

});
