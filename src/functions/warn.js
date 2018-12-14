module.exports = async (client, member, moderator, reason) => {
    const Warns = client.sequelize.model('warns');
    const warn = Warns.build({
        member: member.user.id,
        moderator: moderator.user.id,
        reason
    });
    await warn.save();
    client.emit('memberWarned', warn);
    return warn;
};