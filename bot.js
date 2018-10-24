const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.TOKEN
const ms = require("ms");

client.on("ready", () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});
 
client.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id, ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});
 

client.on("guildDelete", guild => {
    
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`rb!help`, { type : 'STREAMING', url: 'https://twitch.tv/romanvoyoutube'}).catch(console.error);
});

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("R𝕒i𝕟b𝕠w#1111", "https://i.imgur.com/vM67SRdh.jpg")
    .setTitle('Добро пожаловать на Rainbow`s Server!')
    .setDescription('Привет! Это сообщение пишу вам я, собственный бот сервера. Для получения информации или основных команд введите **rb!help** ')
    .addField('Информация о сервере', `Rainbow's Server — это стремительно развивающийся сервер Discord. Основной аудиторией которого являются игроки абсолютно всех жанров игр. На сервере всегда можно поискать напарника по другим игровым дисциплинам.\n Обязательно прочитай <#469599206991200256>. \n **Мы рады, что ты зашел к нам** \n По вопросам обращайся к Главному администратору\n\nЧеловек на сервере: **${member.guild.memberCount}**\n`)
    .setColor('00ff00')
    .setFooter('Rainbow`s server 🌈 Welcome!');
    
    member.send({embed});
    
})

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Новый участник сервера`)
    .setDescription(`К серверу присоединился ${member.user.tag}, `)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Welcome!`)
    .setThumbnail(`https://media.giphy.com/media/dIL9AEkMQel0QLIjRR/giphy.gif`);
    
    client.channels.get('469599515561689092').send({embed});
    client.channels.get('469600390455885833').send({embed});
    
})

