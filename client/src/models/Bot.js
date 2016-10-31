var Bot = require('slackbots');

// create a bot
var settings = {
    token: 'xoxb-98009383155-5Otl766SrDVxCnhX50UtBEOP',
    name: 'wedding-test-bot'
};
var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('general', 'Hello channel!');
    bot.postMessageToUser('skinnypigeon', 'hello bro!');
});

module.exports = Bot;