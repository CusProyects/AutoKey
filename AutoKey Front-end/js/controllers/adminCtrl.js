/**
 * Created by Gibran Polonsky on 20/01/2016.
 */
autoKey.controller('AdminCtrl', function($scope, $rootScope, $q, $location, FormularioData, AsignaturaData, InstructorData, ClaveData){


    if($rootScope.globals.currentUser.name != "admin"){
        alert('USTED NO ES ADMINISTRADOR');
        $location.path('/home');
    }

    $scope.data = {};
    getFormularios();


    $scope.downloadPDF = function(formulario){

        var grado = "";
        switch(formulario.grado){
            case "1": grado = "Primero Básico"; break;
            case "2": grado = "Segundo Básico"; break;
            case "3": grado = "Tercero Básico"; break;
            case "4": grado = "Cuarto Diversificado"; break;
            case "5": grado = "Quinto Diversificado"; break;
            case "6": grado = "Sexto Diversificado"; break;
        }
        var jornada = "";
        switch(formulario.jornada){
            case "JV": jornada = "Vespertina"; break;
            case "JM": jornada = "Matutina"; break;
            case "Ambas": jornada = "Ambas"; break;
        }

        convertToDataURLviaCanvas('img/header.png', function(base64Img){
            ClaveData.getClaves(formulario.idFormulario).success(function(c){
                var first = $q.defer();

                first.resolve(parseData(c));

                first.promise.then(function(claves){

                    var defer = $q.defer();

                    var docDefinition = {
                        info: {
                            title: formulario.asignatura + "_" + formulario.forma,
                            author: formulario.instructor,
                            subject: 'Clave de examen de: ' + formulario.asignatura,
                            keywords: 'AutoKey',
                        },
                        content: [
                            {
                                columns: [
                                    {image: base64Img , width: 240, height: 90, margin: [134,0,0,0] }
                                ]
                            },
                            {text: " "},{text: " "},{text: " "},
                            {text: 'Clave de examen', style: 'header'},
                            {text: 'Jefe de equipo técnico: ' + formulario.instructor},
                            {text: 'Asignatura: ' + formulario.asignatura + " (" + formulario.idAsignatura + ")"},
                            {text: 'Formulario: ' + formulario.idFormulario},
                            {text: 'Copias: ' + formulario.copias},
                            {text: 'Forma: ' + formulario.forma },
                            {text: 'Bimestre: ' + formulario.bimestre},
                            {text: 'Grado: ' + grado},
                            {text: 'Jornada: ' + jornada},
                            {text: ' '},
                            {text: 'Codigo: _________________________'},
                            {text: '  '},
                            {text: '  '},
                            {text: 'Respuestas:'},
                            {text: '  '},
                            {
                                columns: [
                                    claves.array1,
                                    claves.array2,
                                    claves.array3
                                ]

                            },
                            {text: " "},{text: " "},{text: " "},{text: " "},{text: " "},
                            {
                                columns:[
                                    [
                                        {text: '__________________________________'},
                                        {text: 'Jefe de equipo técnico'}
                                    ],
                                    [
                                        {text: '__________________________________'},
                                        {text: 'Oficina técnica' }
                                    ]
                                ]
                            }
                        ],
                        styles: {
                            header: {
                                fontSize: 22,
                                bold: true
                            },
                            anotherStyle: {
                                italic: true,
                                alignment: 'center'
                            }
                        }

                    };
                    defer.resolve(docDefinition);

                    defer.promise.then(function(data){
                        pdfMake.createPdf(data).open(formulario.asignatura + "_" + formulario.forma);
                    });
                });
            });

        });
    };


    function parseData (data){
        var master = {
            array1: [],
            array2: [],
            array3: []
        };

        for(var i in data){
            if(i <= 17) {
                master.array1.push(data[i].numeroPregunta + ') ' + data[i].respuesta + ' ' + data[i].valor + ' pts') ;
            }
            if(i > 17 && i <= 34){
                master.array2.push(data[i].numeroPregunta + ') ' + data[i].respuesta + ' ' + data[i].valor + ' pts');
            }
            if(i > 34 && i <= 50){
                master.array3.push(data[i].numeroPregunta + ') ' + data[i].respuesta + ' ' + data[i].valor + ' pts') ;
            }
        }
        return master;
    }


    function convertToDataURLviaCanvas(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }








    $scope.deleteFormulario = function(formulario){

        swal({
                title: "Estas seguro?",
                text: "El formulario no podra recuerarse",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-warning",
                confirmButtonText: "aceptar",
                cancelButtonText: "cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    FormularioData.delete(formulario.idFormulario).success(function(data){
                        swal({
                            title: "Eliminar",
                            text: "Registro Elminado",
                            type: "success",
                            confirmButtonClass: 'btn-success',
                            confirmButtonText: 'Aceptar!'
                        });
                        getFormularios();
                    });
                }else{
                    swal("Cancelado", "El registro permanece", "info");
                }
            });
    };
    //http://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript

    function getFormularios(){
        FormularioData.getAll().success(function(data){

            if(data != "false"){
                $scope.data.formularios = [];
                angular.forEach(data, function(Element, index){
                    //  if(Element.bimestre == $rootScope.getCurrentBim()){
                    setAsignatura(Element);
                    setInstructor(Element);
                    $scope.data.formularios.push(Element);
                    //}
                });
            }else{
                $scope.data.formularios = {};
            }

        });
    }
    function setAsignatura(item){
        AsignaturaData.getAsignatura(item.idAsignatura).success(function(data){
            item.asignatura = data[0].asignatura;
        });
    };

    function setInstructor(item){
        if(item.idInstructor != 0){
            InstructorData.get(item.idInstructor).success(function(data){
                item.instructor = data[0].nombreCompleto;
            });
        }else{
            item.instructor = 'Administrador';
        }

    }

});
