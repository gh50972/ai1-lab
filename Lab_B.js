// dell
function obsluzPrzyciskUsun(div, key) {
    let deleteButton = div.querySelector(".del");

    if (deleteButton) {
        deleteButton.addEventListener("click", function () {
            // Usuń div po kliknięciu przycisku "Usuń"
            let divToRemove = this.parentNode;
            divToRemove.parentNode.removeChild(divToRemove);
            // Usuń dane z Local Storage, używając przekazanego klucza
            localStorage.removeItem(key);
        });
    }
}

// Odczytywanie Local Storage
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("container");

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("task_")) {
            let data = localStorage.getItem(key);
            dodajDivZLocalData(container, key, data);
        }
    }
});

// Zapisywanie Local Storage
function zapiszDoLocalStorage(key, data) {
    localStorage.setItem(key, data);
}

function dodajDivZLocalData(container, key, data) {
    let nowyDiv = document.createElement("div");
    nowyDiv.classList.add("lista");
    nowyDiv.innerHTML = data;
    nowyDiv.setAttribute("data-key", key);
    container.appendChild(nowyDiv);

    obsluzPrzyciskUsun(nowyDiv, key);

    obsluzEdycjeDiva(nowyDiv, key);
}

// edit
function obsluzEdycjeDiva(div, key) {
    let label = div.querySelector(".tekst");
    let poleTekstowe = div.querySelector(".poleTekstowe");
    let dayLabel = div.querySelector(".day");
    let dateInput = div.querySelector(".date");

    label.addEventListener("click", function () {
        label.style.display = "none";
        dayLabel.style.display = "none";
        poleTekstowe.style.display = "inline";
        dateInput.style.display = "inline";
        poleTekstowe.value = label.innerText;
        dateInput.value = dayLabel.innerText;
    });


    poleTekstowe.addEventListener("blur", function () {
        label.style.display = "inline";
        dayLabel.style.display = "inline";
        dayLabel.innerText = dateInput.value;
        label.innerText = poleTekstowe.value;
        poleTekstowe.style.display = "none";
        dateInput.style.display = "none";


        zapiszDoLocalStorage(key, div.innerHTML);
    });
}

// new div
function utworzNowy() {
    let newTextInput = document.getElementById("newtext");
    let newDayInput = document.getElementById("newday");

    let tekst = newTextInput.value;
    let data = newDayInput.value;

    if (tekst.length >= 3 && new Date(data) >= new Date()) {
        let container = document.getElementById("container");
        let nowyDiv = document.createElement("div");
        nowyDiv.classList.add("lista");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "chek" + (container.childElementCount + 1);

        let label = document.createElement("label");
        label.htmlFor = "chek" + (container.childElementCount + 1);
        label.classList.add("tekst");
        label.textContent = newTextInput.value;

        let poleTekstowe = document.createElement("input");
        poleTekstowe.type = "text";
        poleTekstowe.classList.add("poleTekstowe");

        let dayLabel = document.createElement("label");
        dayLabel.classList.add("day");
        dayLabel.textContent = newDayInput.value;

        let dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.classList.add("date");

        let deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.classList.add("del");
        deleteButton.value = "X";

        let key = "task_" + Date.now();

        nowyDiv.appendChild(checkbox);
        nowyDiv.appendChild(label);
        nowyDiv.appendChild(poleTekstowe);
        nowyDiv.appendChild(dayLabel);
        nowyDiv.appendChild(dateInput);
        nowyDiv.appendChild(deleteButton);
        nowyDiv.appendChild(document.createElement("br"));


        zapiszDoLocalStorage(key, nowyDiv.innerHTML);
        container.appendChild(nowyDiv);
        newTextInput.value = "";
        newDayInput.value = "";
        obsluzPrzyciskUsun(nowyDiv, key);
        obsluzEdycjeDiva(nowyDiv, key);
    }
}

// filtr
function filtruj() {
    let frag = document.getElementById("filtruj").value.toLowerCase();
    let cont = document.getElementById("container");
    let lista = cont.getElementsByClassName("lista");

    for (let i = 0; i < lista.length; i++) {
        let tekst = lista[i].querySelector(".tekst");
        let lowtekst = tekst.innerText.toLowerCase();

        if (frag === "") {
            lista[i].style.display = "block";
            tekst.innerHTML = lowtekst;
        } else if (lowtekst.includes(frag) && frag.length >= 2) {
            lista[i].style.display = "block";
            const highlightedText = lowtekst.replace(new RegExp(frag, 'gi'), match => `<span class="highlight">${match}</span>`);
            tekst.innerHTML = highlightedText;
        } else {
            lista[i].style.display = "none";
        }
    }
}