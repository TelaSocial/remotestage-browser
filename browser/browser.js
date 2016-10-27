const {ipcRenderer} = require('electron');


ipcRenderer.on('component_send', (event, message) => {
  var arg = JSON.parse(message);
  componentSend(arg.key, arg.value);
});

ipcRenderer.on('component_replace', (event, message) => {
  var arg = JSON.parse(message);
  componentReplace(arg.key, arg.value);
});

/* initial Layout and window */

ipcRenderer.on('background_page', (event, message) => {

  let windowData = JSON.parse(message);

  let divView = document.createElement('div');
  divView.setAttribute('style','width:100%;height:100%')
  document.body.appendChild(divView);

  let view = document.createElement('webview');
  view.setAttribute('autosize','on');
  view.setAttribute('style','width:100%;height:100%')
  view.setAttribute('src', '../'+windowData.page);
  divView.appendChild(view);

  view.addEventListener('did-stop-loading', function () {
    status('load', 'background_page', 'TelaSocial:/remotestage/browser/webview');
  });


  status('status','layout','TelaSocial:/remotestage/browser/background_page');

});

ipcRenderer.on('layout', (event, message) => {
  document.body.style.backgroundImage='url(page.png)';
  document.getElementById('canvas1').innerHTML=message;
  status('status','layout','TelaSocial:/remotestage/browser/layout');
});

ipcRenderer.on('scale', (event, message) => {
  let windowData = JSON.parse(message);
  console.log(message);
//  document.body.setAttribute('style','width:'+windowData.width+'px;height:'+windowData.height+'px;transform-origin: 0 0; transform: scale('+windowData.scale+')')
  status('status','resize','TelaSocial:/remotestage/browser#rezise');

});

/* feedback that the principal supervisor has received */

ipcRenderer.on('IKnowWhatYouDidLastSummer', (event, message) => {
  status('status','feedback-run','/remotestage');
});

function componentSend(key, value) {

   let view = document.createElement('webview');
   view.setAttribute('id','webview_'+key);
   view.setAttribute('style','width:100%;height:100%;background:red');

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
