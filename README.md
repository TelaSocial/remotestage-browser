# Controlling Electron based app with Spectron

A node application that manages a kiosk-based dashboard browser lifecycle. The lifecycle is based in establishing the basic infrastructure to launch a browser and a local app. Depending on criteria and runtime-based tests, it will launch alternate measures. This is, therefore, a realtime system.

## Install

* npm install
* npm install pm2 -g

## How to use

* node run.js

## Make it boot smart

* pm2 startup
* pm2 start process.json

## Design

* grid-based browser router - a system that supports loading multi web views, and to have validation against each, therefore maintaining a quality criteria for a 24x7 display experience;




### Chromedriver, and electron

* [Using spectron](https://speakerdeck.com/kevinsawicki/testing-your-electron-apps-with-chromedriver)

### PM2

* App with DISPLAY environment settings — We need to have DISPLAY environment variable set within the node, or associated with PM2 context, because PM2 will load the script from another context, not the current user shell; The approach for doing this is from the NodeJS script;

* Startup scripts support —  by PM2 - http://pm2.keymetrics.io/docs/usage/startup/#command with PM2, the pm2 startup will create the necessary scripts. The apps are subject to start, stop, delete, and so. It's also recommended to use a process.json approach. [See attributes for launching app](http://pm2.keymetrics.io/docs/usage/application-declaration/)

* Node process exiting and core launcher lifecycle — we need to make sure that Node app is properly exited, plus to check on the conditions which app may not be properly exited. [See signals and clean start](http://pm2.keymetrics.io/docs/usage/signals-clean-restart/)

### Possible issues between process, OS, electron

* https://github.com/electron/spectron/issues/131 app.stop() possible issues;
* Exiting from node http://stackoverflow.com/questions/5266152/how-to-exit-in-node-js
* [supervisord](http://supervisord.org/introduction.html)

## grid-browser routing

One possibility, for aiming high performance multi components app, is to have a local browser page served with a number of grid-based elements. These elements are to be loaded with webview-based content i.e. web remote content, yet they are separated from each other.

## Other

* https://github.com/chentsulin/electron-react-boilerplate
* https://github.com/sindresorhus/awesome-electron#apps
* https://tech.polyconseil.fr/code-your-js-app-like-its-86.html

## Bugs in platform

* Webview scaling issues https://github.com/electron/electron/issues/7777 
