const { app, ipcMain } = require('electron');
let win;

app.whenReady().then(() => {
    win = require('./CreateWindow.js');
    const tray = require('./Tray.js');

    config(win);

    
});

ipcMain.on('alterar-tamanho-da-janela', (event, { width, height }) => {
  if (win) {
      win.setSize(width, height);
  }
});

ipcMain.on('setar-tela-cheia', (event, { checkBoxResult }) => {
  if (win) {
      win.setFullScreen(checkBoxResult);
  }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


