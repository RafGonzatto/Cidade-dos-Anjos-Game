const { app, BrowserWindow, screen } = require('electron');

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        icon: './jogo/css/imagens/icone.ico',
    });

    win.loadFile('index.html');

    return win;
}

module.exports = createWindow();