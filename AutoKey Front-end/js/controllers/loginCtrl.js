/**
 * Created by Gibran Polonsky on 19/01/2016.
 */

autoKey.controller('LoginCtrl', function($scope, $location, AuthData, InstructorData, $rootScope ){

    if($rootScope.globals.currentUser){
        $location.path('/home');
    }
    $scope.user = {};

    $scope.login = function(user){
        AuthData.login(user).success(function(data){
            if(data !== "false"){

                InstructorData.getInstructor(data[0].idUsuario).success(function(instructor){

                    //if(instructor !== 'false'){
                        AuthData.saveCredentials(data[0], instructor[0]);
                        $location.path("/home");
                   // }else{
                    //    alert('USTED NO ES JEFE DE GRUPO :D');
                    //}


                });
            }else{
                AuthData.clearCredentials();
                swal({
                    title: "Login",
                    text: "Usuario o pass incorrecto",
                    type: "error",
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'Aceptar!'
                });
            }
        });
    };

});