const {app, BrowserWindow} = require('electron');
const config               = require('../config_browser.js');

const windowWidth  = parseInt(config.width*config.window_scale);
const windowHeight = parseInt(config.height*config.window_scale);

let win;

app.on('ready', () => {


  win = new BrowserWindow({
      height : windowHeight,
      width  : windowWidth,
      frame  : config.frame
  });

  win.loadURL('file://' + __dirname + '/../browser/browser.html');

  var config_layout = require('../'+config.layout);

  win.webContents.on('did-finish-load', () => {
    console.log('Started..');

    win.webContents.send('layout', config_layout.html );
    if(config.window_scale != 1) {
      let windowConfig = { width: config.width, height:config.height, scale: config.window_scale}
      win.webContents.send('scale', JSON.stringify(windowConfig) );
    }

    for(k in config_layout.components) {
       console.log('Sending ' + JSON.stringify(config_layout.components[k]));
       win.webContents.send('component_send', JSON.stringify(config_layout.components[k]) );
    }

  });

});
