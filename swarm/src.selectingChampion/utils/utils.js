export function configureGoBackButton() {
    const goBackbutton = document.querySelector(".goBackButton");
    goBackbutton.style.left = "0px";
    goBackbutton.addEventListener("click", (event) => {
      window.history.back();
    });
  }