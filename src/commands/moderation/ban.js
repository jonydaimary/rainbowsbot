const { RichEmbed } = require('discord.js');

const Command = require('./../../processing/commands/command');
const parse = require('./../../utils/parse');

const config = require('./../../../json/config');

module.exports = class BanCommand extends Command {
    constructor() {
        super({
            name: 'ban',
            group: 'Moderation',
            format: '<пользователь> [причина]',
            description: 'Банит пользователя',
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
        if (!member.bannable)
            return 'Этого пользователя нельзя забанить';
        return true;
    }

    async run(message, [member, reason]) {
        reason = reason ? reason : 'Причина не указана';
        member = parse.member(message.guild, member);

        await member.ban(reason);

        const embed = new RichEmbed()
            .setTitle('Пользователь забанен')
            .addField('Пользователь:', member)
            .setColor(config.embed.color.guild)
            .addField('Модератор:', message.author)
            .addField('Причина:', reason);

        message.guild.channels
            .get(config.channels.staffchat)
            .send(embed);
    }
};