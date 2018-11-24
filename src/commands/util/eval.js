/* eslint-disable no-unused-vars */
const Command = require('../../command-processing/command');
const CommandParser = require('../../command-processing/command-parser');
const { stripIndents } = require('common-tags');

const SILENT_PATTERN = /\s*silent\s+/;
const CODE_BLOCK_PATTERN = /```js\n((?:.|\s)*)```/;

module.exports = class EvalCommand extends Command {
    constructor() {
        super({
            name: 'eval',
            group: 'Util',
            format: '[silent] <выражение или блок js>',
            description: 'Выполняет javascript',
            details: stripIndents`
                Выполняет javascript.
                Можно использовать как выражения, например \`2 + 2 * Math.sqrt(4)\`, так и блоки js кода.
                Вы также можете написать silent перед выражением, чтобы команда сработала в тихом режиме.
                При запуске в тихом режиме ваше сообщение будет удалено, а значение выражения не будет выведено.
                Список доступных констант/функций:
                **Discord**                 = discord.js
                **this**                    - объект команды
                **expression**              - ваше выражение
                **client**                  - клиент бота
                **message**                 - сообщение команды
                **guild**                   - текущий сервер
                **time**                    - время на момент начала выполнения
                **send**(content, options)  = message.channel.send(content, options)
                **reply**(content, options) = message.reply(content, options)
            `
        });
    }

    hasPermissions(member) {
        return ['340171098874183680', '169187770877739008'].includes(member.id);
    }

    parseArgs(rest) {
        const silent = SILENT_PATTERN.test(rest);
        if (silent)
            rest = rest.substring(rest.match(SILENT_PATTERN)[0].length);
        if (CODE_BLOCK_PATTERN.test(rest))
            rest = rest.match(CODE_BLOCK_PATTERN)[1];
        return [silent, rest];
    }

    run(msg, [silent, expression]) {
        const Discord = require('discord.js');
        const client = msg.client;
        const message = msg;
        const guild = msg.guild;
        const time = new Date();
        const reply = (...args) => this.safeSend(true, message, ...args);
        const send = (...args) => this.safeSend(false, message, ...args);
        try {
            const result = eval(expression);
            const execTime = new Date().getTime() - time.getTime();
            if (silent)
                return msg.delete();
            try {
                return `*выполнено за ${execTime}мс*\`\`\`json\n${JSON.stringify(result, '', 4)}\`\`\``;
            } catch(e) {
                return `*выполнено за ${execTime}мс*\`\`\`${String(result)}\`\`\``;
            }
        } catch(e) {
            return `**Произошла ошибка:** *${e.message}*\`\`\`Стек:\n${e.stack}\`\`\``;
        }
    }

    safeSend(reply, msg, content, options) {
        if (!content) {
            msg.reply('Нельзя отправить пустое сообщение.');
            return;
        }
        if (reply)
            msg.reply(content, options);
        else msg.channel.send(content, options);
    }
};