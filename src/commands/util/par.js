const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');
const parseMember = require('./../../utils/parse-member');

const config = require('./../../../config');

const PERMITTED_ROLES = ['Модератор', 'Главный Модератор', 'Администратор', 'Главный Администратор'];

const PARTNER_ROLE = '470218094342569984';
const PARTNER_ACHIEVMENT = '469613173251506187';

module.exports = new Command.Builder('par', 'Util')
    .guildOnly()
    .format('<пользователь>')
    .description('Выдать пользвателю достижение и роль партнёра')  
    .checkPermissions(member => member.roles.some(role => PERMITTED_ROLES.includes(role.name)))
    .validate((message, [member]) => {
        if (!parseMember(message.guild, member))
            return 'Пользователь не найден';
        return true;
    })
    .run((message, [member]) => {
        member = parseMember(message.guild, member);
        member.addRoles([PARTNER_ACHIEVMENT, PARTNER_ROLE]);
        message.guild.channels.get(config.channels.staffchat).send(new RichEmbed()
            .setTitle('Роль партнера успешно выдана')
            .setColor(config.embed.color.guild)
            .setFooter('Rainbow\'s Server 🌈 Partnership')
        );
    })
    .build();