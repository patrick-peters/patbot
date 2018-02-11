const emoji = require('node-emoji');

const methods = {
    start(user) {
        return `Hi *${user.first_name}*, you are welcome ${emoji.get(':heart_eyes_cat:')}`;
    },
    options() {
        return `${emoji.get(':see_no_evil:')} ${emoji.get(':hear_no_evil:')} ${emoji.get(':speak_no_evil:')}`;
    },
    buttons() {
        return `${emoji.get(':construction:')} ${emoji.get(':warning:')} ${emoji.get(':construction:')}`;
    },
    hide() {
        return 'Hide keyboard. Type /options to show again.';
    },
    typeOf(type) {
        return `Thank you for ${type}.`
    },
    stop(user) {
        return `See ya *${user.first_name}*, till next time ${emoji.get(':smirk_cat:')}`;
    },
}

module.exports = methods;
