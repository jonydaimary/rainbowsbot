const { stripIndents } = require('common-tags');

const { owner } = require('../../../json/config.json');

const INVITE_LINK_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:discord\.(?:gg|io|me|li)|discordapp\.com\/invite)\/(.+[a-z])/g;

module.exports = (client, message) => {
    if (!message.channel.guild || !INVITE_LINK_PATTERN.test(message.content))
        return;
    
    message.delete();

    const moderator = client.guild().member(client.user.id);

    client.warn(message.member, moderator, 'Рассылка приглашений', message.createdAt);
    client.mute(message.member, 3600000);

    message.reply('Вы получили предупреждение и мут на 1 час за рассылку приглашений.');
    
    client.users.get(owner).send(stripIndents`
        Пользователь ${message.member} получил предупреждение за рассылку приглашений:
        **Сообщение:**
        ${message.content}
        **Канал:** ${message.channel}
    `);
};