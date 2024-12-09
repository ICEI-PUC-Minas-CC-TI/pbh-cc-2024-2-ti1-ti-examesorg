async function carregarAcessibilidade() {
    const response = await fetch('acessibilidade.json');
    acessibilidadeData = await response.json();
}

function aplicarAcessibilidade() {
    const body = document.body;


    if (acessibilidadeData.contrasteAlto) {
        body.style.backgroundColor = '#000';
        body.style.color = '#000';
    } else {
        body.style.backgroundColor = '';
        body.style.color = '';
    }

    // Alterar tamanho da fonte
    if (acessibilidadeData.aumentoDeFonte) {
        body.style.fontSize = '1.5em';
    } else {
        body.style.fontSize = '';
    }
}

function toggleAccessibility() {
    acessibilidadeData.contrasteAlto = !acessibilidadeData.contrasteAlto;
    acessibilidadeData.aumentoDeFonte = !acessibilidadeData.aumentoDeFonte;
    aplicarAcessibilidade();
}

window.onload = () => {
    carregarAcessibilidade();
};



mapboxgl.accessToken = 'pk.eyJ1IjoiaXphZ2FsYXJ6YTIzIiwiYSI6ImNtM3Z2ZGQyNzEyaXgyam9qbWFvNWswenMifQ.MmJwGIDdXisAVlT1HdDzzw';

// Função para inicializar o mapa
function initializeMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 13
    });

    // Função para exibir a localização do usuário
    navigator.geolocation.getCurrentPosition(
        position => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            
            // Centraliza no usuário
            map.setCenter(userLocation);

            // Adiciona um marcador vermelho para a localização do usuário
            new mapboxgl.Marker({ color: 'red' })
                .setLngLat(userLocation)
                .setPopup(new mapboxgl.Popup().setHTML("<h3>Você está aqui!</h3>"))
                .addTo(map);

            // Busca clínicas próximas
            fetchNearbyClinics(userLocation, map);
        },
        () => {
            alert('Não foi possível obter sua localização.');
        },
        { enableHighAccuracy: true }
    );

    // Adiciona controles de zoom e rotação
    map.addControl(new mapboxgl.NavigationControl());
}

// Função para buscar clínicas próximas com "ocupacional" ou "trabalho" no nome
async function fetchNearbyClinics(location, map) {
    const [lng, lat] = location;

    // Query para buscar clínicas genéricas
    const query = `https://api.mapbox.com/geocoding/v5/mapbox.places/ocupacional.json?proximity=${lng},${lat}&limit=50&access_token=${mapboxgl.accessToken}`;

    try {
        const response = await fetch(query);
        const data = await response.json();

        // Filtra e adiciona clínicas com "ocupacional" ou "trabalho" no nome
        data.features.forEach(feature => {
            const { geometry, text, place_name } = feature;

            // Verifica se o nome da clínica contém "ocupacional" ou "trabalho" no texto ou no nome do local
            if (
                (text.toLowerCase().includes("ocupacional") || text.toLowerCase().includes("trabalho")) ||
                (place_name.toLowerCase().includes("ocupacional") || place_name.toLowerCase().includes("trabalho"))
            ) {
                // Adiciona o marcador azul para a clínica
                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat(geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup().setHTML(
                            `<h3>${text}</h3><p>${place_name}</p>`
                        )
                    )
                    .addTo(map);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar clínicas:', error);
    }
}

// Inicializa o mapa com a posição padrão
const defaultLocation = [-46.6333, -23.5505]; // São Paulo, Brasil
initializeMap(defaultLocation);
