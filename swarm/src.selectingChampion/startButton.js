
export const playButton = document.querySelector(".playButton");
import { selectedChampion } from "./selectingChampionController.js";

export function configurePlayButton() {
    addClickListener();
}
function addClickListener() {
    playButton.addEventListener("click", () => {
        localStorage.setItem("selectedChampion", selectedChampion);
        window.location.href = "../src.swarm/swarm.html"
    });
}