const {Tray} = require('electron');
const {resolve} = require('path');

const iconPath = resolve(__dirname, '../','game','static','images','icone-rosto.png');

function createTray(){
    const tray = new Tray(iconPath);
    tray.setToolTip('Cidade dos Anjos');
    
    return tray;
}

module.exports = createTray();