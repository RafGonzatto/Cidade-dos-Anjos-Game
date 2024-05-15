const {Tray} = require('electron');
const {resolve} = require('path');

const iconPath = resolve(__dirname, '../','jogo','css','imagens','icone-rosto.png');

function createTray(){
    const tray = new Tray(iconPath);
    tray.setToolTip('Cidade dos Anjos');
    
    return tray;
}

module.exports = createTray();