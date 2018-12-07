module.exports = class CommandRegistry {
    constructor() {
        this._groups = new Map();
    }

    register(commandOrGroup) {
        if (typeof commandOrGroup == 'string')
            this._groups.set(commandOrGroup, new CommandGroup(commandOrGroup));
        else {
            if (!this._groups.has(commandOrGroup.group))
                this.register(commandOrGroup.group);
            this._groups.get(commandOrGroup.group).register(commandOrGroup);
        }
        return this;
    }

    unregister(command, group) {
        if (this.has(command)) {
            if (group && this._groups.has(group)) {
                this._groups.get(group).commands.delete(command);
            } else {
                for (const group of this.groups())
                    group.commands.delete(command);
            }
        }
    }

    get(groupOrName, maybeName) {
        const group = maybeName ? groupOrName : undefined;
        const name = maybeName ? maybeName : groupOrName;
        if (!group) {
            for (const command of this)
                if (command.name == name)
                    return command;
        } else {
            for (const [, _group] of this._groups)
                if (_group.name == group)
                    for (const command of _group)
                        if (command.name == name)
                            return command;
        }
    }

    has(groupOrName, maybeName) {
        return this.get(groupOrName, maybeName) ? true : false;
    }

    *[Symbol.iterator]() {
        for (const group of this.groups())
            yield* group;
    }

    *groups() {
        for (const [, group] of this._groups)
            yield group;
    }
};

class CommandGroup {
    constructor(name) {
        this.name = name;
        this.commands = new Map();
    }

    register(command) {
        this.commands.set(command.name, command);
    }

    *[Symbol.iterator]() {
        for (const [, command] of this.commands)
            yield command;
    }
}