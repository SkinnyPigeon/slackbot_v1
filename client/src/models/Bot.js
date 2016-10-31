var Bot = require('slackbots');

// create a bot
var settings = {
    token: 'xoxb-98009383155-yqOQlLUy7K2T8hNvdHXxK4xM',
    name: 'wedding-test-bot'
};
var bot = new Bot(settings);

bot.on('start', function() {
    bot.postMessageToChannel('general', 'Hello channel!');
    bot.postMessageToUser('skinnypigeon', 'hello bro!');
});

module.exports = Bot;