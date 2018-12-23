const { RichEmbed } = require('discord.js');

const config = require('./../../../json/config');

module.exports = (client, member) => {
    const embed = new RichEmbed()
        .setTitle('Новый участник сервера')
        .setDescription(`К серверу присоединился ${member.user.tag}`)
        .setColor(config.embed.color.guild)
        .setFooter('Rainbow\'s server 🌈 Welcome!');
    client.channels.get(config.channels.general).send(embed);
    client.channels.get(config.channels.staff).send({ embed });
};