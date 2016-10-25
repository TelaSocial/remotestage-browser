const {ipcRenderer} = require('electron');

ipcRenderer.on('page', (event, message) => {
 var webview = document.getElementById('webview');
 webview.setAttribute('src',message);
 var loadstop = () => { 
    document.getElementById('message').innerHTML='success';
 } 
 webview.addEventListener('did-stop-loading', loadstop);


})

