const { RichEmbed } = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');

const config = require('./../../../json/config');

module.exports = async (client, member) => {
    const owner = await client.fetchUser(config.owner);
    const embed = new RichEmbed()
        .setAuthor(owner.tag, owner.avatarURL)
        .setTitle(`Добро пожаловать на ${member.guild.name}!`)
        .setDescription(oneLine`
            Привет! Это сообщение пишу вам я, собственный бот сервера.
            Для получения информации или основных команд введите \`${config.prefix}help\`
        `)
        .addField('Информация о сервере', stripIndents`
            Rainbow's Server — это стремительно развивающийся сервер Discord. Основной тематикой сервера является программирование.
            Здесь всегда можно попросить помощи у опытных и начинающих программистов.
            Обязательно прочитай <#${config.channels.rules}>.
            Мы рады, что ты зашел к нам
            По вопросам обращайся к Главному администратору.
            
            Для тех, кто хочет стать партнером, читайте требования к парнерству в канале <#${config.channels.info}>

            Человек на сервере: **${member.guild.memberCount}**
        `)
        .setColor(config.embed.color.direct)
        .setFooter('Rainbow`s server 🌈 Welcome!');

    member.send(embed);
};