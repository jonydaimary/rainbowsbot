const {
    schedule: { authorization: { to: rule } },
    channels: { staff }
} = require('./../../json/config.json');

module.exports = {
    name: 'reset-warns', rule,
    callback(client) {
        client.authState = false;
        client.channels.get(staff)
            .send('Авторизация отключена по расписанию.');
    }
};