import Observer from './Observer.js'; 
import { configurarEventosConstrucoes } from "../eventosTelaPrincipal/eventosConstrucoes.js";
import InicializacaoClasses from "../inicializacaoClasses.js";
import { carregarTodosUpgradesAtivadosTelaConquistas } from '../eventosTelaPrincipal/eventosConquistas.js';

class BotoesObserver extends Observer {
    updateAreaMeio(botao) {
        const areaConquistas = document.querySelector(".areaConquistas");
        const areaConfig = document.querySelector(".areaConfig");

        const hideElement = (element) => {
            element.style.display = "none";
        };

        const showConfigArea = () => {
            const resolutionSelect = document.getElementById('resolution-select');
            const resolutions = InicializacaoClasses.inicializarResolucoes();
            const addedResolutions = new Set();

            resolutions.forEach(resolution => {
                const key = `${resolution.width}x${resolution.height}`;
                if (!addedResolutions.has(key)) {
                    const option = document.createElement('option');
                    option.text = `${resolution.width}x${resolution.height}`;
                    option.value = JSON.stringify(resolution);
                    resolutionSelect.add(option);
                    addedResolutions.add(key);
                }
            });

            areaConfig.style.display = "block";
        };

        switch (botao) {
            case 'conquistas':
                hideElement(areaConfig);
                if (areaConquistas.style.display === "block") {
                    hideElement(areaConquistas);
                } else {
                    areaConquistas.style.display = "block";
                }
                break;
            case 'config':
                hideElement(areaConquistas);
                if (areaConfig.style.display === "block") {
                    hideElement(areaConfig);
                } else {
                    showConfigArea();
                }
                break;
            case 'voltar':
                hideElement(areaConfig);
                hideElement(areaConquistas);
                break;
        }
    }
}

export default BotoesObserver;
