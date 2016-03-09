/**
 * Created by Gibran Polonsky on 07/03/2016.
 */
autoKey.controller('StatisticsCtrl', function($scope, $routeParams, AciertoData, FormularioData, AsignaturaData){









    $scope.data = {};
    $scope.materia = "ASIGNATURA";

    $scope.count = 0;


    FormularioData.get($routeParams.idFormulario).success(function(data){

        $scope.formulario = data[0];

        AsignaturaData.getAsignatura(data[0].idAsignatura).success(function(data){
            $scope.materia = data[0].asignatura
        });


        AciertoData.get($scope.formulario.idFormulario).success(function(data){

            $scope.data.preguntas = [];

            if(data !== "false"){

                var preguntas = [];
                var aciertos = [];

                var aprobados = 0;
                var reprobados = 0;

                angular.forEach(data, function(Element, index){
                    var pregunta = {};
                    pregunta.acierto = parseInt((Element.acierto * 100) /  (Element.acierto + Element.desacierto));
                    $scope.count = Element.acierto + Element.desacierto;
                    pregunta.index = Element.numeroPregunta;

                    preguntas.push(Element.numeroPregunta);
                    aciertos.push(parseInt((Element.acierto * 100) /  (Element.acierto + Element.desacierto)));

                    //  console.log(pregunta);
                    $scope.data.preguntas.push(pregunta);

                });


                getBar(preguntas, aciertos);
                getPie();

            }else{

                $scope.message = "No hay ningun registro estadistico";

            }



        });


    });


    //console.log($routeParams.idFormulario);



});



function getBar(label, data){

    var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

    var barChartData = {
        labels : label,
        datasets : [
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,0.8)",
                highlightFill : "rgba(151,187,205,0.75)",
                highlightStroke : "rgba(151,187,205,1)",
                data : data
            }
        ]

    };

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
        responsive : true
    });
}

function getPie(reprobados, aprobados){

    var doughnutData = [
        {
            value: 50,
            color:"#B48EAD",
            highlight: "#FF5A5E",
            label: "Reprobados"
        },
        {
            value: 50,
            color: "#659AC9",
            highlight: "#5AD3D1",
            label: "Aprobados"
        }
    ];

    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {responsive : true});


}

