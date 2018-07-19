const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('random', 'Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");


bot.login('NDM0Nzc3NDk1NTIzNDI2MzI1.DctjiQ.sMIAXfE34u7gC2CYfE0MATsaSec');