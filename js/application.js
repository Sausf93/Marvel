var Comics, Heroes;
var ArrayHeroes = new Array();
var ArrayComics = new Array();
var tipo = "heroes";
prueba();

function prueba(Url, tipo) {
    json = null;
    //cambiar consulta dependiento de la opcion.

    $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=14321933d028297d6a0835b04732201f',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            Heroes = json.data.results;
            GuardarHeroes();
        },
        error: function (request, status, error) {
            console.log(datos);
        },
    });

    $.ajax({
        url: 'https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=14321933d028297d6a0835b04732201f',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            Comics = json.data.results;
            GuardarComics();
        },
        error: function (request, status, error) {
            console.log(datos);
        },
    });
}

function GuardarHeroes() {

    for (var i in Heroes) {
        if (Heroes[i].thumbnail.path.indexOf("image_not_available") == -1) {
            var heroe = new Heroe(Heroes[i].thumbnail.path + "." + Heroes[i].thumbnail.extension, Heroes[i].name, Heroes[i].description);
            ArrayHeroes.push(heroe);
        }
    }
    localStorage.setItem("Heroes", JSON.stringify(ArrayHeroes));
    CargarHeroes();

}

function GuardarComics() {


    for (var i in Comics) {
        if (Comics[i].thumbnail.path.indexOf("image_not_available") == -1) {
            var comic = new Comic(Comics[i].thumbnail.path + "." + Comics[i].thumbnail.extension, Comics[i].title, Comics[i].description);
            ArrayComics.push(comic);
        }
    }
    localStorage.setItem("Comics", JSON.stringify(ArrayComics));
}

function CargarHeroes() {
    $("#comics").removeClass("active");
    $("#heroes").addClass("active");
    $("#contenedorComics").hide();
    $("#contenedorHeroes").show();

    if ($("#contenedorHeroes").children().length == 0) {
        if ((JSON.parse(localStorage.getItem("Heroes")) != null)) {
            ArrayHeroes = JSON.parse(localStorage.getItem("Heroes"));
            for (var j in ArrayHeroes) {
                $("#contenedorHeroes").append("<div class='heroe'> <h2> " + ArrayHeroes[j].nombre + " </h2> <img name='" + ArrayHeroes[j].nombre + "' alt='" + ArrayHeroes[j].descripcion + "' src='" + ArrayHeroes[j].img + "'/> <span class='more'>" + ArrayHeroes[j].descripcion + " </span> </div>");

            }
            $("img").on("click", function () {
                var Actual = new Heroe(this.src, this.name, $(this).next().text());
                localStorage.setItem("Actual", JSON.stringify(Actual));
                window.location.replace("./pages/Formulario.html");
            });
        }
    }
    Vermas();
}



function CargarComics() {
    $("#heroes").removeClass("active");
    $("#comics").addClass("active");
    $("#contenedorHeroes").hide();
    $("#contenedorComics").show();

    if ($("#contenedorComics").children().length == 0) {
        if (JSON.parse(localStorage.getItem("Comics")) != null) {
            ArrayComics = JSON.parse(localStorage.getItem("Comics"));
            for (var j in ArrayComics) {
                $("#contenedorComics").append('<div class="comic"> <h2> ' + ArrayComics[j].nombre + '</h2> <img src="' + ArrayComics[j].img + '" name= "' + ArrayComics[j].nombre + ' alt="' + ArrayComics[j].descripcion + ' /> <span class="more"> ' + ArrayComics[j].descripcion + ' </span> </div>');
            }
            $("img").on("click", function () {
                var Actual = new Comic(this.src, this.name, $(this).next().text());
                localStorage.setItem("Actual", JSON.stringify(Actual));
                window.location.replace("./pages/Formulario.html");
            });
        }
    }
    Vermas();
}

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

function Vermas() {

    var showChar = 100;
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.more').each(function () {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function () {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}



Comic = function (img, nombre, descripcion) {
    this.img = img;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = "Comic";
};

Heroe = function (img, nombre, descripcion) {
    this.img = img;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = "Heroe";
};

function volver() {

    window.location.href = "../index.html";
}


