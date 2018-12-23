const { Client } = require('discord.js');

const handleCommand = require('./processing/commands/handle-command');
const loadCommands = require('./processing/commands/load-commands');

const loadEvents = require('./processing/events/load-events');
const loadFunction = require('./processing/functions/load-functions');
const loadSchedule = require('./processing/schedule/load-schedule');

const client = new Client();
client.authState = true;

loadEvents(client, `${__dirname}/events`);
loadFunction(client, `${__dirname}/functions`);
loadSchedule(client, `${__dirname}/schedule`);

client.commands = loadCommands(`${__dirname}/commands`);

client.once('ready', async () => {
    client.sequelize = await require('./dbinit')();

    client.on('message', handleCommand);

    client.emit('sync');
});

// client.once('sync', () => {
//     require('./rest')(client);
// });

client.login(process.env.TOKEN).catch(console.error);