const Application = require('spectron').Application;
const electron    = require('electron-prebuilt');

const config        = require('./config_browser.js');
const config_layout = require('./'+config.layout);

const fs = require('fs');

// Spectron Application depends on Promises
// const Promise = require('es6-promise').Promise;

var app = new Application({
	path: electron, args:['browser_app/main.js', 'remote']
})

// Here we will be notified about registration for all components
// The idea is that, in case case of no success, we would then
// take new routes..
app.start().then(function ok() {

	app.client.getRenderProcessLogs().then(function (logs) {
	  logs.forEach(function (log) {
	    console.log('Render log: '+ log.message + ' - '+ log.source + ' - '+ log.level)
	  })
	});

	for(let k in config_layout.components) {
    let component = config_layout.components[k];
		console.log('Watching: '+ component.key + ' and '+ component.value);
		app.client.waitUntilTextExists(
			  '#load-'+ component.key,
		    '/remotestage/browser/webview', 10000).then(
					() => {
							console.log('/remotestage/browser/webview/'+'#load-'+ component.key+'='+component.value);
					}
		);

		app.client.waitUntilTextExists(
			  '#error-'+ component.key,
		    '/remotestage/browser/webview', 10000).then(
					() => {
							console.log('/remotestage/browser/webview#_ERROR_/'+'#error-'+ component.key+'='+component.value);

							for(let k in config_layout.components_backup) {
						    let cEl = config_layout.components_backup[k];
								if(cEl.key == component.key) {
									var serializedPageLoad = JSON.stringify(cEl);
									console.log('Will reload :' +serializedPageLoad)
									app.webContents.send('component_replace', serializedPageLoad );
								}
							}

					}
		);

	}

	app.client.waitUntilTextExists('#status-layout',
																 'TelaSocial:/remotestage/browser', 10000).then(
		function ok() {

			console.log('status: TelaSocial:/remotestage/browser');

			app.webContents.send('IKnowWhatYouDidLastSummer', 'yes I know' );
			app.browserWindow.capturePage().then(function (imageBuffer) {
			  fs.writeFile('page.png', imageBuffer)
			})

		}, function nok() {
			console.log("Not loaded...");
			app.stop().then(function ok() {
				console.log('Quit ')
			}, function nok() {
			});
		});

}, function nok() {
	console.log('TelaSocial://remotestage#ERROR')
});

console.log('Launching electron.. and waiting for inner page load!');
