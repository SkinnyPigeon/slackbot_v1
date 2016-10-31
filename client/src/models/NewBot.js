'use strict';

var util = require( 'util' );
var path = require( 'path' );
var fs = require( 'fs' );
var Bot = require( 'slackbots' );
 
var NewBot = function Constructor( settings ) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'NewBot';
    this.user = null;
    this.db = null;

    this.run();
};

util.inherits( NewBot, Bot );

NewBot.prototype = {

    // run: function() {
    //     NewBot.super_.call( this, this.settings );
    //     this.on( 'start', this._onStart );
    //     this.on( 'message', this._onMessage );
    // },

    _onStart: function() {
        this._loadBotUser();
        this._welcomeMessage();
        this.postMessageToChannel( 'general', 'Hello channel!' );
        this.postMessageToUser( 'skinnypigeon', 'hello bro!' );
    },

    _loadBotUser: function() {
        var self = this;
        this.user = this.users.filter( function( user ) {
            return user.name === self.name;
        })[0];
    },

    _welcomeMessage: function() {
        this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?' +
            '\n I can tell jokes, but very honest ones. Just say `Chuck Norris` or `' + this.name + '` to invoke me!',
            { as_user: true });
    },

    _onMessage: function() {
        console.log( message );
        if ( this._isChatMessage( message ) &&
             this._isChannelConversation( message ) &&
             !this._isFromNorrisBot( message )) {
             // this._replyWithRandomJoke( message );
         this.sayHi( message );
        }
    },

    sayHi: function( message ) {
        console.log( message );
        this.postMessageToChannel('general', 'Hello channel!');
    },

    _isChatMessage: function( message ) {
        return message.type === 'message' && Boolean(message.text);
    },

    _isChannelConversation: function( message ) {
        return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
    },

    _isFromNewBot: function( message ) {
        return message.user === this.user.id;
    },

    _isMentioningNewBot: function( message ) {
        return message.text.toLowerCase().indexOf( 'chuck norris' ) > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
    },

    _replyWithRandomJoke: function( originalMessage ) {
        this.postMessageToChannel( 'general', 'Hello channel!' );
    }

}

module.exports = NewBot;