var Comics, Heroes;
var ArrayHeroes = new Array();
var ArrayComics = new Array();
var tipo="heroes";
prueba();

function prueba(Url, tipo) {
    json=null;
    //cambiar consulta dependiento de la opcion.
    if ((tipo == "heroes") && (JSON.parse(localStorage.getItem("Heroes")) == null)) {
        $.ajax({
            url: Url,
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

    } 
    
    if((tipo == "comics") && (JSON.parse(localStorage.getItem("Comics")) == null)){
            $.ajax({
                url: Url,
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
        else{
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
        }

    

}


function GuardarHeroes() {
    for (var i in Heroes) {
        var heroe = new Heroe(Heroes[i].thumbnail.path + "." + Heroes[i].thumbnail.extension, Heroes[i].name, Heroes[i].description);
        ArrayHeroes.push(heroe);
    }
    localStorage.setItem("Heroes", JSON.stringify(ArrayHeroes));
    CargarHeroes();

}

function GuardarComics() {
    for (var i in Comics) {
        var comic = new Comic(Comics[i].thumbnail.path + "." + Comics[i].thumbnail.extension, Comics[i].name, Heroes[i].description);
        ArrayComics.push(comic);
    }
    localStorage.setItem("Comics", JSON.stringify(ArrayComics));
    CargarComics();
}

function CargarHeroes() {


    if (JSON.parse(localStorage.getItem("Heroes")) != null) {
        ArrayHeroes = JSON.parse(localStorage.getItem("Heroes"));
        for (var j in ArrayHeroes) {
            var aux = ArrayHeroes[j].descripcion.replace('"', '');
            $("#contenedorHeroes").append("<div class='heroe'> <h2> " + ArrayHeroes[j].nombre + " </h2> <img name='" + ArrayHeroes[j].nombre + "' alt='" + aux.replace("'", "") + "' src='" + ArrayHeroes[j].img + "'/> <p>" + ArrayHeroes[j].descripcion + " </p>' </div>");
            $("img").on("click", function () {
                var Actual = new Heroe(this.src, this.name, this.alt);
                localStorage.setItem("Actual", JSON.stringify(Actual));
                window.location.replace("./pages/Formulario.html");
            });
        }
    } else {
        prueba('https://gateway.marvel.com:443/v1/public/characters?limit=100&apikey=14321933d028297d6a0835b04732201f', "heroes");
    }

}

function CargarComics() {


    if (JSON.parse(localStorage.getItem("Comics")) != null) {
        ArrayComics = JSON.parse(localStorage.getItem("Comics"));
        for (var j in ArrayComics) {
            var aux = ArrayComics[j].descripcion.replace('"', '');
            $("#contenedorHeroes").append("<div class='heroe'> <h2> " + ArrayComics[j].nombre + " </h2> <img name='" + ArrayComics[j].nombre + "' alt='" + aux.replace("'", "") + "' src='" + ArrayHeroes[j].img + "'/> <p>" + ArrayHeroes[j].descripcion + " </p>' </div>");
            $("img").on("click", function () {
                var Actual = new Comic(this.src, this.name, this.alt);
                localStorage.setItem("Actual", JSON.stringify(Actual));
                window.location.replace("./pages/Formulario.html");
            });
        }
    } else {
        prueba('https://gateway.marvel.com:443/v1/public/comics?limit=100&apikey=14321933d028297d6a0835b04732201f', "comics");
    }
}






Comic = function (img, nombre, descripcion) {
    this.img = img;
    this.nombre = nombre;
    this.descripcion = descripcion;
};

Heroe = function (img, nombre, descripcion) {
    this.img = img;
    this.nombre = nombre;
    this.descripcion = descripcion;
};