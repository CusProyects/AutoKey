/**
 * Created by Malco Chacon on 14/01/2016.
 */

autoKey.factory('ClaveData', function($http, $rootScope){

    var ClaveData ={};

    ClaveData.saveClave = function(claves){
       return $http.post($rootScope.server + 'clave', claves);
    };

    ClaveData.getClaves = function(idFormulario){
        return $http.get($rootScope.server + 'clave/' + idFormulario);
    };
    return ClaveData;
});

autoKey.factory('FormularioData', function($http, $rootScope){

    var FormularioData = {};

    FormularioData.get = function(idFormulario){

        return $http.get($rootScope.server + 'formulario/get/' + idFormulario);

    };

    FormularioData.saveFormulario = function(formulario){
        return $http.post($rootScope.server + 'formulario', formulario);
    };

    FormularioData.getLast = function(){
        return $http.get($rootScope.server + 'formulario');
    };

    FormularioData.getFormularios = function(idInstructor){
        return $http.get($rootScope.server + 'formulario/' + idInstructor);
    };
    FormularioData.getAll = function (){
        return $http.get($rootScope.server + 'formulario/all');
    };
    FormularioData.delete = function(idFormulario){
        return $http.delete($rootScope.server + 'formulario/' + idFormulario);
    };

    return FormularioData;
});

autoKey.factory('AsignaturaData', function($http, $rootScope){

    var AsignaturaData = {};

    AsignaturaData.getAsignaturas = function(idNivel){
        return $http.get($rootScope.server + 'asignatura/nivel/' + idNivel);
    };
    AsignaturaData.getAsignatura = function(idAsignatura){
        return $http.get($rootScope.server + 'asignatura/' + idAsignatura );
    };
    return AsignaturaData;
});

autoKey.factory('InstructorData', function($http, $rootScope){

    var InstructorData = {};

    InstructorData.getInstructor = function(idUsuario){
        return $http.get($rootScope.server + 'instructor/usuario/' + idUsuario);
    };
    InstructorData.get = function(idInstructor){
        return $http.get($rootScope.server + 'instructor/' + idInstructor);
    };

    return InstructorData;
});

autoKey.factory('AuthData', function($http, $rootScope, $cookieStore){

    var AuthData = {};
    AuthData.login = function(user){

        return $http.post($rootScope.server + 'auth', user);
    };

    AuthData.saveCredentials = function(user, instructor){

        $rootScope.globals = {
            currentUser: user,
            instructor: instructor
        };

        $cookieStore.put('globals', $rootScope.globals);

    };

    AuthData.clearCredentials = function(){
        $rootScope.globals = {};
        $cookieStore.remove('globals');
    };

    return AuthData;

});
autoKey.factory('AciertoData', function($http, $rootScope){

    var AciertoData = {};

    AciertoData.get = function(idFormulario){
        return $http.get($rootScope.server + 'acierto/' + idFormulario);
    };

    return AciertoData;

});