
export function configurarPredios(elemento) {
    elemento.addEventListener("mouseenter", () => {
      elemento.style.opacity = "1";
    });
  
    elemento.addEventListener("mouseleave", () => {
      elemento.style.opacity = "0";
    });
  
    const modal = document.getElementById("modal-predio");
    const abas = document.querySelectorAll(".aba");
    const conteudosAbas = document.querySelectorAll(".conteudo-aba");
  
    function exibirConteudoAba(alvo) {
      conteudosAbas.forEach(conteudo => {
        if (conteudo.id === alvo) {
          conteudo.classList.add("ativo");
        } else {
          conteudo.classList.remove("ativo");
        }
      });
    }
  
    abas.forEach(aba => {
      aba.addEventListener("click", () => { 
        abas.forEach(aba => {
          aba.classList.remove("ativa");
        });
        aba.classList.add("ativa");
        const alvo = aba.getAttribute("data-alvo");
        exibirConteudoAba(alvo);
      });
    });
  
    elemento.addEventListener("click", (elemento) => {
      let target = elemento.currentTarget;
      let imagem = document.querySelector('.imagem-predio');
      if (target.classList.contains('predio-policia')) {
        imagem.style.backgroundImage = 'url(jogo/css/imagens/predio-capitao.png'
      }
      if (target.classList.contains('predio-igreja')) {
        imagem.style.backgroundImage = 'url(jogo/css/imagens/predio-arquebispo.png'
      } 
      if (target.classList.contains('predio-gangues')) {
        imagem.style.backgroundImage = 'url(jogo/css/imagens/predio-gangster.png'
      }
     
      modal.style.display = "block";
    });
    const fecharModal = document.querySelector(".fechar-modal");
    fecharModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  