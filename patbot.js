const TeleBot = require('telebot');
const answer = require('./answers.js');

const bot = new TeleBot('');
const markdownOption = { parseMode: 'Markdown' };

bot.on('/start', msg => {
    return bot.sendMessage(msg.from.id, answer.start(msg.from), markdownOption);
});

bot.on('text', msg => {
    return bot.sendMessage(msg.from.id, answer.echo(msg.text), markdownOption);
});

bot.on('sticker', (msg) => {
    return msg.reply.sticker('http://i.imgur.com/VRYdhuD.png');
});

bot.on('/stop', msg => {
    return bot.sendMessage(msg.from.id, answer.stop(msg.from), markdownOption);
});

bot.connect();
