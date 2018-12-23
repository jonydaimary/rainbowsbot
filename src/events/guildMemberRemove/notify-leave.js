const { RichEmbed } = require('discord.js');

const config = require('./../../../json/config');

module.exports = (client, member) => {
    const embed = new RichEmbed()
        .setTitle('Участник покинул сервер')
        .setDescription(`С сервера ушел ${member.user.tag}`)
        .setColor(config.embed.color.guild)
        .setFooter('Rainbow\'s server 🌈 Goodbye!');
    client.channels.get(config.channels.staff).send(embed);
};