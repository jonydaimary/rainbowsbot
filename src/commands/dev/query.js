const { RichEmbed } = require('discord.js');

const Command = require('../../processing/commands/command');

const config = require('./../../../config');

module.exports = class QueryCommand extends Command {
    constructor() {
        super({
            name: 'query',
            group: 'Dev',
            format: '<запрос>',
            description: 'Выполняет запрос к базе данных'
        });
    }

    hasPermissions(member) {
        return ['340171098874183680', '169187770877739008'].includes(member.id);
    }

    parseArgs(rest) {
        return rest;
    }

    async run(message, query) {
        const [result, data] = await this.client.sequelize.query(query);
        await message.reply(new RichEmbed()
            .setTitle('Запрос к базе данных')
            .addField('Запрос', data.command)
            .addField('Кол-во записей', data.rowCount)
            .setColor(config.embed.color.guild)
        );
        if (data.command == 'SELECT') {
            result.forEach(r => message.channel.send(`\`\`\`json\n${JSON.stringify(r, '', 4)}\`\`\``));
        }
    }
};