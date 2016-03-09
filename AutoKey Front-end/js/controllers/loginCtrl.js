/**
 * Created by Gibran Polonsky on 19/01/2016.
 */

autoKey.controller('LoginCtrl', function($scope, $location, AuthData, InstructorData, $rootScope ){

    $scope.savedSesion = {
        name: 'admin',
        password: 'admin',
        instructor:{
            nombreCompleto: 'Administrador',
            idInstructor: 0
        }
    };

    if($rootScope.globals.currentUser){
        $location.path('/home');
    }
    $scope.user = {};

    $scope.login = function(user){

        if(user.name != $scope.savedSesion.name){
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
        }else{

            console.log(user.password.localeCompare($scope.savedSesion.password));

            if(user.password == $scope.savedSesion.password ){

                AuthData.saveCredentials($scope.savedSesion, $scope.savedSesion.instructor);
                $location.path("/admin");

            }else{
                swal({
                    title: "Login",
                    text: "Usuario o pass incorrecto",
                    type: "error",
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'Aceptar!'
                });
            }


        }

    };

});