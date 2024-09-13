import { playButton} from "./startButton.js";
const selectingChampionTab = document.querySelector(".selectChampionTab");
const selectingChampionScreen = document.querySelector('.selectingChampionScreen');
const selectingChampionScreenImage = document.querySelector('.selectingChampionScreenImage');
const selectChampionTabIcon = document.querySelector('.selectChampionTabIcon');
const closeButton = document.querySelector(".closeButton");
export let selectedChampion = 1;

export function configureSelectChampionTab() {
    toggleSelectiongScreen();
    addClickListener();
    renderChampionIcons();
   // addCloseButtonListener();   
}

function addClickListener() {
    selectingChampionTab.addEventListener("click", () => {
        disablePlayButton();
        toggleSelectiongScreen();
    });
}
function toggleSelectiongScreen(){
    selectingChampionScreenImage.classList.toggle("disabled");
}
// function addCloseButtonListener() {
//     closeButton.addEventListener("click", () => {
//         disablePlayButton();
//         toggleSelectiongScreen();
//     });
// }
function renderChampionIcons() {
    selectingChampionScreen.style.maxHeight = '25.2vw'; // Define a altura máxima do contêiner
    selectingChampionScreen.style.overflowY = 'auto'; // Adiciona barra de rolagem vertical
    selectingChampionScreen.style.overflowX = 'hidden'; // Desativa barra de rolagem horizontal, se necessário

    const championData = getChampionData();
    const columns = 3; 
    const rows = Math.ceil(championData.length / columns);

    for (let i = 0; i < rows; i++) {
        const row = createIconRow(championData, i, columns);
        selectingChampionScreen.appendChild(row);
    }
}

function getChampionData() {
    return [
        { src: '../images/champions/raf/player-raf-icon.png' }, //RAF 0
        { src: '../images/champions/marombasmatic/player-marombasmatic-icon.png' }, //MAROMBASMATIC 1
    ];
}

function createIconRow(championData, rowIndex, columns) {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.display = 'flex'; 
    row.style.marginTop = `1vw`; 
    row.style.marginBottom = `-2vw`; 
    row.style.gap = `2vw`; 

    for (let j = 0; j < columns; j++) {
        const index = rowIndex * columns + j;
        if (index >= championData.length) break; 

        const iconContainer = createIconContainer(championData[index], index);
        row.appendChild(iconContainer);
    }

    return row;
}

function createIconContainer(champion, index) {
    const container = document.createElement('div');
    container.className = 'championIconContainer';
    container.style.width = `6vw`;
    container.style.height = `6vw`;

    const icon = document.createElement('div');
    icon.id = index;
    icon.className = 'championIcon';
    icon.style.width = `4.3vw`;
    icon.style.height = `4.2vw`;
    icon.style.borderRadius = `0.15vw`;
    icon.style.backgroundImage = `url(${champion.src})`;

    icon.addEventListener('click', () => selectChampion(index, champion.src))
   
    container.appendChild(icon);
    return container;
}

function selectChampion(index, src) {
    selectChampionTabIcon.style.backgroundImage = `url(${src})`;
    selectedChampion = index
    disablePlayButton();
    toggleSelectiongScreen();
}

function disablePlayButton() {
    playButton.classList.toggle("disabled");
}