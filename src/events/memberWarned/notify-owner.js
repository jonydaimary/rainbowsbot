const { stripIndents } = require('common-tags');

module.exports = (client, { member, moderator, reason }) => {
    member = client.guild().member(member);
    moderator = client.guild().member(moderator);
    client.guild().owner.send(stripIndents`
        __**Предупреждение:**__
        **Модератор:** ${moderator}
        **Нарушитель:** ${member}
        **Причина:**
        ${reason}
    `);
};