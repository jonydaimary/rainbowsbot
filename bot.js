const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const token = process.env.TOKEN
const ms = require("ms");
const hook = new Discord.WebhookClient('webhook id', 'webhook token');


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
    .addField('Информация о сервере', `Rainbow's Server — это стремительно развивающийся сервер Discord. Основной тематикой сервера является программирование. Здесь сегда можно попросить помощи у опытных и начинающих программистов.\n Обязательно прочитай <#469599206991200256>. \n **Мы рады, что ты зашел к нам** \n По вопросам обращайся к Главному администратору\n\nЧеловек на сервере: **${member.guild.memberCount}**\n`)
    .setColor('00ff00')
    .setFooter('Rainbow`s server 🌈 Welcome!');
    
    member.send({embed});
    
})

client.on('guildMemberAdd', (member) => {
    let embed = new Discord.RichEmbed()
    .setTitle(`Новый участник сервера`)
    .setDescription(`К серверу присоединился ${member.user.tag}`)
    .setColor('#800080')
    .setFooter(`Rainbow's server 🌈 Welcome!`)
    
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

const matchingRole = '469612245744091181';
const givenRole = '470625504035078154';
client.on('guildMemberUpdate', async (before, after) => {
   if (!before.roles.has(matchingRole) && after.roles.has(matchingRole))
       await after.addRole(givenRole);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command =  args.shift().toLowerCase();
 // Direct Messages - #00ff00
 // Chat messages - #800080

 if (command === `guildinfo`) {
    message.delete

    if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
    return message.reply("у вас нет прав для выполнения данной команды");

let embed = new Discord.RichEmbed()

.setTitle(`Подробная информация о сервере`)
.addField(`INFORMATION REQUIRED TO`, `${message.author}, ID: ${message.author.id}`)
.addField(`NAME`, `${message.guild.name}`)
.addField(`ID`, `${message.guild.id}`)
.addField(`AFK CHANNEL`, `${message.guild.afkChannel} ID: ${message.guild.afkChannelID}`)
.addField(`AFK TIMEOUT`, `${message.guild.afkTimeout} seconds`)
.addField(`MEMBERS`, `${message.guild.memberCount}`)
.addField(`OWNER`, `${message.guild.owner} ID: ${message.guild.ownerID}`)
.setThumbnail(message.guild.iconURL)
.setFooter(`Rainbow's Server | Guild`)
.setColor(`#000000`);

client.channels.get('469600390455885833').send({embed});
 
}

 if (command === `seen`) {
    message.delete

    if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
    return message.reply("у вас нет прав для выполнения данной команды");
    
    let user = message.mentions.members.first();

    let member = message.mentions.members.first();

    let tag = user.user.tag
    
    let createdAt = user.user.createdAt

    let joinedAt = member.user.joinedAt

    let highestrole = member.highestRole

    if (!user ) return message.channel.send('Ошибка');
        let arr = {'online': 'Online', 'dnd': 'Do not distrub', 'idle': 'Idle', 'offline': 'Offline'};

    let embed = new Discord.RichEmbed()    

    .setTitle(`Подробная информация о пользователе`)
    .addField(`INFORMATION REQUIRED TO`, `${message.author}, ID: ${message.author.id}`)
    .addField(`USER ID`, user.id)
    .addField(`TAG`, tag)
    .addField(`CREATED AT`, createdAt)
    .addField(`STATUS`, arr[user.presence.status])
    .addField(`JOINED AT`, `${member.joinedAt}`)
    .addField(`HIGHEST ROLE`, highestrole)
    .setThumbnail(member.user.avatarURL)
    .setFooter(`Ranbow's Server | User `)
    .setColor(`#000000`);


    client.channels.get('469600390455885833').send({embed});

}

 if (command === `sc`) {
    message.delete();

    if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
    return message.reply("у вас нет прав для выполнения данной команды");

    let embed = new Discord.RichEmbed()

    .setTitle(`Специальные команды для персонала`)
    .addField(`• rb!par[nick]`,`Автоматически выдает достижение и роль для партнера`)
    .addField(`• rb!seen[nick]`, `Подробная информация о пользователе`)
    .addField(`• rb!guildinfo`, `Подробная информация о сервере`)
    .setColor(`#000000`)
    .setFooter(`Rainbow's Server | Secret Commands`);

    client.channels.get('469600390455885833').send({embed});

}


if (command === `par`) {
    message.delete();

    if(!message.member.roles.some(r=>["Главный Администратор", "Администратор", "Главный модератор", "Модератор"].includes(r.name)) )
    return message.reply("у вас нет прав для выполнения данной команды");
    
    const partner = '470218094342569984';
    const achievement = '469613173251506187'

    let embed = new Discord.RichEmbed()

    .setTitle(`Роль партнера успешно выдана`)
    .setColor(`#800080`)
    .setFooter(`Rainbow's Server 🌈 Partnership`);
    

    let user = message.mentions.members.first();
    user.addRole(partner);
    user.addRole(achievement);

message.channel.send(embed);

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
                    let footer1 = 'Rainbow`s Warnings';
                    if (reason === null || typeof reason === 'undefined') reason = 'Причина не указана.';
                    let embed = new Discord.RichEmbed()
                        .setTitle('Предупреждение')
                        // .setDescription(`**Пользователь:** ${user.user}\n**Модератор:** ${message.author}\n**Причина:**\n\n${reason}`)
                        .addField('Пользователь', `${user.user} (\`${user.user.tag}\`)`, true)
                        .addField('Модератор', `${message.author} (\`${message.author.tag}\`)`, true)
                        .setFooter(footer1)
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
            .setDescription(`Информация о командах \n \n __S__ **• ban** - команда, которая банит игрока на сервере \n __S__ **• kick** - команда, которая выгоняет игрока с сервера \n __S__ **• purge** - команда, которая очищает определенное кол-во сообщений в чате \n **• ping** - команда, которая отправляет запрос на сервер \n **• info** - команда, которая содержит ключевую информацию о боте \n **• link** - команда, которая отправляет приглашение на сервер`)
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
