const {ipcRenderer} = require('electron');


ipcRenderer.on('component_send', (event, message) => {
  var arg = JSON.parse(message);
  componentSend(arg.key, arg.value);
});

ipcRenderer.on('component_replace', (event, message) => {
  var arg = JSON.parse(message);
  componentReplace(arg.key, arg.value);
});

ipcRenderer.on('layout', (event, message) => {
  document.getElementById('canvas0').innerHTML=message;
  status('status','layout','TelaSocial:/remotestage/browser/layout');
});

ipcRenderer.on('IKnowWhatYouDidLastSummer', (event, message) => {
  status('status','feedback-run','/remotestage');
});

function componentSend(key, value) {

   let view = document.createElement('webview');
   view.setAttribute('style','width:100%, height:100%;background:red');
   view.setAttribute('id','webview_'+key);

   document.getElementById(key).appendChild(view);

   view.addEventListener('did-stop-loading', function () {
     status('load', key, 'TelaSocial:/remotestage/browser/webview/'+key);
   });

   view.addEventListener('did-fail-load', function () {
     status('error', key, 'TelaSocial:/remotestage/browser/webview/'+key);
   });

   view.setAttribute('src',value);
}

function componentReplace(key, value) {

   let view = document.getElementById('webview_'+key);

   view.setAttribute('src',value);
}

// status = load-, error-
function status(status, key, message) {

  var entry = document.createElement('div');
  entry.setAttribute('id', status + '-' + key);
  entry.className = 'status';
  entry.innerHTML= status + '-'+ key + '://'+  message;
  document.body.appendChild(entry);
}
