/**
 * Created by Gibran Polonsky on 14/01/2016.
 */

autoKey.controller('ClaveCtrl', function($scope, ClaveData){

    $scope.count = 1;
    $scope.data ={};
    $scope.data.claves1 = [];
    $scope.data.claves2 = [];
    $scope.data.claves3 = [];

    $scope.showModal = true;

    $scope.data.clave= {};

    $scope.data.clave.idClave = 1123;



    $scope.toogleModal = function(clave){
        displayClaves();
        $scope.showModal = !$scope.showModal;
    };

    $scope.save = function(){

        setClaves($scope.data.claves1);
        setClaves($scope.data.claves2);
        setClaves($scope.data.claves3);

        if(isAllSelected($scope.data.claves1) && isAllSelected($scope.data.claves2) && isAllSelected($scope.data.claves3)){

            $('#btnSave').addClass('m-progress');

            $scope.data.claves1 = jQuery.grep($scope.data.claves1, function(n){ return (n); });
            $scope.data.claves2 = jQuery.grep($scope.data.claves2, function(n){ return (n); });
            $scope.data.claves3 = jQuery.grep($scope.data.claves3, function(n){ return (n); });

            ClaveData.saveClave($scope.data).success(function(data){
                swal({
                    title: "Muchas Gracias",
                    text: "Clave Agregada Exitosa",
                    type: "success",
                    confirmButtonClass: 'btn-success',
                    confirmButtonText: 'Aceptar!'
                });
                $('#btnSave').removeClass('m-progress');
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
                $scope.data.claves1[$scope.count] = {numeroPregunta: $scope.count, valor: 2, clave: $scope.clave};
            }
            if($scope.count > 17 && $scope.count <= 34){
                $scope.data.claves2[$scope.count] = {numeroPregunta: $scope.count, valor: 2, clave: $scope.clave};
            }
            if($scope.count > 34 && $scope.count <= 51){
                $scope.data.claves3[$scope.count] = {numeroPregunta: $scope.count, valor: 2, clave: $scope.clave};
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

});