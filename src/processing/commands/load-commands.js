const requireAll = require('require-all');
const CommandRegistry = require('./command-registry');

module.exports = (dirname) => {
    const registry = new CommandRegistry();
    const dirs = requireAll({
        dirname,
        resolve: command => typeof command == 'function'
            ? new command()
            : command
    });
    for (const dir in dirs) {
        for (const filename in dirs[dir]) {
            const command = dirs[dir][filename];
            registry.register(command);
            console.log(`Command loaded: ${command.group}::${command.name}`);
        }
    }
    return registry;
};