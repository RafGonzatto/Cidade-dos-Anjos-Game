
export const playButton = document.querySelector(".playButton");
import { selectedChampion } from "./selectChampionTab.js";

export function configurePlayButton() {
    addClickListener();
}
function addClickListener() {
    playButton.addEventListener("click", () => {
        localStorage.setItem("selectedChampion","0");
        window.location.href = "../src.swarm/swarm.html"
    });
}