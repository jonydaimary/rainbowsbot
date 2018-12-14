module.exports = async (client, member, moderator, reason, timestamp) => {
    const Warns = client.sequelize.model('warns');
    const warn = Warns.build({
        member: member.user.id,
        moderator: moderator.user.id,
        reason, timestamp
    });
    await warn.save();
    client.emit('memberWarned', warn);
    return warn;
};