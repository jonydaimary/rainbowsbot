const CommandParser = require('./command-parser');

const { prefix } = require('./../../../json/config');

module.exports = function handleCommand(message) {
    if (message.author.bot)
        return;
    
    const mentionPrefixPattern = new RegExp(`^\\s*<@!?${message.client.user.id}>\\s*`);

    const startsWithPrefix = message.content.startsWith(prefix);
    const startsWithMention = mentionPrefixPattern.test(message.content);

    if (!startsWithMention && !startsWithPrefix)
        return;
    
    const rawCommand = message.content.substring(
        startsWithPrefix
            ? prefix.length
            : message.content.match(mentionPrefixPattern)[0].length
    ).trim();

    if (rawCommand.length == 0)
        return;
    
    const parser = new CommandParser(rawCommand);
    const command = message.client.commands.get(parser.part());

    if (!command)
        return;
    
    command.invoke(message.client, message, parser.rest());
};