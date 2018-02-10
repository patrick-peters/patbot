const TeleBot = require('telebot');
const curl = require('curlrequest');

const answer = require('./answers.js');

const bot = new TeleBot('TELEGRAM_TOKEN');
const markdownOption = { parseMode: 'Markdown' };

bot.on('/start', msg => {
    return bot.sendMessage(msg.from.id, answer.start(msg.from), markdownOption);
});

bot.on('sticker', (msg) => {
    return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png');
});

bot.on('/stop', msg => {
    return bot.sendMessage(msg.from.id, answer.stop(msg.from), markdownOption);
});

// ------------------------------  KEYBOARD ------------------------------

// On commands
bot.on(['/options'], msg => {

    let replyMarkup = bot.keyboard([
        ['/buttons', '/joke'],
        ['/start', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Keyboard.', {replyMarkup});

});

// Buttons
bot.on('/buttons', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('contact', 'Your contact'), bot.button('location', 'Your location')],
        ['/options', '/hide']
    ], {resize: true});

    return bot.sendMessage(msg.from.id, 'Button example.', {replyMarkup});

});

bot.on('/joke', (msg) => {
    var options = { url: 'icanhazdadjoke.com', headers: { accept: 'text/plain' } };

    curl.request(options, function (err, data) {
        return bot.sendMessage(msg.from.id, data, markdownOption);
    });
});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(
        msg.from.id, 'Hide keyboard. Type /options to show.', {replyMarkup: 'hide'}
    );
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
    return bot.sendMessage(msg.from.id, `Thank you for ${ self.type }.`);
});

// -----------------------------------------------------------------------

bot.connect();
