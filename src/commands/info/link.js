const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');

const config = require('./../../../config');

module.exports = new Command.Builder('link', 'info')
    .description('Позволяет получить неистекающее приглашение')
    .run(message => message.channel.send(new RichEmbed()
        .setTitle('Ссылка-приглашение для Rainbow`s Server')
        .setDescription(config.invite)
        .setColor(config.embed.color.guild)
    ))
    .build();