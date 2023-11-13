let map = L.map('map').setView([53.430127, 14.564802], 18);
//L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);
;

document.getElementById("saveButton").addEventListener("click", function() {
    leafletImage(map, function (err, canvas) {
        // here we have the canvas
        let map = document.getElementById("map");
        map.style.display = "none";
        let rasterMap = document.getElementById("rasterMap");
        rasterMap.style.display = "inline";
        rasterMap.width=400;
        rasterMap.height=400;
        let rasterContext = rasterMap.getContext("2d");


        rasterContext.drawImage(canvas, 0, 0, 400, 400);
        let puzleMap1 =document.getElementById("puzle1");
        let puzleContext1 = puzleMap1.getContext("2d");
        let puzleMap2 =document.getElementById("puzle2");
        let puzleContext2 = puzleMap2.getContext("2d");
        let puzleMap3 =document.getElementById("puzle3");
        let puzleContext3 = puzleMap3.getContext("2d");
        let puzleMap4 =document.getElementById("puzle4");
        let puzleContext4 = puzleMap4.getContext("2d");
        let puzleMap5 =document.getElementById("puzle5");
        let puzleContext5 = puzleMap5.getContext("2d");
        let puzleMap6 =document.getElementById("puzle6");
        let puzleContext6 = puzleMap6.getContext("2d");
        let puzleMap7 =document.getElementById("puzle7");
        let puzleContext7 = puzleMap7.getContext("2d");
        let puzleMap8 =document.getElementById("puzle8");
        let puzleContext8 = puzleMap8.getContext("2d");
        let puzleMap9 =document.getElementById("puzle9");
        let puzleContext9 = puzleMap9.getContext("2d");
        let puzleMap10 =document.getElementById("puzle10");
        let puzleContext10 = puzleMap10.getContext("2d");
        let puzleMap11 =document.getElementById("puzle11");
        let puzleContext11 = puzleMap11.getContext("2d");
        let puzleMap12 =document.getElementById("puzle12");
        let puzleContext12 = puzleMap12.getContext("2d");
        let puzleMap13 =document.getElementById("puzle13");
        let puzleContext13 = puzleMap13.getContext("2d");
        let puzleMap14 =document.getElementById("puzle14");
        let puzleContext14 = puzleMap14.getContext("2d");
        let puzleMap15 =document.getElementById("puzle15");
        let puzleContext15 = puzleMap15.getContext("2d");
        let puzleMap16 =document.getElementById("puzle16");
        let puzleContext16 = puzleMap16.getContext("2d");
        puzleContext1.drawImage(canvas, 0, 0, 100,100, 0, 0, 100,100)
        puzleContext2.drawImage(canvas, 100, 0, 100,100, 0, 0, 100,100)
        puzleContext3.drawImage(canvas, 200, 0, 100,100, 0, 0, 100,100)
        puzleContext4.drawImage(canvas, 300, 0, 100,100, 0, 0, 100,100)
        puzleContext5.drawImage(canvas, 0, 100, 100,100, 0, 0, 100,100)
        puzleContext6.drawImage(canvas, 100, 100, 100,100, 0, 0, 100,100)
        puzleContext7.drawImage(canvas, 200, 100, 100,100, 0, 0, 100,100)
        puzleContext8.drawImage(canvas, 300, 100, 100,100, 0, 0, 100,100)
        puzleContext9.drawImage(canvas, 0, 200, 100,100, 0, 0, 100,100)
        puzleContext10.drawImage(canvas, 100, 200, 100,100, 0, 0, 100,100)
        puzleContext11.drawImage(canvas, 200, 200, 100,100, 0, 0, 100,100)
        puzleContext12.drawImage(canvas, 300, 200, 100,100, 0, 0, 100,100)
        puzleContext13.drawImage(canvas, 0, 300, 100,100, 0, 0, 100,100)
        puzleContext14.drawImage(canvas, 100, 300, 100,100, 0, 0, 100,100)
        puzleContext15.drawImage(canvas, 200, 300, 100,100, 0, 0, 100,100)
        puzleContext16.drawImage(canvas, 300, 300, 100,100, 0, 0, 100,100)

    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Pobierz wszystkie canvasy i przemieszaj je
    let canvases = document.querySelectorAll(".puzle-pace");
    let shuffledCanvases = shuffleArray(Array.from(canvases));

    // Usuń oryginalne canvasy z dokumentu
    canvases.forEach(function (canvas) {
        canvas.remove();
    });

    // Dodaj przemieszane canvasy z powrotem do dokumentu
    shuffledCanvases.forEach(function (canvas) {
        document.body.appendChild(canvas);
    });
});

// przemieszania tablicy
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
        let marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup("<strong>Hello!</strong><br>This is a popup.")
    }, positionError => {
        console.error(positionError);
    });
});
// darg-drop
let items = document.querySelectorAll('.puzle-pace');
for (let item of items) {
    item.addEventListener("dragstart", function(event) {
        //this.style.border = "5px dashed #D8D8FF";
        event.dataTransfer.setData("text", this.id);
    });

    item.addEventListener("dragend", function(event) {
        this.style.borderWidth = "0";
    });

}

let targets = document.querySelectorAll(".puzle-box");
for (let target of targets) {
    target.addEventListener("dragenter", function (event) {
        this.style.border = "2px solid #7FE9D9";
    });
    target.addEventListener("dragleave", function (event) {
        this.style.border = "1px solid #000";
    });
    target.addEventListener("dragover", function (event) {
        event.preventDefault();
    });
    target.addEventListener("drop", function (event) {
        let myElement = document.querySelector("#" + event.dataTransfer.getData('text'));
        this.appendChild(myElement)
        this.style.border = "none";
        checkAllMatches()
    }, false);
}

function checkAllMatches() {
    let targets = document.querySelectorAll(".puzle-box");

    for (let target of targets) {
        let targetNumber = target.getAttribute('data-target-number');
        let itemsInTarget = target.getElementsByClassName('puzle-pace');

        if (itemsInTarget.length === 1) {
            let itemNumber = itemsInTarget[0].getAttribute('data-target-number');
            if (itemNumber !== targetNumber) {
                console.log("Nie wszystkie itemy są w odpowiednich targetach.");
                return false;
            }
        } else {
            console.log("Brakuje itemu w jednym z targetów.");
            return false;
        }
    }

    console.log("Wszystkie itemy są w odpowiednich targetach.");
    return true;
}

