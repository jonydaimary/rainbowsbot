const { RichEmbed } = require('discord.js');

const Command = require('../../processing/commands/command');
const CommandRegistry = require('../../processing/commands/command-registry');

const config = require('./../../../json/config');

module.exports = class HelpCommand extends Command {
    constructor() {
        super({
            name: 'help',
            format: '[команда]',
            description: 'Отображает список доступных команд или информацию о конкретной команде'
        });
    }

    run(message, [command]) {
        if (command)
            return this.details(message, command);
        const isGuild = message.channel.type == 'text';
        const caller = isGuild ? message.member : message.author;
        const availableCommands = this.availableCommands(isGuild, caller);
        const embed = new RichEmbed()
            .setTitle('Список доступных вам команд:')
            .setDescription(`Вы можете использовать ${config.prefix}help <команда> если хотите узнать больше`)
            .setColor(config.embed.color.guild);
        for (const group of availableCommands.groups()) {
            let commands = '';
            for (const command of group)
                commands += `**${command.name}**: ${command.description ? command.description : '-'}\n`;
            embed.addField(`**${group.name}**`, commands);
        }
        message.channel.send(embed);
    }

    details(message, command) {
        command = this.client.commands.get(command);
        if (!command)
            return 'Команда не найдена';
        if (message.channel.type != 'text' && command.guildOnly)
            return 'Эта команда доступна только на сервере';
        const desctiption = command.details
            ? command.details
            : command.description
                ? command.description
                : '-';
        const format = `${config.prefix}${command.name}` + (command.format
            ? ` ${command.format}`
            : '');
        const embed = new RichEmbed()
            .setTitle(`**Справка по команде:** ${config.prefix}${command.name}`)
            .addField('Формат:', format)
            .addField('Описание:', desctiption)
            .addField('Могу использовать:',
                command.hasPermissions(command.guildOnly ? message.member : message.author) === true
                    ? 'Да'
                    : 'Нет'
            )
            .setColor(config.embed.color.guild);
        message.channel.send(embed);
    }

    availableCommands(isGuild, caller) {
        const commands = new CommandRegistry();
        for (const command of this.client.commands) {
            if (command.guildOnly && !isGuild)
                continue;
            if (command.hasPermissions(caller) === true)
                commands.register(command);
        }
        return commands;
    }
};