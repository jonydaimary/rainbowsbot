const { roles: { muted } } = require('../../json/config.json');

module.exports = (member, timestamp, time) => {
    const unmute = async () => {
        await member.removeRole(muted);
        await member.client.sequelize.model('tempmutes').remove(member.user.id);
        member.client.emit('memberUnmuted', member, time);
    };
    const now = Date.now();
    const expiration = timestamp.getDate() + time;
    if (expiration <= now)
        unmute(member);
    else setTimeout(() => unmute(member), expiration - now);
};