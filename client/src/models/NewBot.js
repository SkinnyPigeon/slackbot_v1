'use strict';

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var util = require('util');
var Bot = require('slackbots');

var NewBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'NewBot';
    this.user = null;
    this.url = "https://wedding--photo-test.herokuapp.com/pictures";
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
     !this._isFromNewBot( message )) {
        this._handlePictures( message );
    this._handleText( message );
}
};

NewBot.prototype._handleText = function( message ) {
    // console.log( message );
    if( message.text.charAt(0) !== '<' ) {
        this.postMessageToChannel( this.channels[1].name, "Hello, I am replying" );
    }
};

NewBot.prototype._handlePictures = function( message ) {
    console.log( "Hello" );
    if( message.subtype === 'file_share' ) {
        this._savePicture( message ) 
    }
};

NewBot.prototype._savePicture = function( message ) {
    this.postMessageToChannel( this.channels[1].name, "Hello, I am processing a picture" );
    var request = new XMLHttpRequest()
    request.open( 'POST', this.url )
    request.setRequestHeader("Content-Type", "application/json")
    request.onload = () => {
        console.log( this.url )
    }
    var data = {
        picture: {
          url: message.file.url_private
      }
    }
    request.send( JSON.stringify( data ));
};

NewBot.prototype._isChatMessage = function ( message ) {
    return message.type === 'message' && Boolean( message.text );
};

NewBot.prototype._isChannelConversation = function( message ) {
    return typeof message.channel === 'string';
};

NewBot.prototype._isFromNewBot = function( message ) {
    return message.subtype === "bot_message";
};

module.exports = NewBot;