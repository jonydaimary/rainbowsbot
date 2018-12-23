const requireAll = require('require-all');
const schedule = require('node-schedule');

module.exports = (client, dirname) => {
    const dir = requireAll({ dirname });
    for (const filename in dir) {
        const { name, rule, callback } = dir[filename];
        schedule.scheduleJob(
            name || filename,
            rule,
            callback.bind(undefined, client)
        );
    }
};