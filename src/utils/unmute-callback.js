const { roles: { muted } } = require('../../json/config.json');

module.exports = (member, timestamp, time) => {
    const unmute = async () => {
        await member.removeRole(muted);
        await member.sequelize.model('tempmutes')
            .destroy({
                where: { id: member.user.id },
                truncate: true
            });
        member.client.emit('memberUnmuted', member, time);
    };
    const now = Date.now();
    const expiration = timestamp + time;
    if (expiration <= now)
        unmute(member);
    else setTimeout(() => unmute(member), expiration - now);
};