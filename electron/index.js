const { app, BrowserWindow, screen } = require('electron');


app.whenReady().then(() => {
    const win = require('./CreateWindow.js');
    const tray = require('./Tray.js');
  
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
