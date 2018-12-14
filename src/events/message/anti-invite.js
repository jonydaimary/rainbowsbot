const INVITE_LINK_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:discord\.(?:gg|io|me|li)|discordapp\.com\/invite)\/(.+[a-z])/g;

module.exports = (client, message) => {
    if (message.channel.type != 'text')
        return;
    if (!INVITE_LINK_PATTERN.test(message.content))
        return;
    message.delete();
    const moderator = client.guild().member(client.user.id);
    client.warn(message.member, moderator, 'Рассылка приглашений');
    message.reply('Вы получили предупреждение за рассылку приглашений.');
};