const { RichEmbed } = require('discord.js');

const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = class WarnsCommand extends Command {
    constructor() {
        super({
            name: 'warns',
            group: 'Moderation',
            format: '[пользователь]',
            description: 'Отображает список предупреждений пользователя',
            guildOnly: true
        });
    }

    async run(message, [member]) {
        member = parse.member(message.guild, member);
        member = member ? member : message.member;

        const warns = await this.client.sequelize.model('warns').findAll({ where: { user: member.user.id } });

        if (warns.length == 0)
            return (message.author.id == member.user.id
                ? 'У вас'
                : `У пользователя ${member.user.tag}`)
                + ' нет предупреждений';
        
        await message.reply(message.author.id == member.user.id
            ? `Ваши предупреждения: **${warns.length}**`
            : `Предупреждения пользователя ${member.user.tag}: **${warns.length}**`
        );

        warns.forEach(warn => message.channel.send(this.warnEmbed(warn)));
    }

    warnEmbed(warn) {
        const user = parse.user(this.client, warn.user);
        const moderator = parse.user(this.client, warn.moderator);
        return new RichEmbed()
            .setTitle('Предупреждение')
            .addField('Пользователь', `${user} (\`${user.tag}\`)`, true)
            .addField('Модератор', `${moderator} (\`${moderator.tag}\`)`, true)
            .addField('Причина', warn.reason)
            .addField('Идентификатор', warn.id)
            .setFooter('Rainbow`s Warnings')
            .setTimestamp(warn.timestamp)
            .setColor(config.embed.color.guild);
    }
};