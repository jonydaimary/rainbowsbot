const { RichEmbed } = require('discord.js');

const Command = require('./../../command-processing/command');

const config = require('./../../../config');

module.exports = new Command.Builder('gif', 'util')
    .description('Отправляет гифку сервера')
    .run(message => message.channel.send(new RichEmbed()
        .setTitle('Как вам GIF-ка?')
        .setDescription('Rainbow`s Server\'s GIF image')
        .setColor(config.embed.color.guild)
        .setThumbnail('https://media.giphy.com/media/23foIXPAuT5EtZ7X67/giphy.gif')
    ))
    .build();