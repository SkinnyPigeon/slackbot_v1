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
    var self = this;
    this.user = this.users.filter( function( user ) {
        return user.name === self.name;
    })[0];
    console.log( this.user );
};

NewBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel( this.channels[1].name, "Hello, I am working" );
};

NewBot.prototype._onMessage = function( message ) {
    console.log( message );
    if ( this._isChatMessage( message ) &&
         this._isChannelConversation( message ) &&
         !this._isFromNewBot( message )) {
        this._replyWithRandomJoke( message );
    }
};

NewBot.prototype.sayHi = function( message ) {
    console.log( message );
    this.postMessageToChannel('general', 'Hello channel!');
}

NewBot.prototype._isChatMessage = function ( message ) {
    console.log( message );
    return message.type === 'message' && Boolean( message.text );
};

NewBot.prototype._isChannelConversation = function( message ) {
    return typeof message.channel === 'string';
};

NewBot.prototype._isFromNewBot = function( message ) {
    console.log( self );
    return message.user === this.user.id;
};

NewBot.prototype._isMentioningChuckNorris = function( message ) {
    return message.text.toLowerCase().indexOf( 'chuck norris' ) > -1 ||
        message.text.toLowerCase().indexOf( this.name ) > -1;
};

NewBot.prototype._replyWithRandomJoke = function( originalMessage ) {
    this.postMessageToChannel( 'general', 'Hello channel!' );
    this.postMessageToUser( 'skinnypigeon', 'hello bro!' );
};


module.exports = NewBot;