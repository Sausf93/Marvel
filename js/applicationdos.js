function paginaDos(){

    var Actual = JSON.parse(localStorage.getItem("Actual"));
    $("#contenedordos").append('<h1> "' +Actual.nombre+'" </h1> <img src= "'+Actual.img+'"/> <p>'+Actual.descripcion+'"</p>');
}

function paginaprincipal(){
    window.location.replace("../index.html");
}