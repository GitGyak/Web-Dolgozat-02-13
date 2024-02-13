var http = new XMLHttpRequest();

var ingatlanok = [];
var oszlopok = ["datum", "nev", "fo", "cim", "iranyitoszam"];
var oszlopNevek = ["Dátum", "Név", "Fő", "Cím", "Irányítószám"];

function setRequest(method, url, feldolgozo, adat) {
    http.open(method, url, true);
    http.onload = function() { feldolgozo(); };
    http.send(JSON.stringify(adat));
}

setRequest("get", "http://localhost:3000/foglalasok", getFeldolgozo);

function getFeldolgozo() {
    if (http.status == 200) {
        ingatlanok = JSON.parse(http.responseText);
        render();
    }
}

function render() {
    var tabla = document.createElement("table"); 
    tabla.classList.add("tabla", "tablazat");

    var fejlec = document.createElement("thead"); 
    var sor = document.createElement("tr"); 

    for (let i = 0; i < oszlopok.length; i++) {
        var fej = document.createElement("th");
        fej.textContent = oszlopNevek[i];
        sor.appendChild(fej);
    }

    fejlec.appendChild(sor);
    tabla.appendChild(fejlec);

    var tartalom = document.createElement("tbody");

    for (const ingatlan of ingatlanok) {
        var tr = document.createElement("tr");

        for (const oszlop of oszlopok) {
            var td = document.createElement("td");
            td.textContent = ingatlan[oszlop];
            tr.appendChild(td);
        }

        tartalom.appendChild(tr);
    }

    tabla.appendChild(tartalom);

    document.body.appendChild(tabla);
}
