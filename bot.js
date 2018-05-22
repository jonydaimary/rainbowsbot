const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.TOKEN
 
client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`Rainbow's Server`, { type : 'STREAMING'}).catch(console.error);
});
 
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id, ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Rainbow's Server`, { type : 'STREAMING'}).catch(console.error);
});
 
client.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Rainbow's Server`, { type : 'STREAMING'}).catch(console.error);
});

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg")
    .setTitle('Добро пожаловать на Rainbow`s Server!')
    .setDescription('Rainbow`s Server — это стремительно развивающийся сервер Discord')
    .addField('Информация о сервере', `Основной аудиторией которого являются игроки абсолютно всех жанров игр. На сервере всегда можно поискать напарника по другим игровым дисциплинам.\n Обязательно прочитай <#390193321315926017>. \n **Мы рады, что ты зашел к нам** \n По вопросам обращайся к SERVER ADMIN, Главному модератору или Модератору`)
    .setColor('00ff00')
    .setFooter('Rainbow`s server 🌈 Welcome!');
   
    member.send({embed})
});


client.on("message", async message => {
 
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'helphelp') {
        let embed = new Discord.RichEmbed()
            .setTitle("Help/Help")
            .setColor('#00ff00')
            .setDescription(`**Help** - команда, которая вызывает перечень доступных команд`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");

            message.channel.send({embed});

          }
    
    if (command === 'helpban') {
        let embed = new Discord.RichEmbed()
            .setTitle("Help/Ban")
            .setColor('#00ff00')
            .setDescription(`**Ban** - команда, которая банит игрока на сервере`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");
       
            message.channel.send({embed});
       
        }

    if (command === 'helpkick') {
        let embed = new Discord.RichEmbed()
            .setTitle("Help/Ban")
            .setColor('#00ff00')
            .setDescription(`**Kick** - команда, которая выгоняет игрока с сервера`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");
           
            message.channel.send({embed});
           
        }

    if (command === 'helppurge') {
        let embed = new Discord.RichEmbed()
            .setTitle("Help/Purge")
            .setColor('#00ff00')
            .setDescription(`**Purge** - команда, которая очищает определенное кол-во сообщений в чате`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");
               
            message.channel.send({embed});
               
        }

    if (command === 'helpping') {
        let embed = new Discord.RichEmbed()
            .setTitle("Help/Ping")
            .setColor('#00ff00')
            .setDescription(`**Ping** - команда, которая отправляет запрос на сервер`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");
                   
            message.channel.send({embed});
                   
        }

          if (command === 'helpinfo') {
         let embed = new Discord.RichEmbed()
            .setTitle("Help/Info")
            .setColor('#00ff00')
            .setDescription(`**Info** - команда, которая описывает основные характеристики бота, информацию о нём`)
            .setFooter("Rainbow`s System", "https://i.imgur.com/3qMCgHk.jpg");
    
            message.channel.send({embed});
    
           }

    if (command === 'info') {
        let embed = new Discord.RichEmbed()
            .setTitle("Rainbow`s Private bot")
            .setColor('#800080')
            .setDescription(`***Rainbow's Bot - бот, который разработан на языке JavaScript \nСпециально создан для Rainbow's Server***`)
            .setFooter("Created by R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg");

            message.channel.send({embed});

          }

     if (command === 'gif') {
        let embed = new Discord.RichEmbed()
            .setTitle('Как вам GIF-ка?')
            .setDescription("Rainbow`s Server's GIF image")
            .setColor('#00FFFF')
            .setThumbnail("https://media.giphy.com/media/1jl6KT45wrBmlOgd83/giphy.gif")
    
             message.channel.send({embed});
    
            }
    if (command === 'help') {
        let embed = new Discord.RichEmbed()
        .setTitle('Список доступных команд:')
        .setDescription("Команды для бота: \n **Префикс - rb! ** \n • **help** - список команд \n • **ban** - забанить игрока \n • **kick** - кикнуть игрока \n • **purge** очистить сообщения \n • **ping** - запрос на сервер \n • **info** - информация о боте \n Для получения информации о команде введите ***rb!help[команда]*** __без пробелов__")
        .setColor('#800080')
        .setFooter("R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg");         
    
        message.channel.send({embed})
        }
 
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
 
    if(command ==="stats") {
    if(!message.member.roles.some(r=>["SERVER ADMIN"].includes(r.name)) )
        return message.reply("У вас нет прав для выполнения данной команды");
        const embed = new Discord.RichEmbed()
            .setColor(`#ff00ff`)
            .setTitle('Статистика')
            .setThumbnail(client.user.avatarURL);
        embed.addField('Пинг', client.ping, true);
        embed.addField('ОЗУ', `25`);
        embed.addField('Сервер', 'Rainbow`s Server');
        embed.addField('Порт', `58973009457`);
        let guilds = [];
        client.guilds.forEach(function (guild) {guilds.push(guild.name)});
        embed.addField('Гильдии', '```'+guilds.join('\n')+'```');
        message.author.send(embed);
        message.delete();
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }
 
    if (command === "kick") {
        if(!message.member.roles.some(r=>["SERVER ADMIN", "Главный Модератор", "Модератор"].includes(r.name)) )
            return message.reply("У вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.kickable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} for reason: ${reason}`);
 
    }
 
    if(command === "ban") {
        if(!message.member.roles.some(r=>["SERVER ADMIN"].includes(r.name)) )
            return message.reply("У вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first();
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.bannable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
 
        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
 
    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
 
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Укажите число от 2 до 100");
        if(!message.member.roles.some(r=>["SERVER ADMIN", "Главный Модератор", "Модератор"].includes(r.name)) )
            return message.reply("У вас нет прав для выполнения данной команды");
 
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
    
    if (!error && pattern !== 'hid') {
        let cmd = '';
        if (pattern !== null)
            cmd = cmd + `\`${aliases[0]} ${pattern}\``;
        else
            cmd = cmd + `\`${aliases[0]}\``;

        if (description !== null)
            cmd = cmd + ` — ${description}`;
        help_commands.push(cmd);
        }
    
        help_command = ['']

    if(command === "help1") {
        let limit = 8;
        let all_pages = Math.ceil(help_commands.length/limit);
        let current_page = parseInt(args[0]);
        if (current_page > all_pages || current_page < 1 || !isNumeric(args[0]))
            current_page = 1;
        let curr_commands = help_commands.slice(1+((current_page-1)*limit), (limit+1)+((current_page-1)*limit)).join('\n');
        let all_commands = '';
        if (!botFullRights.includes(message.channel.id))
            all_commands = '***Внимание!*** В этом списке отображены команды, которые доступны в этом чате. Чтобы получить доступ ко всем командам, идите в <#418096126957453337>\n';
        let newPage = '';
        if (current_page < all_pages)
            newPage = `\n\n**Для просмотра следующей страницы напишите \`${process.env.PREFIX}${command} ${current_page+1}\`**`;
    }
});
 
client.login(process.env.TOKEN).catch(console.error);