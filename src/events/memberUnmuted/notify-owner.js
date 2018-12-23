const { stripIndents } = require('common-tags');
const ms = require('ms');

module.exports = (client, member, time) => {
    client.guild().owner.send(stripIndents`
        __**Пользователь размучен:**__
        **Пользователь:** ${member}
        ${time ? `**Время:** ${ms(time, { long: true })}` : ''}
    `);
};