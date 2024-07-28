import { seller1, seller2, sellerSelling } from "./utils/constants.js";

const seller = document.querySelector(".seller");
const upgradeButton = document.querySelector(".upgradeButton");
const trophyButton = document.querySelector(".trophyButton");
let isSeller1 = true;
let mouseOverSeller = false;
let intervalId; 

export function configureSeller() {
  intervalId = setInterval(() => {
    toggleSellerImage();
  }, 500);
   configureSellerImages()
   configureTrophyButton()
   configureUpgradeButton();
}


function configureUpgradeButton() {
  upgradeButton.addEventListener("mouseenter", () => {
    mouseEnterSeller();
  })
}
function configureTrophyButton() {
  trophyButton.addEventListener("mouseenter", () => {
    mouseEnterSeller();
  });
  upgradeButton.addEventListener("click", () => {
  });
}

function configureSellerImages() {
  toggleSellerImage();
  seller.addEventListener("mouseenter", () => {
    mouseEnterSeller();
  });
  seller.addEventListener("mouseleave", () => {
    mouseOverSeller = false;
    intervalId = setInterval(() => {
      toggleSellerImage();
    }, 500);
    seller.style.backgroundImage = `url(${isSeller1 ? seller1 : seller2})`;
  });
}

function mouseEnterSeller() {
  clearInterval(intervalId);
  mouseOverSeller = true;
  seller.style.backgroundImage = `url(${sellerSelling.src})`;
}

function toggleSellerImage() {
  seller.style.backgroundImage = `url(${isSeller1 ? seller1.src : seller2.src})`;
  isSeller1 = !isSeller1;
}