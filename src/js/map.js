let API = "https://fortnite-api.com/v1/map";
let APIKey = "27e7cbc4-05e3-4e65-90a3-af534dab3ead"

let info = document.querySelector(".info");




fetch(API, {
    method: "GET",
    headers: {
        "X-Auth-Token": APIKey
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);


        let poi = data.data.pois;
        console.log(poi);

        // Filtrar los poi que están en mayúsculas
        let poiEnMayusculas = poi.filter(item => item.name && item.name === item.name.toUpperCase());

        console.log("Localizaciones en mayúsculas:", poiEnMayusculas);

        table = document.createElement("table");
        table.classList.add("table");
        table.classList.add("table-dark");
        table.classList.add("table-striped");
        table.classList.add("table-hover");
        table.classList.add("table-bordered");
        table.classList.add("table-sm");
        table.classList.add("mt-5");
        table.classList.add("mb-5");
        tableHead = document.createElement("thead");
        tableRow = document.createElement("tr");
        tableHead.appendChild(tableRow);
        tableData = document.createElement("th");
        tableData.innerText = "Name";
        tableRow.appendChild(tableData);
        tableData = document.createElement("th");
        tableData.innerText = "Location";
        tableRow.appendChild(tableData);
        tableData = document.createElement("th");
        tableData.innerText = "Description";
        tableRow.appendChild(tableData);
        tableData = document.createElement("th");
        tableData.innerText = "Imagen";
        tableRow.appendChild(tableData);
        table.appendChild(tableHead);
        tableBody = document.createElement("tbody");
        table.appendChild(tableBody);
        info.appendChild(table);

        let lector = new FileReader();


        for (let i = 0; i < poiEnMayusculas.length; i++) {
            let filePath = `/src/txt/${poiEnMayusculas[i].name}.txt`;



            console.log(lector.result);
            let tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);
            let tableData = document.createElement("td");
            tableData.innerText = poiEnMayusculas[i].name;
            tableRow.appendChild(tableData);
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            tableData.innerText = `x:  ${poiEnMayusculas[i].location.x}  y:  ${poiEnMayusculas[i].location.y}`;
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");
            fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                // Now, create a FileReader and read the content as text
                let reader = new FileReader();
                reader.onload = function (e) {
                    // e.target.result contains the text content of the file
                    const text = e.target.result;
                    console.log(text);
                    tableData.innerText = text;
                    tableData.style.maxHeight = "500px";
                    tableData.style.maxWidth = "500px";
                    tableData.style.minWidth = "200px";
                    tableData.style.width = "auto";
                    tableData.style.letterSpacing = "1px";
                    tableData.style.wordSpacing = "2px";
                    tableData.style.textAlign = "justify";
                    tableData.style.textJustify = "inter-word";
                    tableData.style.overflow = "auto";
                    tableData.style.padding = "10px";
                    tableData.style.fontFamily = "Arial Black";
                    tableRow.appendChild(tableData);
                    
                };
                reader.readAsText(blob);
            })
            .catch(error => {
                console.error('Error fetching or reading the file:', error);
            });
            
            tableData = document.createElement("td");
            let imagen = document.createElement("img");
            imagen.src = "/src/img/" + poiEnMayusculas[i].name + ".webp";
            imagen.classList.add("img-fluid");
            imagen.classList.add("img-thumbnail");
            imagen.width = 200;
            tableData.appendChild(imagen);
            tableRow.appendChild(tableData);
            tableData = document.createElement("td");

        }



    })
    .catch(error => console.log(error));




