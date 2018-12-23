const CommandParser = require('./command-parser');

class Command {
    constructor(options) {
        this.group = 'General';
        this.guildOnly = false;
        Object.assign(this, options);
    }

    async invoke(client, message, rawArgs) {
        if (this.guildOnly && message.channel.type != 'text')
            return;

        this.client = client;
        this.guild = message.guild;
        this.member = message.member;

        let args = await this.parseArgs(rawArgs);
        if (this.transformArgs)
            args = await this.transformArgs(args);

        const hasPermissions = await this.hasPermissions(this.guildOnly ? this.member : message.author);
        if (hasPermissions !== true) {
            if (typeof hasPermissions == 'string')
                message.reply(hasPermissions);
            return;
        }

        const isValid = await this.validate(message, args);
        if (isValid !== true) {
            if (typeof isValid == 'string')
                message.reply(isValid);
            return;
        }

        const result = await this.run(message, args);
        if (typeof result == 'string')
            message.reply(result);
    }

    run() { return; }

    parseArgs(raw) {
        return CommandParser.parts(raw);
    }

    hasPermissions() { return true; }

    validate() { return true; }
}

class CommandBuilder {
    constructor(name, groupOrOptions, maybeOptions) {
        this.command = {};
        this.command.name = name;
        if (typeof groupOrOptions == 'string')
            this.command.group = groupOrOptions;
        this.command.options = this.command.group
            ? maybeOptions
                ? maybeOptions
                : undefined
            : groupOrOptions;
    }

    group(group) {
        this.command.group = group;
        return this;
    }

    guildOnly(value = true) {
        this.command.guildOnly = value;
        return this;
    }

    run(run) {
        this.command.run = run;
        return this;
    }

    hasPermissions(hasPermissions) {
        this.command.hasPermissions = hasPermissions;
        return this;
    }

    validate(validate) {
        this.command.validate = validate;
        return this;
    }

    description(description) {
        this.command.description = description;
        return this;
    }

    details(details) {
        this.command.details = details;
        return this;
    }

    format(format) {
        this.command.format = format;
        return this;
    }

    parseArgs(parseArgs) {
        this.command.parseArgs = parseArgs;
        return this;
    }

    set(options) {
        Object.assign(this.command, options);
        return this;
    }

    build() {
        return new Command(this.command);
    }
}

module.exports = Command;
module.exports.Builder = CommandBuilder;