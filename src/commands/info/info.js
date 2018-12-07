const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const Command = require('../../processing/commands/command');

const config = require('./../../../config');

module.exports = class InfoCommand extends Command {
    constructor() {
        super({
            name: 'info',
            group: 'Info',
            description: 'Отбражает информацию о боте'
        });
    }

    run(message) {
        const embed = new RichEmbed()
            .setTitle('Rainbow`s Private bot')
            .setColor(config.embed.color.guild)
            .setDescription(stripIndents`
                ***Rainbow\'s Bot - бот, который разработан на языке JavaScript
                Специально создан для Rainbow\'s Server***
            `)
            .setFooter('Created by R𝕒i𝕟b𝕠w#1111', 'https://i.imgur.com/vM67SRdh.jpg');
        
        message.channel.send(embed);
    }
};