const {ipcRenderer} = require('electron');

ipcRenderer.on('page', (event, message) => {

 var view = document.createElement('webview');
 view.setAttribute('style','width:100%, height:100%;background:red');
 view.setAttribute('id','webview1');
 document.body.appendChild(view);


 var loadstop = () => { 

alert(1);
    document.getElementById('message-1').innerHTML='TelaSocial:/monitor/browser/webview';
 } 

 view.addEventListener('did-stop-loading', loadstop);

 view.setAttribute('src',message);

})

