const {ipcRenderer} = require('electron');


ipcRenderer.on('component_send', (event, message) => {
  var arg = JSON.parse(message);
  componentSend(arg.key, arg.value);
}); 

ipcRenderer.on('layout', (event, message) => {
  document.getElementById('canvas0').innerHTML=message;
  status('layout','TelaSocial:/remotestage/browser/layout');
});

function componentSend(key, value) { 
 var view = document.createElement('webview');
 view.setAttribute('style','width:100%, height:100%;background:red');
 view.setAttribute('id','webview_'+key);

 document.getElementById(key).appendChild(view);
 var loadstop = () => { 
    status(key, 'TelaSocial:/remotestage/browser/webview/'+key);
 } 
 view.addEventListener('did-stop-loading', loadstop);
 view.setAttribute('src',value);

}

function status(key,message) { 
  var entry = document.createElement('div');
  entry.setAttribute('id','status-'+key);
  entry.className = 'status';
  entry.innerHTML='status-'+ key + '://'+  message; 
  document.body.appendChild(entry);
} 
