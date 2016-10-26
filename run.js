const Application = require('spectron').Application;
const electron    = require('electron-prebuilt');

const config = require('./config_browser.js');
const config_layout = require('./'+config.layout);

// Depends on Promises
//var Promise = require('es6-promise').Promise;

var app = new Application({
	path: electron, args:['.']
})

app.start().then(function ok() {

	for(k in config_layout.components) {
    var component = config_layout.components[k];
		console.log('Watching: '+ component.key + ' and '+ component.value);
		app.client.waitUntilTextExists('#status-'+ component.key, '/monitor/browser/webview', 10000).then(
			function ok(m)  {
				console.log('/monitor/browser/webview');
			}
		);
	}

	app.client.waitUntilTextExists('#status-layout', 'TelaSocial:/monitor/browser', 10000).then(
		function ok() {
			console.log('status: TelaSocial:/monitor/browser');
		}, function nok() {
			console.log("Not loaded...");
			app.stop().then(function ok() {
				console.log('Quit ')
			}, function nok() {
			});
		});

}, function nok() {
	console.log('TelaSocial://monitor/app/ERROR')
});

console.log('Launching electron.. and waiting for inner page load!');
