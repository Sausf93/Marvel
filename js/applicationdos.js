var tipo;
var votosHeroes=new Array();
var votosComics=new Array();
var nombreActual;

function paginaDos() {

    var Actual = JSON.parse(localStorage.getItem("Actual"));
    $("#contenedordos").append('<h1> "' + Actual.nombre + '" </h1> <img src= "' + Actual.img + '"/> <p>' + Actual.descripcion + '"</p>');
    tipo=Actual.tipo;
    nombreActual=Actual.nombre;

}

function paginaprincipal() {

    if(tipo=="Heroe"){

        if(JSON.parse(localStorage.getItem("VotosHeroes"))==null){

           var heroe = new HeroeoComic (nombreActual, 1);
           votosHeroes.push(heroe);
        }
        else{
           votosHeroes= JSON.parse(localStorage.getItem("VotosHeroes"));
           for(var i in votosHeroes){
              if(votosHeroes[i].nombre==nombreActual) {
                  votosHeroes[i].votos=votosHeroes[i].votos++;
              }
           }
        }

        localStorage.setItem("VotosHeroes", JSON.stringify(votosHeroes));
    
    }
    if(tipo=="Comic"){

        if(JSON.parse(localStorage.getItem("VotosComics"))==null){

            var comic = new HeroeoComic (nombreActual, 1);
            votosComics.push(comic);
         }
         else{
            votosHeroes= JSON.parse(localStorage.getItem("VotosComics"));
            for(var j in votosHeroes){
               if(votosHeroes[j].nombre==nombreActual) {
                   votosHeroes[j].votos=votosHeroes[j].votos++;
               }
            }
         }
 
         localStorage.setItem("VotosHeroes", JSON.stringify(votosHeroes));
    }
}



HeroeoComic = function (nombre, numeroVotos) {
    this.nombre = nombre;
    this.numeroVotos = numeroVotos;
};


function Heroes() {

    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var pelis = JSON.parse(localStorage.getItem("VotosHeroes"));
        var arrayGrafico = [
            ["Nombre Heroe ", "numero de votos"]
        ];
        pelis.forEach(function (e) {
            arrayGrafico.push([e.nombre, e.numeroVotos]);
        });
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
            title: 'Grafico de votaciones de los heroes',
            pieHole: 0,
        };
    }

    var chart = new google.visualization.PieChart(document.getElementById('graficos'));
    chart.draw(data, options);
}

function Comics() {

    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var pelis = JSON.parse(localStorage.getItem("Votoscomics"));
        var arrayGrafico = [
            ["Nombre Comic", "numero de votos"]
        ];
        pelis.forEach(function (e) {
            arrayGrafico.push([e.nombre, e.numeroVotos]);
        });
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
            title: 'Grafico de votaciones a las peliculas',
            pieHole: 0,
        };
    }

    var chart = new google.visualization.PieChart(document.getElementById('graficos'));
    chart.draw(data, options);
}

