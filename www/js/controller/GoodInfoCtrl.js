/**
 * Created by airwen on 16/6/6.
 */
Tailorpus.controller('GoodInfoCtrl', function($scope,$state) {

    $scope.showMoreValue=1;
    $scope.picShowValue=1;
    $scope.picShow = function(index){
        if(index==1){
            $scope.picShowValue=1;
        }else if(index==2){
            $scope.picShowValue=2;
        }else if(index==3){
            $scope.picShowValue=3;
        }
    }
});