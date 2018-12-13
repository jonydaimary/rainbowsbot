const config = require('./../../../json/config');

module.exports = client => {
    const setActivity = status => client.user.setActivity(status, {
        type: 'STREAMING',
        url: 'https://twitch.tv/romanvoyoutube'
    }).catch(console.error);
    let index = 0;
    const setStatus = () => {
        const status = [
            `${config.prefix}help`,
            'Rainbow`s Server',
            `${client.users.array().length} users`
        ][index];
        index = index == 2 ? 0 : index + 1;
        setActivity(status);
    };
    setStatus();
    setInterval(() => setStatus(), 180000);
};