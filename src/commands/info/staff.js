const { RichEmbed } = require('discord.js');

const Command = require('../../command-processing/command');

const config = require('./../../../config');

const STAFF_ROLES = ['Модератор', 'Главный Модератор', 'Администратор', 'Главный Администратор'];

module.exports = class StaffCommand extends Command {
    constructor() {
        super({
            name: 'staff',
            group: 'Info',
            description: 'Отображает список персонала сервера',
            guildOnly: true
        });
    }

    run(message) {
        const embed = new RichEmbed()
            .setTitle('Персонал сервера')
            .setThumbnail('https://media.giphy.com/media/1Q9CsjzWyt2qVzM0GH/giphy.gif')
            .setColor(config.embed.color.guild);
        
        const staff = this.guild.members
            .filter(member => member.roles.some(role => STAFF_ROLES.includes(role.name)));
        
        STAFF_ROLES
            .reverse()
            .forEach(role => {
                const members = staff
                    .filter(member => member.roles.some(r => r.name == role))
                    .map(member => member.toString())
                    .join(', ');
                if (members.length > 0)
                    embed.addField(`${role}:`, members);
            });
        
        message.channel.send(embed);
    }
};