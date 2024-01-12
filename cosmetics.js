let paginaActual = 1;
const elementosPorPagina = 28;
const pagination = document.getElementById("pagination");
let skins = [];

async function getCosmetics() {
    const url = `https://fortnite-api.com/v2/cosmetics/br`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        skins = data.data;

        mostrarElementos(skins, paginaActual);

        // Calculate the total number of pages
        const totalPaginas = Math.ceil(skins.length / elementosPorPagina);

        // Call the function to create pagination links
        createPaginationLinks(totalPaginas);

    } catch (error) {
        console.error(error);
    }
}

function mostrarElementos(skins, pagina) {
    // Clear existing elements
    const skinsContainer = document.getElementById('skins');
    skinsContainer.innerHTML = "";

    // Calculate start and end indices for the current page
    const startIndex = (pagina - 1) * elementosPorPagina;
    const endIndex = startIndex + elementosPorPagina;

    // Display elements for the current page
    for (let i = startIndex; i < endIndex && i < skins.length; i++) {
        const skin = skins[i];
        const skinCard = document.createElement('div');
        skinCard.classList.add('skin-card');

        const skinName = document.createElement('h3');
        skinName.textContent = skin.name;

        const skinImage = document.createElement('img');
        skinImage.src = skin.images.smallIcon;
        skinImage.alt = skin.name;

        const skinDescription = document.createElement('p');
        skinDescription.textContent = skin.description;

        const skinType = document.createElement('p');
        skinType.textContent = `Type: ${skin.type.value}`;

        const skinRarity = document.createElement('p');
        skinRarity.textContent = `Rarity: ${skin.rarity.value}`;

        // Establecer el color de fondo según la rareza
        if (skin.rarity.value === 'legendary') {
            skinCard.style.backgroundColor = '#FFD700';
        } else if (skin.rarity.value === 'epic') {
            skinCard.style.backgroundColor = '#c300ff';
        } else if (skin.rarity.value === 'rare') {
            skinCard.style.backgroundColor = '#0040ff';
        } else if (skin.rarity.value === 'uncommon') {
            skinCard.style.backgroundColor = '#00FF00';
        } else if (skin.rarity.value === 'common') {
            skinCard.style.backgroundColor = '#000000';
        } else if (skin.rarity.value === 'marvel') {
            skinCard.style.backgroundColor = '#ff2436';
        } else if (skin.rarity.value === 'icon') {
            skinCard.style.backgroundColor = '#24f8ff';
        } else if (skin.rarity.value === 'starwars') {
            skinCard.style.backgroundColor = '#0502bf';
        } else if (skin.rarity.value === 'gaminglegends') {
            skinCard.style.backgroundColor = '#7a04ba';
        } else if (skin.rarity.value === 'dc') {
            skinCard.style.backgroundColor = '#043dba';
        }   else {
            skinCard.style.backgroundColor = '#FFFFFF';
        }

        // Agregar elementos al skinCard
        skinCard.appendChild(skinName);
        skinCard.appendChild(skinImage);
        skinCard.appendChild(skinDescription);
        skinCard.appendChild(skinType);
        skinCard.appendChild(skinRarity);

        // Agregar el skinCard al contenedor 'skins' en el DOM
        skinsContainer.appendChild(skinCard);
    }
}

function createPaginationLinks(totalPaginas) {
    pagination.innerHTML = "";

    // Limita la cantidad de números en la paginación a 10
    let inicio = Math.max(1, paginaActual - 4);
    let fin = Math.min(inicio + 9, totalPaginas);

    // Ajusta el inicio si es necesario
    inicio = Math.max(1, fin - 9);

    // Botón "Anterior"
    const prevButton = createPaginationButton("Anterior", function () {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarElementos(skins, paginaActual);
            createPaginationLinks(totalPaginas);
        }
    });
    pagination.appendChild(prevButton);

    for (let i = inicio; i <= fin; i++) {
        const enlace = createPaginationButton(i, function () {
            paginaActual = i;
            mostrarElementos(skins, paginaActual);
            createPaginationLinks(totalPaginas);
        });

        if (i === paginaActual) {
            enlace.classList.add("active");
        }

        pagination.appendChild(enlace);
    }

    // Botón "Siguiente"
    const nextButton = createPaginationButton("Siguiente", function () {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarElementos(skins, paginaActual);
            createPaginationLinks(totalPaginas);
        }
    });
    pagination.appendChild(nextButton);
}

function createPaginationButton(text, onClickHandler) {
    const button = document.createElement("a");
    button.href = "#";
    button.textContent = text;
    button.classList.add("prev-next");
    button.addEventListener("click", onClickHandler);
    return button;
}

// Función para crear un elemento 'select' con opciones de filtrado por tipo
function createFilterDropdown() {
    const filterDropdown = document.createElement("select");
    filterDropdown.classList.add("filter-dropdown");

    // Opciones de filtrado por tipo
    const tipos = ["backpack", "emote", "outfit", "pickaxe", "wrap"];

    // Agregar una opción "Todos" al inicio
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "Todos";
    filterDropdown.appendChild(allOption);

    // Agregar opciones de filtrado por tipo
    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1); // Capitalizar la primera letra
        filterDropdown.appendChild(option);
    });

    // Agregar evento de cambio para el filtrado
    filterDropdown.addEventListener("change", function () {
        const selectedType = filterDropdown.value;
        if (selectedType === "all") {
            // Mostrar todas las skins si se selecciona "Todos"
            mostrarElementos(skins, paginaActual);
        } else {
            // Filtrar y mostrar solo las skins del tipo seleccionado
            const filteredSkins = skins.filter(skin => skin.type.value === selectedType);
            mostrarElementos(filteredSkins, 1);
            // Recalcular la paginación para las skins filtradas
            createPaginationLinks(Math.ceil(filteredSkins.length / elementosPorPagina));
        }
    });

    // Agregar el elemento 'select' al contenedor deseado en el DOM
    const filterContainer = document.getElementById("filter-container");
    filterContainer.appendChild(filterDropdown);
}

// Llama a la función para crear el filtro por tipo
createFilterDropdown();

// Call the function to create initial pagination links
getCosmetics();
