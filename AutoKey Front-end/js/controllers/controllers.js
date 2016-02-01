/**
 * Created by Gibran Polonsky on 14/01/2016.
 */

autoKey.controller('ClaveCtrl', function($scope, ClaveData, FormularioData, AsignaturaData, $rootScope, $location){


    $scope.count = 1;
    $scope.data ={};
    $scope.data.clave = {};
    $scope.data.claves1 = [];
    $scope.data.claves2 = [];
    $scope.data.claves3 = [];

    $scope.showModal = true;

    $scope.asignaturas = {};


    $scope.data.clave.jefe =  $rootScope.globals.instructor.nombreCompleto;
    $scope.data.clave.idInstructor =  $rootScope.globals.instructor.idInstructor;


    //$rootScope.globals.currentUser.idUsuario

  //  AsignaturaData.getAsignaturas().success(function(data){
   //     $scope.asignaturas = data;
   // });


    $scope.toogleModal = function(clave){
        displayClaves();
        $scope.showModal = !$scope.showModal;
    };

    $scope.limit50 = function(){

        if($scope.data.clave.length > 50){
            $scope.data.clave.length = 50;
        }else{
            $scope.data.clave.length = parseInt($scope.data.clave.length);
        }
        if($scope.data.clave.length < 0){
            $scope.data.clave.length = 0;
        }
    };
    $scope.limit1000 = function(){

        if($scope.data.clave.copias > 1000){
            $scope.data.clave.copias = 1000;
        }else{
            $scope.data.clave.copias = parseInt($scope.data.clave.copias);
        }
        if($scope.data.clave.copias < 0){
            $scope.data.clave.copias = 0;
        }
    };


    $scope.setAsignaturas = function(){
            if($scope.data.clave.grado < 4){
                AsignaturaData.getAsignaturas(3).success(function(data){
                   $scope.asignaturas = data;
                });
            }else{
                AsignaturaData.getAsignaturas(2).success(function(data){
                    $scope.asignaturas = data;
                });
            }
    }

    $scope.save = function(){

        setClaves($scope.data.claves1);
        setClaves($scope.data.claves2);
        setClaves($scope.data.claves3);

        if(isAllSelected($scope.data.claves1) && isAllSelected($scope.data.claves2) && isAllSelected($scope.data.claves3)){

            var totalScore = 0;
            totalScore = getTotalScore($scope.data.claves1) + getTotalScore($scope.data.claves2) + getTotalScore($scope.data.claves3);

            if(totalScore === 100){
                $('#btnSave').addClass('m-progress');

                $scope.data.claves1 = jQuery.grep($scope.data.claves1, function(n){ return (n); });
                $scope.data.claves2 = jQuery.grep($scope.data.claves2, function(n){ return (n); });
                $scope.data.claves3 = jQuery.grep($scope.data.claves3, function(n){ return (n); });

                if($scope.data.clave.bachiller){
                    $scope.data.clave.bachiller = 1;
                }else{
                    $scope.data.clave.bachiller = 0;
                }

                FormularioData.saveFormulario($scope.data.clave).success(function(){
                    FormularioData.getLast().success(function(data){

                        setFormulario($scope.data.claves1, data[0].idFormulario);
                        setFormulario($scope.data.claves2, data[0].idFormulario);
                        setFormulario($scope.data.claves3, data[0].idFormulario);
                        ClaveData.saveClave($scope.data).success(function(data){
                            swal({
                                title: "Muchas Gracias",
                                text: "Clave Agregada Exitosa",
                                type: "success",
                                confirmButtonClass: 'btn-success',
                                confirmButtonText: 'Aceptar!'
                            });
                            $('#btnSave').removeClass('m-progress');
                            $location.path('/home');
                        }).error(function(){
                            swal({
                                title: "Error",
                                text: "Algo Salio Mal",
                                type: "error",
                                confirmButtonClass: 'btn-danger',
                                confirmButtonText: 'Aceptar!'
                            });
                            $('#btnSave').removeClass('m-progress');
                        });
                    });
                });

            }else{
                swal({
                    title: "",
                    text: "El total no es 100, porfavor revise el valor de las respuestas. \n total:" + totalScore,
                    type: "warning",
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Aceptar!'
                });
            }
        }else{
            swal({
                title: "",
                text: "Marque todas las preguntas",
                type: "info",
                confirmButtonClass: 'btn-info',
                confirmButtonText: 'Aceptar!'
            });
        }
    };

    $scope.random = function(){
        $('input[type=radio]').prop('checked', false).closest('label').removeClass('active');
        randomize();
    };

    function randomize(){
        $('input[name=""][type=radio]').remove();
        var count = 1;
        for(var i = 1; i<= $scope.data.clave.length; i++){
            var rand = Math.floor((Math.random() * 5));
            $($('input[type=radio][name='+ i +']')[rand]).prop('checked', true).closest('label').addClass('active');
        }
    }
    function displayClaves(){
        for($scope.count; $scope.count <= $scope.data.clave.length ; $scope.count++){
            if($scope.count <= 17){
                $scope.data.claves1[$scope.count] = {numeroPregunta: $scope.count, valor: 2, idFormulario: $scope.clave};
            }
            if($scope.count > 17 && $scope.count <= 34){
                $scope.data.claves2[$scope.count] = {numeroPregunta: $scope.count, valor: 2, idFormulario: $scope.clave};
            }
            if($scope.count > 34 && $scope.count <= 50){
                $scope.data.claves3[$scope.count] = {numeroPregunta: $scope.count, valor: 2, idFormulario: $scope.clave};
            }
        }
    }
    function setClaves(claves){
        angular.forEach(claves, function(Element, index){
            Element.respuesta = $('input[name =' + Element.numeroPregunta + ']:checked').val();
        });
    }

    function isAllSelected(claves){
        var isAllSelected = true;
        angular.forEach(claves, function(Element, index){
            if(typeof Element.respuesta === "undefined"){
                isAllSelected =  false;
            }
        });
        return isAllSelected;
    }

    function getTotalScore(claves){
        var score = 0;
        angular.forEach(claves, function(Element, index){
            score += Element.valor;
        });
        return score;
    }
    function setFormulario(claves, idFormulario){
        angular.forEach(claves, function(Element, index){
            Element.idFormulario = idFormulario;
        });
    }

});