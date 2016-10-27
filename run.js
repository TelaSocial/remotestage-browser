const Application = require('spectron').Application;
const electron    = require('electron-prebuilt');

const config        = require('./config_browser.js');
const config_layout = require('./'+config.layout);

// Spectron Application depends on Promises
// const Promise = require('es6-promise').Promise;

var app = new Application({
	path: electron, args:['.']
})

// Here we will be notified about registration for all components
// The idea is that, in case case of no success, we would then
// take new routes..
app.start().then(function ok() {

	for(k in config_layout.components) {
    let component = config_layout.components[k];
		console.log('Watching: '+ component.key + ' and '+ component.value);
		app.client.waitUntilTextExists(
			  '#status-'+ component.key,
		    '/remotestage/browser/webview', 10000).then(
					() => {
							console.log('/remotestage/browser/webview/'+'#status-'+ component.key+'='+component.value);
					}
		);
	}

	app.client.waitUntilTextExists('#status-layout',
																 'TelaSocial:/remotestage/browser', 10000).then(
		function ok() {
			console.log('status: TelaSocial:/remotestage/browser');
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
