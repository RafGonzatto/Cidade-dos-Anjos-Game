import InicializacaoClasses from "../inicializacaoClasses.js";

const imagensPorcoGrande = InicializacaoClasses.imagensVendedorPorcoGrande().map(url => {
  const img = new Image();
  img.src = url;
  return img;
});

const imagensPig = InicializacaoClasses.imagensVendedorPig().map(url => {
  const img = new Image();
  img.src = url;
  return img;
});

let indiceImagemPorcoGrande = 0;
let indiceImagemPig = 0;
let idaVolta = 1

 function trocarImagemPorcoGrande(porcoGrande) {
  indiceImagemPorcoGrande = (indiceImagemPorcoGrande + 1) % imagensPorcoGrande.length;
  porcoGrande.style.backgroundImage = `url(${imagensPorcoGrande[indiceImagemPorcoGrande].src})`;
}

function trocarImagemPig(pig) {
  if((indiceImagemPig+1) === 5){
    idaVolta = -1
  }
  indiceImagemPig = (indiceImagemPig + idaVolta ) % imagensPig.length;
  pig.style.backgroundImage = `url(${imagensPig[indiceImagemPig].src})`;
  if((indiceImagemPig) === 0){
    idaVolta = 1
  }
  }

export function configurarMovimentacaoVendedores() {
    const porcoGrande = document.querySelector(".vendedoresPorcoGrande");
    const pig = document.querySelector(".vendedoresPig");
  
    let intervaloPorcoGrande = 110;
  
    function atualizarIntervaloPorcoGrande() {
      clearInterval(intervaloPorcoGrandeId);
      intervaloPorcoGrande = imagensPorcoGrande[indiceImagemPorcoGrande].src.includes('../static/images/vendedores/porco-1.png') ? 1000 : 110;
      intervaloPorcoGrandeId = setInterval(() => {
        trocarImagemPorcoGrande(porcoGrande);
        atualizarIntervaloPorcoGrande();
      }, intervaloPorcoGrande);
    }
  
    let intervaloPorcoGrandeId = setInterval(() => {
      trocarImagemPorcoGrande(porcoGrande);
      atualizarIntervaloPorcoGrande();
    }, intervaloPorcoGrande);
  
    setInterval(() => {
      trocarImagemPig(pig);
    }, 110);
  }

