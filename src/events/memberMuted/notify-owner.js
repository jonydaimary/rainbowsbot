const { stripIndents } = require('common-tags');
const ms = require('ms');

module.exports = async (client, member, time) => {
    client.guild().owner.send(stripIndents`
        __**Пользователь замучен:**__
        **Пользователь:** ${member}
        ${time ? `**Время:** ${ms(time, { long: true })}` : ''}
    `);
};