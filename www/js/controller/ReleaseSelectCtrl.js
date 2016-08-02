/**
 * Created by cld on 2016/5/12.
 */

//发布类型选择
Tailorpus.controller('ReleaseSelectCtrl', function($scope,$state) {

    $scope.openRelease = function(){
        window.location.href = "#/ReleaseOrder";
    }
/*以下只做临时路由*/
  $scope.openAddMaterial = function () {
    $state.go('AddMaterial')
  }
  $scope.openStyleRecords = function () {
    $state.go('StyleRecords')
  }
  $scope.openAddStyle = function () {
    $state.go('AddStyle')
  }
  /*以上只做临时路由*/
});
