angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout) {

  $scope.mensajes = [];

  var variableFirebase = new Firebase('https://manappchat.firebaseio.com/public/');
  variableFirebase.limitToLast(8).on('child_added', function(snapshot){
    $timeout(function(){
      var message = snapshot.val();
      $scope.mensajes.push(message);
    });
  });

  $scope.newMessage = {};
  $scope.newMessage.user = "Diana";

  $scope.postMessage = function (user, mensaje) {
      variableFirebase.push({usuario:user, mensaje:mensaje});
      $scope.newMessage.content = "";
      
      if($scope.mensajes.length == 8){
        $scope.mensajes.splice(0, 1);
      }
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AuthorCtrl', function($scope) {
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
