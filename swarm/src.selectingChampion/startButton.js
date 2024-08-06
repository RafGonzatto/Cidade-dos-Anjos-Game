
export const playButton = document.querySelector(".playButton");
import { selectedChampion } from "./selectChampionTab.js";

export function configurePlayButton() {
    addClickListener();
}
function addClickListener() {
    playButton.addEventListener("click", () => {
        if (!selectedChampion){
            selectedChampion = 1;
        }
        localStorage.setItem("selectedChampion", selectedChampion);
        window.location.href = "../src.swarm/swarm.html"
    });
}