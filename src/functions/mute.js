const { roles: { muted } } = require('../../json/config.json');

module.exports = async (client, member, time = null) => {
    member.addRole(muted);
    if (time) {
        const TempMutes = client.sequelize.model('tempmutes');
        await TempMutes.build({
            id: member.user.id,
            timestamp: Date.now(),
            time
        }).save();
    }
    client.emit('memberMuted', member, time);
};