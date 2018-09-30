#!/usr/bin/env bash

sudo npm run build
sudo chmod -R 777 www

sudo cp -rf www ionic-vue-cordova

cd ionic-vue-cordova && sudo cordova platform add android --save
sudo cordova platform add ios --save
sudo chmod -R 777 platforms
