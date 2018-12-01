const Command = require('../../command-processing/command');

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
        const result = await this.client.sequelize.query(query);
        return `\`\`\`json\n${JSON.stringify(result, '', 4)}\`\`\``;
    }
};