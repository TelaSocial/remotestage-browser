var Application = require('spectron').Application;
var assert = require('assert');
var electron= require('electron-prebuilt');

// Depends on Promises
//var Promise = require('es6-promise').Promise;

var app = new Application({
	path: electron, args:['.']
})

app.start().then(function ok() {
		app.client.waitUntilTextExists('#message', 'success', 10000).then(
			function success() {
				console.log('Success, content loaded!!!');

				app.stop().then(function ok() {
					console.log('Quit ')
				}, function nok() {
				});

			}, function nok() {
				console.log("Not loaded...");

				app.stop().then(function ok() {
					console.log('Quit ')
				}, function nok() {
				});

			});
}, function nok() {
	console.log('Start not ok!')
});

console.log('Launching electron.. and waiting for inner page load!');