client.on('guildMemberRemove', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Участник покинул сервер`)
    .setDescription(`С сервера ушел ${member.user.tag}`)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Goodbye!`)
    
    client.channels.get('469600390455885833').send({embed});
    
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();
 // Direct Messages - #00ff00
 // Chat messages - #800080

 let xp = require("./xp.json");
 const fs = require('fs');
 const lvl_xp = [
     "А ты хорошь, лови ",
     "Я не ожидал от тебя токого, вот тебе ",
     "Не плохо, лови ",
     "Ни чего себе, не жданчик, у тебя ",
     "Воу воу воу, по легче, у тебя ",
     "Поздравляю тебя, у тебя уже "
 ];
 
 let lvl = (lvl_xp[Math.floor(Math.random() * lvl_xp.length)]);
 let xpAdd = Math.floor(Math.random() * 7) + 8; mRND = mRND + 1; mALL = mALL + 1;
 
     if(!xp[message.author.id]){
         xp[message.author.id] = {
         xp: 0,
         level: 1
         };
     }
 
     let curxp = xp[message.author.id].xp;
     let curlvl = xp[message.author.id].level;
     let nxtLvl = xp[message.author.id].level * 300;
     xp[message.author.id].xp = curxp + xpAdd;
     if(nxtLvl <= xp[message.author.id].xp){
         xp[message.author.id].level = curlvl + 1;
         let lvlup = new Discord.RichEmbed()
         .setColor("ffd500")
         .setDescription(`**${message.author.username}**,` + ` ${lvl} ` + `**\`\`${curlvl+1}\`\`**` + "-й левел");
 
         message.channel.send(lvlup).then(msg => {msg.delete(15000)});
     }
 
 
     fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
         if(err) console.log(err)
     });

     if(message.content.startsWith(p + `level`)) {

        message.delete();

        if(!xp[message.author.id]){
         xp[message.author.id] = {
           xp: 0,
           level: 1
            };
        }
    
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300;
        let difference = nxtLvlXp - curxp;
      
        let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("ffd500")
        .addField("Уровень", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${difference} XP для повышения уровня `, message.author.displayAvatarURL)
        .setTimestamp();
      
        message.channel.send(lvlEmbed).then(msg => {msg.delete(15000)});
      
    }

const emojis = {up:'418748638081318912', stop:'418748635820326912', shuffle:'418748638173462528', repeat1:'418748637531865089', repeat:'418748637649174535', play:'418748635765800961', pause:'418748635329855489', ok:'418748637502504972', forward:'418748554899881994', down:'418748613733122058', back:'418748554014752770', ABCD:'418748554518069249', abcd:'418748553985261568', abc:'418748552802598927', protiv:'419121914959626240', neznayu:'419121999277719562', za:'419122029854457866', obnimayu:'421647583551684609', money:'422055316792803349', error: '424467513578094592', facepalm: '429213277688561664'};
 
 function embed_error(text) {
    let error_emoji = client.emojis.get(emojis.error);
    return new Discord.RichEmbed()
        .setTitle('Ошибка')
        .setColor('#800080')
        .setFooter('Rainbow`s Server')
        .setDescription(`${error_emoji} ${text}`);
 }
 
 if (command === `warn`) {
    message.delete();
    if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
    return message.reply("у вас нет прав для выполнения данной команды");
    let new_args = args;
    new_args.shift();
    let reason = new_args.join(' ').trim();
 
    let user = message.mentions.members.first();
    if (!user) return message.channel.send({embed: embed_error(`${message.author}, укажите существующего пользователя`)});
    if (user.user.id === message.author.id) return message.channel.send({embed: embed_error(`${user.user}, выдать варн самому себе нельзя.`)});
    if (user.user.bot) return message.channel.send({embed: embed_error(`${message.author}, выдать варн боту нельзя`)});
    let reasontext = '';
    if (reason !== null && typeof reason !== undefined && reason !== '') reasontext = ` с причиной \`${reason}\``;
    if (reason === null || typeof reason === undefined || reason === '') reason = 'Причина не указана.';
    let accepting = message.channel.send(`Вы действительно хотите выдать варн пользователю \`${user.user.tag}\`${reasontext}?\n\n**Для подтверждения напишите \`да\`**`);
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
    collector.on('collect', msg => {
        if (['да'].includes(msg.content.toLowerCase())) {
                try {
                    let footer = 'Rainbow`s Warnings';
                    if (reason === null || typeof reason === 'undefined') reason = 'Причина не указана.';
                    let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        // .setDescription(`**Пользователь:** ${user.user}\n**Модератор:** ${message.author}\n**Причина:**\n\n${reason}`)
                        .addField('Пользователь', `${user.user} (\`${user.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
                        .setFooter(footer)
                        .setColor('#800080')
                        .setTimestamp(message.createdAt);
                    if (reason !== null && typeof reason !== undefined && reason !== '') embed.addField('Причина', `${reason}`);
                    message.channel.send(`${user.user}`, {embed}).then(() => {
                    });
                    message.guild.channels.get('469600390455885833').send({embed});
                 
                } catch (Exception) {
                    console.log(`Error occurred: ${Exception.message}\n${Exception.stack}`);
                    message.channel.send({embed: embed_error('Ошибка варна.')})
                }
            }
        });
 
    }

if(command === `mute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы указали несуществующего пользователя");


    let role = message.guild.roles.find(r => r.name === "RBMute");
    if(!role) {
        try {
            role = await message.guild.createRole({
                name: "RBMute",
                color: "#000000",
                permissions: []
            });

            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }

    if(toMute.roles.has(role.id)) return message.channel.send("Этот пользователь уже замучен");

    await toMute.addRole(role);

    let reason = args.join(" ").slice(22)
    let muteschannel = message.guild.channels.find(`name`, "стафф-чат")

    
    let embed = new Discord.RichEmbed()
    .setDescription("Пользователь замучен")
    .setColor("#800080")
    .addField("Пользователь:", toMute.toString())
    .addField("Модератор:", `${message.author}`)
    .addField("Причина:", reason || 'Причина не указана');

    message.channel.send(embed)
    muteschannel.send(embed);


    return

}

if(command === `unmute`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.send("Вы указали несуществующего пользователя");
    
    let role = message.guild.roles.find(r => r.name === "RBMute");
    
    if(!role || !toMute.roles.has(role.id)) return message.channel.send("Этот пользователь не замучен");

    await toMute.removeRole(role)
    let muteschannel = message.guild.channels.find(`name`, "стафф-чат");

    let embed = new Discord.RichEmbed()
    .setDescription("Пользователь размучен")
    .setColor("#800080")
    .addField("Пользователь:", toMute.toString())

    message.channel.send(embed)
    muteschannel.send(embed);

    return

}


if (command === 'report') {
    let rUser = message.guild.member(message.mentions.users.first() || message.get.members.get(args[0]));
    if(!rUser) return message.channel.send("Не могу найти пользователя");
    let reason = args.join(" ").slice(22);
    
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Жалобы")
    .setColor("#800080")
    .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
    .addField("Жалоба отправлена", `${message.author}, ID: ${message.author.id}`)
    .addField("Канал", message.channel)
    .setTimestamp(message.createdAt)
    .addField("Причина:", reason);

    let reportingEmbed = new Discord.RichEmbed()
    .setDescription("Жалоба отправлена")
    .setColor("#800080")
    .addField("Нарушитель", `${rUser}, ID: ${rUser.id}`)
    .addField("Причина:", reason);

    let reportschannel = message.guild.channels.find(`name`, "стафф-чат");
    if(!reportschannel) return message.channel.send("Не могу найти канал, для отправки жалобы");
    
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
    message.channel.send(reportingEmbed)
    
    return;
    }
   

    
    if (command === 'link') {
    let embed = new Discord.RichEmbed()
    .setTitle('Ссылка-приглашение для Rainbow`s Server')
    .setDescription('https://discord.gg/CtRp5GB')
    .setColor('#800080');

        message.channel.send({embed})
    }
    
    if (command === 'staff') {
        let embed = new Discord.RichEmbed()
        .setTitle('Персонал сервера')
        .addField('Главный администратор:', '<@340171098874183680>')
        .addField('Администратор','<@470221892779900929>')
        .addField('Главные модераторы:', '\n<@291277208431886356>')
        .addField(`Модераторы`, `<@323053088346865665>, <@477577112899944475>`)
        .setThumbnail(`https://media.giphy.com/media/1Q9CsjzWyt2qVzM0GH/giphy.gif`)
        .setColor('#800080');
    
            message.channel.send({embed})
        }
        

    if (command === 'user') {
        message.delete();
        let member = message.mentions.members.first();
        if (!member) user = message.member;
        let arr = {'online': 'Онлайн', 'dnd': 'Не беспокоить', 'idle': 'Нет на месте', 'offline': 'Оффлайн'};
        let embed = new Discord.RichEmbed()
        .setTitle("Информация о пользователе")
        .setColor('#800080')
        .setDescription(`**Name**: ${member.displayName} \n**ID**: ${member.id} \n**Status**: ${arr[member.user.presence.status]}`)
        .setThumbnail(member.user.avatarURL);
        
        message.channel.send({embed});
        
        }
    
    if (command === 'status') {
        message.delete();
        let user = message.mentions.users.first();
        if (!user ) return message.channel.send('Ошибка');
        let arr = {'online': 'Онлайн', 'dnd': 'Не беспокоить', 'idle': 'Нет на месте', 'offline': 'Оффлайн'};
        message.channel.send(arr[user.presence.status]);
        }
    
    if (command === 'help') {
        let embed = new Discord.RichEmbed()
            .setTitle("Помощь")
            .setColor('#800080')
            .setDescription(`Информация о командах\n\n __S__ - команды, доступные только персоналу \n\n**   rb!** - префикс бота\n\n**• help** - команда, которая вызывает перечень команд бота \n **• gif** - команда, которая отправляет GIF-изображение сервера\n **• report** - команда, которая отправляет жалобу на игрока \n**• user** - команда, которая показывает основную информацию о пользователе \n **• staff** - команда, которая показывает персонал сервера\n __S__ **• (un)mute** - команда, которая (ан)мутит игрока\n __S__ **• warn** - команда, которая выдает предупреждение игроку\n \n **Для просмотра второй страницы введите rb!help2**`)
            .setFooter("Страница 1/2");

            
            message.channel.send({embed});

          }
        if (command === 'help2') {
        let embed = new Discord.RichEmbed()
            .setTitle("Помощь")
            .setColor('#800080')
            .setDescription(`Информация о командах \n \n __S__ **• ban** - команда, которая банит игрока на сервере \n __S__ **• kick** - команда, которая выгоняет игрока с сервера \n __S__ **• purge** - команда, которая очищает определенное кол-во сообщений в чате \n **• ping** - команда, которая отправляет запрос на сервер \n **• info** - команда, которая содержит ключевую информацию о боте \n **• link** - команда, которая отправляет приглашение на сервер)`)
            .setFooter("Страница 2/2");
    
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
            .setColor('#800080')
            .setThumbnail("https://media.giphy.com/media/23foIXPAuT5EtZ7X67/giphy.gif")
    
             message.channel.send({embed});
    
            }

    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if (command === "say") {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    }
 
    if (command === "kick") {
        if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.kickable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Причина  не указана";
 
        await member.kick(reason)
            .catch(error => message.reply(`${message.author} Я не могу кикнуть из-за : ${error}`));
        
            let embed = new Discord.RichEmbed()
            .setTitle('Пользователь кикнут')
            .addField(`Пользователь:`, member)
            .setColor('#800080')
            .addField(`Модератор:`, message.author)
            .addField(`Причина:`, reason);
    
             message.channel.send({embed});
 
    }
 
    if(command === "ban") {
        if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        let member = message.mentions.members.first();
        if(!member)
            return message.reply("Укажите существующего пользователя");
        if(!member.bannable)
            return message.reply("Вы не можете этого сделать");
 
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Причина не указана";
 
        await member.ban(reason)
            .catch(error => message.reply(`${message.author} Я не могу кикнуть из-за : ${error}`));
            let embed = new Discord.RichEmbed()
            .setTitle('Пользователь забанен')
            .addField(`Пользователь:`, member)
            .setColor('#800080')
            .addField(`Модератор:`, message.author)
            .addField(`Причина:`, reason);
    
             message.channel.send({embed});
    }
 
    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
 
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Укажите число от 2 до 100");
        if(!message.member.roles.some(r=>["Главный Администратор", "Главный Модератор", "Модератор"].includes(r.name)) )
            return message.reply("у вас нет прав для выполнения данной команды");
 
        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Вы не можете удалить сообщения из-за ${error}`));
    }
    
 });
 
client.login(process.env.TOKEN).catch(console.error);
