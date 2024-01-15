let container = document.querySelector(".containerPlaylist");
let contenedor = document.createElement("div");
let titulo = document.createElement("h1");
titulo.classList.add("text-center", "text-decoration-underline", "text-white");
titulo.innerHTML = "Fortnite PlayLists";
container.appendChild(titulo);
container.classList.add("containerPlaylist", "d-flex", "flex-wrap", "justify-content-center", "align-items-center", "p-3", "h-100", "w-100");
container.appendChild(contenedor);

let url = "https://fortnite-api.com/v1/playlists";

async function mostrarPlaylist() {
    const response = await fetch(url);
    const data = await response.json();
    const playlist = data.data;
    console.log(playlist);

    contenedor.innerHTML = "";

    
    contenedor.classList.add("d-flex", "flex-wrap", "justify-content-center", "align-items-center", "p-3", "w-100");
   

    // Utilizamos un conjunto para almacenar las playlists únicas
    let playlistsSet = new Set();

    for (let i = 0; i < playlist.length; i++) {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        let maxPlayer = document.createElement("p");
        let minPlayer = document.createElement("p");
        let divPlayerContent = document.createElement("div");
        let id = document.createElement("h6");
        

        h3.innerHTML = playlist[i].name;
        p.innerHTML = playlist[i].description;
        maxPlayer.innerHTML = "Max Players: " + playlist[i].maxPlayers;
        minPlayer.innerHTML = "Min Players: " + playlist[i].minPlayers;
        id.innerHTML = "#" + playlist[i].id;


        // Comprobamos si la playlist ya está en el conjunto antes de agregarla al DOM
        if (!playlistsSet.has(playlist[i].name)) {
            playlistsSet.add(playlist[i].name);

            div.classList.add("playlist","col-3", "p-5", "m-3", "text-center", "bg-white", "text-black", "rounded-3", "d-flex", "justify-content-center", "align-items-center", "shadow", "flex-column");
            h3.classList.add("text-center",  "text-black","rounded-3");
            p.classList.add("text-center",  "text-secondary", "rounded-3", "w-100", "overflow-auto", "p-3");

            maxPlayer.classList.add("text-center", "text-danger", "rounded-3");
            minPlayer.classList.add("text-center",  "text-success", "mx-3",  "rounded-3");

            divPlayerContent.classList.add("d-flex", "justify-content-around", "align-items-center", "w-100");

            id.classList.add("text-center", "text-black", "overflow-x-auto", "p-4", "w-100", "overflow-y-hidden");

            
            
            divPlayerContent.appendChild(minPlayer);
            divPlayerContent.appendChild(maxPlayer);
            

            div.appendChild(h3);
            div.appendChild(p);
            div.appendChild(divPlayerContent);
            div.appendChild(id);
            contenedor.appendChild(div);

        }
    }
}

mostrarPlaylist();
