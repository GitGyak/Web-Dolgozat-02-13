var http = new XMLHttpRequest();
var foglalasok = [];
var oszlopok = ["datum", "nev", "fo", "cim", "iranyitoszam"];

function setRequest(method, url, feldolgozo, adat) {
    http.open(method, url, true);
    http.onload = function() { 
        if (http.status === 200) {
            feldolgozo();
        } else {
            console.error('Hiba a szerver válaszában:', http.status);
        }
    };
    http.send(JSON.stringify(adat));
}

setRequest("get", "http://localhost:3000/foglalasok", getFoglalasok);

function getFoglalasok() {
    foglalasok = JSON.parse(http.responseText);
    render();
}

function deleteFoglalas(id) {
    console.log("A törlendő foglalás azonosítója:", id);
    setRequest("delete", "http://localhost:3000/foglalasok/" + id, getFoglalasok);
}

function render() {
    var container = document.getElementsByClassName("container")[0];

    var table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    var thead = document.createElement('thead');
    table.appendChild(thead);

    var tr = document.createElement('tr');
    thead.appendChild(tr);

    for (const oszlop of oszlopok) {
        var th = document.createElement('th');
        th.textContent = oszlop;
        tr.appendChild(th);
    }

    var operationTh = document.createElement('th');
    operationTh.textContent = 'Műveletek';
    tr.appendChild(operationTh);

    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (const foglalas of foglalasok) {
        var row = document.createElement('tr');

        for (const oszlop of oszlopok) {
            var td = document.createElement('td');
            td.textContent = foglalas[oszlop];
            row.appendChild(td);
        }

        var operationCell = document.createElement('td');
        var saveButton = document.createElement('button');
        saveButton.type = "button";
        saveButton.className = "btn btn-warning";
        saveButton.textContent = "Save";
        operationCell.appendChild(saveButton);

        var deleteButton = document.createElement('button');
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteFoglalas(foglalas.id);
        };
        operationCell.appendChild(deleteButton);

        row.appendChild(operationCell);
        tbody.appendChild(row);
    }

    container.appendChild(table);
}
