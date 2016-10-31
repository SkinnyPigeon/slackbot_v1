'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
// var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var NorrisBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'norrisbot';
    // this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    this.user = null;
    this.db = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(NorrisBot, Bot);

NorrisBot.prototype.run = function () {
    NorrisBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

NorrisBot.prototype.run = function () {
    NorrisBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

NorrisBot.prototype._onStart = function () {
    this._loadBotUser();
    this._welcomeMessage();
    this.postMessageToChannel('general', 'Hello channel!');
    this.postMessageToUser('skinnypigeon', 'hello bro!');
};

NorrisBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

NorrisBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
        '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
        {as_user: true});
};

NorrisBot.prototype._onMessage = function (message) {
    if ( this._isChatMessage( message ) &&
         this._isChannelConversation( message ) &&
         !this._isFromNorrisBot( message )) {
         // this._replyWithRandomJoke( message );
     this.sayHi();
    }
};

NorrisBot.prototype.sayHi = function() {
    this.postMessageToChannel('general', 'Hello channel!');
}

NorrisBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

NorrisBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

NorrisBot.prototype._isFromNorrisBot = function (message) {
    return message.user === this.user.id;
};

NorrisBot.prototype._isMentioningChuckNorris = function (message) {
    return message.text.toLowerCase().indexOf('chuck norris') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

NorrisBot.prototype._replyWithRandomJoke = function (originalMessage) {
    this.postMessageToChannel('general', 'Hello channel!');
    this.postMessageToUser('skinnypigeon', 'hello bro!');
};


module.exports = NorrisBot;