/**
 * Created by cld on 2016/5/12.
 */
Tailorpus.controller('CommunityCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };

    $scope.normal =0;

    $scope.showBigImg = function(){
        $scope.normal = 1;
    }

    $scope.showSmallImg = function(){
        $scope.normal = 2;
    }

});