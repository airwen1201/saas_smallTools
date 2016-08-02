/**
 * Created by airwen on 16/6/12.
 */
/**
 * Created by cld on 2016/5/23.
 */
//账户详情列表
Tailorpus.controller('AccountDetailList2Ctrl', function($scope,$state,$stateParams,DataService) {
    //用户信息
    var obj = JSON.parse(window.localStorage.getItem("tailorUser"));
    $scope.toDetail = function(i){
        //window.location.href = "#/AccountDetail";
        $state.go('AccountDetail',{
            'stockOutId':$scope.payableDetailList[i].stockOutId,
            'name':$scope.payableDetailList[i].name,
            'img':$scope.payableDetailList[i].img,
            'date':$scope.payableDetailList[i].dealTime,
            'company':$stateParams.whos,
            'label':$scope.payableDetailList[i].name,
            'status':$scope.payableDetailList[i].status
        })
    }
    var vip2 = $stateParams.vip2
    $scope.vipName = $stateParams.whos
    console.log(vip2)
    //出库时间
    $scope.getListTime = function(t){
        //console.log(t)
        var array = t.toString().split(" ")
        var arr = array[0].split("-")
        return arr[1]+"/"+arr[2]+" 出库"
    }

    //获得付款状态
    $scope.setPayState = function(e){
        if (e=='0'){
            return "未付款"
        }else if (e =='1'){
            return "已付款"
        }else if (e == '2'){
            return "确认付款"
        }else {
            return ""
        }
    }

    //获取应收列表
    var getReceivableDetailList = function(vipId1,vipId2) {
        var promise = DataService.getReceivableDetailList(vipId1,vipId2);
        promise.then(function (data) {
            //具体操作
            console.log(JSON.stringify(data));
            $scope.payableDetailList = data.detail;
        }, function (data) {
            $cordovaToast.showLongBottom(data.message);
        });
    }

    getReceivableDetailList(obj.vipId,vip2);
});
