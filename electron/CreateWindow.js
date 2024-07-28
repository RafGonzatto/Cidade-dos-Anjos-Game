const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        icon: './game/static/images/icone.ico',
        webPreferences: {
            preload:  path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: false,
       }
    });

    win.loadFile('index.html');

    return win;
}

module.exports = createWindow();