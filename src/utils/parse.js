const USER_MENTION_PATTERN = /^<@!?([0-9]+)>$/;
const ROLE_MENTION_PATTERN = /^<@&!?([0-9]+)>$/;
const CHANNEL_MENTION_PATTERN = /^<#!?([0-9]+)>$/;
const ID_PATTERN = /^[0-9]+$/;

module.exports.member = (guild, raw) => {
    if (USER_MENTION_PATTERN.test(raw))
        return guild.member(raw.match(USER_MENTION_PATTERN)[1]);
    if (ID_PATTERN.test(raw))
        return guild.member(raw);
    return guild.members.find(member => member.displayName == raw || member.user.username == raw);
};

module.exports.user = (client, raw) => {
    if (USER_MENTION_PATTERN.test(raw))
        return client.fetchUser(raw.match(USER_MENTION_PATTERN)[1]);
    if (ID_PATTERN.test(raw))
        return client.fetchUser(raw);
    return client.users.find(user => user.username == raw);
};

module.exports.role = (guild, raw) => {
    if (ROLE_MENTION_PATTERN.test(raw))
        return guild.roles.get(raw.match(ROLE_MENTION_PATTERN)[1]);
    if (ID_PATTERN.test(raw))
        return guild.roles.get(raw);
    return guild.roles.find(role => role.name == raw);
};

module.exports.channel = (client, raw) => {
    if (CHANNEL_MENTION_PATTERN.test(raw))
        return client.channels.get(raw.match(CHANNEL_MENTION_PATTERN)[1]);
    if (ID_PATTERN.test(raw))
        return client.channels.get(raw);
    return client.channels.find(channel => channel.name == raw);
};