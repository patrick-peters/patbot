const TeleBot = require('telebot');
const curl = require('curlrequest');

const answer = require('./answers.js');

const bot = new TeleBot(process.env.TELEGRAM_TOKEN);
const markdownOption = { parseMode: 'Markdown' };
const hideMarkup = { replyMarkup: 'hide' };

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
    ], { resize: true });

    return bot.sendMessage(msg.from.id, answer.options(), {replyMarkup});

});

// Buttons
bot.on('/buttons', msg => {

    let replyMarkup = bot.keyboard([
        [bot.button('contact', 'Your contact'), bot.button('location', 'Your location')],
        ['/options', '/hide']
    ], { resize: true });

    return bot.sendMessage(msg.from.id, answer.buttons(), {replyMarkup});

});

// Send joke
bot.on('/joke', (msg) => {
    var options = { url: 'icanhazdadjoke.com', headers: { accept: 'text/plain' }};

    curl.request(options, function (err, data) {
        return bot.sendMessage(msg.from.id, data, markdownOption);
    });
});

// Hide keyboard
bot.on('/hide', msg => {
    return bot.sendMessage(msg.from.id, answer.hide(), hideMarkup);
});

// On location on contact message
bot.on(['location', 'contact'], (msg, self) => {
    return bot.sendMessage(msg.from.id, answer.typeOf(self.type));
});

// -----------------------------------------------------------------------

bot.connect();
