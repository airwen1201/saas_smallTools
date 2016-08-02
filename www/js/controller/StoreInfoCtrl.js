/**
 * Created by HS on 2016/6/8.
 */

Tailorpus.controller('StoreInfoCtrl', function($scope, $state) {

  $scope.openStoreIndex = function () {
    $state.go('StoreIndex');
  }

});
