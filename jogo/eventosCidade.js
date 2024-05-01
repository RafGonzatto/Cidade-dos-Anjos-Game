export function configurarCidade() {
  const regiao = document.querySelector(".regiao");
  const cidade = document.querySelector(".cidade");
  const predioGangues = document.querySelector(".predio-gangues");
  const predioPolicia = document.querySelector(".predio-policia");
  const predioIgreja = document.querySelector(".predio-igreja");
  let isMouseDown = false;
  let startX, startY, startTranslateX, startTranslateY;

  regiao.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
    startTranslateX =
      parseFloat(
        getComputedStyle(cidade).getPropertyValue("transform").split(",")[4]
      ) || 0;
    startTranslateY =
      parseFloat(
        getComputedStyle(cidade).getPropertyValue("transform").split(",")[5]
      ) || 0;

    // Evita a seleção de texto ao arrastar
    event.preventDefault();
  });

  regiao.addEventListener("mousemove", (event) => {
    if (!isMouseDown) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    cidade.style.transform = `translate(${startTranslateX + deltaX}px, ${
      startTranslateY + deltaY
    }px)`;
    predioGangues.style.transform = `translate(${startTranslateX + deltaX}px, ${
      startTranslateY + deltaY
    }px)`;
    predioPolicia.style.transform = `translate(${startTranslateX + deltaX}px, ${
      startTranslateY + deltaY
    }px)`;
    predioIgreja.style.transform = `translate(${startTranslateX + deltaX}px, ${
      startTranslateY + deltaY
    }px)`;
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });
}
export function configurarPredios(elemento) {
  elemento.addEventListener("mouseenter", () => {
   //Implementar
  });

  elemento.addEventListener("mouseleave", () => {
   //Implementar
  });

  const modal = document.getElementById("modal-predio");
  elemento.addEventListener("click", () => {
    modal.style.display = "block";
  });
  const fecharModal = document.querySelector(".fechar-modal");
  fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
