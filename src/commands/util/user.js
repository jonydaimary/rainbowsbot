const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parse = require('../../utils/parse');

const config = require('./../../../config');

const STATUSES = {
    online: 'Онлайн',
    dnd: 'Не беспокоить',
    idle: 'Нет на месте',
    offline: 'Не в сети'
};

module.exports = new Command.Builder('user', 'Util')
    .guildOnly()
    .format('[пользователь]')
    .description('Отображает информацию о пользователе')  
    .validate((message, [member]) => {
        if (member && !parse.member(message.guild, member))
            return 'Пользователь не найден';
        return true;
    })
    .run((message, [member]) => {
        member = member ? parse.member(message.guild, member) : message.member;
        const embed = new RichEmbed()
            .setTitle('Информация о пользователе')
            .setColor(config.embed.color.guild)
            .setImage(member.user.avatarURL)
            .addField('Имя', member.displayName, true)
            .addField('Тэг', member.user.tag, true)
            .addField('Статус', STATUSES[member.user.presence.status], true)
            .addField('ID', member.user.id, true)
            .addField('Дата входа', member.joinedAt, true)
            .setFooter(message.author.tag, message.author.avatarURL);
        message.channel.send(embed);
    })
    .build();