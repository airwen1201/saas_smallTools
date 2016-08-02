/**
 * Created by cld on 2016/5/12.
 */

Tailorpus.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});