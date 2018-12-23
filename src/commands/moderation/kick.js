const { RichEmbed } = require('discord.js');

const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = class KickCommand extends Command {
    constructor() {
        super({
            name: 'kick',
            group: 'Moderation',
            format: '<пользователь> [причина]',
            description: 'Выгоняет пользователя',
            guildOnly: true
        });
    }

    hasPermissions(member) {
        const roles = ['Главный Администратор', 'Администратор', 'Главный Модератор', 'Модератор'];
        return member.roles.some(role => roles.includes(role.name));
    }

    validate(message, [member]) {
        if (!member)
            return 'Пользователь не указан';
        member = parse.member(message.guild, member);
        if (!member)
            return 'Пользователь не найден';
        if (!member.kickable)
            return 'Этого пользователя нельзя кикнуть';
        return true;
    }

    async run(message, [member, reason]) {
        reason = reason ? reason : 'Причина не указана';
        member = parse.member(message.guild, member);

        await member.kick(reason);

        const embed = new RichEmbed()
            .setTitle('Пользователь кикнут')
            .addField('Пользователь:', member)
            .setColor(config.embed.color.guild)
            .addField('Модератор:', message.author)
            .addField('Причина:', reason);

        message.guild.channels
            .get(config.channels.staff)
            .send(embed);
    }
};