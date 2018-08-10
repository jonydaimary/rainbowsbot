const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "RBmute");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#800080",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Вы не указали время");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> был размучен!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}