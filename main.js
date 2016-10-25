const {app, BrowserWindow} = require('electron');
const config               = require('./config_browser.js');

let win;

app.on('ready', () => {

  win = new BrowserWindow({
      height: config.height,
      width: config.width,
      frame: config.frame
  });

  win.loadURL('file://' + __dirname + '/browser.html');

  win.webContents.on('did-finish-load', () => {
    console.log('Started..');
    win.webContents.send('page', config.page );
  })

});



