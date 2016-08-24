/**
 * Created by GY on 2016/6/2.
 */
//材料类型列表控制器
Tailorpus.controller('MaterialTypeListCtrl', function($scope,$rootScope,$ionicHistory) {
  $scope.searchtext='';
      var h=window.innerHeight-96+"px";
      $scope.myHeight={
        "height":h
      }
  $scope.doclear = function () {
    $scope.searchtext='';
    console.log(1111);
  }

    $scope.isChooseLest = 0
    $scope.materialList = [
        {
            label:'纽扣',
            contact:['纽扣1','纽扣3','纽扣3','纽扣4','纽扣5','纽扣6']
        },
        {
            label:'袖口',
            contact:['袖口1','袖口2','袖口3']
        },
        {
            label:'裤脚',
            contact:['裤脚1','裤脚3','裤脚3','裤脚4']
        }
    ]

    $scope.leftClick = function(i){
        $scope.isChooseLest = i
        //console.log(i)
    }

    $scope.chooseType = function(i){
        $rootScope.materialType = $scope.materialList[$scope.isChooseLest].contact[i]
        //window.localStorage.setItem("getKey",JSON.stringify(data));
        //console.log($rootScope.materialType)
        $ionicHistory.goBack();
    }



    $scope.searchitem='';
    $scope.dosearch = function(){
        for (var i = 0;i<$scope.materialList.length;i++){
            if ($scope.searchtext==$scope.materialList[i].label)
                $scope.leftClick(i)
        }
    }
});
