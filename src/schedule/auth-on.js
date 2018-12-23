const {
    schedule: { authorization: { from: rule } },
    channels: { staff }
} = require('./../../json/config.json');

module.exports = {
    name: 'auth-on', rule,
    callback(client) {
        client.authState = true;
        client.channels.get(staff)
            .send('Авторизация включена по расписанию.');
    }
};