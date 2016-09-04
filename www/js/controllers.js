angular.module('starter.controllers', [])
.run(function($rootScope){
  $rootScope.user = {};
  $rootScope.user.name = "";
})

.controller('LoginCtrl', function($scope, $rootScope) {
  $scope.user = {};

    $scope.login = function(user, password){
      if(user == 'diana@mail.com' && password == '12345'){
        $rootScope.user.name = 'Diana';
        console.log('Bienvenida');

      }
      else{
        console.log('Invalid user or password');
      }

      $scope.user.email = "";
      $scope.user.password = "";
    }
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $rootScope) {

  $scope.mensajes = [];
  var maxMessages = 8;

  console.log($rootScope.user.name);

  if($rootScope.user.name != ""){
    var variableFirebase = new Firebase('https://manappchat.firebaseio.com/public/');
    variableFirebase.limitToLast(maxMessages).on('child_added', function(snapshot){
      $timeout(function(){
        var message = snapshot.val();
        $scope.mensajes.push(message);
      });
    });

    $scope.newMessage = {};
    $scope.newMessage.user = $rootScope.user.name;

    $scope.postMessage = function (user, mensaje) {
        variableFirebase.push({usuario:user, mensaje:mensaje});
        $scope.newMessage.content = "";

        if($scope.mensajes.length == maxMessages){
          $scope.mensajes.splice(0, 1);
        }
    }
  }
})

.controller('AuthorCtrl', function($scope) {

});
