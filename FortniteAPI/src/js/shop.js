const api_url = "https://fortnite-api.com/v2/shop/br";

const backgroundColors = {
    'legendary': '#FFD700',
    'epic': '#c300ff',
    'rare': '#0040ff',
    'uncommon': '#00FF00',
    'common': '#000000',
    'marvel': '#ff2436',
    'icon': '#24f8ff',
    'starwars': '#0502bf',
    'gaminglegends': '#7a04ba',
    'dc': '#043dba'
};

function mostrarElementos(itemsTienda) {
    const tiendaContainer = document.getElementById("tienda");
    tiendaContainer.innerHTML = "";

    if (Array.isArray(itemsTienda)) {
        itemsTienda.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            const itemName = document.createElement("h3");
            itemName.textContent = item.nombre;

            const itemImage = document.createElement("img");
            itemImage.src = item.imagen;
            itemImage.alt = item.nombre;

            const itemType = document.createElement("p");
            itemType.textContent = `Type: ${item.tipo}`;

            const itemRarity = document.createElement("p");
            itemRarity.textContent = `Rarity: ${item.rareza}`;

            const itemPrice = document.createElement("p");
            itemPrice.textContent = `Price: ${item.precio || 'N/A'} vBucks`; // Mostrar 'N/A' si el precio no está disponible

            // Establecer el color de fondo según la rareza
            setCardBackgroundColor(itemCard, item.rareza);

            // Agregar elementos al itemCard
            itemCard.appendChild(itemName);
            itemCard.appendChild(itemImage);
            itemCard.appendChild(itemType);
            itemCard.appendChild(itemRarity);
            itemCard.appendChild(itemPrice);

            // Agregar el itemCard al contenedor 'tienda' en el DOM
            tiendaContainer.appendChild(itemCard);
        });
    }
}

// Función para establecer el color de fondo según la rareza
function setCardBackgroundColor(cardElement, rarity) {
    const rarityLowerCase = rarity ? rarity.toLowerCase() : ''; // Verificación de nulidad
    const backgroundColor = backgroundColors[rarityLowerCase] || '#FFFFFF'; // Fallback a blanco si no se encuentra la rareza
    cardElement.style.backgroundColor = backgroundColor;
}

async function obtenerCartas() {
    try {
        const response = await fetch(api_url);
        const data = await response.json();

        const cartas = data.data.featured.entries;

        return cartas.map(carta => ({
            nombre: carta.items[0].name,
            imagen: carta.items[0].images.smallIcon,
            rareza: carta.items[0].rarity.value,
            tipo: carta.items[0].type.displayValue,
            precio: carta.finalPrice || 'N/A' // Mostrar 'N/A' si el precio no está disponible
        }));
    } catch (error) {
        console.error("Error al obtener datos de la API", error);
        return [];
    }
}

// Llamar a la función para obtener y mostrar las cartas
obtenerCartas().then(items => mostrarElementos(items));
