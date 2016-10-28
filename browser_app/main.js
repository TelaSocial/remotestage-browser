const {app, BrowserWindow} = require('electron');
const config               = require('../config_browser.js');

const windowWidth  = parseInt(config.width*config.window_scale);
const windowHeight = parseInt(config.height*config.window_scale);

let win;

app.on('ready', () => {

  // kiosk : true, 
  //    alwaysOnTop : true,

  win = new BrowserWindow({
      height : windowHeight,
      width  : windowWidth,
      frame  : config.frame
  });

  win.loadURL('file://' + __dirname + '/../browser/browser.html');

  var config_layout = require('../'+config.layout);

  win.webContents.on('did-finish-load', () => {
    console.log('Started..', process.argv[2] );

    if(process.argv[2] == 'render') {

      let windowConfig = {
          page   : config.background_page,
          width  : config.width,
          height : config.height,
          scale  : config.window_scale
      }

      win.webContents.send('background_page', JSON.stringify(windowConfig) );

    } else {

        win.webContents.send('layout', config_layout.html );

        if(config.window_scale != 1) {
          let windowConfig = { width: config.width, height:config.height, scale: config.window_scale}
          win.webContents.send('scale', JSON.stringify(windowConfig) );
        }

        for(k in config_layout.components) {
           console.log('Sending ' + JSON.stringify(config_layout.components[k]));
           win.webContents.send('component_send', JSON.stringify(config_layout.components[k]) );
        }
    }


  });

});
