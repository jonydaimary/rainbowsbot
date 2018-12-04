const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parse = require('./../../utils/parse');

const config = require('./../../../config');

module.exports = class WarnCommand extends Command {
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

        await this.client.sequelize.model('warns').warn(member.id, message.author.id, reason);

        const embed = new RichEmbed()
            .setTitle('Предупреждение')
            .addField('Пользователь', `${member.user} (\`${member.user.tag}\`)`, true)
            .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
            .addField('Причина', reason)
            .setFooter('Rainbow`s Warnings')
            .setColor(config.embed.color.guild)
            .setTimestamp(message.createdAt);

        await message.guild.channels
            .get(config.channels.staffchat)
            .send(embed);
    }
};