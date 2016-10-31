'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');

var NewBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'NewBot';
    this.user = null;
    this.db = null;
};

util.inherits(NewBot, Bot);

NewBot.prototype.run = function () {
    NewBot.super_.call( this, this.settings );

    this.on( 'start', this._onStart );
    this.on( 'message', this._onMessage );
};

NewBot.prototype._onStart = function () {
    this._loadBotUser();
    this._welcomeMessage();
};

NewBot.prototype._loadBotUser = function () {

    for( var i = 0; i < this.users.length; i++ ) {
        if( this.users[i].name === 'wedding-test-bot' ) {
            this.id = this.users[i].id;
        }
    }
};

NewBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel( this.channels[1].name, "Hello, I am working" );
};

NewBot.prototype._onMessage = function( message ) {
    if ( this._isChatMessage( message ) &&
         this._isChannelConversation( message ) &&
         !this._isNotFromNewBot( message )) {
    this.sayHi();
    }
};

NewBot.prototype.sayHi = function( message ) {
    this.postMessageToChannel( this.channels[1].name, "Hello, I am replying" );
}

NewBot.prototype._isChatMessage = function ( message ) {
    return message.type === 'message' && Boolean( message.text );
};

NewBot.prototype._isChannelConversation = function( message ) {
    return typeof message.channel === 'string';
};

NewBot.prototype._isNotFromNewBot = function( message ) {
    console.log( message );
    return message.user === this.id;
};

NewBot.prototype._isMentioningChuckNorris = function( message ) {
    return message.text.toLowerCase().indexOf( 'chuck norris' ) > -1 ||
        message.text.toLowerCase().indexOf( this.name ) > -1;
};


module.exports = NewBot;