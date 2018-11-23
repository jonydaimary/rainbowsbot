const MENTION_PATTERN = /^<@!?([0-9]+)>$/;
const ID_PATTERN = /^[0-9]+$/;

module.exports = (guild, rawMember) => {
    if (MENTION_PATTERN.test(rawMember))
        return guild.member(rawMember.match(MENTION_PATTERN)[1]);
    if (ID_PATTERN.test(rawMember))
        return guild.member(rawMember);
    return guild.members.find(m => m.displayName == rawMember || m.user.username == rawMember);
};