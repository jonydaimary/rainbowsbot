const { RichEmbed } = require('discord.js');

const Command = require('../../processing/commands/command');
const parse = require('../../utils/parse');

const config = require('./../../../config');

module.exports = new Command.Builder('role', 'Util')
    .guildOnly()
    .format('<роль>')
    .description('Отображает информацию о роли')  
    .validate((message, [role]) => {
        if (!parse.role(message.guild, role))
            return 'Роль не найдена';
        return true;
    })
    .run((message, [role]) => {
        role = parse.role(message.guild, role);
        const embed = new RichEmbed()
            .setTitle('Информация о роли')
            .setColor(config.embed.color.guild)
            .addField('Имя', role.name, true)
            .addField('ID', role.id, true)
            .addField('Создана', role.createdAt, true)
            .addField('Участники', role.members.array().length, true)
            .addField('Позиция', `${role.calculatedPosition}/${message.guild.roles.array().length}`, true)
            .addField('Цвет', role.hexColor, true)
            .addField('Отдельное отображение', role.hoist ? 'Да' : 'Нет', true)
            .addField('Управляемая', role.managed ? 'Да' : 'Нет', true)
            .addField('Упоминаемая', role.mentionable ? 'Да' : 'Нет', true)
            .setFooter(message.author.tag, message.author.avatarURL);
        message.channel.send(embed);
    })
    .build();