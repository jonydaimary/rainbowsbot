module.exports = async (client, member, moderator, reason) => {
    const Warns = client.sequelize.model('warns');
    const warn = Warns.build({
        member: member.user.id,
        moderator: moderator.member.id,
        reason: reason
    });
    await warn.save();
    client.emit('memberWarned', warn);
    return warn;
};