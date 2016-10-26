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

  var config_layout = require('./'+config.layout);

  win.webContents.on('did-finish-load', () => {
    console.log('Started..');

    win.webContents.send('layout', config_layout.html );

    for(k in config_layout.components) { 
       console.log('Sending ' + JSON.stringify(config_layout.components[k]));
       win.webContents.send('component_send', JSON.stringify(config_layout.components[k]) );

    } 
  });

});



