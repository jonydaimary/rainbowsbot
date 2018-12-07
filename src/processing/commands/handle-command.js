const CommandParser = require('./command-parser');

const config = require('./../../../config');

module.exports = function handleCommand(message) {
    if (message.author.bot)
        return;
    const mentionPrefixPattern = new RegExp(`^\\s*<@!?${message.client.user.id}>\\s*`);
    const startsWithPrefix = message.content.startsWith(config.prefix);
    const startsWithMention = mentionPrefixPattern.test(message.content);
    if (!startsWithMention && !startsWithPrefix)
        return;
    let rawCommand;
    if (startsWithPrefix)
        rawCommand = message.content.substring(config.prefix.length).trim();
    else {
        const match = message.content.match(mentionPrefixPattern)[0];
        rawCommand = message.content.substring(match.length);
    }
    if (rawCommand.length == 0)
        return;
    const parser = new CommandParser(rawCommand);
    const command = message.client.commands.get(parser.part());
    if (!command)
        return;
    command.invoke(message.client, message, parser.rest());
};