const emoji = require('node-emoji');

const methods = {
    start(user) {
        return `Hi *${user.first_name}*, you are welcome ${emoji.get(':heart_eyes_cat:')}`;
    },
    echo(text) {
        return `You said: ${text} ${emoji.get(':speak_no_evil:')}`;
    },
    stop(user) {
        return `See ya *${user.first_name}*, till next time ${emoji.get(':smirk_cat:')}`;
    },
}

module.exports = methods;
