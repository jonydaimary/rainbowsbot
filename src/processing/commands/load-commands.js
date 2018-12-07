const requireAll = require('require-all');
const CommandRegistry = require('./command-registry');
const Command = require('./command');

module.exports = (commandDirectory) => {
    const registry = new CommandRegistry();
    const groups = requireAll({
        dirname: commandDirectory,
        resolve: command => {
            if (typeof command == 'function')
                return new command();
            if (command instanceof Command)
                return command;
        }
    });
    for (const group in groups) {
        for (const name in groups[group]) {
            const command = groups[group][name];
            registry.register(command);
            console.log(`Command loaded: ${command.group}::${command.name}`);
        }
    }
    return registry;
};