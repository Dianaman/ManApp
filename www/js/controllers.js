angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.mensajes = [];

  var variableFirebase = new Firebase('https://manappchat.firebaseio.com/public/');
  variableFirebase.on('child_added', function(snapshot){
    var message = snapshot.val();
    $scope.mensajes.push(message);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('NewMessageCtrl', function($scope) {
  $scope.message = {};
  $scope.message.user = "Diana";
  var variableFirebase = new Firebase('https://manappchat.firebaseio.com/public/');

  $scope.postMessage = function (user, message) {
      variableFirebase.push({usuario:user, mensaje:message});
  }
});
