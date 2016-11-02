'use strict';

var NewBot = require( './models/NewBot' );

var token = process.env.BOT_API_KEY;

var newBot = new NewBot({
    token: token
});

newBot.run();