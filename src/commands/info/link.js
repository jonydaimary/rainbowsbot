const { RichEmbed } = require('discord.js');

const Command = require('./../../processing/commands/command');

const config = require('./../../../json/config');

module.exports = new Command.Builder('link', 'Info')
    .description('Позволяет получить неистекающее приглашение')
    .run(message => message.channel.send(new RichEmbed()
        .setTitle('Ссылка-приглашение для Rainbow`s Server')
        .setDescription(config.invite)
        .setColor(config.embed.color.guild)
    ))
    .build();