const API = "https://fortnite-api.com/v2/stats/br/v2/?name=";
const apiKey = '27e7cbc4-05e3-4e65-90a3-af534dab3ead';

const searchButton = document.getElementById('searchButton');
const playerStatsContainerElement = document.getElementById('playerStatsContainer');
const playerNameInput = document.getElementById('playerInput');

const playerNameElement = document.getElementById('playerName');
const playerLevelElement = document.getElementById('playerLevel');

const summaryWinsElement = document.getElementById('summaryWins');
const summaryWinRateElement = document.getElementById('summaryWinRate');
const summaryKillsElement = document.getElementById('summaryKills');
const summaryKDElement = document.getElementById('summaryKD');

const soloWinsElement = document.getElementById('soloWins');
const soloWinRateElement = document.getElementById('soloWinRate');
const soloKillsElement = document.getElementById('soloKills');
const soloKDElement = document.getElementById('soloKD');

const duoWinsElement = document.getElementById('duoWins');
const duoWinRateElement = document.getElementById('duoWinRate');
const duoKillsElement = document.getElementById('duoKills');
const duoKDElement = document.getElementById('duoKD');

const squadWinsElement = document.getElementById('squadWins');
const squadWinRateElement = document.getElementById('squadWinRate');
const squadKillsElement = document.getElementById('squadKills');
const squadKDElement = document.getElementById('squadKD');


searchButton.addEventListener('click', function () {
    const playerName = playerNameInput.value.trim();

    if (playerName !== '') {
        getFortnitePlayerStats(playerName, apiKey);
        playerStatsContainerElement.classList.remove('hidden');
    } else {
        console.error('Ingresa un nombre de jugador válido');
    }
});

playerNameInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchButton.click(); 
    }
});

async function getFortnitePlayerStats(playerName, apiKey) {
    try {
        const response = await fetch(`${API}${playerName}`, {
            headers: {
                'Authorization': apiKey,
            },
        });

        if (response.ok) {
            const data = await response.json();
            displayPlayerStats(data);
        } else {
            throw new Error(`Error de red: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
}

function displayPlayerStats(data) {
    console.log(data);
    playerNameElement.textContent = `${data.data.account.name}`;
    playerLevelElement.textContent = `${data.data.battlePass.level}`;

    summaryWinsElement.textContent = `${data.data.stats.all.overall.wins}`;
    summaryWinRateElement.textContent = `${data.data.stats.all.overall.winRate}`;
    summaryKillsElement.textContent = `${data.data.stats.all.overall.kills}`;
    summaryKDElement.textContent = `${data.data.stats.all.overall.kd}`;

    soloWinsElement.textContent = `${data.data.stats.all.solo.wins}`;
    soloWinRateElement.textContent = `${data.data.stats.all.solo.winRate}`;
    soloKillsElement.textContent = `${data.data.stats.all.solo.kills}`;
    soloKDElement.textContent = `${data.data.stats.all.solo.kd}`;

    duoWinsElement.textContent = `${data.data.stats.all.duo.wins}`;
    duoWinRateElement.textContent = `${data.data.stats.all.duo.winRate}`;
    duoKillsElement.textContent = `${data.data.stats.all.duo.kills}`;
    duoKDElement.textContent = `${data.data.stats.all.duo.kd}`;
    
    squadWinsElement.textContent = `${data.data.stats.all.squad.wins}`;
    squadWinRateElement.textContent = `${data.data.stats.all.squad.winRate}`;
    squadKillsElement.textContent = `${data.data.stats.all.squad.kills}`;
    squadKDElement.textContent = `${data.data.stats.all.squad.kd}`;
}

getFortnitePlayerStats(playerName, apiKey);
